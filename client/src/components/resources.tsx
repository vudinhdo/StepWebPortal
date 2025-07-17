export default function Resources() {
  const articles = [
    {
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300",
      title: "Cách chọn Cloud Server phù hợp",
      description: "Hướng dẫn chi tiết về việc lựa chọn giải pháp cloud phù hợp với nhu cầu doanh nghiệp.",
      href: "#cloud-guide"
    },
    {
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300",
      title: "Bảo mật Email doanh nghiệp",
      description: "Những biện pháp bảo mật cần thiết để bảo vệ hệ thống email doanh nghiệp.",
      href: "#email-security"
    },
    {
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300",
      title: "Xu hướng DevOps 2025",
      description: "Những xu hướng mới nhất trong DevOps và cách áp dụng vào doanh nghiệp.",
      href: "#devops-trends"
    }
  ];

  return (
    <section id="resources" className="py-20 bg-[hsl(210,17%,96%)]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[hsl(207,100%,40%)] mb-4">
            Tài nguyên hữu ích
          </h2>
          <p className="text-xl text-gray-600">
            Cập nhật kiến thức công nghệ và xu hướng IT
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-48 object-cover" 
              />
              <div className="p-6">
                <h3 className="font-semibold text-[hsl(207,100%,40%)] mb-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {article.description}
                </p>
                <a 
                  href={article.href} 
                  className="text-[hsl(207,100%,40%)] hover:text-[hsl(207,100%,35%)] font-semibold text-sm"
                >
                  Đọc thêm →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
