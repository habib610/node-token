import { Home, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { logout } from "../../auth";
import ThemeToggle from "../ui/ThemeToggle";

const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        } catch (error) {
            console.error(error);
            toast.error(error || "Something went wrong");
        }
    };
    return (
        <nav className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10 w-full transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link
                            to="/dashboard"
                            className="flex items-center gap-2 px-2 py-2 text-indigo-600 dark:text-indigo-400 font-bold text-xl tracking-tight"
                        >
                            <div className="bg-indigo-600 dark:bg-indigo-500 text-white p-1.5 rounded-lg">
                                <Home className="w-5 h-5" />
                            </div>
                            <span>FullStackApp</span>
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link
                            to="/dashboard"
                            className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium text-sm"
                        >
                            Dashboard
                        </Link>
                        <Link
                            to="/profile"
                            className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium text-sm"
                        >
                            <div className="w-8 h-8 bg-gray-50 border-indigo-400 border-2 rounded-full flex items-center justify-center text-xl font-bold text-indigo-600 dark:text-pink-600 dark:bg-gray-200 dark:border-pink-400">
                                P
                            </div>
                        </Link>
                        <div className="pl-4 border-l border-gray-200 dark:border-gray-700 flex items-center space-x-4">
                            <ThemeToggle />
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors font-medium text-sm hover:cursor-pointer"
                            >
                                <LogOut className="w-4 h-4" />
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
