import { createContext, useContext, useMemo } from "react";
import { useAppwrite } from "./useAppwrite";
import { getCurrentUser } from "./appwrite";

interface User {
  $id: string,
  name: string,
  email: string,
  avatar: string,
}

interface GlobalContext {
  isLoggedin: boolean,
  user: User | null,
  loading: boolean,
  refetch: (newParams: Record<string, string | number>) => Promise<void>
}

const globalContext = createContext<GlobalContext>({
  isLoggedin: false,
  user: null,
  loading: true,
  refetch: async () => { }
})

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, loading, refetch } = useAppwrite({ fn: getCurrentUser });

  const user: User | null = data ? {
    $id: data.$id ?? "",
    name: data.name ?? "",
    email: data.email ?? "",
    avatar: data.avatar ?? "",
  } : null;
  const isLoggedin = !!user;
  // if user is null !null => true, !!null => false
  // if user exists, !user => false, !!user => true, 
  // we are basically converting a value into a boolean

  const contextValue = useMemo(() => ({
    isLoggedin, user, loading, refetch
  }), [isLoggedin, loading, user, refetch])
  return (
    <globalContext.Provider value={{ isLoggedin, loading, user, refetch }}>
      {children}
    </globalContext.Provider>
  )
}

const useGlobalContext = (): GlobalContext => {
  const context = useContext(globalContext);

  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }

  return context;
}

export { GlobalProvider, useGlobalContext }

