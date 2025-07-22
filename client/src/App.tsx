import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import PageTransition from "./components/page-transition";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Blog from "@/pages/blog";
import Admin from "@/pages/admin";
import Domain from "@/pages/domain";
import Hosting from "@/pages/hosting";
import HostingWordPress from "@/pages/hosting-wordpress";
import HostingLaravel from "@/pages/hosting-laravel";
import HostingNVME from "@/pages/hosting-nvme";
import Cloud from "@/pages/cloud";

function Router() {
  return (
    <PageTransition>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/blog" component={Blog} />
        <Route path="/admin" component={Admin} />
        <Route path="/domain" component={Domain} />
        <Route path="/hosting" component={Hosting} />
        <Route path="/Sản Phẩm & Dịch Vụ/Hosting/Hosting WordPress" component={HostingWordPress} />
        <Route path="/Sản Phẩm & Dịch Vụ/Hosting/Hosting Laravel" component={HostingLaravel} />
        <Route path="/Sản Phẩm & Dịch Vụ/Hosting/Hosting NVME" component={HostingNVME} />
        <Route path="/cloud" component={Cloud} />
        <Route component={NotFound} />
      </Switch>
    </PageTransition>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
