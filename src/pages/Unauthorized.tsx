
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="text-center max-w-md">
        <h1 className="text-5xl font-bold text-red-500 mb-6">403</h1>
        <h2 className="text-2xl font-semibold mb-2">Access Denied</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          {user ? (
            <>
              Sorry, but your role as a <span className="font-medium capitalize">{user.role}</span> doesn't have permission to access this page.
            </>
          ) : (
            'You do not have permission to access this page.'
          )}
        </p>
        
        <Link to="/">
          <Button className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Go Back Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
