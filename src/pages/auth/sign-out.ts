import { createClient } from "../../utils/supabase/server";

import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const requestUrl = new URL(request.url);
  const supabase = createClient({ cookies });

  await supabase.auth.signOut();

  // a 301 status is required to redirect from a POST to a GET route
  return redirect(`${requestUrl.origin}/login`, 301);
};
