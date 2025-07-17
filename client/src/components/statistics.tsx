export default function Statistics() {
  const stats = [
    {
      number: "100+",
      label: "Giải pháp CNTT"
    },
    {
      number: "24/7",
      label: "Hỗ trợ cho SMEs"
    },
    {
      number: "1000+",
      label: "Doanh nghiệp tin dùng"
    },
    {
      number: "99.9%",
      label: "Thời gian hoạt động"
    }
  ];

  return (
    <section className="py-20 bg-[hsl(210,17%,96%)]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[hsl(207,100%,40%)] mb-4">
            Tại sao chọn STEP?
          </h2>
          <p className="text-xl text-gray-600">
            Đối tác tin cậy cho hạ tầng CNTT của bạn
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-[hsl(207,100%,40%)] mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
