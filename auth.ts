import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { AUTHOR_BY_GOOGLE_ID_QUERY } from "./sanity/lib/queries";
import { client } from "./sanity/lib/client";
import { writeClient } from "./sanity/lib/write-client";

function generateRandomUsername() {
  const randomNumber = Math.floor(10000000 + Math.random() * 90000000); // Génère un nombre aléatoire à 8 chiffres
  return `user_${randomNumber}`;
}

async function generateUniqueUsername() {
  let username;
  let isUnique = false;

  while (!isUnique) {
    username = generateRandomUsername();

    // Vérifiez si le nom d'utilisateur existe déjà dans la base
    const existingUser = await client.fetch(
      `*[_type == "author" && username == $username][0]`,
      { username }
    );

    if (!existingUser) {
      isUnique = true; // Le nom d'utilisateur est unique
    }
  }

  return username;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user, profile }) {
      const googleId = profile?.sub; // Utilisation de `sub` comme identifiant unique

      if (!googleId) {
        console.error("Google ID (sub) is missing.");
        return false; // Bloquer la connexion si l'ID est manquant
      }

      // Vérifiez si l'utilisateur existe déjà
      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_GOOGLE_ID_QUERY, { id: googleId });

      // Si l'utilisateur n'existe pas, créez un nouvel enregistrement
      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id: googleId, // Enregistrez `sub` comme ID
          name: user?.name,
          username: await generateUniqueUsername(),
          email: user?.email,
          image: user?.image,
          bio: "",
        });
      }

      return true; // Autoriser la connexion
    },

    async jwt({ token, account, profile }) {
      if (account && profile) {
        const googleId = profile?.sub; // Utilisation de `sub` comme identifiant unique

        if (!googleId) {
          console.error("Google ID (sub) is missing in jwt callback.");
          return token; // Retourner le token tel quel si l'ID est manquant
        }

        // Récupérez l'utilisateur à partir de la base de données
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GOOGLE_ID_QUERY, { id: googleId });

        // Ajoutez l'ID de l'utilisateur au token
        token.id = user?._id;
      }

      return token;
    },

    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      return session;
    },
  },
});
