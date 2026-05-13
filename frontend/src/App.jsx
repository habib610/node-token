import { BrowserRouter, Route, Routes } from "react-router-dom";
import CustomToaster from "./components/ui/Toast";
import Navbar from "./components/navigation/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

function Layout({ children }) {
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
            <CustomToaster />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
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
                <Route path="*" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
