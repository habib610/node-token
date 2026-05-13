import { Camera, Edit2, Key, Mail, MapPin, Phone, Shield } from 'lucide-react';
import Button from '../components/ui/Button';

export default function Profile() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight transition-colors">Your Profile</h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium mt-1 transition-colors">Manage your personal information and preferences.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden text-center p-8 relative transition-colors">
            <button className="absolute top-4 right-4 p-2 text-gray-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors bg-gray-50 dark:bg-gray-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 rounded-full">
              <Edit2 className="w-4 h-4" />
            </button>
            <div className="relative inline-block mb-4">
              <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-900 shadow-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-4xl font-bold transition-all">
                JD
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-indigo-600 dark:bg-indigo-500 text-white rounded-full shadow-lg border-2 border-white dark:border-gray-900 hover:bg-indigo-700 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">John Doe</h2>
            <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-6">@johndoe</p>
            
            <div className="flex justify-center gap-2">
              <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-bold flex items-center gap-1">
                <Shield className="w-3 h-3" /> Pro Member
              </span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden transition-colors">
            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 flex justify-between items-center transition-colors">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Personal Information</h3>
              <button className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-colors">Edit Details</button>
            </div>
            <div className="p-6">
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
                <div>
                  <dt className="text-sm font-semibold text-gray-500 dark:text-gray-400 flex items-center gap-2 mb-1">
                    <Mail className="w-4 h-4" /> Email Address
                  </dt>
                  <dd className="text-gray-900 dark:text-gray-100 font-medium">john.doe@example.com</dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-gray-500 dark:text-gray-400 flex items-center gap-2 mb-1">
                    <Phone className="w-4 h-4" /> Phone Number
                  </dt>
                  <dd className="text-gray-900 dark:text-gray-100 font-medium">+1 (555) 123-4567</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-semibold text-gray-500 dark:text-gray-400 flex items-center gap-2 mb-1">
                    <MapPin className="w-4 h-4" /> Location
                  </dt>
                  <dd className="text-gray-900 dark:text-gray-100 font-medium">San Francisco, California, USA</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden transition-colors">
            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 transition-colors">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Security</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-lg transition-colors">
                    <Key className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Password</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Last changed 3 months ago</p>
                  </div>
                </div>
                <Button variant="secondary" className="py-2 px-4 text-sm font-semibold">Update</Button>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-lg transition-colors">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Two-Factor Authentication</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Secure your account further</p>
                  </div>
                </div>
                <Button variant="primary" className="py-2 px-4 text-sm font-semibold shadow-none">Enable</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
