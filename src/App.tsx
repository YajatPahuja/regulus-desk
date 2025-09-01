import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import BrokerDetails from "./pages/BrokerDetails";
import ClientReports from "./pages/ClientReports";
import FeesCollected from "./pages/FeesCollected";
import SEBIRules from "./pages/SEBIRules";
import Alerts from "./pages/Alerts";
import FileSubmission from "./pages/FileSubmission";
import UserManagement from "./pages/UserManagement";
import Settings from "./pages/Settings";
import DashboardLayout from "./components/layout/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="brokers" element={<BrokerDetails />} />
            <Route path="clients" element={<ClientReports />} />
            <Route path="fees" element={<FeesCollected />} />
            <Route path="sebi-rules" element={<SEBIRules />} />
            <Route path="alerts" element={<Alerts />} />
            <Route path="file-submission" element={<FileSubmission />} />
          </Route>
          
          <Route
            path="/user-management"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<UserManagement />} />
          </Route>
          
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Settings />} />
          </Route>
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
