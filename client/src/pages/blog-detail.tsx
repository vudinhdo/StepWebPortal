import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, User, Tag, ArrowLeft, Clock, Share2 } from "lucide-react";
import { format } from "date-fns";
import type { Article } from "@shared/schema";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Link } from "wouter";

export default function BlogDetail() {
  const params = useParams();
  const slug = params.slug;

  const { data: article, isLoading, error } = useQuery<Article>({
    queryKey: ["/api/articles/slug", slug],
    enabled: !!slug,
  });

  const { data: relatedArticles = [] } = useQuery<Article[]>({
    queryKey: ["/api/articles/category", article?.category],
    enabled: !!article?.category,
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-20 pb-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded mb-6"></div>
              <div className="h-64 bg-gray-200 rounded mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-20 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold text-red-600 mb-4">Không tìm thấy bài viết</h1>
            <p className="text-gray-600 mb-8">Bài viết này không tồn tại hoặc đã bị xóa.</p>
            <Link to="/blog">
              <Button className="bg-[hsl(207,100%,40%)] hover:bg-[hsl(207,100%,35%)]">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Quay lại Blog
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Article Header */}
      <section className="pt-20 pb-8 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link to="/blog">
            <Button variant="ghost" className="mb-6 hover:bg-gray-100">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại Blog
            </Button>
          </Link>
          
          <div className="flex items-center gap-3 mb-6">
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
          
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {article.title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {article.excerpt}
          </p>
          
          <div className="flex items-center justify-between border-t border-gray-200 pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[hsl(207,100%,40%)] rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">{article.author}</p>
                <p className="text-sm text-gray-500">Tác giả</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Chia sẻ
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {article.imageUrl && (
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="aspect-video overflow-hidden rounded-xl shadow-lg">
              <img 
                src={article.imageUrl} 
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* Article Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
              {article.content}
            </div>
          </div>
          
          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center gap-3 flex-wrap">
                <Tag className="h-5 w-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-600">Tags:</span>
                {article.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="hover:bg-gray-100 cursor-pointer">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 1 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Bài viết liên quan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedArticles
                .filter(a => a.id !== article.id)
                .slice(0, 3)
                .map((relatedArticle) => (
                <Card key={relatedArticle.id} className="overflow-hidden hover:shadow-xl transition-shadow group">
                  {relatedArticle.imageUrl ? (
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={relatedArticle.imageUrl} 
                        alt={relatedArticle.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video bg-gradient-to-br from-[hsl(207,100%,40%)] to-[hsl(207,100%,60%)] flex items-center justify-center">
                      <div className="text-white text-4xl font-bold opacity-30">
                        {relatedArticle.title.charAt(0)}
                      </div>
                    </div>
                  )}
                  
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                        {relatedArticle.category}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {formatDate(relatedArticle.createdAt)}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                      {relatedArticle.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
                      {relatedArticle.excerpt}
                    </p>
                    
                    <Link to={`/blog/${relatedArticle.slug}`}>
                      <Button variant="ghost" size="sm" className="text-[hsl(207,100%,40%)] hover:text-[hsl(207,100%,35%)] p-0">
                        Đọc thêm
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}