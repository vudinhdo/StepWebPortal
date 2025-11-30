import { createContext, useContext, useState, useCallback, useRef, ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";

interface EditableItem {
  id: string;
  type: 'page-content' | 'article' | 'service' | 'testimonial';
  field: string;
  originalValue: string;
  currentValue: string;
  isDirty: boolean;
}

interface InlineEditContextType {
  isEditMode: boolean;
  toggleEditMode: () => void;
  canEdit: boolean;
  userRole: string;
  pendingChanges: Map<string, EditableItem>;
  updatePendingChange: (key: string, value: string) => void;
  saveAllChanges: () => Promise<void>;
  discardChanges: () => void;
  registerEditable: (key: string, item: Omit<EditableItem, 'currentValue' | 'isDirty'>) => void;
  isSaving: boolean;
}

const InlineEditContext = createContext<InlineEditContextType | null>(null);

export function InlineEditProvider({ children }: { children: ReactNode }) {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [isEditMode, setIsEditMode] = useState(false);
  const [pendingChanges, setPendingChanges] = useState<Map<string, EditableItem>>(new Map());
  const [isSaving, setIsSaving] = useState(false);
  
  const pendingChangesRef = useRef(pendingChanges);
  pendingChangesRef.current = pendingChanges;

  const userRole = (user as any)?.role || 'viewer';
  const canEdit = isAuthenticated && ['admin', 'editor'].includes(userRole);

  const toggleEditMode = useCallback(() => {
    if (!canEdit) {
      toast({
        title: "Không có quyền",
        description: "Bạn cần quyền Admin hoặc Editor để chỉnh sửa nội dung",
        variant: "destructive",
      });
      return;
    }
    
    if (isEditMode) {
      const currentChanges = pendingChangesRef.current;
      const hasDirtyChanges = Array.from(currentChanges.values()).some(item => item.isDirty);
      if (hasDirtyChanges) {
        toast({
          title: "Có thay đổi chưa lưu",
          description: "Vui lòng lưu hoặc hủy thay đổi trước khi tắt chế độ chỉnh sửa",
          variant: "destructive",
        });
        return;
      }
      setPendingChanges(new Map());
    }
    
    setIsEditMode(prev => !prev);
  }, [canEdit, isEditMode, toast]);

  const registerEditable = useCallback((key: string, item: Omit<EditableItem, 'currentValue' | 'isDirty'>) => {
    setPendingChanges(prev => {
      if (prev.has(key)) return prev;
      const newMap = new Map(prev);
      newMap.set(key, {
        ...item,
        currentValue: item.originalValue,
        isDirty: false,
      });
      return newMap;
    });
  }, []);

  const updatePendingChange = useCallback((key: string, value: string) => {
    setPendingChanges(prev => {
      const item = prev.get(key);
      if (!item) return prev;
      const newMap = new Map(prev);
      newMap.set(key, {
        ...item,
        currentValue: value,
        isDirty: value !== item.originalValue,
      });
      return newMap;
    });
  }, []);

  const saveAllChanges = useCallback(async () => {
    const dirtyItems = Array.from(pendingChanges.entries()).filter(([_, item]) => item.isDirty);
    
    if (dirtyItems.length === 0) {
      toast({
        title: "Không có thay đổi",
        description: "Không có nội dung nào cần lưu",
      });
      return;
    }

    setIsSaving(true);
    try {
      for (const [key, item] of dirtyItems) {
        const endpoint = getEndpointForType(item.type, item.id);
        await apiRequest("PATCH", endpoint, {
          [item.field]: item.currentValue,
        });
      }

      queryClient.invalidateQueries({ queryKey: ["/api/page-contents"] });
      queryClient.invalidateQueries({ queryKey: ["/api/articles"] });
      queryClient.invalidateQueries({ queryKey: ["/api/services"] });

      toast({
        title: "Đã lưu thành công",
        description: `Đã cập nhật ${dirtyItems.length} thay đổi`,
      });

      setPendingChanges(prev => {
        const newMap = new Map(prev);
        for (const [key, item] of dirtyItems) {
          newMap.set(key, {
            ...item,
            originalValue: item.currentValue,
            isDirty: false,
          });
        }
        return newMap;
      });
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể lưu thay đổi. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  }, [pendingChanges, toast]);

  const discardChanges = useCallback(() => {
    setPendingChanges(prev => {
      const newMap = new Map(prev);
      Array.from(prev.entries()).forEach(([key, item]) => {
        newMap.set(key, {
          ...item,
          currentValue: item.originalValue,
          isDirty: false,
        });
      });
      return newMap;
    });
    toast({
      title: "Đã hủy thay đổi",
      description: "Tất cả thay đổi đã được khôi phục",
    });
  }, [toast]);

  return (
    <InlineEditContext.Provider
      value={{
        isEditMode,
        toggleEditMode,
        canEdit,
        userRole,
        pendingChanges,
        updatePendingChange,
        saveAllChanges,
        discardChanges,
        registerEditable,
        isSaving,
      }}
    >
      {children}
    </InlineEditContext.Provider>
  );
}

export function useInlineEdit() {
  const context = useContext(InlineEditContext);
  if (!context) {
    throw new Error("useInlineEdit must be used within InlineEditProvider");
  }
  return context;
}

function getEndpointForType(type: string, id: string): string {
  const endpoints: Record<string, string> = {
    'page-content': `/api/page-contents/${id}`,
    'article': `/api/articles/${id}`,
    'service': `/api/services/${id}`,
    'testimonial': `/api/testimonials/${id}`,
  };
  return endpoints[type] || `/api/page-contents/${id}`;
}
