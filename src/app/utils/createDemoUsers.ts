import { createClient } from './supabase/client';

export async function createDemoUsersDirectly() {
  const supabase = createClient();

  const demoUsers = [
    { email: 'lead@beetloop.com', password: 'demo123', fullName: 'Team Lead Demo', role: 'team_lead', department: 'Management' },
    { email: 'content@beetloop.com', password: 'demo123', fullName: 'Content Writer Demo', role: 'content_writer', department: 'Content' },
    { email: 'smm@beetloop.com', password: 'demo123', fullName: 'SMM Specialist Demo', role: 'smm_specialist', department: 'Social Media' },
    { email: 'seo@beetloop.com', password: 'demo123', fullName: 'SEO Specialist Demo', role: 'seo_specialist', department: 'SEO' },
    { email: 'webdev@beetloop.com', password: 'demo123', fullName: 'Web Developer Demo', role: 'web_developer', department: 'Development' },
    { email: 'designer@beetloop.com', password: 'demo123', fullName: 'Graphic Designer Demo', role: 'graphic_designer', department: 'Design' },
    { email: 'qc@beetloop.com', password: 'demo123', fullName: 'QC Person Demo', role: 'qc_person', department: 'Quality Control' },
  ];

  const results = {
    created: 0,
    already_exists: 0,
    errors: 0,
    details: [] as any[],
  };

  for (const user of demoUsers) {
    try {
      // Try to sign up the user
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: user.email,
        password: user.password,
        options: {
          data: {
            full_name: user.fullName,
            role: user.role,
          },
        },
      });

      if (signUpError) {
        if (signUpError.message.includes('already registered')) {
          results.already_exists++;
          results.details.push({ email: user.email, status: 'already_exists' });
        } else {
          console.error(`Error creating user ${user.email}:`, signUpError);
          results.errors++;
          results.details.push({ email: user.email, status: 'error', error: signUpError.message });
        }
        continue;
      }

      if (signUpData.user) {
        // Insert user profile
        const { error: profileError } = await supabase
          .from('user_profiles')
          .insert({
            id: signUpData.user.id,
            email: user.email,
            full_name: user.fullName,
            role: user.role,
            department: user.department,
          });

        if (profileError) {
          console.error(`Error creating profile for ${user.email}:`, profileError);
          results.errors++;
          results.details.push({ email: user.email, status: 'profile_error', error: profileError.message });
        } else {
          results.created++;
          results.details.push({ email: user.email, status: 'created' });
        }
      }
    } catch (error: any) {
      console.error(`Unexpected error for ${user.email}:`, error);
      results.errors++;
      results.details.push({ email: user.email, status: 'error', error: error.message });
    }
  }

  return results;
}
