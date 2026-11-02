import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRoutes from "./AppRoute";

function App() {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                retry: 1,
            },
        },
    });
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <AppRoutes />
            </QueryClientProvider>
        </>
    );
}

export default App;
