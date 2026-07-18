import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { useAuth } from './AuthProvider';
import { Loader2, AlertTriangle, Users, CheckCircle } from 'lucide-react';
import SetupHelper from './SetupHelper';
import { toast } from 'sonner';
import { createDemoUsersDirectly } from '../utils/createDemoUsers';

export default function LoginPage() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSetup, setShowSetup] = useState(false);
  const [creatingUsers, setCreatingUsers] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await signIn(email, password);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    }
  };

  const handleCreateDemoUsers = async () => {
    setCreatingUsers(true);
    setError('');

    try {
      const results = await createDemoUsersDirectly();

      if (results.created > 0) {
        toast.success(`✅ Created ${results.created} demo user(s)! You can now login.`);
        setEmail('lead@beetloop.com');
        setPassword('demo123');
      } else if (results.already_exists > 0) {
        toast.success(`✅ ${results.already_exists} demo user(s) already exist! Try logging in.`);
        setEmail('lead@beetloop.com');
        setPassword('demo123');
      } else if (results.errors > 0) {
        toast.error(`⚠️ Some users couldn't be created. Check if the database table exists.`);
        setError('Database table may not exist. Click "Run setup diagnostic" to check.');
      }

      console.log('Demo users creation results:', results);
    } catch (error: any) {
      console.error('Create demo users error:', error);
      toast.error('Failed to create demo users. Make sure the database table is created first.');
      setError('Database table may not exist. Click "Setup Help" to check and create it.');
    } finally {
      setCreatingUsers(false);
    }
  };

  if (showSetup) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
        <div className="mb-4">
          <Button
            variant="outline"
            onClick={() => setShowSetup(false)}
            style={{ borderRadius: '12px' }}
          >
            ← Back to Login
          </Button>
        </div>
        <SetupHelper />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md" style={{ borderRadius: '12px' }}>
        <CardHeader className="text-center">
          <div className="mb-4">
            <div className="w-16 h-16 rounded-xl bg-[#7A1C46] flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">🐝</span>
            </div>
            <CardTitle className="text-[#7A1C46]">Beetloop Marketing</CardTitle>
            <CardDescription>Sign in to your account</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>
                  {error}
                  {error.includes('Invalid') && (
                    <div className="mt-3 space-y-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleCreateDemoUsers}
                        disabled={creatingUsers}
                        className="w-full"
                      >
                        {creatingUsers ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Creating demo users...
                          </>
                        ) : (
                          <>
                            <Users className="w-4 h-4 mr-2" />
                            Create Demo Users Automatically
                          </>
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setShowSetup(true)}
                        className="w-full"
                      >
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        Run Setup Diagnostic
                      </Button>
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                style={{ borderRadius: '12px' }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                style={{ borderRadius: '12px' }}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
              style={{ 
                backgroundColor: '#7A1C46', 
                borderRadius: '12px',
              }}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleCreateDemoUsers}
                disabled={creatingUsers || loading}
                className="flex-1"
                style={{ borderRadius: '12px' }}
              >
                {creatingUsers ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Users className="w-4 h-4 mr-2" />
                    Create Demo Users
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowSetup(true)}
                className="flex-1"
                style={{ borderRadius: '12px' }}
              >
                Setup Help
              </Button>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg" style={{ borderRadius: '12px' }}>
              <p className="text-sm text-gray-700 mb-2"><strong>Demo Credentials:</strong></p>
              <div className="space-y-1 text-sm">
                <p className="text-gray-600">Team Lead: <span className="font-mono">lead@beetloop.com</span> / <span className="font-mono">demo123</span></p>
                <p className="text-gray-600">Content: <span className="font-mono">content@beetloop.com</span> / <span className="font-mono">demo123</span></p>
                <p className="text-gray-600">SMM: <span className="font-mono">smm@beetloop.com</span> / <span className="font-mono">demo123</span></p>
                <p className="text-gray-600">SEO: <span className="font-mono">seo@beetloop.com</span> / <span className="font-mono">demo123</span></p>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}