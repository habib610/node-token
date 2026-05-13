import { Home, LogOut } from 'lucide-react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import ThemeToggle from './components/ui/ThemeToggle';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col font-sans transition-colors duration-300">
      <nav className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10 w-full transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/dashboard" className="flex items-center gap-2 px-2 py-2 text-indigo-600 dark:text-indigo-400 font-bold text-xl tracking-tight">
                <div className="bg-indigo-600 dark:bg-indigo-500 text-white p-1.5 rounded-lg">
                  <Home className="w-5 h-5"/>
                </div>
                <span>FullStackApp</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium text-sm">Dashboard</Link>
              <Link to="/profile" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium text-sm">Profile</Link>
              <div className="pl-4 border-l border-gray-200 dark:border-gray-700 flex items-center space-x-4">
                <ThemeToggle />
                <Link to="/login" className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors font-medium text-sm">
                  <LogOut className="w-4 h-4"/>
                  <span className="hidden sm:inline">Logout</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/profile" element={<Layout><Profile /></Layout>} />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
