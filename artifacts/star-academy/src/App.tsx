import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "./lib/auth";
import NotFound from "@/pages/not-found";

import Home from "./pages/public/Home";
import About from "./pages/public/About";
import Courses from "./pages/public/Courses";
import Facilities from "./pages/public/Facilities";
import Testimonials from "./pages/public/Testimonials";
import Contact from "./pages/public/Contact";

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
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <Switch>
          {/* Public Routes */}
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/courses" component={Courses} />
          <Route path="/facilities" component={Facilities} />
          <Route path="/testimonials" component={Testimonials} />
          <Route path="/contact" component={Contact} />

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
      </motion.div>
    </AnimatePresence>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed left-0 top-0 z-[70] h-1 w-full origin-left"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, hsl(180,76%,22%), hsl(28,75%,52%))",
      }}
    />
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <ScrollProgress />
            <Router />
          </WouterRouter>
          <Toaster />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
