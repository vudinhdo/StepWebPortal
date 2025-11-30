import { useInlineEdit } from "@/contexts/InlineEditContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Edit3, 
  Save, 
  X, 
  Eye, 
  Loader2,
  Shield,
  PenTool,
  User,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";

const roleConfig = {
  admin: { label: 'Admin', icon: Shield, color: 'bg-red-100 text-red-700' },
  editor: { label: 'Editor', icon: PenTool, color: 'bg-blue-100 text-blue-700' },
  writer: { label: 'Writer', icon: Edit3, color: 'bg-green-100 text-green-700' },
  viewer: { label: 'Viewer', icon: Eye, color: 'bg-gray-100 text-gray-700' },
};

export function EditToolbar() {
  const { 
    isEditMode, 
    toggleEditMode, 
    canEdit, 
    userRole,
    pendingChanges,
    saveAllChanges,
    discardChanges,
    isSaving,
  } = useInlineEdit();

  const dirtyCount = Array.from(pendingChanges.values()).filter(item => item.isDirty).length;
  const role = roleConfig[userRole as keyof typeof roleConfig] || roleConfig.viewer;
  const RoleIcon = role.icon;

  if (!canEdit) return null;

  return (
    <div 
      className={cn(
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-50",
        "bg-white rounded-full shadow-2xl border border-gray-200",
        "flex items-center gap-3 px-4 py-2",
        "transition-all duration-300",
        isEditMode && "ring-2 ring-blue-400"
      )}
      data-testid="edit-toolbar"
    >
      <Badge className={cn("gap-1", role.color)}>
        <RoleIcon className="w-3 h-3" />
        {role.label}
      </Badge>

      <div className="w-px h-6 bg-gray-200" />

      <Button
        variant={isEditMode ? "default" : "outline"}
        size="sm"
        onClick={toggleEditMode}
        className={cn(
          "gap-2",
          isEditMode && "bg-blue-600 hover:bg-blue-700"
        )}
        data-testid="toggle-edit-mode"
      >
        {isEditMode ? (
          <>
            <Eye className="w-4 h-4" />
            Xem
          </>
        ) : (
          <>
            <Edit3 className="w-4 h-4" />
            Chỉnh sửa
          </>
        )}
      </Button>

      {isEditMode && (
        <>
          <div className="w-px h-6 bg-gray-200" />
          
          {dirtyCount > 0 && (
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
              {dirtyCount} thay đổi
            </Badge>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={discardChanges}
            disabled={dirtyCount === 0 || isSaving}
            className="gap-2 text-gray-600"
            data-testid="discard-changes"
          >
            <X className="w-4 h-4" />
            Hủy
          </Button>

          <Button
            size="sm"
            onClick={saveAllChanges}
            disabled={dirtyCount === 0 || isSaving}
            className="gap-2 bg-green-600 hover:bg-green-700"
            data-testid="save-changes"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Đang lưu...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Lưu ({dirtyCount})
              </>
            )}
          </Button>
        </>
      )}
    </div>
  );
}
