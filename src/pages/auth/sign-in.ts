import { createClient } from "../../utils/supabase/server";

import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const supabase = createClient({ cookies });

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return redirect(
      `${requestUrl.origin}/login?error=Could not authenticate user. If this is your first time, try signing up. Otherwise, check email and password are correct.`,
      301
    );
  }

  // a 301 status is required to redirect from a POST to a GET route
  return redirect(requestUrl.origin, 301);
};
