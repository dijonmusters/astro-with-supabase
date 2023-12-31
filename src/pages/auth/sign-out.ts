import { createClient } from "../../utils/supabase/server";

import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const requestUrl = new URL(request.url);
  const supabase = createClient({ cookies });

  const { error } = await supabase.auth.signOut();

  if (error) {
    return redirect(
      `${requestUrl.origin}/login?error=There was a problem logging out user`,
      301
    );
  }

  // a 301 status is required to redirect from a POST to a GET route
  return redirect(requestUrl.origin, 301);
};
