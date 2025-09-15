import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import type { Article } from "@shared/schema";

export default function Resources() {
  const { data: articles = [] } = useQuery<Article[]>({
    queryKey: ["/api/articles/published"],
  });

  return (
    <section id="resources" className="py-20 bg-[hsl(210,17%,96%)]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="h2 text-[hsl(207,100%,40%)] mb-4">
            Tài nguyên hữu ích
          </h2>
          <p className="lead">
            Cập nhật kiến thức công nghệ và xu hướng IT
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.slice(0, 3).map((article, index) => (
            <div key={article.id} className="bg-white rounded-xl overflow-hidden shadow-lg step-card-hover step-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
              {article.imageUrl && (
                <img 
                  src={article.imageUrl} 
                  alt={article.title} 
                  className="w-full h-48 object-cover" 
                />
              )}
              <div className="p-6">
                <h3 className="font-semibold text-[hsl(207,100%,40%)] mb-2 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {article.category}
                  </span>
                  <a 
                    href="/blog" 
                    className="text-[hsl(207,100%,40%)] hover:text-[hsl(207,100%,35%)] font-semibold text-sm inline-flex items-center group"
                  >
                    Đọc thêm 
                    <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {articles.length > 3 && (
          <div className="text-center mt-12">
            <Button 
              asChild
              className="bg-[hsl(207,100%,40%)] hover:bg-[hsl(207,100%,35%)] text-white px-8 py-3"
            >
              <a href="/blog">
                Xem tất cả bài viết
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
