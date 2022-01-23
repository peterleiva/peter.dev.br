import { QueryClient, QueryClientProvider } from 'react-query';

const client = new QueryClient();

type QueryClientProviderProps = {
  children: React.ReactNode | undefined;
};

export default function QueryProvider({ children }: QueryClientProviderProps) {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
