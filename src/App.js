import './App.css';
import { NavBar } from './components/NavBar';
import { SearchComp } from './components/SearchComp';
import { createContext } from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


export const AppContext = createContext()

function App() {

  const client = new QueryClient({
    defaultOptions: {
        queries : {
          refetchOnWindowFocus: false,
        }
    },
  });

  return (
    <div className="App w-full">
       <QueryClientProvider client={client}>

       <NavBar />
      <SearchComp />

       </QueryClientProvider>
     
    </div>
  );
}

export default App;
