import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Calendar, User, Tag, ArrowRight, Clock, Eye, TrendingUp, BookOpen, Filter } from "lucide-react";
import { format } from "date-fns";
import type { Article } from "@shared/schema";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Link } from "wouter";

const categories = [
  "Tất cả",
  "DevOps", 
  "Cloud Computing",
  "Bảo mật mạng",
  "Hosting",
  "Technology",
  "Xu hướng Cloud",
  "WordPress",
  "Công nghệ",
  "Bảo mật",
  "Hướng dẫn"
];

// Optimized image component with lazy loading
const OptimizedImage = ({ src, alt, className }: { src: string; alt: string; className: string }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div className={`${className} bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center`}>
        <div className="text-white text-4xl font-bold opacity-30">
          {alt.charAt(0).toUpperCase()}
        </div>
      </div>
    );
  }

  return (
    <div className={`${className} relative overflow-hidden`}>
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <img 
        src={src}
        alt={alt}
        loading="lazy"
        className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
    </div>
  );
};

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'featured'>('latest');

  // SEO Meta Tags
  useEffect(() => {
    document.title = "Blog & Tin tức CNTT - STEP Technology | Xu hướng và Hướng dẫn DevOps";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Blog công nghệ STEP - Cập nhật xu hướng DevOps, Cloud Computing, bảo mật mạng. Hướng dẫn kỹ thuật chuyên sâu từ đội ngũ chuyên gia CNTT hàng đầu Việt Nam.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Blog công nghệ STEP - Cập nhật xu hướng DevOps, Cloud Computing, bảo mật mạng. Hướng dẫn kỹ thuật chuyên sâu từ đội ngũ chuyên gia CNTT hàng đầu Việt Nam.';
      document.head.appendChild(meta);
    }

    return () => {
      // Cleanup
    };
  }, []);

  const { data: articles = [], isLoading, error } = useQuery<Article[]>({
    queryKey: ["/api/articles/published"],
  });

  const { data: featuredArticles = [], isLoading: featuredLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles/featured"],
  });

  // Optimized filtering with memoization
  const filteredArticles = useMemo(() => {
    let filtered = articles.filter(article => {
      const matchesCategory = selectedCategory === "Tất cả" || article.category === selectedCategory;
      const matchesSearch = !searchTerm || (
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (article.tags && article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
      );
      return matchesCategory && matchesSearch;
    });

    // Sort articles
    switch (sortBy) {
      case 'featured':
        return filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
      case 'popular':
        return filtered.sort(() => Math.random() - 0.5); // Placeholder for view count
      case 'latest':
      default:
        return filtered.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
    }
  }, [articles, selectedCategory, searchTerm, sortBy]);

  const formatDate = (dateString: string | Date | null) => {
    if (!dateString) return "Chưa xác định";
    try {
      return format(new Date(dateString), "dd/MM/yyyy");
    } catch {
      return "Chưa xác định";
    }
  };

  const getReadTime = (content: string) => {
    if (!content) return "1 phút đọc";
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    const readTime = Math.ceil(words / wordsPerMinute);
    return `${readTime} phút đọc`;
  };

  const getPopularTags = () => {
    const tagCount: { [key: string]: number } = {};
    articles.forEach(article => {
      if (article.tags) {
        article.tags.forEach(tag => {
          tagCount[tag] = (tagCount[tag] || 0) + 1;
        });
      }
    });
    return Object.entries(tagCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([tag]) => tag);
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
      
      {/* Enhanced Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <BookOpen className="h-4 w-4" />
              Kiến thức CNTT hàng đầu
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Blog & Tin tức <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">STEP</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              Cập nhật xu hướng công nghệ mới nhất, hướng dẫn DevOps chuyên sâu và insight về ngành CNTT từ đội ngũ chuyên gia STEP
            </p>
            
            {/* Enhanced Search Bar */}
            <div className="max-w-2xl mx-auto relative mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Tìm kiếm bài viết, DevOps, Cloud, Docker, Kubernetes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-14 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl shadow-sm bg-white/80 backdrop-blur"
                data-testid="input-search"
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  ✕
                </Button>
              )}
            </div>
            
            {/* Enhanced Stats */}
            <div className="flex justify-center gap-8 text-sm text-gray-600 flex-wrap">
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>{articles.length} bài viết</span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>{featuredArticles.length} nổi bật</span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>DevOps chuyên sâu</span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span>Cập nhật hàng tuần</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles - Enhanced */}
      {featuredArticles.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Bài viết nổi bật
                </h2>
                <p className="text-gray-600">Những bài viết được quan tâm nhất từ cộng đồng</p>
              </div>
              <Badge variant="secondary" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2">
                <TrendingUp className="h-4 w-4 mr-1" />
                Featured
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {featuredArticles.slice(0, 3).map((article, index) => (
                <Card key={article.id} className={`overflow-hidden hover:shadow-2xl transition-all duration-300 group ${index === 0 ? 'lg:col-span-2 lg:row-span-1' : ''}`}>
                  <OptimizedImage
                    src={article.imageUrl || ''}
                    alt={article.title}
                    className={`${index === 0 ? 'aspect-[16/9]' : 'aspect-video'} w-full`}
                  />
                  
                  <CardContent className={`${index === 0 ? 'p-8' : 'p-6'}`}>
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                      <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
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
                    
                    <h3 className={`font-bold text-gray-900 mb-4 line-clamp-2 hover:text-blue-600 transition-colors ${index === 0 ? 'text-2xl lg:text-3xl' : 'text-xl'}`}>
                      <Link to={`/blog/${article.slug}`} className="cursor-pointer">
                        {article.title}
                      </Link>
                    </h3>
                    
                    <p className={`text-gray-600 mb-6 ${index === 0 ? 'text-lg line-clamp-4' : 'line-clamp-3'}`}>
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <User className="h-4 w-4 mr-2" />
                        {article.author}
                      </div>
                      <Link to={`/blog/${article.slug}`}>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 group/btn"
                          data-testid={`button-read-${article.slug}`}
                        >
                          Đọc thêm 
                          <ArrowRight className="h-4 w-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                    
                    {article.tags && article.tags.length > 0 && (
                      <div className="flex items-center gap-2 mt-6 flex-wrap">
                        <Tag className="h-4 w-4 text-gray-400" />
                        {article.tags.slice(0, 4).map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="outline" className="text-xs hover:bg-blue-50 hover:border-blue-200 cursor-pointer transition-colors">
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

      {/* Enhanced Categories and Sorting */}
      <section className="py-8 bg-gray-100 border-y">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Categories */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              {categories.map((category) => {
                const count = category === "Tất cả" ? articles.length : articles.filter(a => a.category === category).length;
                return (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                    className={`transition-all duration-200 ${
                      selectedCategory === category ? 
                      "bg-blue-600 hover:bg-blue-700 shadow-lg text-white" : 
                      "hover:bg-white hover:border-blue-500 hover:text-blue-600"
                    }`}
                    data-testid={`button-category-${category}`}
                  >
                    {category}
                    {count > 0 && (
                      <Badge variant="secondary" className={`ml-2 ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                        {count}
                      </Badge>
                    )}
                  </Button>
                );
              })}
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-3">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">Sắp xếp:</span>
              <div className="flex gap-2">
                {[
                  { key: 'latest', label: 'Mới nhất' },
                  { key: 'featured', label: 'Nổi bật' },
                  { key: 'popular', label: 'Phổ biến' }
                ].map((option) => (
                  <Button
                    key={option.key}
                    variant={sortBy === option.key ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSortBy(option.key as any)}
                    className={sortBy === option.key ? "bg-blue-600 text-white" : "text-gray-600 hover:text-blue-600"}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Tags Section */}
      {getPopularTags().length > 0 && (
        <section className="py-6 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-sm font-medium text-gray-700">Tags phổ biến:</span>
              <div className="flex gap-2 flex-wrap">
                {getPopularTags().map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="cursor-pointer hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-colors"
                    onClick={() => setSearchTerm(tag)}
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* All Articles - Enhanced */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {selectedCategory === "Tất cả" ? "Tất cả bài viết" : `Danh mục: ${selectedCategory}`}
              </h2>
              <p className="text-gray-600">
                {searchTerm ? `Kết quả tìm kiếm cho "${searchTerm}"` : 'Khám phá các bài viết công nghệ mới nhất'}
              </p>
            </div>
            <div className="text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
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
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-12 w-12 text-blue-500" />
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
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Xem tất cả bài viết
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <Card key={article.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer border-0 shadow-md hover:shadow-2xl">
                  <Link to={`/blog/${article.slug}`}>
                    <OptimizedImage
                      src={article.imageUrl || ''}
                      alt={article.title}
                      className="aspect-video w-full"
                    />
                  </Link>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200">
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
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      <Link to={`/blog/${article.slug}`} className="cursor-pointer">
                        {article.title}
                      </Link>
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <User className="h-4 w-4 mr-1" />
                        <span className="truncate">{article.author}</span>
                      </div>
                      <Link to={`/blog/${article.slug}`}>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-0 group/btn"
                        >
                          Đọc thêm 
                          <ArrowRight className="h-4 w-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                    
                    {article.tags && article.tags.length > 0 && (
                      <div className="flex items-center gap-1 flex-wrap">
                        <Tag className="h-3 w-3 text-gray-400 flex-shrink-0" />
                        {article.tags.slice(0, 3).map((tag, index) => (
                          <Badge 
                            key={index} 
                            variant="outline" 
                            className="text-xs hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 cursor-pointer transition-colors"
                            onClick={(e) => {
                              e.preventDefault();
                              setSearchTerm(tag);
                            }}
                          >
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