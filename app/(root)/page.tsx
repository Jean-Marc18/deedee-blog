import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";

import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };

  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Partagez votre savoir Et faites partie d&apos;un élan collectif.
        </h1>
        <p className="sub-heading !max-w-3xl">
          En soumettant vos articles et vos idées ✨, vous contribuez à
          l&apos;enrichissement de la communauté. Rejoignez notre espace dédié à
          la motivation et au partage 🙌. <br />
          <em className="font-normal">
            &quot;Parce qu&apos;une idée partagée peut en inspirer mille
            autres.&quot;
          </em>
          😉
        </p>
        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query
            ? `Résultats de recherche pour : "${query}"`
            : "Tous les posts"}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p>Aucune startup trouvée pour le moment...</p>
          )}
        </ul>
      </section>

      <SanityLive />
    </>
  );
}
