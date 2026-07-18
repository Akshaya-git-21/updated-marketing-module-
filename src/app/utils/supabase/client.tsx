import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './info';

const supabaseUrl = `https://${projectId}.supabase.co`;

// Singleton Supabase client
let supabase: ReturnType<typeof createSupabaseClient> | null = null;

export function createClient() {
  if (!supabase) {
    supabase = createSupabaseClient(supabaseUrl, publicAnonKey);
  }
  return supabase;
}

export type UserRole = 
  | 'team_lead'
  | 'content_writer'
  | 'smm_specialist'
  | 'seo_specialist'
  | 'web_developer'
  | 'graphic_designer'
  | 'qc_person';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  department: string;
  avatar_url?: string;
  created_at: string;
}

export const ROLE_CONFIG = {
  team_lead: {
    label: 'Team Lead',
    color: '#7A1C46',
    permissions: ['view_all', 'edit_all', 'assign_tasks', 'manage_users'],
    dashboard: '/dashboard/team-lead',
  },
  content_writer: {
    label: 'Content Writer',
    color: '#2563eb',
    permissions: ['view_assigned_tasks', 'edit_own_tasks'],
    dashboard: '/dashboard/content-writer',
  },
  smm_specialist: {
    label: 'SMM Specialist',
    color: '#16a34a',
    permissions: ['view_assigned_tasks', 'edit_own_tasks'],
    dashboard: '/dashboard/smm',
  },
  seo_specialist: {
    label: 'SEO Specialist',
    color: '#ea580c',
    permissions: ['view_assigned_tasks', 'edit_own_tasks'],
    dashboard: '/dashboard/seo',
  },
  web_developer: {
    label: 'Web Developer',
    color: '#7c3aed',
    permissions: ['view_assigned_tasks', 'edit_own_tasks'],
    dashboard: '/dashboard/web-dev',
  },
  graphic_designer: {
    label: 'Graphic Designer',
    color: '#db2777',
    permissions: ['view_assigned_tasks', 'edit_own_tasks'],
    dashboard: '/dashboard/designer',
  },
  qc_person: {
    label: 'QC Person',
    color: '#0891b2',
    permissions: ['view_qc_tasks', 'edit_qc_tasks'],
    dashboard: '/dashboard/qc',
  },
};
