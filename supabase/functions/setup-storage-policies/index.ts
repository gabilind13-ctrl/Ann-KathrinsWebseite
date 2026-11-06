import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // Verify the user is an admin
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "No authorization header" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Check if user is admin
    const { data: adminUser, error: adminError } = await supabase
      .from("admin_users")
      .select("id")
      .eq("id", user.id)
      .maybeSingle();

    if (adminError || !adminUser) {
      return new Response(
        JSON.stringify({ error: "Not an admin user" }),
        {
          status: 403,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Create storage policies using SQL
    const policies = [
      {
        name: "Authenticated users can upload to media bucket",
        sql: `
          CREATE POLICY IF NOT EXISTS "Authenticated users can upload to media bucket"
          ON storage.objects
          FOR INSERT
          TO authenticated
          WITH CHECK (bucket_id = 'media');
        `,
      },
      {
        name: "Public read access to media bucket",
        sql: `
          CREATE POLICY IF NOT EXISTS "Public read access to media bucket"
          ON storage.objects
          FOR SELECT
          TO public
          USING (bucket_id = 'media');
        `,
      },
      {
        name: "Authenticated users can update media files",
        sql: `
          CREATE POLICY IF NOT EXISTS "Authenticated users can update media files"
          ON storage.objects
          FOR UPDATE
          TO authenticated
          USING (bucket_id = 'media' AND auth.uid()::text = owner)
          WITH CHECK (bucket_id = 'media' AND auth.uid()::text = owner);
        `,
      },
      {
        name: "Authenticated users can delete own media files",
        sql: `
          CREATE POLICY IF NOT EXISTS "Authenticated users can delete own media files"
          ON storage.objects
          FOR DELETE
          TO authenticated
          USING (bucket_id = 'media' AND auth.uid()::text = owner);
        `,
      },
    ];

    const results = [];
    for (const policy of policies) {
      try {
        const { error } = await supabase.rpc("exec_sql", { sql_query: policy.sql });

        if (error) {
          results.push({
            policy: policy.name,
            status: "failed",
            error: error.message,
          });
        } else {
          results.push({
            policy: policy.name,
            status: "success",
          });
        }
      } catch (err) {
        results.push({
          policy: policy.name,
          status: "failed",
          error: String(err),
        });
      }
    }

    return new Response(
      JSON.stringify({
        message: "Storage policies setup complete",
        results,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        details: String(error),
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
