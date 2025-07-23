import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Edit3, Save, X, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface InlineEditorProps {
  page: string;
  section: string;
  elementId: string;
  defaultContent: string;
  contentType?: "text" | "html" | "json";
  className?: string;
  tag?: keyof JSX.IntrinsicElements;
}

export function InlineEditor({
  page,
  section,
  elementId,
  defaultContent,
  contentType = "text",
  className = "",
  tag: Tag = "div"
}: InlineEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(defaultContent);
  const [tempContent, setTempContent] = useState(defaultContent);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Check if user is authenticated for CMS
  const { data: authStatus } = useQuery({
    queryKey: ["/api/auth/status"],
    retry: false,
  });

  const isAuthenticated = authStatus?.authenticated || false;

  // Fetch content from server
  const { data: serverContent } = useQuery({
    queryKey: ["/api/page-contents", page, section, elementId],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/page-contents?page=${page}`);
        if (!response.ok) return null;
        const data = await response.json();
        return data.find((item: any) => 
          item.pageName === page && 
          item.section === section && 
          item.elementId === elementId
        );
      } catch (error) {
        return null;
      }
    },
    enabled: isAuthenticated,
  });

  useEffect(() => {
    if (serverContent?.content) {
      setContent(serverContent.content);
    }
  }, [serverContent]);

  const saveMutation = useMutation({
    mutationFn: async (newContent: string) => {
      if (serverContent?.id) {
        // Update existing content
        return apiRequest(`/api/page-contents/${serverContent.id}`, "PATCH", {
          content: newContent
        });
      } else {
        // Create new content
        return apiRequest("/api/page-contents", "POST", {
          pageName: page,
          section,
          elementId,
          content: newContent,
          contentType
        });
      }
    },
    onSuccess: () => {
      setContent(tempContent);
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: ["/api/page-contents"] });
      toast({
        title: "Thành công",
        description: "Nội dung đã được lưu",
      });
    },
    onError: () => {
      toast({
        title: "Lỗi",
        description: "Không thể lưu nội dung",
        variant: "destructive",
      });
    },
  });

  const handleEdit = () => {
    setTempContent(content);
    setIsEditing(true);
  };

  const handleSave = () => {
    saveMutation.mutate(tempContent);
  };

  const handleCancel = () => {
    setTempContent(content);
    setIsEditing(false);
  };

  // If user is not authenticated, just render the content
  if (!isAuthenticated) {
    return (
      <Tag 
        className={className}
        dangerouslySetInnerHTML={contentType === "html" ? { __html: content } : undefined}
      >
        {contentType === "text" ? content : undefined}
      </Tag>
    );
  }

  return (
    <div className="relative group">
      {!isEditing ? (
        <>
          <Tag 
            className={`${className} ${isAuthenticated ? 'hover:bg-blue-50 hover:border hover:border-blue-200 transition-colors cursor-pointer' : ''}`}
            onClick={handleEdit}
            dangerouslySetInnerHTML={contentType === "html" ? { __html: content } : undefined}
          >
            {contentType === "text" ? content : undefined}
          </Tag>
          
          {isAuthenticated && (
            <Button
              size="sm"
              variant="outline"
              className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 h-6 w-6 p-0"
              onClick={handleEdit}
            >
              <Edit3 className="w-3 h-3" />
            </Button>
          )}
        </>
      ) : (
        <Card className="border-blue-500 shadow-lg">
          <CardContent className="p-3">
            <div className="space-y-3">
              {contentType === "text" ? (
                content.length > 50 ? (
                  <Textarea
                    value={tempContent}
                    onChange={(e) => setTempContent(e.target.value)}
                    className="w-full"
                    rows={3}
                  />
                ) : (
                  <Input
                    value={tempContent}
                    onChange={(e) => setTempContent(e.target.value)}
                    className="w-full"
                  />
                )
              ) : (
                <Textarea
                  value={tempContent}
                  onChange={(e) => setTempContent(e.target.value)}
                  className="w-full font-mono text-sm"
                  rows={contentType === "html" ? 4 : 6}
                />
              )}
              
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleSave}
                  disabled={saveMutation.isPending}
                >
                  {saveMutation.isPending ? (
                    <Loader2 className="w-3 h-3 animate-spin mr-1" />
                  ) : (
                    <Save className="w-3 h-3 mr-1" />
                  )}
                  Lưu
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={saveMutation.isPending}
                >
                  <X className="w-3 h-3 mr-1" />
                  Hủy
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}