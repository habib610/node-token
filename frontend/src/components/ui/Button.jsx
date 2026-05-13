
export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const baseStyles = "font-bold py-3 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transform transition-all duration-200 active:translate-y-0 focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/30 focus:ring-indigo-500/20 hover:-translate-y-0.5",
    secondary: "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm focus:ring-gray-200",
    gradient: "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-indigo-500/30 hover:-translate-y-0.5",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
