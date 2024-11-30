import { UserIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const author = defineType({
  name: "author",
  title: "Auteur",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "id",
      type: "string",
      title: "ID",
      readOnly: true,
    }),
    defineField({
      name: "name",
      title: "Nom",
      type: "string",
    }),
    defineField({
      name: "username",
      title: "Nom d'utilisateur",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "url",
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
    }),
  ],
  preview: {
    select: {
      title: "name",
    },
  },
});
