import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Supabase client with service role key
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-2c80ebd0/health", (c) => {
  return c.json({ status: "ok" });
});

// Auth signup endpoint
app.post("/make-server-2c80ebd0/auth/signup", async (c) => {
  try {
    const { email, password, fullName, role } = await c.req.json();

    // Validate input
    if (!email || !password || !fullName || !role) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    // Create user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm since email server not configured
      user_metadata: {
        full_name: fullName,
        role,
      },
    });

    if (authError) {
      console.error('Error creating user:', authError);
      return c.json({ error: authError.message }, 400);
    }

    // Create user profile in KV store
    try {
      await kv.set(`user_profile:${authData.user.id}`, {
        id: authData.user.id,
        email,
        full_name: fullName,
        role,
        department: getDepartmentFromRole(role),
        created_at: new Date().toISOString(),
      });
    } catch (kvError: any) {
      console.error('Error creating user profile:', kvError);
      return c.json({ error: 'Failed to create user profile' }, 400);
    }

    return c.json({ 
      success: true, 
      user: {
        id: authData.user.id,
        email,
        full_name: fullName,
        role,
      }
    });
  } catch (error: any) {
    console.error('Signup error:', error);
    return c.json({ error: error.message || 'Internal server error' }, 500);
  }
});

// Get user profile endpoint
app.get("/make-server-2c80ebd0/user/profile/:userId", async (c) => {
  try {
    const userId = c.req.param('userId');

    // Fetch user profile from KV store
    const profile = await kv.get(`user_profile:${userId}`);

    if (!profile) {
      return c.json({ error: 'User profile not found' }, 404);
    }

    return c.json({ profile });
  } catch (error: any) {
    console.error('Profile fetch error:', error);
    return c.json({ error: error.message || 'Internal server error' }, 500);
  }
});

// Create demo users endpoint
app.post("/make-server-2c80ebd0/auth/create-demo-users", async (c) => {
  try {
    const demoUsers = [
      { email: 'lead@beetloop.com', password: 'demo123', fullName: 'Team Lead Demo', role: 'team_lead' },
      { email: 'content@beetloop.com', password: 'demo123', fullName: 'Content Writer Demo', role: 'content_writer' },
      { email: 'smm@beetloop.com', password: 'demo123', fullName: 'SMM Specialist Demo', role: 'smm_specialist' },
      { email: 'seo@beetloop.com', password: 'demo123', fullName: 'SEO Specialist Demo', role: 'seo_specialist' },
      { email: 'webdev@beetloop.com', password: 'demo123', fullName: 'Web Developer Demo', role: 'web_developer' },
      { email: 'designer@beetloop.com', password: 'demo123', fullName: 'Graphic Designer Demo', role: 'graphic_designer' },
      { email: 'qc@beetloop.com', password: 'demo123', fullName: 'QC Person Demo', role: 'qc_person' },
    ];

    const results = [];

    for (const user of demoUsers) {
      try {
        // Check if user already exists
        const { data: existingUser } = await supabase.auth.admin.listUsers();
        const userExists = existingUser?.users?.some(u => u.email === user.email);

        if (userExists) {
          results.push({ email: user.email, status: 'already_exists' });
          continue;
        }

        // Create user with Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.admin.createUser({
          email: user.email,
          password: user.password,
          email_confirm: true,
          user_metadata: {
            full_name: user.fullName,
            role: user.role,
          },
        });

        if (authError) {
          console.error(`Error creating user ${user.email}:`, authError);
          results.push({ email: user.email, status: 'error', error: authError.message });
          continue;
        }

        // Create user profile in KV store
        try {
          await kv.set(`user_profile:${authData.user.id}`, {
            id: authData.user.id,
            email: user.email,
            full_name: user.fullName,
            role: user.role,
            department: getDepartmentFromRole(user.role),
            created_at: new Date().toISOString(),
          });
        } catch (kvError: any) {
          console.error(`Error creating profile for ${user.email}:`, kvError);
          results.push({ email: user.email, status: 'error', error: 'Failed to create user profile' });
          continue;
        }

        results.push({ email: user.email, status: 'created' });
      } catch (error: any) {
        results.push({ email: user.email, status: 'error', error: error.message });
      }
    }

    const successCount = results.filter(r => r.status === 'created').length;
    const existsCount = results.filter(r => r.status === 'already_exists').length;
    const errorCount = results.filter(r => r.status === 'error').length;

    return c.json({ 
      success: true,
      results,
      summary: {
        created: successCount,
        already_exists: existsCount,
        errors: errorCount,
      }
    });
  } catch (error: any) {
    console.error('Create demo users error:', error);
    return c.json({ error: error.message || 'Internal server error' }, 500);
  }
});

// Helper function to determine department from role
function getDepartmentFromRole(role: string): string {
  const departments: Record<string, string> = {
    team_lead: 'Management',
    content_writer: 'Content',
    smm_specialist: 'Social Media',
    seo_specialist: 'SEO',
    web_developer: 'Development',
    graphic_designer: 'Design',
    qc_person: 'Quality Control',
  };
  return departments[role] || 'General';
}

Deno.serve(app.fetch);