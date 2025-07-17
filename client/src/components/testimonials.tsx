export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[hsl(207,100%,40%)] mb-4">
            Các doanh nghiệp hàng đầu tin dùng STEP
          </h2>
          <p className="text-xl text-gray-600">
            Hàng ngàn SMEs đã tối ưu hóa hạ tầng với chúng tôi
          </p>
        </div>
        
        {/* Modern IT infrastructure */}
        <div className="mb-16">
          <div className="bg-[hsl(210,17%,96%)] rounded-2xl p-8">
            {/* Professional team discussion about IT infrastructure */}
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=600" 
              alt="Professional business team discussing IT infrastructure" 
              className="rounded-xl shadow-lg w-full h-64 object-cover mb-8" 
            />
            <div className="text-center">
              <blockquote className="text-lg text-gray-700 italic mb-4">
                "STEP đã giúp chúng tôi xây dựng hạ tầng CNTT hiện đại và bảo mật. Đội ngũ chuyên nghiệp và hỗ trợ tận tình 24/7."
              </blockquote>
              <div className="text-[hsl(207,100%,40%)] font-semibold">
                CEO - Công ty Công nghệ ABC
              </div>
            </div>
          </div>
        </div>

        {/* Customer Logos Placeholder */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-50">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-gray-100 rounded-lg p-6 text-center">
              <div className="text-gray-400 text-sm">Logo khách hàng</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
