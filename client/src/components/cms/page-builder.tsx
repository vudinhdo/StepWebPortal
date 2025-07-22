import { useState, useCallback } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Plus, Save, Eye, Settings2, Layout, Type, Image, Video, 
  Code, Palette, Move, Copy, Trash2, Edit3, GripVertical
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { WysiwygEditor } from "./wysiwyg-editor";

interface PageElement {
  id: string;
  type: 'text' | 'heading' | 'image' | 'video' | 'html' | 'button' | 'separator' | 'columns';
  content: any;
  styles: {
    margin?: string;
    padding?: string;
    backgroundColor?: string;
    textColor?: string;
    fontSize?: string;
    textAlign?: 'left' | 'center' | 'right';
    borderRadius?: string;
    border?: string;
  };
  settings: {
    visible?: boolean;
    responsive?: {
      desktop?: boolean;
      tablet?: boolean;
      mobile?: boolean;
    };
  };
}

interface Page {
  id: number;
  title: string;
  slug: string;
  template: string;
  elements: PageElement[];
  seoTitle?: string;
  seoDescription?: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export function PageBuilder({ pageId }: { pageId?: number }) {
  const [currentPage, setCurrentPage] = useState<Page | null>(null);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [draggedElement, setDraggedElement] = useState<string | null>(null);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Mock page data - replace with actual API calls
  const mockPage: Page = {
    id: 1,
    title: "Trang chủ",
    slug: "home",
    template: "default",
    elements: [
      {
        id: "hero-1",
        type: "heading",
        content: { text: "Chào mừng đến với STEP", level: 1 },
        styles: { textAlign: "center", fontSize: "48px", textColor: "#1f2937", margin: "2rem 0" },
        settings: { visible: true, responsive: { desktop: true, tablet: true, mobile: true } }
      },
      {
        id: "text-1",
        type: "text",
        content: { text: "<p>Chúng tôi cung cấp giải pháp công nghệ toàn diện cho doanh nghiệp của bạn.</p>" },
        styles: { textAlign: "center", fontSize: "18px", textColor: "#6b7280", margin: "1rem 0" },
        settings: { visible: true, responsive: { desktop: true, tablet: true, mobile: true } }
      },
      {
        id: "button-1",
        type: "button",
        content: { text: "Liên hệ ngay", url: "/contact" },
        styles: { textAlign: "center", backgroundColor: "#3b82f6", textColor: "#ffffff", padding: "12px 24px", borderRadius: "6px" },
        settings: { visible: true, responsive: { desktop: true, tablet: true, mobile: true } }
      }
    ],
    seoTitle: "STEP - Giải pháp công nghệ chuyên nghiệp",
    seoDescription: "Cung cấp hosting, cloud, domain và các dịch vụ IT chuyên nghiệp",
    isPublished: true,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z"
  };

  const elementTypes = [
    { type: 'heading', icon: Type, label: 'Tiêu đề' },
    { type: 'text', icon: Edit3, label: 'Văn bản' },
    { type: 'image', icon: Image, label: 'Hình ảnh' },
    { type: 'video', icon: Video, label: 'Video' },
    { type: 'button', icon: Layout, label: 'Nút bấm' },
    { type: 'html', icon: Code, label: 'HTML' },
    { type: 'separator', icon: Move, label: 'Ngăn cách' },
    { type: 'columns', icon: Layout, label: 'Cột' }
  ];

  const addElement = (type: string) => {
    const newElement: PageElement = {
      id: `${type}-${Date.now()}`,
      type: type as any,
      content: getDefaultContent(type),
      styles: {},
      settings: { visible: true, responsive: { desktop: true, tablet: true, mobile: true } }
    };

    if (currentPage) {
      setCurrentPage({
        ...currentPage,
        elements: [...currentPage.elements, newElement]
      });
    } else {
      setCurrentPage({
        ...mockPage,
        elements: [...mockPage.elements, newElement]
      });
    }
  };

  const getDefaultContent = (type: string) => {
    switch (type) {
      case 'heading':
        return { text: 'Tiêu đề mới', level: 2 };
      case 'text':
        return { text: '<p>Nội dung văn bản...</p>' };
      case 'image':
        return { src: '', alt: 'Hình ảnh mới', caption: '' };
      case 'video':
        return { src: '', caption: '' };
      case 'button':
        return { text: 'Nút bấm', url: '#' };
      case 'html':
        return { html: '<div>Mã HTML tùy chỉnh</div>' };
      case 'separator':
        return { height: '1px', color: '#e5e7eb' };
      case 'columns':
        return { columns: [{ content: '<p>Cột 1</p>' }, { content: '<p>Cột 2</p>' }] };
      default:
        return {};
    }
  };

  const updateElement = (id: string, updates: Partial<PageElement>) => {
    if (!currentPage) return;
    
    setCurrentPage({
      ...currentPage,
      elements: currentPage.elements.map(el => 
        el.id === id ? { ...el, ...updates } : el
      )
    });
  };

  const deleteElement = (id: string) => {
    if (!currentPage) return;
    
    setCurrentPage({
      ...currentPage,
      elements: currentPage.elements.filter(el => el.id !== id)
    });
    setSelectedElement(null);
  };

  const duplicateElement = (id: string) => {
    if (!currentPage) return;
    
    const element = currentPage.elements.find(el => el.id === id);
    if (!element) return;

    const newElement: PageElement = {
      ...element,
      id: `${element.type}-${Date.now()}`
    };

    setCurrentPage({
      ...currentPage,
      elements: [...currentPage.elements, newElement]
    });
  };

  const moveElement = (fromIndex: number, toIndex: number) => {
    if (!currentPage) return;
    
    const elements = [...currentPage.elements];
    const [movedElement] = elements.splice(fromIndex, 1);
    elements.splice(toIndex, 0, movedElement);

    setCurrentPage({
      ...currentPage,
      elements
    });
  };

  const savePage = async () => {
    if (!currentPage) return;
    
    toast({
      title: "Đang lưu trang...",
      description: "Vui lòng đợi trong giây lát",
    });

    // Mock save - replace with actual API call
    setTimeout(() => {
      toast({
        title: "Lưu thành công!",
        description: `Trang "${currentPage.title}" đã được lưu`,
      });
    }, 1000);
  };

  const publishPage = async () => {
    if (!currentPage) return;
    
    const updatedPage = { ...currentPage, isPublished: !currentPage.isPublished };
    setCurrentPage(updatedPage);
    
    toast({
      title: updatedPage.isPublished ? "Đã xuất bản!" : "Đã ẩn trang",
      description: `Trang "${currentPage.title}" ${updatedPage.isPublished ? 'đã được xuất bản' : 'đã được ẩn'}`,
    });
  };

  const renderElement = (element: PageElement) => {
    const commonProps = {
      key: element.id,
      className: `relative ${selectedElement === element.id ? 'ring-2 ring-blue-500' : 'hover:ring-1 hover:ring-gray-300'} ${!previewMode ? 'cursor-pointer' : ''}`,
      style: element.styles,
      onClick: !previewMode ? () => setSelectedElement(element.id) : undefined
    };

    const content = (() => {
      switch (element.type) {
        case 'heading':
          const HeadingTag = `h${element.content.level}` as keyof JSX.IntrinsicElements;
          return <HeadingTag {...commonProps}>{element.content.text}</HeadingTag>;
        
        case 'text':
          return <div {...commonProps} dangerouslySetInnerHTML={{ __html: element.content.text }} />;
        
        case 'image':
          return (
            <div {...commonProps}>
              {element.content.src ? (
                <img 
                  src={element.content.src} 
                  alt={element.content.alt}
                  className="max-w-full h-auto"
                />
              ) : (
                <div className="bg-gray-200 h-48 flex items-center justify-center text-gray-500">
                  <Image className="w-12 h-12" />
                </div>
              )}
              {element.content.caption && (
                <p className="text-sm text-gray-600 mt-2">{element.content.caption}</p>
              )}
            </div>
          );
        
        case 'video':
          return (
            <div {...commonProps}>
              {element.content.src ? (
                <video controls className="w-full">
                  <source src={element.content.src} />
                  Trình duyệt không hỗ trợ video.
                </video>
              ) : (
                <div className="bg-gray-200 h-48 flex items-center justify-center text-gray-500">
                  <Video className="w-12 h-12" />
                </div>
              )}
              {element.content.caption && (
                <p className="text-sm text-gray-600 mt-2">{element.content.caption}</p>
              )}
            </div>
          );
        
        case 'button':
          return (
            <div {...commonProps}>
              <button 
                className="inline-block px-6 py-3 rounded hover:opacity-80 transition-opacity"
                style={{
                  backgroundColor: element.styles.backgroundColor || '#3b82f6',
                  color: element.styles.textColor || '#ffffff'
                }}
              >
                {element.content.text}
              </button>
            </div>
          );
        
        case 'html':
          return <div {...commonProps} dangerouslySetInnerHTML={{ __html: element.content.html }} />;
        
        case 'separator':
          return (
            <div {...commonProps}>
              <hr 
                style={{
                  height: element.content.height || '1px',
                  backgroundColor: element.content.color || '#e5e7eb',
                  border: 'none'
                }}
              />
            </div>
          );
        
        case 'columns':
          return (
            <div {...commonProps} className={`${commonProps.className} grid gap-4`} 
                 style={{ ...element.styles, gridTemplateColumns: `repeat(${element.content.columns.length}, 1fr)` }}>
              {element.content.columns.map((col: any, index: number) => (
                <div key={index} className="p-4 border border-dashed border-gray-300">
                  <div dangerouslySetInnerHTML={{ __html: col.content }} />
                </div>
              ))}
            </div>
          );
        
        default:
          return <div {...commonProps}>Unknown element type: {element.type}</div>;
      }
    })();

    if (!previewMode && selectedElement !== element.id) {
      return (
        <div className="relative group">
          {content}
          <div className="absolute inset-0 bg-blue-500 bg-opacity-0 group-hover:bg-opacity-10 pointer-events-none transition-colors" />
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
            <Button size="sm" variant="secondary" className="h-6 w-6 p-0" onClick={() => duplicateElement(element.id)}>
              <Copy className="w-3 h-3" />
            </Button>
            <Button size="sm" variant="secondary" className="h-6 w-6 p-0" onClick={() => deleteElement(element.id)}>
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        </div>
      );
    }

    return content;
  };

  const selectedElementData = currentPage?.elements.find(el => el.id === selectedElement);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar - Elements */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">Thành phần</h3>
          <p className="text-sm text-gray-600">Kéo thả để thêm</p>
        </div>
        <div className="flex-1 p-4 space-y-2 overflow-y-auto">
          {elementTypes.map((elementType) => (
            <Button
              key={elementType.type}
              variant="outline"
              className="w-full justify-start"
              onClick={() => addElement(elementType.type)}
            >
              <elementType.icon className="w-4 h-4 mr-2" />
              {elementType.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Toolbar */}
        <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">
              {currentPage?.title || mockPage.title}
            </h1>
            <Badge variant={currentPage?.isPublished || mockPage.isPublished ? "default" : "secondary"}>
              {currentPage?.isPublished || mockPage.isPublished ? "Đã xuất bản" : "Bản nháp"}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setPreviewMode(!previewMode)}>
              <Eye className="w-4 h-4 mr-2" />
              {previewMode ? "Chỉnh sửa" : "Xem trước"}
            </Button>
            <Button variant="outline" size="sm" onClick={publishPage}>
              {currentPage?.isPublished || mockPage.isPublished ? "Ẩn trang" : "Xuất bản"}
            </Button>
            <Button size="sm" onClick={savePage}>
              <Save className="w-4 h-4 mr-2" />
              Lưu
            </Button>
          </div>
        </div>

        {/* Page Canvas */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-4xl mx-auto p-8">
            <div className="bg-white shadow-sm min-h-96">
              {(currentPage?.elements || mockPage.elements).map((element) => renderElement(element))}
              
              {(!currentPage?.elements || currentPage.elements.length === 0) && 
               (!mockPage.elements || mockPage.elements.length === 0) && (
                <div className="text-center py-24 text-gray-500">
                  <Layout className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium mb-2">Trang trống</h3>
                  <p className="mb-4">Thêm thành phần từ thanh bên trái để bắt đầu xây dựng trang</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Properties */}
      {selectedElementData && !previewMode && (
        <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Thuộc tính</h3>
            <p className="text-sm text-gray-600">
              {elementTypes.find(t => t.type === selectedElementData.type)?.label}
            </p>
          </div>
          <div className="flex-1 p-4 space-y-6 overflow-y-auto">
            <Tabs defaultValue="content">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="content">Nội dung</TabsTrigger>
                <TabsTrigger value="style">Kiểu dáng</TabsTrigger>
                <TabsTrigger value="settings">Cài đặt</TabsTrigger>
              </TabsList>
              
              <TabsContent value="content" className="space-y-4 mt-4">
                {selectedElementData.type === 'heading' && (
                  <>
                    <div>
                      <Label>Văn bản</Label>
                      <Input
                        value={selectedElementData.content.text}
                        onChange={(e) => updateElement(selectedElementData.id, {
                          content: { ...selectedElementData.content, text: e.target.value }
                        })}
                      />
                    </div>
                    <div>
                      <Label>Cấp độ</Label>
                      <Select
                        value={selectedElementData.content.level.toString()}
                        onValueChange={(value) => updateElement(selectedElementData.id, {
                          content: { ...selectedElementData.content, level: parseInt(value) }
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">H1</SelectItem>
                          <SelectItem value="2">H2</SelectItem>
                          <SelectItem value="3">H3</SelectItem>
                          <SelectItem value="4">H4</SelectItem>
                          <SelectItem value="5">H5</SelectItem>
                          <SelectItem value="6">H6</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
                
                {selectedElementData.type === 'text' && (
                  <div>
                    <Label>Nội dung</Label>
                    <WysiwygEditor
                      value={selectedElementData.content.text}
                      onChange={(value) => updateElement(selectedElementData.id, {
                        content: { ...selectedElementData.content, text: value }
                      })}
                      height="200px"
                    />
                  </div>
                )}
                
                {selectedElementData.type === 'button' && (
                  <>
                    <div>
                      <Label>Văn bản</Label>
                      <Input
                        value={selectedElementData.content.text}
                        onChange={(e) => updateElement(selectedElementData.id, {
                          content: { ...selectedElementData.content, text: e.target.value }
                        })}
                      />
                    </div>
                    <div>
                      <Label>URL</Label>
                      <Input
                        value={selectedElementData.content.url}
                        onChange={(e) => updateElement(selectedElementData.id, {
                          content: { ...selectedElementData.content, url: e.target.value }
                        })}
                      />
                    </div>
                  </>
                )}
                
                {selectedElementData.type === 'image' && (
                  <>
                    <div>
                      <Label>URL hình ảnh</Label>
                      <Input
                        value={selectedElementData.content.src}
                        onChange={(e) => updateElement(selectedElementData.id, {
                          content: { ...selectedElementData.content, src: e.target.value }
                        })}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    <div>
                      <Label>Văn bản thay thế</Label>
                      <Input
                        value={selectedElementData.content.alt}
                        onChange={(e) => updateElement(selectedElementData.id, {
                          content: { ...selectedElementData.content, alt: e.target.value }
                        })}
                      />
                    </div>
                    <div>
                      <Label>Chú thích</Label>
                      <Input
                        value={selectedElementData.content.caption}
                        onChange={(e) => updateElement(selectedElementData.id, {
                          content: { ...selectedElementData.content, caption: e.target.value }
                        })}
                      />
                    </div>
                  </>
                )}
              </TabsContent>
              
              <TabsContent value="style" className="space-y-4 mt-4">
                <div>
                  <Label>Căn chỉnh văn bản</Label>
                  <Select
                    value={selectedElementData.styles.textAlign || 'left'}
                    onValueChange={(value) => updateElement(selectedElementData.id, {
                      styles: { ...selectedElementData.styles, textAlign: value as any }
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="left">Trái</SelectItem>
                      <SelectItem value="center">Giữa</SelectItem>
                      <SelectItem value="right">Phải</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Cỡ chữ</Label>
                  <Input
                    value={selectedElementData.styles.fontSize || ''}
                    onChange={(e) => updateElement(selectedElementData.id, {
                      styles: { ...selectedElementData.styles, fontSize: e.target.value }
                    })}
                    placeholder="16px"
                  />
                </div>
                <div>
                  <Label>Màu chữ</Label>
                  <Input
                    type="color"
                    value={selectedElementData.styles.textColor || '#000000'}
                    onChange={(e) => updateElement(selectedElementData.id, {
                      styles: { ...selectedElementData.styles, textColor: e.target.value }
                    })}
                  />
                </div>
                <div>
                  <Label>Màu nền</Label>
                  <Input
                    type="color"
                    value={selectedElementData.styles.backgroundColor || '#ffffff'}
                    onChange={(e) => updateElement(selectedElementData.id, {
                      styles: { ...selectedElementData.styles, backgroundColor: e.target.value }
                    })}
                  />
                </div>
                <div>
                  <Label>Padding</Label>
                  <Input
                    value={selectedElementData.styles.padding || ''}
                    onChange={(e) => updateElement(selectedElementData.id, {
                      styles: { ...selectedElementData.styles, padding: e.target.value }
                    })}
                    placeholder="10px"
                  />
                </div>
                <div>
                  <Label>Margin</Label>
                  <Input
                    value={selectedElementData.styles.margin || ''}
                    onChange={(e) => updateElement(selectedElementData.id, {
                      styles: { ...selectedElementData.styles, margin: e.target.value }
                    })}
                    placeholder="10px"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="settings" className="space-y-4 mt-4">
                <div className="flex items-center justify-between">
                  <Label>Hiển thị</Label>
                  <Switch
                    checked={selectedElementData.settings.visible !== false}
                    onCheckedChange={(checked) => updateElement(selectedElementData.id, {
                      settings: { ...selectedElementData.settings, visible: checked }
                    })}
                  />
                </div>
                <div>
                  <Label className="text-base">Responsive</Label>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Desktop</Label>
                      <Switch
                        checked={selectedElementData.settings.responsive?.desktop !== false}
                        onCheckedChange={(checked) => updateElement(selectedElementData.id, {
                          settings: { 
                            ...selectedElementData.settings, 
                            responsive: { ...selectedElementData.settings.responsive, desktop: checked }
                          }
                        })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Tablet</Label>
                      <Switch
                        checked={selectedElementData.settings.responsive?.tablet !== false}
                        onCheckedChange={(checked) => updateElement(selectedElementData.id, {
                          settings: { 
                            ...selectedElementData.settings, 
                            responsive: { ...selectedElementData.settings.responsive, tablet: checked }
                          }
                        })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Mobile</Label>
                      <Switch
                        checked={selectedElementData.settings.responsive?.mobile !== false}
                        onCheckedChange={(checked) => updateElement(selectedElementData.id, {
                          settings: { 
                            ...selectedElementData.settings, 
                            responsive: { ...selectedElementData.settings.responsive, mobile: checked }
                          }
                        })}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="pt-4 border-t border-gray-200 space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => duplicateElement(selectedElementData.id)}
              >
                <Copy className="w-4 h-4 mr-2" />
                Nhân bản
              </Button>
              <Button
                variant="destructive"
                size="sm"
                className="w-full"
                onClick={() => deleteElement(selectedElementData.id)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Xóa
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}