import { Toaster } from 'sonner';

const CustomToaster = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: 'flex items-center gap-3 w-full max-w-sm p-4 rounded-2xl shadow-2xl transition-all duration-300',
          success: 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white',
          error: 'bg-red-500 text-white',
          title: 'font-bold text-base',
          description: 'text-sm opacity-90',
        },
      }}
    />
  );
};

export default CustomToaster;
