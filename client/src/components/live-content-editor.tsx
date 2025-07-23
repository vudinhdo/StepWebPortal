import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Edit3, EyeOff, Save, Plus, Image, Type, Layout } from "lucide-react";
import { EditableContent } from "@/components/editable-content";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";

interface LiveContentEditorProps {
  pageName: string;
  children: React.ReactNode;
}

export function LiveContentEditor({ pageName, children }: LiveContentEditorProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const { toast } = useToast();

  // Check if user is authenticated for CMS
  const { data: authStatus } = useQuery({
    queryKey: ["/api/auth/status"],
    retry: false,
  });

  const isAuthenticated = authStatus?.authenticated;

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    if (!isEditMode) {
      toast({
        title: "Chế độ chỉnh sửa",
        description: "Click vào các phần tử để chỉnh sửa nội dung",
      });
    }
  };

  if (!isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      {/* Edit Mode Toggle */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={toggleEditMode}
          variant={isEditMode ? "destructive" : "default"}
          className="h-12 w-12 rounded-full shadow-lg"
          title={isEditMode ? "Thoát chế độ chỉnh sửa" : "Chỉnh sửa nội dung"}
        >
          {isEditMode ? (
            <EyeOff className="w-6 h-6" />
          ) : (
            <Edit3 className="w-6 h-6" />
          )}
        </Button>
      </div>

      {/* Edit Mode Indicator */}
      {isEditMode && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <Card className="bg-blue-600 text-white">
            <CardContent className="px-4 py-2">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4" />
                <span className="font-medium">Chế độ chỉnh sửa - {pageName}</span>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={toggleEditMode}
                  className="h-6 px-2"
                >
                  Thoát
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Floating Toolbar */}
      {isEditMode && (
        <div className="fixed top-20 right-4 z-50">
          <Card>
            <CardContent className="p-2">
              <div className="flex flex-col gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.open('/Admin_CMS', '_blank')}
                  title="Mở CMS để quản lý nội dung chi tiết"
                >
                  <Layout className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    toast({
                      title: "Hướng dẫn",
                      description: "Click vào các phần tử màu xanh để chỉnh sửa",
                    });
                  }}
                  title="Hướng dẫn sử dụng"
                >
                  <Type className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Content with edit capabilities */}
      <div className={isEditMode ? "live-edit-mode" : ""}>
        {children}
      </div>

      {/* Edit Mode Styles */}
      {isEditMode && (
        <style>{`
          .live-edit-mode .editable-section {
            position: relative;
            border: 2px dashed transparent;
            transition: all 0.2s ease;
          }
          .live-edit-mode .editable-section:hover {
            border-color: #3b82f6;
            background-color: rgba(59, 130, 246, 0.05);
          }
          .live-edit-mode .editable-element {
            position: relative;
            cursor: pointer;
            transition: all 0.2s ease;
          }
          .live-edit-mode .editable-element:hover {
            outline: 2px dashed #3b82f6;
            outline-offset: 2px;
            background-color: rgba(59, 130, 246, 0.1);
          }
        `}</style>
      )}
    </div>
  );
}

// Hook để tạo editable content
export function useEditableContent(pageName: string) {
  const [contents, setContents] = useState<Record<string, any>>({});

  const updateContent = (id: string, content: string, metadata?: Record<string, any>) => {
    setContents(prev => ({
      ...prev,
      [id]: { content, metadata }
    }));
  };

  const getContent = (id: string, defaultContent: string = "") => {
    return contents[id]?.content || defaultContent;
  };

  const getMetadata = (id: string) => {
    return contents[id]?.metadata || {};
  };

  return {
    updateContent,
    getContent,
    getMetadata,
    contents
  };
}