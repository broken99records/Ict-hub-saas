import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createSupabaseClient } from "@/utils/supabase/server";

export default async function Header() {
  const client = await createSupabaseClient();
  const {
    data: { user },
  } = await client.auth.getUser();

  return (
    <nav className="border-b w-full h-16 shrink-0 flex items-center">
      <div className="px-6 w-full flex items-center justify-between mx-auto">
        <Link href="/test" className="text-sm font-semibold">
          <div className="flex items-center space-x-2">
              <span className="w-5 h-5 bg-blue-200 rounded-full flex items-center justify-center">
                <span className="w-2 h-2 bg-[--color-primary-bg] rounded-full"></span>
              </span>
              <span className="text-xl font-semibold tracking-wider">CRS ICT HUB</span>
            </div>
        </Link>
        <div className="flex items-center gap-2">
          {user == null && (
            <>
              <Button variant="outline" asChild>
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/sign-up">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
