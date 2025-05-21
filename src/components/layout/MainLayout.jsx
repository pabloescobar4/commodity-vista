
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";
import Footer from "./Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

const MainLayout = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>

    <div className="flex h-full w-full bg-background">
      <Sidebar isOpen={sidebarOpen} userRole={user?.role} />
      <div className="flex-1 flex flex-col">
        <TopNav onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
         
        </main>
      
      </div>
      <div>
        

      </div>
     
    </div>
    <Footer className="mt-10"/>
    </>
  );
};

export default MainLayout;
