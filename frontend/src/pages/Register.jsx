import { Activity, ArrowRight, Lock, Mail, User } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if(username && email && pass) navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-50 to-indigo-100 dark:from-gray-950 dark:to-purple-950 flex items-center justify-center p-4 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-[1.01] border border-transparent dark:border-gray-800">
        <div className="px-8 py-10">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 rounded-2xl text-white shadow-lg shadow-indigo-500/30">
              <Activity className="w-8 h-8" />
            </div>
          </div>
          <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-2">Create Account</h2>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-8 font-medium">Join us and start your journey</p>
          
          <form onSubmit={handleRegister} className="space-y-5">
            <Input 
              label="Username"
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="johndoe"
              icon={User}
              required
            />

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
              label="Password"
              type="password"
              id="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="••••••••"
              icon={Lock}
              required
            />
            
            <Button type="submit" variant="gradient" className="w-full mt-2">
              Get Started
              <ArrowRight className="w-5 h-5 ml-1" />
            </Button>
          </form>
          
          <div className="mt-8 text-center text-sm font-medium text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-purple-600 dark:text-purple-400 hover:text-purple-500 font-bold ml-1 transition-colors">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
