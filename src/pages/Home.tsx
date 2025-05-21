
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Home = () => {
  const { user, isAuthenticated } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-violet-500 bg-clip-text text-transparent">
          Commodity Management System
        </h1>
        
        <p className="text-xl mb-8 text-gray-700 dark:text-gray-300">
          Diversify your product variety and meet customer expectations with our powerful management platform.
        </p>
        
        {isAuthenticated ? (
          <div className="space-y-6">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-2">Welcome back, {user?.name}!</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                You are logged in as a <span className="font-medium capitalize">{user?.role}</span>.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                {user?.role === 'manager' && (
                  <Link to="/dashboard">
                    <Button className="bg-theme-purple hover:bg-theme-purple-dark">
                      Go to Dashboard
                    </Button>
                  </Link>
                )}
                
                <Link to="/products">
                  <Button variant="outline">
                    View Products
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/login">
              <Button className="bg-theme-purple hover:bg-theme-purple-dark px-8 py-6 text-lg">
                Get Started
              </Button>
            </Link>
          </div>
        )}
      </div>
      
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="w-12 h-12 bg-theme-purple-light text-theme-purple rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Role-Based Access</h3>
          <p className="text-gray-600 dark:text-gray-400">Secure access control with different permissions for Managers and Store Keepers.</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="w-12 h-12 bg-theme-purple-light text-theme-purple rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Comprehensive Dashboard</h3>
          <p className="text-gray-600 dark:text-gray-400">Real-time analytics and insights to help managers make data-driven decisions.</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="w-12 h-12 bg-theme-purple-light text-theme-purple rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Product Management</h3>
          <p className="text-gray-600 dark:text-gray-400">Easily add, edit and track all your commodities in one centralized system.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
