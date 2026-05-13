
export default function Input({ label, icon: Icon, id, className = '', error, ...props }) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
            <Icon className="h-5 w-5" />
          </div>
        )}
        <input 
          id={id}
          className={`
            w-full px-4 py-3 rounded-xl outline-none transition-all duration-200
            bg-gray-50/50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 
            text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500
            focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-400
            ${Icon ? 'pl-10' : 'pl-4'}
            ${error ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' : ''}
          `}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
