import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "./lib/auth";
import NotFound from "@/pages/not-found";

import Home from "./pages/public/Home";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminEnrollments from "./pages/admin/Enrollments";
import AdminCourses from "./pages/admin/Courses";
import AdminContacts from "./pages/admin/Contacts";
import AdminTestimonials from "./pages/admin/Testimonials";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  if (!isAuthenticated) {
    setLocation('/admin');
    return null;
  }

  return <Component />;
}

function Router() {
  return (
    <Switch>
      {/* Public Route */}
      <Route path="/" component={Home} />
      
      {/* Admin Routes */}
      <Route path="/admin" component={AdminLogin} />
      <Route path="/admin/dashboard">
        {() => <ProtectedRoute component={AdminDashboard} />}
      </Route>
      <Route path="/admin/enrollments">
        {() => <ProtectedRoute component={AdminEnrollments} />}
      </Route>
      <Route path="/admin/courses">
        {() => <ProtectedRoute component={AdminCourses} />}
      </Route>
      <Route path="/admin/contacts">
        {() => <ProtectedRoute component={AdminContacts} />}
      </Route>
      <Route path="/admin/testimonials">
        {() => <ProtectedRoute component={AdminTestimonials} />}
      </Route>

      {/* 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
