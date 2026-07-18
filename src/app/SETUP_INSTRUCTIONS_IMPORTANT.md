# ⚠️ IMPORTANT: Setup Required Before Login!

## 🔴 Login Won't Work Until You Complete These Steps

### Step 1: Create the Database Table (REQUIRED!)

**You MUST do this first, or login will fail!**

1. Go to **Supabase Dashboard**: https://supabase.com/dashboard
2. Select your project: **tsqhjhdbsvtvhgamoyaq**
3. Click **SQL Editor** in the left sidebar
4. Click **New Query**
5. **Copy and paste this ENTIRE SQL script:**

```sql
-- Create user_profiles table
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN (
    'team_lead',
    'content_writer',
    'smm_specialist',
    'seo_specialist',
    'web_developer',
    'graphic_designer',
    'qc_person'
  )),
  department TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own profile
CREATE POLICY "Users can read own profile"
  ON user_profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Policy: Service role can do everything (for signup)
CREATE POLICY "Service role can manage all profiles"
  ON user_profiles
  FOR ALL
  USING (auth.role() = 'service_role');
```

6. Click **Run** (or press F5)
7. You should see: ✅ **"Success. No rows returned"**

---

### Step 2: Create Your First User

**Option A: Via Supabase Dashboard (Easier)**

1. Go to **Supabase Dashboard** → **Authentication** → **Users**
2. Click **"Add user"** → **"Create new user"**
3. Fill in:
   - **Email:** `lead@beetloop.com`
   - **Password:** `demo123`
   - **Auto Confirm User:** ✅ **CHECK THIS BOX!** (Very important!)
4. Click **Create user**

5. Now go back to **SQL Editor** and run:

```sql
INSERT INTO user_profiles (id, email, full_name, role, department)
VALUES (
  (SELECT id FROM auth.users WHERE email = 'lead@beetloop.com'),
  'lead@beetloop.com',
  'Team Lead Demo',
  'team_lead',
  'Management'
);
```

6. You should see: ✅ **"Success. 1 rows affected"**

**Option B: All-in-One SQL (Advanced)**

If you want to create the user entirely via SQL:

```sql
-- This requires using the Supabase service role, which is already configured in the backend
-- So just use Option A above, it's easier!
```

---

### Step 3: Test Login

1. **Open your Beetloop app**
2. You should see the **Login Page**
3. Enter:
   - **Email:** `lead@beetloop.com`
   - **Password:** `demo123`
4. Click **Sign In**
5. ✅ **You should now be logged in as Team Lead!**

---

### Step 4: Create More Demo Users (Optional)

Once logged in as Team Lead:

1. Click **Admin** in the top navigation
2. Go to **User Management** tab
3. Click **"Create All Demo Users"** button
4. ✅ **7 demo users created instantly!**

Now you can logout and login as different roles to test:

| Role | Email | Password |
|------|-------|----------|
| Team Lead | lead@beetloop.com | demo123 |
| Content Writer | content@beetloop.com | demo123 |
| SMM Specialist | smm@beetloop.com | demo123 |
| SEO Specialist | seo@beetloop.com | demo123 |
| Web Developer | webdev@beetloop.com | demo123 |
| Graphic Designer | designer@beetloop.com | demo123 |
| QC Person | qc@beetloop.com | demo123 |

---

## 🔍 Troubleshooting

### Problem: "Invalid login credentials"

**Cause:** User doesn't exist in Supabase Auth

**Solution:**
1. Go to **Supabase Dashboard** → **Authentication** → **Users**
2. Check if the user exists
3. If not, create it using Step 2 above

---

### Problem: "User profile not found" error

**Cause:** User exists in Auth but not in `user_profiles` table

**Solution:**
Run this SQL (replace the email):

```sql
INSERT INTO user_profiles (id, email, full_name, role, department)
VALUES (
  (SELECT id FROM auth.users WHERE email = 'YOUR_EMAIL_HERE'),
  'YOUR_EMAIL_HERE',
  'Your Name',
  'team_lead',
  'Management'
);
```

---

### Problem: "relation user_profiles does not exist"

**Cause:** You didn't run the CREATE TABLE script from Step 1

**Solution:**
- Go back to Step 1 and run the SQL script

---

### Problem: Login button does nothing

**Cause:** Check browser console (F12) for errors

**Solution:**
1. Open browser console (F12)
2. Look for error messages
3. Common issues:
   - Network error → Check internet connection
   - CORS error → This shouldn't happen, contact support
   - Auth error → Wrong credentials

---

## ✅ Quick Checklist

Before trying to login, make sure:

- [ ] Created `user_profiles` table (Step 1)
- [ ] Created user in Supabase Auth (Step 2a)
- [ ] Auto-confirmed the user email
- [ ] Created user profile in database (Step 2b)
- [ ] Using correct email and password

---

## 🎉 Once Setup is Complete

You'll have:
- ✅ Working login system
- ✅ Role-based access control
- ✅ Personalized dashboards for each role
- ✅ User management system

**Everything will work perfectly once the database is set up!** 🚀
