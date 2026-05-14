import { ArrowUpRight, Package, Search, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import api from "../api";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const DUMMY_ITEMS = [
    {
        id: 1,
        name: "Premium Headphones",
        price: "$299.99",
        desc: "Wireless over-ear headphones with noise isolation.",
        stock: 45,
        color: "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300",
    },
    {
        id: 2,
        name: "Smart Watch Elite",
        price: "$199.99",
        desc: "Track fitness and stay connected.",
        stock: 12,
        color: "bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300",
    },
    {
        id: 3,
        name: "Mechanical Keyboard",
        price: "$149.99",
        desc: "Tactile switches with customizable RGB.",
        stock: 89,
        color: "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300",
    },
    {
        id: 4,
        name: "Ultra HD Monitor",
        price: "$499.99",
        desc: "27-inch 4K display for creators.",
        stock: 5,
        color: "bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300",
    },
];

export default function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);

    useEffect(() => {
        const getItems = async () => {
            try {
                let res = await api(`/items`);
                if (res.ok) {
                    let data = await res.json();
                    setItems(data);
                }
            } catch (error) {
                toast.error(error || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };
        getItems();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight transition-colors">
                        Dashboard Overview
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium mt-1 transition-colors">
                        Manage your inventory and track analytics.
                    </p>
                </div>
                <div className="relative w-full sm:w-auto">
                    <Input
                        placeholder="Search items..."
                        icon={Search}
                        className="w-full sm:w-64"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    {
                        title: "Total Revenue",
                        value: "$45,231.89",
                        trend: "+20.1%",
                        icon: (
                            <ArrowUpRight className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        ),
                    },
                    {
                        title: "Active Orders",
                        value: "356",
                        trend: "+12.5%",
                        icon: (
                            <Package className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        ),
                    },
                    {
                        title: "Products in Stock",
                        value: "1,204",
                        trend: "-2.4%",
                        icon: (
                            <ShoppingBag className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        ),
                    },
                    {
                        title: "Customer Views",
                        value: "48.2K",
                        trend: "+5.4%",
                        icon: (
                            <ArrowUpRight className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        ),
                    },
                ].map((stat, i) => (
                    <div
                        key={i}
                        className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all duration-200 group"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">
                                    {stat.title}
                                </p>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {stat.value}
                                </h3>
                            </div>
                            <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/30 transition-colors">
                                {stat.icon}
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm font-medium">
                            <span
                                className={
                                    stat.trend.startsWith("+")
                                        ? "text-emerald-600 dark:text-emerald-400"
                                        : "text-red-500 dark:text-red-400"
                                }
                            >
                                {stat.trend}
                            </span>
                            <span className="text-gray-400 dark:text-gray-500 ml-2">
                                from last month
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden transition-colors">
                <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-900/50">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                        Recent Products
                    </h2>
                    <Button variant="secondary" className="py-1.5 px-3 text-sm">
                        View All
                    </Button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                            <tr>
                                <th className="text-left px-6 py-3 text-xs font-semibold tracking-wider text-gray-500 dark:text-gray-400 uppercase">
                                    Product Name
                                </th>
                                <th className="text-left px-6 py-3 text-xs font-semibold tracking-wider text-gray-500 dark:text-gray-400 uppercase">
                                    Description
                                </th>
                                <th className="text-left px-6 py-3 text-xs font-semibold tracking-wider text-gray-500 dark:text-gray-400 uppercase">
                                    Price
                                </th>
                                <th className="text-left px-6 py-3 text-xs font-semibold tracking-wider text-gray-500 dark:text-gray-400 uppercase">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {loading ? (
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="px-6 py-8 text-center text-gray-400 font-medium"
                                    >
                                        Loading products...
                                    </td>
                                </tr>
                            ) : (
                                items?.map((item) => (
                                    <tr
                                        key={item._id}
                                        className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${item.color}`}
                                                >
                                                    <img
                                                        src={item.imageUrl}
                                                        alt="item"
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <span className="font-semibold text-gray-900 dark:text-white">
                                                    {item.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                            {item.description}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-gray-100">
                                            {item.price}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-bold ${item.stock > 10 ? "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400" : "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-400"}`}
                                            >
                                                {item.stock} in stock
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
