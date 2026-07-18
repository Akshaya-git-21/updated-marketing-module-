import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { CheckCircle, XCircle, AlertTriangle, Database, Users, Shield } from 'lucide-react';
import { createClient } from '../utils/supabase/client';
import { projectId, publicAnonKey } from '../utils/supabase/info';

export default function SetupHelper() {
  const [checking, setChecking] = useState(false);
  const [results, setResults] = useState<any>(null);

  const checkSetup = async () => {
    setChecking(true);
    const checks: any = {
      supabaseConnection: false,
      serverHealth: false,
      authWorking: false,
      errors: [],
    };

    try {
      const supabase = createClient();

      // Check 1: Can we connect to Supabase?
      try {
        const { data, error } = await supabase.auth.getSession();
        checks.supabaseConnection = true;
        if (data.session) {
          checks.authWorking = true;
        }
      } catch (err: any) {
        checks.errors.push(`Connection error: ${err.message}`);
      }

      // Check 2: Is the server healthy?
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-2c80ebd0/health`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`,
            },
          }
        );
        if (response.ok) {
          checks.serverHealth = true;
        } else {
          checks.errors.push('Server health check failed');
        }
      } catch (err: any) {
        checks.errors.push(`Server error: ${err.message}`);
      }

      setResults(checks);
    } catch (err: any) {
      checks.errors.push(`Unexpected error: ${err.message}`);
      setResults(checks);
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card style={{ borderRadius: '12px' }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-[#7A1C46]" />
            Setup Diagnostic Tool
          </CardTitle>
          <CardDescription>
            Check if your Beetloop Marketing Module is properly configured
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={checkSetup}
            disabled={checking}
            className="w-full"
            style={{ backgroundColor: '#7A1C46', borderRadius: '12px' }}
          >
            {checking ? 'Checking...' : 'Run Diagnostic Check'}
          </Button>

          {results && (
            <div className="space-y-3 mt-6">
              {/* Supabase Connection */}
              <Alert className={results.supabaseConnection ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}>
                {results.supabaseConnection ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-600" />
                )}
                <AlertDescription className={results.supabaseConnection ? 'text-green-800' : 'text-red-800'}>
                  <strong>Supabase Connection:</strong>{' '}
                  {results.supabaseConnection ? '✅ Connected' : '❌ Failed'}
                </AlertDescription>
              </Alert>

              {/* Server Health */}
              <Alert className={results.serverHealth ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}>
                {results.serverHealth ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-yellow-600" />
                )}
                <AlertDescription className={results.serverHealth ? 'text-green-800' : 'text-yellow-800'}>
                  <strong>Server Health:</strong>{' '}
                  {results.serverHealth ? '✅ Server is healthy' : '⚠️ Server health check failed'}
                </AlertDescription>
              </Alert>

              {/* Auth Working */}
              <Alert className={results.authWorking ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}>
                {results.authWorking ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-yellow-600" />
                )}
                <AlertDescription className={results.authWorking ? 'text-green-800' : 'text-yellow-800'}>
                  <strong>Auth Working:</strong>{' '}
                  {results.authWorking ? '✅ Authentication is working' : '⚠️ Authentication is not working'}
                </AlertDescription>
              </Alert>

              {/* Errors */}
              {results.errors.length > 0 && (
                <Alert className="bg-red-50 border-red-200">
                  <XCircle className="w-4 h-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    <strong>Issues Found:</strong>
                    <ul className="list-disc list-inside mt-2">
                      {results.errors.map((error: string, i: number) => (
                        <li key={i}>{error}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Setup Instructions */}
      <Card style={{ borderRadius: '12px' }}>
        <CardHeader>
          <CardTitle>Quick Setup Guide</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#7A1C46] text-white flex items-center justify-center">
                1
              </div>
              <div>
                <h4>Create Database Table</h4>
                <p className="text-sm text-gray-600">
                  Go to Supabase Dashboard → SQL Editor and run the CREATE TABLE script
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => window.open(`https://supabase.com/dashboard/project/${projectId}/sql/new`, '_blank')}
                  style={{ borderRadius: '12px' }}
                >
                  <Database className="w-4 h-4 mr-2" />
                  Open SQL Editor
                </Button>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#7A1C46] text-white flex items-center justify-center">
                2
              </div>
              <div>
                <h4>Disable Email Confirmation</h4>
                <p className="text-sm text-gray-600">
                  Turn off "Confirm email" in Auth settings so demo users work instantly
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => window.open(`https://supabase.com/dashboard/project/${projectId}/auth/providers`, '_blank')}
                  style={{ borderRadius: '12px' }}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Open Auth Settings
                </Button>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#7A1C46] text-white flex items-center justify-center">
                3
              </div>
              <div>
                <h4>Create Demo Users</h4>
                <p className="text-sm text-gray-600">
                  Click the "Create Demo Users" button on the login page
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#7A1C46] text-white flex items-center justify-center">
                4
              </div>
              <div>
                <h4>Test Login</h4>
                <p className="text-sm text-gray-600">
                  Try logging in with: lead@beetloop.com / demo123
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SQL Script Reference */}
      <Card style={{ borderRadius: '12px' }}>
        <CardHeader>
          <CardTitle>SQL Script (Copy & Paste)</CardTitle>
          <CardDescription>Run this in Supabase SQL Editor</CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`CREATE TABLE user_profiles (
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

CREATE POLICY "Users can read own profile" 
  ON user_profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
  ON user_profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Service role can manage all profiles" 
  ON user_profiles FOR ALL USING (auth.role() = 'service_role');`}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}