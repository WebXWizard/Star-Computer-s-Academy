import { useState } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, User } from 'lucide-react';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [, setLocation] = useLocation();
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && login(password)) {
      setLocation('/admin/dashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 w-full h-1/2 bg-primary/10 rounded-b-[100%] scale-150 transform -translate-y-1/2" />
      
      <Card className="w-full max-w-md relative z-10 shadow-2xl border-0">
        <CardHeader className="text-center pb-8 pt-10">
          <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg rotate-3">
            <Lock size={32} />
          </div>
          <CardTitle className="text-2xl font-display">Admin Portal</CardTitle>
          <CardDescription>Sign in to manage Star Academy</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg text-center">
                {error}
              </div>
            )}
            
            <div className="space-y-1 relative">
              <User className="absolute left-3 top-3.5 text-slate-400" size={18} />
              <Input 
                placeholder="Username" 
                className="pl-10 h-12 bg-slate-50"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            
            <div className="space-y-1 relative">
              <Lock className="absolute left-3 top-3.5 text-slate-400" size={18} />
              <Input 
                type="password" 
                placeholder="Password" 
                className="pl-10 h-12 bg-slate-50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <Button type="submit" className="w-full h-12 text-base mt-2 shadow-md">
              Sign In
            </Button>
            <p className="text-xs text-center text-slate-400 mt-4">Hint: admin / admin123</p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
