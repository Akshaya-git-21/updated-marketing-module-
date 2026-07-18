# 🚀 Beetloop Marketing Module - Complete Setup Guide

## ✅ What's Implemented

Your Beetloop Marketing Module now has a **complete Role-Based Access Control (RBAC) system** with:

- ✅ **User Authentication** - Login/Logout with Supabase
- ✅ **7 User Roles** - Each with personalized dashboards
- ✅ **Database Integration** - PostgreSQL via Supabase
- ✅ **Secure Backend** - Edge Functions for user management
- ✅ **Role-Based Routing** - Automatic dashboard based on user role
- ✅ **User Management** - Admin panel to create new users

---

## 📋 Setup Steps

### Step 1: Set Up Database Schema

1. Go to your **Supabase Dashboard** (https://supabase.com/dashboard)
2. Select your project
3. Click **SQL Editor** in the left menu
4. Click **New Query**
5. Copy and paste this SQL:

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
7. You should see: "Success. No rows returned"

---

### Step 2: Create Demo Users

**Option A: Use the User Management UI** (Recommended)

1. Login to your app (it won't work yet, so skip to Option B first)
2. Login as Team Lead (after you create one)
3. Go to **Admin** → **User Management** tab
4. Click **"Create All Demo Users"** button
5. Done! 7 demo users created instantly

**Option B: Manual Creation** (Do this first to create your first user)

Since you don't have any users yet, let's create one manually:

1. Go to Supabase Dashboard → **Authentication** → **Users**
2. Click **"Add user"** → **"Create new user"**
3. Enter:
   - Email: `lead@beetloop.com`
   - Password: `demo123`
   - Auto Confirm User: **✅ YES** (important!)
4. Click **Create user**
5. Now go to **SQL Editor** and run:

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

6. Now you can login with: `lead@beetloop.com` / `demo123`
7. Once logged in, use the UI to create the other demo users!

---

### Step 3: Test the System

#### Login Credentials (After creating demo users):

| Role | Email | Password |
|------|-------|----------|
| **Team Lead** | lead@beetloop.com | demo123 |
| **Content Writer** | content@beetloop.com | demo123 |
| **SMM Specialist** | smm@beetloop.com | demo123 |
| **SEO Specialist** | seo@beetloop.com | demo123 |
| **Web Developer** | webdev@beetloop.com | demo123 |
| **Graphic Designer** | designer@beetloop.com | demo123 |
| **QC Person** | qc@beetloop.com | demo123 |

#### Testing Each Role:

1. **Team Lead**:
   - Should see full navigation menu
   - Can access all modules (Overview, Master Data, Projects, etc.)
   - Can create new users in Admin panel
   - Sees complete system

2. **Content Writer**:
   - Sees only Content Writer Dashboard
   - Views only assigned content tasks
   - No access to navigation menu
   - Limited to content-related work

3. **SMM Specialist**:
   - Sees only SMM Dashboard
   - Views social media campaigns
   - Content calendar visible
   - No access to other departments

4. **SEO Specialist**:
   - Sees only SEO Dashboard
   - Views SEO campaigns and keywords
   - Backlink tasks visible
   - No content or SMM access

5. **Web Developer**:
   - Sees only Web Dev Dashboard
   - Views development tasks
   - Bug tracking visible
   - No marketing tasks

6. **Graphic Designer**:
   - Sees only Designer Dashboard
   - Views design tasks
   - Asset library access
   - No code or content tasks

7. **QC Person**:
   - Sees only QC Dashboard
   - Views items pending review
   - Can approve/reject work
   - Sees all departments' work for QC

---

## 🎯 How the System Works

### User Login Flow:

```
1. User opens app
   ↓
2. Shows Login Page
   ↓
3. User enters credentials
   ↓
4. Supabase authenticates
   ↓
5. System loads user profile from database
   ↓
6. App checks user role
   ↓
7. Redirects to role-specific dashboard
```

### Data Access Rules:

```
┌─────────────────────────────────────────┐
│  Team Lead                              │
│  ✅ Can see: EVERYTHING                 │
│  ✅ Can edit: EVERYTHING                │
│  ✅ Can assign: Tasks to anyone         │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  Other Roles (Content, SMM, SEO, etc.)  │
│  ✅ Can see: Only assigned tasks        │
│  ✅ Can edit: Only own tasks            │
│  ❌ Cannot see: Other departments       │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  QC Person                              │
│  ✅ Can see: All items in review        │
│  ✅ Can edit: Approve/reject items      │
│  ❌ Cannot see: Pending/in-progress     │
└─────────────────────────────────────────┘
```

---

## 🔐 Security Features

### 1. **Row Level Security (RLS)**
- Database automatically filters data by user
- Users cannot bypass and see other's data
- Enforced at database level (not just frontend)

### 2. **Authentication**
- Secure password storage (bcrypt hashing)
- Session management with JWT tokens
- Auto-logout on inactivity

### 3. **API Security**
- Service role key never exposed to frontend
- All user creation goes through backend
- CORS enabled for production

---

## 📊 Current Features

### ✅ Implemented:
- User authentication (login/logout)
- Role-based dashboards (7 roles)
- User management (create/view users)
- Secure backend API
- Database integration
- Session persistence
- Auto-redirect based on role

### 🔜 Next Steps (To Implement):
1. **Task Assignment System** - Assign tasks to users
2. **Real-time Updates** - Live task status changes
3. **Project Filtering** - Show only relevant projects
4. **Performance Tracking** - Individual metrics per user
5. **Team Collaboration** - Comments and mentions
6. **Notifications** - Email/in-app alerts

---

## 🛠️ Troubleshooting

### Problem: "User profile not found" after login

**Solution:**
```sql
-- Check if profile exists
SELECT * FROM user_profiles WHERE email = 'your@email.com';

-- If missing, create it:
INSERT INTO user_profiles (id, email, full_name, role, department)
VALUES (
  (SELECT id FROM auth.users WHERE email = 'your@email.com'),
  'your@email.com',
  'Your Name',
  'team_lead',
  'Management'
);
```

### Problem: "Failed to create user"

**Solution:**
- Check Supabase logs in Dashboard → Edge Functions
- Ensure database schema is created
- Verify service role key is set

### Problem: Can't login

**Solution:**
1. Check email/password are correct
2. Verify user exists in Supabase Auth → Users
3. Check user profile exists in database
4. Try resetting password in Supabase dashboard

---

## 🎨 Customization

### Adding New Roles:

1. Update `/utils/supabase/client.tsx`:
```typescript
export type UserRole = 
  | 'team_lead'
  | 'your_new_role' // Add here
  | 'content_writer'
  // ... rest

export const ROLE_CONFIG = {
  your_new_role: {
    label: 'Your Role Name',
    color: '#yourcolor',
    permissions: ['view_assigned_tasks'],
    dashboard: '/dashboard/your-role',
  },
  // ... rest
}
```

2. Create dashboard: `/components/dashboards/YourRoleDashboard.tsx`

3. Update `/App.tsx` to include new role routing

4. Update database check constraint:
```sql
ALTER TABLE user_profiles DROP CONSTRAINT user_profiles_role_check;
ALTER TABLE user_profiles ADD CONSTRAINT user_profiles_role_check
  CHECK (role IN ('team_lead', 'your_new_role', 'content_writer', ...));
```

---

## 📞 Support

If you encounter issues:

1. Check Supabase Dashboard → Logs
2. Check browser console for errors
3. Review the DATABASE_SCHEMA.md file
4. Ensure all SQL scripts ran successfully

---

## 🎉 You're All Set!

Your Beetloop Marketing Module now has:
- ✅ Multi-user support
- ✅ Role-based access control
- ✅ Secure authentication
- ✅ Personalized dashboards
- ✅ Production-ready backend

**Next:** Start assigning tasks and building your marketing workflow! 🚀
