import { getSignInUrl, signOut, withAuth } from "@workos-inc/authkit-nextjs";
import Link from "next/link";

const Header = async () => {
  const { user } = await withAuth();
  const signInUrl = await getSignInUrl();

  return (
    <header>
      <div className="container flex items-center justify-between py-4 px-6 mx-auto my-4">
        <Link href={"/"} className="font-bold text-xl">
          Job Board
        </Link>
        <nav className="flex gap-4">
          {user ? (
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button
                type="submit"
                className="bg-gray-200 py-1 px-2 sm:py-2 sm:px-4 rounded-md"
              >
                Logout
              </button>
            </form>
          ) : (
            <Link href={signInUrl} className="bg-gray-200 py-1 px-2 sm:py-2 sm:px-4 rounded-md">
              Login
            </Link>
          )}
          <Link
            href={"/new-listing"}
            className="bg-blue-600 text-white py-1 px-2 sm:py-2 sm:px-4 rounded-md"
          >
            Post a job
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
