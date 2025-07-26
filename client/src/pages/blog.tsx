import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Calendar, User, Tag, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import type { Article } from "@shared/schema";
import Header from "@/components/header";
import Footer from "@/components/footer";

const categories = [
  "Tất cả",
  "Technology",
  "DevOps",
  "Bảo mật mạng",
  "Xu hướng Cloud",
  "Phát triển web",
  "AI & Machine Learning",
  "Tin tức công nghệ",
  "Hướng dẫn kỹ thuật"
];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: articles = [], isLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles/published"],
  });

  const { data: featuredArticles = [] } = useQuery<Article[]>({
    queryKey: ["/api/articles/featured"],
  });

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === "Tất cả" || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateString: string | Date | null) => {
    if (!dateString) return "";
    return format(new Date(dateString), "dd/MM/yyyy");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-[hsl(207,100%,40%)] mb-6">
              Blog & Tin tức STEP
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Cập nhật xu hướng công nghệ mới nhất, hướng dẫn kỹ thuật và insight về ngành IT từ đội ngũ chuyên gia STEP
            </p>
            
            {/* Search Bar */}
            <div className="max-w-lg mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Tìm kiếm bài viết..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-[hsl(207,100%,40%)] mb-8 text-center">
              Bài viết nổi bật
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredArticles.slice(0, 3).map((article) => (
                <Card key={article.id} className="overflow-hidden hover:shadow-xl transition-shadow group">
                  {article.imageUrl && (
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={article.imageUrl} 
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary" className="bg-[hsl(207,100%,40%)] text-white">
                        {article.category}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {formatDate(article.createdAt)}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <User className="h-4 w-4 mr-1" />
                        {article.author}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-[hsl(207,100%,40%)] hover:text-[hsl(207,100%,35%)] p-0"
                      >
                        Đọc thêm <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories Filter */}
      <section className="py-8 bg-gray-50 border-y">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? 
                  "bg-[hsl(207,100%,40%)] hover:bg-[hsl(207,100%,35%)]" : 
                  "hover:bg-gray-100"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="aspect-video bg-gray-200"></div>
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded mb-3"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Không tìm thấy bài viết
              </h3>
              <p className="text-gray-600 mb-8">
                Thử thay đổi từ khóa tìm kiếm hoặc danh mục để xem thêm bài viết.
              </p>
              <Button onClick={() => {
                setSearchTerm("");
                setSelectedCategory("Tất cả");
              }}>
                Xem tất cả bài viết
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <Card key={article.id} className="overflow-hidden hover:shadow-xl transition-shadow group">
                  {article.imageUrl && (
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={article.imageUrl} 
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                        {article.category}
                      </Badge>
                      <span className="text-sm text-gray-500 flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDate(article.createdAt)}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <User className="h-4 w-4 mr-1" />
                        {article.author}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-[hsl(207,100%,40%)] hover:text-[hsl(207,100%,35%)] p-0"
                      >
                        Đọc thêm <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                    {article.tags && article.tags.length > 0 && (
                      <div className="flex items-center gap-1 mt-4 flex-wrap">
                        <Tag className="h-3 w-3 text-gray-400" />
                        {article.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
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