import { useQuery } from "@tanstack/react-query";

export interface User {
  id: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  profileImageUrl: string | null;
  role: 'admin' | 'editor' | 'writer' | 'viewer';
  isAdmin?: boolean;
}

export function useAuth() {
  const { data: user, isLoading, error } = useQuery<User>({
    queryKey: ["/api/auth/user"],
    retry: false,
  });

  const role = user?.role || 'viewer';
  const canEdit = ['admin', 'editor'].includes(role);
  const canPublish = ['admin', 'editor'].includes(role);
  const canCreate = ['admin', 'editor', 'writer'].includes(role);
  const canManageUsers = role === 'admin';

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    error,
    role,
    canEdit,
    canPublish,
    canCreate,
    canManageUsers,
  };
}
