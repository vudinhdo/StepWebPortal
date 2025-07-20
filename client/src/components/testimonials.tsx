import { motion } from "framer-motion";

export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-[hsl(207,100%,40%)] mb-4">
            Các doanh nghiệp hàng đầu tin dùng STEP
          </h2>
          <p className="text-xl text-gray-600">
            Hàng ngàn SMEs đã tối ưu hóa hạ tầng với chúng tôi
          </p>
        </motion.div>
        
        {/* Modern IT infrastructure */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="bg-[hsl(210,17%,96%)] rounded-2xl p-8">
            {/* Professional team discussion about IT infrastructure */}
            <motion.img 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=600" 
              alt="Professional business team discussing IT infrastructure" 
              className="rounded-xl shadow-lg w-full h-64 object-cover mb-8 transition-transform duration-300" 
            />
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <blockquote className="text-lg text-gray-700 italic mb-4">
                "STEP đã giúp chúng tôi xây dựng hạ tầng CNTT hiện đại và bảo mật. Đội ngũ chuyên nghiệp và hỗ trợ tận tình 24/7."
              </blockquote>
              <div className="text-[hsl(207,100%,40%)] font-semibold">
                CEO - Công ty Công nghệ ABC
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Customer Logos Placeholder */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 0.5,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
              },
            },
          }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[1, 2, 3, 4].map((i) => (
            <motion.div 
              key={i} 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 0.5, y: 0 },
              }}
              whileHover={{ opacity: 0.8, scale: 1.05 }}
              className="bg-gray-100 rounded-lg p-6 text-center transition-all duration-200"
            >
              <div className="text-gray-400 text-sm">Logo khách hàng</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
