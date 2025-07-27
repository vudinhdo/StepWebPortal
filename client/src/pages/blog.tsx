import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Calendar, User, Tag, ArrowRight, Clock, Eye } from "lucide-react";
import { format } from "date-fns";
// import { vi } from "date-fns/locale";
import type { Article } from "@shared/schema";
import Header from "@/components/header";
import Footer from "@/components/footer";

const categories = [
  "Tất cả",
  "Technology",
  "DevOps", 
  "Bảo mật mạng",
  "Xu hướng Cloud",
  "WordPress",
  "Công nghệ",
  "Bảo mật"
];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: articles = [], isLoading, error } = useQuery<Article[]>({
    queryKey: ["/api/articles/published"],
  });

  const { data: featuredArticles = [], isLoading: featuredLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles/featured"],
  });

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === "Tất cả" || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (article.tags && article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateString: string | Date | null) => {
    if (!dateString) return "Chưa xác định";
    try {
      return format(new Date(dateString), "dd/MM/yyyy");
    } catch {
      return "Chưa xác định";
    }
  };

  const getReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    const readTime = Math.ceil(words / wordsPerMinute);
    return `${readTime} phút đọc`;
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-20 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold text-red-600 mb-4">Lỗi tải dữ liệu</h1>
            <p className="text-gray-600">Không thể tải danh sách bài viết. Vui lòng thử lại sau.</p>
            <Button onClick={() => window.location.reload()} className="mt-4">
              Tải lại trang
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-[hsl(207,100%,40%)] mb-6 leading-tight">
              Blog & Tin tức STEP
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Cập nhật xu hướng công nghệ mới nhất, hướng dẫn kỹ thuật chuyên sâu và insight về ngành IT từ đội ngũ chuyên gia STEP
            </p>
            
            {/* Search Bar */}
            <div className="max-w-lg mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Tìm kiếm bài viết, công nghệ, hướng dẫn..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-14 text-lg border-2 border-gray-200 focus:border-[hsl(207,100%,40%)] rounded-xl shadow-sm"
              />
            </div>
            
            {/* Stats */}
            <div className="flex justify-center gap-8 mt-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>{articles.length} bài viết</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>{featuredArticles.length} nổi bật</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Cập nhật hàng tuần</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold text-gray-900">
                Bài viết nổi bật
              </h2>
              <Badge variant="secondary" className="bg-[hsl(207,100%,40%)] text-white">
                Featured
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredArticles.slice(0, 2).map((article, index) => (
                <Card key={article.id} className={`overflow-hidden hover:shadow-2xl transition-all duration-300 group ${index === 0 ? 'lg:row-span-2' : ''}`}>
                  {article.imageUrl ? (
                    <div className={`${index === 0 ? 'aspect-[16/10]' : 'aspect-video'} overflow-hidden`}>
                      <img 
                        src={article.imageUrl} 
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className={`${index === 0 ? 'aspect-[16/10]' : 'aspect-video'} bg-gradient-to-br from-[hsl(207,100%,40%)] to-[hsl(207,100%,60%)] flex items-center justify-center`}>
                      <div className="text-white text-6xl font-bold opacity-20">
                        {article.title.charAt(0)}
                      </div>
                    </div>
                  )}
                  
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge className="bg-[hsl(207,100%,40%)] text-white">
                        {article.category}
                      </Badge>
                      <span className="text-sm text-gray-500 flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(article.createdAt)}
                      </span>
                      <span className="text-sm text-gray-500 flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {getReadTime(article.content)}
                      </span>
                    </div>
                    
                    <h3 className={`font-bold text-gray-900 mb-4 line-clamp-2 ${index === 0 ? 'text-2xl' : 'text-xl'}`}>
                      {article.title}
                    </h3>
                    
                    <p className={`text-gray-600 mb-6 ${index === 0 ? 'text-lg line-clamp-4' : 'line-clamp-3'}`}>
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <User className="h-4 w-4 mr-2" />
                        {article.author}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-[hsl(207,100%,40%)] hover:text-[hsl(207,100%,35%)] hover:bg-blue-50 group"
                      >
                        Đọc thêm 
                        <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                    
                    {article.tags && article.tags.length > 0 && (
                      <div className="flex items-center gap-2 mt-6 flex-wrap">
                        <Tag className="h-4 w-4 text-gray-400" />
                        {article.tags.slice(0, 4).map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="outline" className="text-xs hover:bg-gray-100 cursor-pointer">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories Filter */}
      <section className="py-8 bg-gray-100 border-y">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => {
              const count = category === "Tất cả" ? articles.length : articles.filter(a => a.category === category).length;
              return (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={`transition-all duration-200 ${
                    selectedCategory === category ? 
                    "bg-[hsl(207,100%,40%)] hover:bg-[hsl(207,100%,35%)] shadow-lg" : 
                    "hover:bg-gray-50 hover:border-[hsl(207,100%,40%)] hover:text-[hsl(207,100%,40%)]"
                  }`}
                >
                  {category}
                  {count > 0 && (
                    <Badge variant="secondary" className="ml-2 bg-gray-200 text-gray-700">
                      {count}
                    </Badge>
                  )}
                </Button>
              );
            })}
          </div>
        </div>
      </section>

      {/* All Articles */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {selectedCategory === "Tất cả" ? "Tất cả bài viết" : `Danh mục: ${selectedCategory}`}
            </h2>
            <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {filteredArticles.length} kết quả
            </div>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="aspect-video bg-gray-200 animate-pulse"></div>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                      </div>
                      <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                      <div className="space-y-2">
                        <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3"></div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                        <div className="h-8 bg-gray-200 rounded animate-pulse w-20"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Không tìm thấy bài viết
                </h3>
                <p className="text-gray-600 mb-8">
                  Thử thay đổi từ khóa tìm kiếm hoặc chọn danh mục khác để xem thêm bài viết.
                </p>
                <div className="flex gap-4 justify-center">
                  <Button 
                    variant="outline"
                    onClick={() => setSearchTerm("")}
                  >
                    Xóa tìm kiếm
                  </Button>
                  <Button 
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("Tất cả");
                    }}
                    className="bg-[hsl(207,100%,40%)] hover:bg-[hsl(207,100%,35%)]"
                  >
                    Xem tất cả bài viết
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <Card key={article.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer">
                  {article.imageUrl ? (
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={article.imageUrl} 
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video bg-gradient-to-br from-[hsl(207,100%,40%)] to-[hsl(207,100%,60%)] flex items-center justify-center">
                      <div className="text-white text-4xl font-bold opacity-30">
                        {article.title.charAt(0)}
                      </div>
                    </div>
                  )}
                  
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                        {article.category}
                      </Badge>
                      <span className="text-xs text-gray-500 flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDate(article.createdAt)}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {getReadTime(article.content)}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-[hsl(207,100%,40%)] transition-colors">
                      {article.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <User className="h-4 w-4 mr-1" />
                        <span className="truncate">{article.author}</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-[hsl(207,100%,40%)] hover:text-[hsl(207,100%,35%)] hover:bg-blue-50 p-0 group/btn"
                      >
                        Đọc thêm 
                        <ArrowRight className="h-4 w-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                    
                    {article.tags && article.tags.length > 0 && (
                      <div className="flex items-center gap-1 flex-wrap">
                        <Tag className="h-3 w-3 text-gray-400 flex-shrink-0" />
                        {article.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs hover:bg-gray-50 cursor-pointer">
                            {tag}
                          </Badge>
                        ))}
                        {article.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs bg-gray-50">
                            +{article.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}