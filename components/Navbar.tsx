import Link from "next/link";
import Image from "next/image";
import { auth, signOut, signIn } from "@/auth";
import { Github } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="bg-transparent px-10 w-full py-3 relative z-20 font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={40} height={40} />
        </Link>

        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <Link href="/article/create">
                <span className="btn">Create</span>
              </Link>
              <form
                action={async () => {
                  "use server";

                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit">
                  <span className="link">Logout</span>
                  {/*  <span className="max-sm:hidden link">Logout</span>
                  <LogOut className="size-6 sm:hidden text-black" /> */}
                </button>
              </form>
              <Link href={`/user/${session?.id}`}>
                <Avatar className="size-10">
                  <AvatarImage
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || ""}
                  />
                  <AvatarFallback>
                    <Image
                      src="/github.png"
                      alt="logo"
                      width={40}
                      height={40}
                    />
                  </AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";

                await signIn("github");
              }}
            >
              <button className="link flex" type="submit">
                <Image src="/github.png" alt="github" width={24} height={24} />
                <span className="ml-2 !text-[18px]">Login</span>
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
