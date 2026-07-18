# ✅ SUPER EASY FIX - 2 Steps Only!

## The Problem
You're getting "Invalid login credentials" because no users exist yet.

## The Solution (Choose ONE)

---

### 🚀 **OPTION 1: Automatic (Easiest!) - 30 Seconds**

Just click the button on the login page!

1. **Try to login** with any email/password (it will fail)
2. You'll see an error message
3. Click the **"Create Demo Users Automatically"** button
4. Wait 5 seconds
5. Click **"Sign In"** button (email & password are already filled!)
6. ✅ **You're in!**

**That's it!** The app will automatically create 7 demo users for you.

---

### 🛠️ **OPTION 2: Manual (If Option 1 doesn't work) - 2 Minutes**

#### Step 1: Create the database table

1. Go to: https://supabase.com/dashboard/project/tsqhjhdbsvtvhgamoyaq/sql/new
2. Paste this SQL:

```sql
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN (
    'team_lead', 'content_writer', 'smm_specialist', 
    'seo_specialist', 'web_developer', 'graphic_designer', 'qc_person'
  )),
  department TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own profile" ON user_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON user_profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Service role can manage all profiles" ON user_profiles FOR ALL USING (auth.role() = 'service_role');
```

3. Click **Run**

#### Step 2: Use the automatic button

1. Go back to the app
2. Click **"Create Demo Users"** button on login page
3. Wait for success message
4. Login with: `lead@beetloop.com` / `demo123`

---

## What You Get

After either option:

✅ **7 Demo Users Created:**
- Team Lead: `lead@beetloop.com` / `demo123`
- Content Writer: `content@beetloop.com` / `demo123`
- SMM Specialist: `smm@beetloop.com` / `demo123`
- SEO Specialist: `seo@beetloop.com` / `demo123`
- Web Developer: `webdev@beetloop.com` / `demo123`
- Graphic Designer: `designer@beetloop.com` / `demo123`
- QC Person: `qc@beetloop.com` / `demo123`

✅ **Each user gets their own personalized dashboard**

✅ **Role-based access control working**

---

## Still Having Issues?

1. Click **"Setup Help"** button on login page
2. Click **"Run Diagnostic Check"**
3. It will tell you exactly what's wrong

---

## Quick Test

After setup:

1. Login as Team Lead → See full system
2. Logout
3. Login as Content Writer → See only content tasks
4. Logout  
5. Login as SMM Specialist → See only social media tasks

**Each role has a completely different view!** 🎉

---

**The "Create Demo Users" button does everything automatically - just click it!** 🚀
