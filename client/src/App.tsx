import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import PageTransition from "./components/page-transition";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Blog from "@/pages/blog";
import BlogDetail from "@/pages/blog-detail";
import Admin from "@/pages/admin";
import AdminCMS from "@/pages/admin-cms";
import AdminLogin from "@/pages/admin-login";
import Domain from "@/pages/domain";
import Hosting from "@/pages/hosting";
import HostingWordPress from "@/pages/hosting-wordpress";
import HostingReseller from "@/pages/hosting-reseller";
import HostingLaravel from "@/pages/hosting-laravel";
import HostingNVME from "@/pages/hosting-nvme";
import Cloud from "@/pages/cloud";
import CloudOdoo from "@/pages/cloud-odoo";
import CloudServer from "@/pages/cloud-server";
import PerformanceBenchmark from "@/pages/performance-benchmark";
// import AdminCMSComplete from "@/pages/admin-cms-complete";
import CMSGuide from "@/pages/cms-guide";
import EmailServices from "@/pages/email-services";
import EmailEnterprise from "@/pages/email-enterprise";
import EmailServerPrivate from "@/pages/email-server-private";
import GoogleWorkspace from "@/pages/google-workspace";
import Microsoft365 from "@/pages/microsoft-365";
import Quote from "@/pages/quote";

function Router() {
  return (
    <PageTransition>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogDetail} />
        <Route path="/admin" component={Admin} />
        <Route path="/admin-login" component={AdminLogin} />
        <Route path="/Admin_CMS" component={AdminCMS} />
        <Route path="/admin-cms-complete" component={AdminCMS} />
        <Route path="/huong-dan-cms" component={CMSGuide} />
        <Route path="/domain" component={Domain} />
        <Route path="/hosting" component={Hosting} />
        <Route path="/Sản Phẩm & Dịch Vụ/Hosting/Hosting WordPress" component={HostingWordPress} />
        <Route path="/Sản Phẩm & Dịch Vụ/Hosting/Hosting Laravel" component={HostingLaravel} />
        <Route path="/Sản Phẩm & Dịch Vụ/Hosting/Hosting NVME" component={HostingNVME} />
        <Route path="/Sản Phẩm & Dịch Vụ/Hosting/Reseller Hosting" component={HostingReseller} />
        <Route path="/Dịch vụ/Email" component={EmailServices} />
        <Route path="/Sản Phẩm & Dịch Vụ/Email" component={EmailEnterprise} />
        <Route path="/Sản Phẩm & Dịch Vụ/Email Server Riêng" component={EmailServerPrivate} />
        <Route path="/Sản Phẩm & Dịch Vụ/Google Workspace" component={GoogleWorkspace} />
        <Route path="/Sản Phẩm & Dịch Vụ/Microsoft 365" component={Microsoft365} />
        <Route path="/cloud" component={Cloud} />
        <Route path="/Cloud/Cloud Odoo" component={CloudOdoo} />
        <Route path="/Cloud/Cloud Server" component={CloudServer} />
        <Route path="/performance-benchmark" component={PerformanceBenchmark} />
        <Route path="/bao-gia" component={Quote} />
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
