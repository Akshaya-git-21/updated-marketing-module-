# 🐝 Beetloop Marketing Module - START HERE!

## ⚡ Quick Start (2 Minutes!)

### **Issue:** "Failed to fetch" or "Invalid login credentials"

### **Solution:** Complete these 2 steps:

---

## 📝 **STEP 1: Create Database Table** (1 minute)

1. **Open:** https://supabase.com/dashboard/project/tsqhjhdbsvtvhgamoyaq/sql/new

2. **Paste this SQL and click Run:**

```sql
CREATE TABLE IF NOT EXISTS user_profiles (
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
CREATE POLICY "Anyone can insert profiles" ON user_profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Service role can manage all profiles" ON user_profiles FOR ALL USING (auth.role() = 'service_role');
```

---

## 📧 **STEP 2: Disable Email Confirmation** (30 seconds)

1. **Open:** https://supabase.com/dashboard/project/tsqhjhdbsvtvhgamoyaq/auth/providers

2. Scroll to **"Email Auth"** section

3. **Turn OFF** the "Confirm email" toggle

4. Click **Save**

---

## 🎉 **STEP 3: Create Demo Users!** (Automatic)

1. **Go to your app**

2. Click **"Create Demo Users"** button

3. Wait 5 seconds

4. Login with: `lead@beetloop.com` / `demo123`

5. ✅ **Done!**

---

## 🎯 **What You Get:**

After setup, you'll have **7 demo user accounts**:

- 👑 **Team Lead:** lead@beetloop.com / demo123 → Full access
- ✍️ **Content Writer:** content@beetloop.com / demo123 → Content only
- 📱 **SMM Specialist:** smm@beetloop.com / demo123 → Social only
- 🔎 **SEO Specialist:** seo@beetloop.com / demo123 → SEO only
- 💻 **Web Developer:** webdev@beetloop.com / demo123 → Dev only
- 🎨 **Graphic Designer:** designer@beetloop.com / demo123 → Design only
- 🔍 **QC Person:** qc@beetloop.com / demo123 → QC only

Each role sees a completely different dashboard! 🚀

---

## 🆘 **Still Not Working?**

Click **"Setup Help"** button on the login page → **"Run Diagnostic Check"**

It will tell you exactly what's missing!

---

## 📚 **More Info:**

- Detailed setup: See `/FINAL_SETUP_STEPS.md`
- Quick fix: See `/EASY_FIX.md`
- Documentation: See `/docs/` folder

---

**Total setup time: 2-3 minutes** ⏱️

**Then you're ready to explore the full Beetloop Marketing Control Center!** 🐝
