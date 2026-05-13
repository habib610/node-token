import { ArrowRight, Lock, Mail, Zap } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

export default function Login() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if(email && pass) navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-gray-900 dark:to-indigo-950 flex items-center justify-center p-4 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl border border-transparent dark:border-gray-800">
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <div className="bg-indigo-600 dark:bg-indigo-500 p-3 rounded-full text-white">
              <Zap className="w-8 h-8" />
            </div>
          </div>
          <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-2">Welcome Back</h2>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-8 font-medium">Sign in to your account</p>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <Input 
              label="Email Address"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              icon={Mail}
              required
            />
            
            <Input 
              label={
                <div className="flex justify-between w-full">
                  <span>Password</span>
                  <a href="#" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-colors">Forgot?</a>
                </div>
              }
              type="password"
              id="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="••••••••"
              icon={Lock}
              required
            />
            
            <Button type="submit" variant="primary" className="w-full mt-2">
              Sign In
              <ArrowRight className="w-5 h-5 ml-1" />
            </Button>
          </form>
          
          <div className="mt-8 text-center text-sm font-medium text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 font-bold ml-1 transition-colors">
              Create one now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
