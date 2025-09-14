import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  User, 
  RefreshCw,
  Building2,
  Star
} from "lucide-react";

interface UserInfo {
  name: string;
  company: string;
  role: string;
  interests: string[];
}

interface PersonalizationSettingsProps {
  userInfo: UserInfo;
  onReset: () => void;
}

const roleLabels = {
  "ceo": "CEO/Founder",
  "cto": "CTO/Tech Lead", 
  "it-manager": "IT Manager",
  "developer": "Developer",
  "sysadmin": "System Admin",
  "business-owner": "Business Owner",
  "other": "Other"
};

const interestLabels = {
  "cloud": "Cloud Services",
  "hosting": "Web Hosting",
  "servers": "Dedicated Servers",
  "email": "Email Solutions",
  "software": "Software Licensing",
  "consulting": "IT Consulting",
  "security": "Security Solutions",
  "domain": "Domain Management"
};

export default function PersonalizationSettings({ userInfo, onReset }: PersonalizationSettingsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-24 right-4 z-40"
    >
      <Card className="shadow-lg border-[hsl(207,100%,40%)]">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Settings className="text-[hsl(207,100%,40%)]" size={16} />
              <span className="font-medium text-sm">Cá nhân hóa</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-6 w-6 p-0"
            >
              {isExpanded ? "−" : "+"}
            </Button>
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4"
              >
                <div className="border-t pt-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <User size={14} className="text-gray-500" />
                    <span className="text-sm font-medium">{userInfo.name}</span>
                  </div>
                  
                  {userInfo.company && (
                    <div className="flex items-center space-x-2 mb-2">
                      <Building2 size={14} className="text-gray-500" />
                      <span className="text-sm text-gray-600">{userInfo.company}</span>
                    </div>
                  )}

                  <div className="mb-3">
                    <Badge variant="outline" className="text-xs">
                      {roleLabels[userInfo.role as keyof typeof roleLabels] || userInfo.role}
                    </Badge>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center space-x-1 mb-2">
                      <Star size={12} className="text-yellow-500" />
                      <span className="text-xs text-gray-500">Quan tâm:</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {userInfo.interests.slice(0, 3).map(interest => (
                        <Badge 
                          key={interest} 
                          className="text-xs bg-blue-100 text-blue-800"
                        >
                          {interestLabels[interest as keyof typeof interestLabels] || interest}
                        </Badge>
                      ))}
                      {userInfo.interests.length > 3 && (
                        <Badge className="text-xs bg-gray-100 text-gray-600">
                          +{userInfo.interests.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onReset}
                      className="w-full text-xs text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <RefreshCw size={12} className="mr-1" />
                      Đặt lại
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}