import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const ADMIN_EMAIL = "admin@uz-music.uz";
  const ADMIN_PASSWORD = "Admin123!";

  const admin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  try {
    // Try create user
    let userId: string | null = null;
    const { data: created, error: createErr } = await admin.auth.admin.createUser({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      email_confirm: true,
      user_metadata: { full_name: "Administrator" },
    });

    if (createErr && !`${createErr.message}`.toLowerCase().includes("already")) {
      throw createErr;
    }
    userId = created?.user?.id ?? null;

    if (!userId) {
      // already exists — find user
      const { data: list } = await admin.auth.admin.listUsers();
      userId = list.users.find((u) => u.email === ADMIN_EMAIL)?.id ?? null;
    }
    if (!userId) throw new Error("Admin user not found");

    // Ensure admin role
    await admin.from("user_roles").upsert(
      { user_id: userId, role: "admin" },
      { onConflict: "user_id,role" }
    );

    return new Response(
      JSON.stringify({ ok: true, email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: `${e}` }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});