
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";

// Layouts
import MainLayout from "./components/layout/MainLayout";

// Guards
import AuthGuard from "./components/guards/AuthGuard";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import Settings from "./pages/Settings";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";
import Footer from "./components/layout/Footer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider>
            <Toaster />
            <Sonner />
            
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              
              {/* Protected Routes */}
              <Route element={<AuthGuard />}>
                <Route path="/" element={
                  <div className="flex flex-col max-h-screen">
                    <Home />
                    <Footer />
                  </div>
                } />
                
                <Route element={<MainLayout />}>
                  {/* Manager Only Routes */}
                  <Route path="/dashboard" element={
                    <AuthGuard requiredRole="manager">
                      <Dashboard />
                    </AuthGuard>
                  } />
                  
                  {/* Shared Routes for Both Roles */}
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/add" element={<AddProduct />} />
                  <Route path="/settings" element={<Settings />} />
                </Route>
              </Route>
              
              {/* Catch-all route */}
              <Route path="*" element={
                <div className="flex flex-col min-h-screen">
                  <NotFound />
                  <Footer />
                </div>
              } />
            </Routes>
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
