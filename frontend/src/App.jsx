import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/navigation/Navbar";
import ProtectedRoute from "./components/routes/ProtectedRout";
import Toast from "./components/ui/Toast";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

function Layout({ children }) {
    const navigate = useNavigate();

    useEffect(() => {
        const handleAuthFailure = () => {
            navigate("/login"); // Clean React Router navigation
        };

        window.addEventListener("auth-failure", handleAuthFailure);
        return () =>
            window.removeEventListener("auth-failure", handleAuthFailure);
    }, [navigate]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col font-sans transition-colors duration-300">
            <Navbar />
            <main className="grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Toast />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route element={<ProtectedRoute />}>
                    <Route
                        path="/dashboard"
                        element={
                            <Layout>
                                <Dashboard />
                            </Layout>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <Layout>
                                <Profile />
                            </Layout>
                        }
                    />
                </Route>

                <Route path="*" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
