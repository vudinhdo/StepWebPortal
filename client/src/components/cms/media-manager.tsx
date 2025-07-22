import { useState, useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Upload, Image, FileText, Video, Music, Folder, Trash2, Edit3,
  Search, Filter, Grid3X3, List, Copy, ExternalLink
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface MediaFile {
  id: number;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  alt?: string;
  caption?: string;
  folder?: string;
  createdAt: string;
  updatedAt: string;
}

interface MediaFolder {
  id: number;
  name: string;
  path: string;
  parentId?: number;
  createdAt: string;
}

export function MediaManager() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFiles, setSelectedFiles] = useState<number[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'image' | 'video' | 'audio' | 'document'>('all');
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Mock data - replace with actual API calls
  const mockFiles: MediaFile[] = [
    {
      id: 1,
      filename: 'hero-banner.jpg',
      originalName: 'hero-banner-original.jpg',
      mimeType: 'image/jpeg',
      size: 2048576,
      url: '/uploads/hero-banner.jpg',
      alt: 'Hero banner image',
      caption: 'Main hero section banner',
      folder: 'banners',
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T10:30:00Z'
    },
    {
      id: 2,
      filename: 'logo-step.png',
      originalName: 'step-company-logo.png',
      mimeType: 'image/png',
      size: 512000,
      url: '/uploads/logo-step.png',
      alt: 'STEP company logo',
      caption: 'Official STEP logo',
      folder: 'logos',
      createdAt: '2024-01-10T09:15:00Z',
      updatedAt: '2024-01-10T09:15:00Z'
    }
  ];

  const mockFolders: MediaFolder[] = [
    { id: 1, name: 'banners', path: '/banners', createdAt: '2024-01-01T00:00:00Z' },
    { id: 2, name: 'logos', path: '/logos', createdAt: '2024-01-01T00:00:00Z' },
    { id: 3, name: 'blog-images', path: '/blog-images', createdAt: '2024-01-05T00:00:00Z' },
    { id: 4, name: 'testimonials', path: '/testimonials', createdAt: '2024-01-08T00:00:00Z' }
  ];

  const handleFileUpload = async (files: FileList) => {
    const formData = new FormData();
    Array.from(files).forEach(file => {
      formData.append('files', file);
    });
    
    if (selectedFolder) {
      formData.append('folderId', selectedFolder.toString());
    }

    toast({
      title: "Đang tải lên...",
      description: `Đang tải lên ${files.length} tệp tin`,
    });

    // Mock upload - replace with actual API call
    setTimeout(() => {
      toast({
        title: "Tải lên thành công!",
        description: `Đã tải lên ${files.length} tệp tin`,
      });
      setUploadModalOpen(false);
    }, 2000);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return <Image className="w-4 h-4" />;
    if (mimeType.startsWith('video/')) return <Video className="w-4 h-4" />;
    if (mimeType.startsWith('audio/')) return <Music className="w-4 h-4" />;
    return <FileText className="w-4 h-4" />;
  };

  const filteredFiles = mockFiles.filter(file => {
    const matchesSearch = file.originalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         file.alt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         file.caption?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = filterType === 'all' || 
                       (filterType === 'image' && file.mimeType.startsWith('image/')) ||
                       (filterType === 'video' && file.mimeType.startsWith('video/')) ||
                       (filterType === 'audio' && file.mimeType.startsWith('audio/')) ||
                       (filterType === 'document' && !file.mimeType.startsWith('image/') && 
                        !file.mimeType.startsWith('video/') && !file.mimeType.startsWith('audio/'));
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Quản lý Media</h2>
          <p className="text-gray-600">Quản lý hình ảnh, video và tài liệu</p>
        </div>
        <Dialog open={uploadModalOpen} onOpenChange={setUploadModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Upload className="w-4 h-4 mr-2" />
              Tải lên
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Tải lên tệp tin</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 mb-2">Kéo thả tệp tin vào đây hoặc</p>
                <Button 
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Chọn tệp tin
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                  accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
                />
              </div>
              <div className="text-sm text-gray-500">
                Hỗ trợ: JPG, PNG, GIF, MP4, MP3, PDF, DOC. Tối đa 10MB mỗi tệp.
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="flex-1 max-w-sm">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Tìm kiếm tệp tin..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="all">Tất cả</option>
                  <option value="image">Hình ảnh</option>
                  <option value="video">Video</option>
                  <option value="audio">Audio</option>
                  <option value="document">Tài liệu</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="files">
            <TabsList>
              <TabsTrigger value="files">Tệp tin ({filteredFiles.length})</TabsTrigger>
              <TabsTrigger value="folders">Thư mục ({mockFolders.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="files" className="mt-6">
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {filteredFiles.map((file) => (
                    <div
                      key={file.id}
                      className="group relative border rounded-lg p-2 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => {
                        if (selectedFiles.includes(file.id)) {
                          setSelectedFiles(prev => prev.filter(id => id !== file.id));
                        } else {
                          setSelectedFiles(prev => [...prev, file.id]);
                        }
                      }}
                    >
                      {selectedFiles.includes(file.id) && (
                        <div className="absolute top-2 right-2 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">
                          ✓
                        </div>
                      )}
                      <div className="aspect-square bg-gray-100 rounded-md mb-2 flex items-center justify-center overflow-hidden">
                        {file.mimeType.startsWith('image/') ? (
                          <img 
                            src={file.url} 
                            alt={file.alt}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-gray-400">
                            {getFileIcon(file.mimeType)}
                          </div>
                        )}
                      </div>
                      <div className="text-xs space-y-1">
                        <div className="font-medium truncate" title={file.originalName}>
                          {file.originalName}
                        </div>
                        <div className="text-gray-500">
                          {formatFileSize(file.size)}
                        </div>
                        {file.folder && (
                          <Badge variant="outline" className="text-xs">
                            {file.folder}
                          </Badge>
                        )}
                      </div>
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-colors rounded-lg">
                        <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                          <Button size="sm" variant="secondary" className="h-6 w-6 p-0">
                            <Edit3 className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="secondary" className="h-6 w-6 p-0">
                            <Copy className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="secondary" className="h-6 w-6 p-0">
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredFiles.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center gap-4 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={() => {
                        if (selectedFiles.includes(file.id)) {
                          setSelectedFiles(prev => prev.filter(id => id !== file.id));
                        } else {
                          setSelectedFiles(prev => [...prev, file.id]);
                        }
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={selectedFiles.includes(file.id)}
                        onChange={() => {}}
                        className="rounded"
                      />
                      <div className="flex-shrink-0">
                        {getFileIcon(file.mimeType)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{file.originalName}</div>
                        <div className="text-sm text-gray-500">
                          {formatFileSize(file.size)} • {format(new Date(file.createdAt), 'dd/MM/yyyy HH:mm')}
                        </div>
                      </div>
                      {file.folder && (
                        <Badge variant="outline">{file.folder}</Badge>
                      )}
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {filteredFiles.length === 0 && (
                <div className="text-center py-12">
                  <Image className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="font-medium text-gray-900 mb-2">Không có tệp tin nào</h3>
                  <p className="text-gray-500 mb-4">Không tìm thấy tệp tin phù hợp với bộ lọc của bạn</p>
                  <Button onClick={() => setUploadModalOpen(true)}>
                    <Upload className="w-4 h-4 mr-2" />
                    Tải lên tệp tin đầu tiên
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="folders" className="mt-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {mockFolders.map((folder) => (
                  <div
                    key={folder.id}
                    className="group border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="flex flex-col items-center text-center">
                      <Folder className="w-12 h-12 text-blue-600 mb-2" />
                      <div className="font-medium">{folder.name}</div>
                      <div className="text-sm text-gray-500">
                        {format(new Date(folder.createdAt), 'dd/MM/yyyy')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedFiles.length > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white border rounded-lg shadow-lg p-4 flex items-center gap-4">
          <span className="text-sm font-medium">
            Đã chọn {selectedFiles.length} tệp tin
          </span>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <Copy className="w-4 h-4 mr-2" />
              Sao chép URL
            </Button>
            <Button size="sm" variant="outline">
              <Folder className="w-4 h-4 mr-2" />
              Di chuyển
            </Button>
            <Button size="sm" variant="destructive">
              <Trash2 className="w-4 h-4 mr-2" />
              Xóa
            </Button>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setSelectedFiles([])}
          >
            ✕
          </Button>
        </div>
      )}
    </div>
  );
}