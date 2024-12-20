import { auth, signIn, signOut } from "@/auth";
import { LogOut, Plus, User2 } from "lucide-react";
// import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { NbrButton } from "./ui/nbrButton";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="bg-white px-5 py-3 shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          {/* <Image src="/logo.png" alt="logo" width={144} height={30} /> */}
          <h1 className="text-black uppercase">
            <span className="text-primary">Deedee&apos;s</span> Blog
          </h1>
        </Link>

        <div className="flex items-center gap-5 text-black">
          {session && session.user ? (
            <>
              <NbrButton variant="neutral" asChild>
                <Link href="/startup/create">
                  <span className="max-sm:hidden">Créer un post</span>
                  <Plus className="size-7 sm:mt-1 sm:hidden" />
                </Link>
              </NbrButton>

              <DropdownMenu>
                <DropdownMenuTrigger asChild className="cursor-pointer">
                  <Avatar className="size-10 outline outline-2 outline-black">
                    <AvatarImage
                      src={session ? session.user.image! : ""}
                      alt={session?.user?.name || "avatar"}
                    />
                    <AvatarFallback>
                      {session?.user?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>{session?.user?.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="hover:bg-muted">
                    <Link
                      href={`/user/${session.id}`}
                      className="flex items-center gap-2"
                    >
                      <User2 className="size-4" /> Mon profil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="hover:bg-primary-100">
                    <form
                      action={async () => {
                        "use server";
                        await signOut({ redirectTo: "/" });
                      }}
                    >
                      <button type="submit">
                        <span className="text-red-500 text-center flex items-center gap-2">
                          <LogOut className="size-3" /> Déconnexion
                        </span>
                      </button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("google");
              }}
            >
              <NbrButton variant="neutral" type="submit">
                <span>Connexion</span>
              </NbrButton>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
