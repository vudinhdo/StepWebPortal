import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Shield, Lock } from "lucide-react";

interface LoginResponse {
  success: boolean;
  user?: { id: number; username: string; role: string };
  message?: string;
}

export default function CMSLogin({ onLoginSuccess }: { onLoginSuccess: () => void }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: async (credentials: { username: string; password: string }) => {
      return await apiRequest("POST", "/api/auth/login", credentials) as LoginResponse;
    },
    onSuccess: (data) => {
      console.log("Login response:", data);
      if (data.success && data.user) {
        toast({
          title: "Đăng nhập thành công!",
          description: `Chào mừng ${data.user.username}`,
        });
        // Store login state
        localStorage.setItem("cms_authenticated", "true");
        console.log("Stored auth state, calling onLoginSuccess");
        queryClient.invalidateQueries();
        onLoginSuccess();
      } else {
        console.log("Login failed:", data);
      }
    },
    onError: (error: any) => {
      toast({
        title: "Đăng nhập thất bại",
        description: error.message || "Tên đăng nhập hoặc mật khẩu không đúng",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.username.trim() || !formData.password.trim()) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin",
        variant: "destructive",
      });
      return;
    }
    loginMutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4">
          <div className="flex justify-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="text-center space-y-2">
            <CardTitle className="text-2xl">STEP CMS Admin</CardTitle>
            <CardDescription>
              Đăng nhập để quản lý nội dung website
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Tên đăng nhập</Label>
              <Input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                placeholder="Nhập tên đăng nhập"
                required
                disabled={loginMutation.isPending}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Nhập mật khẩu"
                required
                disabled={loginMutation.isPending}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={loginMutation.isPending}
            >
              <Lock className="w-4 h-4 mr-2" />
              {loginMutation.isPending ? "Đang đăng nhập..." : "Đăng nhập"}
            </Button>
          </form>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Thông tin đăng nhập mặc định:</h3>
            <p className="text-xs text-gray-600">
              <strong>Username:</strong> admin<br />
              <strong>Password:</strong> admin123
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}