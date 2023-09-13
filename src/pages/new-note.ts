import { createClient } from "../utils/supabase/server";

import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const title = String(formData.get("title"));
  const is_public = Boolean(formData.get("public"));

  const supabase = createClient({ cookies });

  const { error } = await supabase.from("notes").insert({
    title,
    is_public,
  });

  if (error) {
    console.log(error);
  }

  // a 301 status is required to redirect from a POST to a GET route
  return redirect(requestUrl.origin, 301);
};
