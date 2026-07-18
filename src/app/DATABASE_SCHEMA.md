# Beetloop Marketing Module - Database Schema

## Required Supabase Setup

### 1. Create `user_profiles` Table

Run this SQL in your Supabase SQL Editor:

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

### 2. Create Demo Users

Run this in your Supabase SQL Editor to create demo users:

```sql
-- Note: You'll need to use the signup endpoint to create users properly
-- These are the demo credentials that will be created:

-- Team Lead
-- Email: lead@beetloop.com
-- Password: demo123
-- Role: team_lead

-- Content Writer
-- Email: content@beetloop.com
-- Password: demo123
-- Role: content_writer

-- SMM Specialist
-- Email: smm@beetloop.com
-- Password: demo123
-- Role: smm_specialist

-- SEO Specialist
-- Email: seo@beetloop.com
-- Password: demo123
-- Role: seo_specialist

-- Web Developer
-- Email: webdev@beetloop.com
-- Password: demo123
-- Role: web_developer

-- Graphic Designer
-- Email: designer@beetloop.com
-- Password: demo123
-- Role: graphic_designer

-- QC Person
-- Email: qc@beetloop.com
-- Password: demo123
-- Role: qc_person
```

### 3. Future Tables (To be implemented)

#### Tasks Table
```sql
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  task_type TEXT NOT NULL, -- 'content', 'smm', 'seo', 'web_dev', 'design', 'qc'
  project_id UUID, -- Will reference projects table
  assigned_to UUID REFERENCES user_profiles(id),
  assigned_by UUID REFERENCES user_profiles(id),
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'in_progress', 'review', 'completed'
  priority TEXT NOT NULL DEFAULT 'medium', -- 'low', 'medium', 'high'
  due_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS for tasks
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Users can see their assigned tasks
CREATE POLICY "Users can see assigned tasks"
  ON tasks
  FOR SELECT
  USING (assigned_to = auth.uid() OR assigned_by = auth.uid());

-- Team leads can see all tasks
CREATE POLICY "Team leads can see all tasks"
  ON tasks
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'team_lead'
    )
  );
```

#### Projects Table
```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  project_type TEXT NOT NULL, -- 'content', 'smm', 'seo', 'web', 'design'
  status TEXT NOT NULL DEFAULT 'active',
  created_by UUID REFERENCES user_profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Team leads and assigned members can see projects
CREATE POLICY "Users can see relevant projects"
  ON projects
  FOR SELECT
  USING (true); -- Simplified for now, refine based on team assignments
```

## Role-Based Access Control (RBAC)

### User Roles & Permissions

| Role | Can View | Can Edit | Special Access |
|------|----------|----------|----------------|
| **Team Lead** | All projects, all tasks | All projects, all tasks | User management, full system access |
| **Content Writer** | Own content tasks | Own content tasks | Content guidelines |
| **SMM Specialist** | Own SMM tasks | Own SMM tasks | Social media calendar |
| **SEO Specialist** | Own SEO tasks | Own SEO tasks | Keyword tools, backlink manager |
| **Web Developer** | Own web dev tasks | Own web dev tasks | Code deployment |
| **Graphic Designer** | Own design tasks | Own design tasks | Asset library |
| **QC Person** | All tasks pending QC | Can approve/reject | QC checklists |

## Data Filtering Rules

### Automatic Filtering by Role

```typescript
// Content Writer - Only sees content tasks
WHERE task_type = 'content' AND assigned_to = user.id

// SMM Specialist - Only sees SMM tasks
WHERE task_type = 'smm' AND assigned_to = user.id

// SEO Specialist - Only sees SEO tasks
WHERE task_type = 'seo' AND assigned_to = user.id

// Web Developer - Only sees web dev tasks
WHERE task_type = 'web_dev' AND assigned_to = user.id

// Graphic Designer - Only sees design tasks
WHERE task_type = 'design' AND assigned_to = user.id

// QC Person - Only sees tasks in review status
WHERE status = 'review'

// Team Lead - No filters, sees everything
(No WHERE clause restrictions)
```

## Next Steps

1. **Run the SQL schema** in Supabase SQL Editor
2. **Create demo users** via the signup endpoint or Admin panel
3. **Test authentication** by logging in with different roles
4. **Implement task management** with Supabase queries
5. **Add real-time subscriptions** for live updates
