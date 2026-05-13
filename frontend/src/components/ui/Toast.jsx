import { Toaster } from "sonner";

const Toast = () => {
    return (
        <Toaster
            position="bottom-right"
            richColors
            visibleToasts={1}
            toastOptions={{
                className: "rounded-2xl font-sans shadow-2xl border-0",
                style: {
                    padding: "16px",
                },
                success: {
                    className:
                        "bg-gradient-to-r from-purple-600 to-indigo-600 text-white",
                    style: {
                        color: "white",
                    },
                },
                error: {
                    className: "bg-red-600 text-white",
                    style: {
                        color: "white",
                    },
                },
            }}
        />
    );
};

export default Toast;
