# ⚡ Quick Start Guide - Beetloop Marketing Module

## 🎯 Get Started in 5 Minutes

### Step 1: Create Database Table (2 minutes)

1. Open **Supabase Dashboard** → **SQL Editor**
2. Run this SQL:

```sql
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN (
    'team_lead', 'content_writer', 'smm_specialist', 'seo_specialist',
    'web_developer', 'graphic_designer', 'qc_person'
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

---

### Step 2: Create Your First User (1 minute)

1. **Supabase Dashboard** → **Authentication** → **Users**
2. Click **"Add user"**
3. Enter:
   - Email: `lead@beetloop.com`
   - Password: `demo123`
   - ✅ **Auto Confirm User**
4. Click **Create user**

---

### Step 3: Create User Profile (1 minute)

Back in **SQL Editor**, run:

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

---

### Step 4: Login! (30 seconds)

1. Open your Beetloop app
2. Login with:
   - Email: `lead@beetloop.com`
   - Password: `demo123`
3. ✅ You're in as Team Lead!

---

### Step 5: Create More Users (1 minute)

Now that you're logged in as Team Lead:

1. Click **Admin** → **User Management** tab
2. Click **"Create All Demo Users"** button
3. ✅ Done! 7 demo users created

---

## 🎉 That's It!

You now have:
- ✅ Working authentication
- ✅ 7 different user roles
- ✅ Personalized dashboards
- ✅ User management system

## 🧪 Test It Out

Logout and try logging in as different roles:

| Role | Email | Password | What You'll See |
|------|-------|----------|-----------------|
| Team Lead | lead@beetloop.com | demo123 | Full system access |
| Content Writer | content@beetloop.com | demo123 | Content tasks only |
| SMM Specialist | smm@beetloop.com | demo123 | Social media tasks |
| SEO Specialist | seo@beetloop.com | demo123 | SEO campaigns |

---

## 📚 More Information

- **Full Setup Guide:** See `SETUP_GUIDE.md`
- **System Architecture:** See `SYSTEM_ARCHITECTURE.md`
- **Database Schema:** See `DATABASE_SCHEMA.md`

---

## 🆘 Troubleshooting

**Can't login?**
- Make sure you ran the SQL in Step 1 & 3
- Check user exists in Supabase → Authentication → Users
- Verify password is correct

**"User profile not found"?**
- Run the INSERT query in Step 3 again
- Check the email matches exactly

**Need help?**
- Check Supabase Dashboard → Logs
- Open browser console (F12) for errors

---

## 🚀 Next Steps

1. **Assign tasks** to different users
2. **Track progress** in dashboards
3. **Add real data** instead of mock data
4. **Customize** dashboards for your workflow

**Ready to build your marketing empire!** 🎯
