import { motion } from "framer-motion";

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
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="h2 text-[hsl(207,100%,40%)] mb-4">
            Tại sao chọn STEP?
          </h2>
          <p className="lead">
            Đối tác tin cậy cho hạ tầng CNTT của bạn
          </p>
        </motion.div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              variants={{
                hidden: { opacity: 0, scale: 0.5 },
                visible: { opacity: 1, scale: 1 },
              }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="text-center"
            >
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 200,
                  damping: 10
                }}
                className="h1 text-[hsl(207,100%,40%)] mb-2"
              >
                {stat.number}
              </motion.div>
              <div className="text-gray-600">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
