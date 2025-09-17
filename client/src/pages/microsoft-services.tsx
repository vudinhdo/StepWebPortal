export default function MicrosoftServices() {
  const toggleFAQ = (index: number) => {
    const answer = document.getElementById(`faq-${index}`);
    const icon = answer?.previousElementSibling?.querySelector('.faq-icon');
    
    // Close all other FAQs
    document.querySelectorAll('.faq-answer').forEach((faq, i) => {
      if (i !== index && faq.classList.contains('open')) {
        faq.classList.remove('open');
        faq.previousElementSibling?.querySelector('.faq-icon')?.classList.remove('open');
      }
    });
    
    // Toggle current FAQ
    answer?.classList.toggle('open');
    icon?.classList.toggle('open');
  };

  const submitContact = (serviceName = '') => {
    alert(`Cảm ơn bạn đã quan tâm đến ${serviceName || 'dịch vụ Microsoft'} của chúng tôi! Chúng tôi sẽ liên hệ với bạn trong 24h.`);
  };

  return (
    <>
      <style>{`
        .microsoft-page {
          font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
          line-height: 1.6;
          color: #242424;
          background-color: #ffffff;
          scroll-behavior: smooth;
          min-height: 100vh;
          padding: 0;
          margin: 0;
        }
        
        .ms-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }
        
        /* Main Title Section */
        .ms-main-title {
          background: linear-gradient(135deg, #0078d4 0%, #005a9e 100%);
          color: white;
          text-align: center;
          padding: 80px 0 60px;
          position: relative;
          overflow: hidden;
        }
        
        .ms-main-title::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 200%;
          height: 200%;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse"><path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1"/></pattern></defs><rect width="100%" height="100%" fill="url(%23grid)"/></svg>');
          opacity: 0.4;
        }
        
        .ms-main-title .ms-container {
          position: relative;
          z-index: 2;
        }
        
        .ms-main-title h1 {
          font-size: clamp(2.8rem, 6vw, 4rem);
          font-weight: 700;
          margin: 0;
          letter-spacing: -0.02em;
          line-height: 1.2;
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        /* Services Section */
        .ms-services {
          padding: 80px 0;
          background: #ffffff;
        }
        
        .ms-section-title {
          text-align: center;
          margin-bottom: 60px;
        }
        
        .ms-section-title h2 {
          font-size: clamp(2.2rem, 4vw, 2.8rem);
          font-weight: 700;
          color: #0078d4;
          margin-bottom: 16px;
          letter-spacing: -0.02em;
        }
        
        .ms-section-title p {
          font-size: 1.125rem;
          color: #605e5c;
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
        }
        
        .ms-services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
          gap: 32px;
          margin-top: 64px;
        }
        
        .ms-service-card {
          background: #ffffff;
          border-radius: 12px;
          padding: 40px 32px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08), 0 4px 20px rgba(0,0,0,0.04);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid #e1dfdd;
          position: relative;
          overflow: hidden;
        }
        
        .ms-service-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, #0078d4, #106ebe);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }
        
        .ms-service-card:hover::before {
          transform: scaleX(1);
        }
        
        .ms-service-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 8px 25px rgba(0,120,212,0.12), 0 15px 35px rgba(0,0,0,0.08);
          border-color: #0078d4;
        }
        
        .ms-service-icon {
          width: 72px;
          height: 72px;
          background: linear-gradient(135deg, #0078d4, #106ebe);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          font-size: 28px;
          color: white;
          box-shadow: 0 4px 12px rgba(0,120,212,0.3);
        }
        
        .ms-service-card h3 {
          font-size: 1.75rem;
          font-weight: 700;
          color: #242424;
          margin-bottom: 16px;
          letter-spacing: -0.01em;
        }
        
        .ms-service-card p {
          color: #605e5c;
          line-height: 1.7;
          margin-bottom: 24px;
          font-size: 1rem;
        }
        
        .ms-service-features {
          list-style: none;
          margin: 0 0 32px 0;
          padding: 0;
        }
        
        .ms-service-features li {
          display: flex;
          align-items: center;
          margin-bottom: 12px;
          color: #323130;
          font-size: 0.95rem;
          line-height: 1.5;
        }
        
        .ms-service-features li::before {
          content: '✓';
          color: #107c10;
          font-weight: 700;
          margin-right: 12px;
          width: 20px;
          font-size: 16px;
        }
        
        .ms-pricing-section {
          background: linear-gradient(135deg, #f8f9fa, #f3f2f1);
          padding: 24px;
          border-radius: 8px;
          margin-bottom: 32px;
          border: 1px solid #edebe9;
        }
        
        .ms-pricing-options {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
          gap: 20px;
        }
        
        .ms-pricing-option {
          text-align: center;
        }
        
        .ms-price {
          font-size: 1.5rem;
          font-weight: 700;
          color: #0078d4;
          display: block;
          letter-spacing: -0.01em;
        }
        
        .ms-price-label {
          font-size: 0.875rem;
          color: #605e5c;
          margin-top: 4px;
          font-weight: 500;
        }
        
        .ms-btn-secondary {
          display: inline-block;
          background: #0078d4;
          color: white;
          padding: 14px 28px;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 600;
          transition: all 0.2s ease;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          letter-spacing: 0.01em;
        }
        
        .ms-btn-secondary:hover {
          background: #106ebe;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0,120,212,0.25);
        }
        
        .ms-btn-secondary:active {
          transform: translateY(0);
        }
        
        /* Comparison Table */
        .ms-comparison {
          padding: 80px 0;
          background: #faf9f8;
        }
        
        .ms-comparison-table {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          margin-top: 64px;
          border: 1px solid #e1dfdd;
        }
        
        .ms-comparison-table table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .ms-comparison-table th {
          background: linear-gradient(135deg, #0078d4, #005a9e);
          color: white;
          padding: 24px 20px;
          text-align: left;
          font-weight: 700;
          font-size: 1rem;
          letter-spacing: 0.01em;
        }
        
        .ms-comparison-table th:first-child {
          background: linear-gradient(135deg, #005a9e, #004578);
          font-weight: 700;
        }
        
        .ms-comparison-table td {
          padding: 20px;
          border-bottom: 1px solid #f3f2f1;
          vertical-align: middle;
          font-size: 0.95rem;
        }
        
        .ms-comparison-table tr:nth-child(even) {
          background: #faf9f8;
        }
        
        .ms-comparison-table tr:hover {
          background: #f3f2f1;
        }
        
        .ms-feature-name {
          font-weight: 600;
          color: #242424;
        }
        
        .ms-check {
          color: #107c10;
          font-weight: 700;
          font-size: 1.25rem;
        }
        
        .ms-cross {
          color: #d13438;
          font-weight: 700;
          font-size: 1.25rem;
        }
        
        /* FAQ Section */
        .ms-faq {
          padding: 80px 0;
          background: #ffffff;
        }
        
        .ms-faq-container {
          max-width: 900px;
          margin: 0 auto;
        }
        
        .ms-faq-item {
          background: white;
          border-radius: 12px;
          margin-bottom: 16px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          overflow: hidden;
          border: 1px solid #e1dfdd;
          transition: all 0.2s ease;
        }
        
        .ms-faq-item:hover {
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        
        .ms-faq-question {
          width: 100%;
          padding: 24px 28px;
          background: none;
          border: none;
          text-align: left;
          font-size: 1.125rem;
          font-weight: 600;
          color: #242424;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.2s ease;
          line-height: 1.4;
        }
        
        .ms-faq-question:hover {
          background: #faf9f8;
        }
        
        .faq-answer {
          padding: 0 28px;
          max-height: 0;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: #faf9f8;
        }
        
        .faq-answer.open {
          padding: 24px 28px;
          max-height: 200px;
        }
        
        .faq-answer p {
          color: #605e5c;
          line-height: 1.7;
          margin: 0;
          font-size: 1rem;
        }
        
        .faq-icon {
          transition: transform 0.3s ease;
          font-size: 1.25rem;
          color: #0078d4;
          font-weight: bold;
        }
        
        .faq-icon.open {
          transform: rotate(180deg);
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .ms-container {
            padding: 0 20px;
          }
          
          .ms-main-title {
            padding: 60px 0 40px;
          }
          
          .ms-main-title h1 {
            font-size: 2.5rem;
          }
          
          .ms-services,
          .ms-comparison,
          .ms-faq {
            padding: 60px 0;
          }
          
          .ms-services-grid {
            grid-template-columns: 1fr;
            gap: 24px;
            margin-top: 48px;
          }
          
          .ms-service-card {
            padding: 32px 24px;
          }
          
          .ms-comparison-table {
            font-size: 0.875rem;
            overflow-x: auto;
          }
          
          .ms-comparison-table th,
          .ms-comparison-table td {
            padding: 16px 12px;
          }
          
          .ms-faq-question {
            padding: 20px 24px;
            font-size: 1rem;
          }
          
          .faq-answer.open {
            padding: 20px 24px;
          }
          
          .ms-pricing-options {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }
        
        @media (max-width: 480px) {
          .ms-container {
            padding: 0 16px;
          }
          
          .ms-main-title h1 {
            font-size: 2rem;
          }
          
          .ms-service-card {
            padding: 24px 20px;
          }
          
          .ms-service-icon {
            width: 64px;
            height: 64px;
            font-size: 24px;
          }
        }
        
        /* Accessibility improvements */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        /* Focus states for accessibility */
        .ms-btn-secondary:focus,
        .ms-faq-question:focus {
          outline: 2px solid #0078d4;
          outline-offset: 2px;
        }
      `}</style>

      <div className="microsoft-page">
        {/* Main Title Section */}
        <section className="ms-main-title">
          <div className="ms-container">
            <h1 data-testid="main-title">Giải pháp Microsoft cho Doanh nghiệp và Cá nhân</h1>
          </div>
        </section>

        {/* Services Section */}
        <section className="ms-services" id="services" data-testid="services-section">
          <div className="ms-container">
            <div className="ms-section-title">
              <h2 data-testid="services-title">Các Dịch Vụ Chính</h2>
              <p data-testid="services-subtitle">Lựa chọn sản phẩm Microsoft phù hợp với nhu cầu của bạn với chất lượng bảo đảm và hỗ trợ chuyên nghiệp</p>
            </div>
            
            <div className="ms-services-grid">
              {/* Windows Licenses */}
              <div className="ms-service-card" id="windows" data-testid="windows-service">
                <div className="ms-service-icon">🪟</div>
                <h3 data-testid="windows-title">Windows Licenses</h3>
                <p data-testid="windows-description">
                  Windows 11 bản quyền chính thức với bảo mật cao cấp, hiệu suất tối ưu và hỗ trợ cập nhật liên tục từ Microsoft.
                </p>
                
                <ul className="ms-service-features">
                  <li>Bảo mật nâng cao với Windows Defender tích hợp</li>
                  <li>Hiệu suất được cải thiện đến 20% so với phiên bản cũ</li>
                  <li>Giao diện hiện đại với thiết kế Fluent Design</li>
                  <li>Tương thích hoàn hảo với phần cứng mới nhất</li>
                  <li>Microsoft Teams và Xbox Game Pass tích hợp</li>
                  <li>Hỗ trợ đa màn hình và làm việc từ xa</li>
                </ul>
                
                <div className="ms-pricing-section">
                  <div className="ms-pricing-options">
                    <div className="ms-pricing-option">
                      <div className="ms-price" data-testid="windows-home-price">2,890,000₫</div>
                      <div className="ms-price-label">Home</div>
                    </div>
                    <div className="ms-pricing-option">
                      <div className="ms-price" data-testid="windows-pro-price">4,490,000₫</div>
                      <div className="ms-price-label">Pro</div>
                    </div>
                    <div className="ms-pricing-option">
                      <div className="ms-price" data-testid="windows-enterprise-price">6,990,000₫</div>
                      <div className="ms-price-label">Enterprise</div>
                    </div>
                  </div>
                </div>
                
                <button 
                  className="ms-btn-secondary" 
                  data-testid="windows-cta"
                  onClick={() => submitContact('Windows')}
                >
                  Mua Windows
                </button>
              </div>
              
              {/* Office 365 */}
              <div className="ms-service-card" id="office365" data-testid="office365-service">
                <div className="ms-service-icon">📊</div>
                <h3 data-testid="office365-title">Office 365 Licenses</h3>
                <p data-testid="office365-description">
                  Gói ứng dụng văn phòng hoàn chỉnh với Word, Excel, PowerPoint, Outlook và OneDrive cloud storage dung lượng lớn.
                </p>
                
                <ul className="ms-service-features">
                  <li>Word, Excel, PowerPoint, Outlook phiên bản mới nhất</li>
                  <li>1TB OneDrive cloud storage cho mỗi người dùng</li>
                  <li>Microsoft Teams với tính năng họp online cao cấp</li>
                  <li>Cập nhật tự động và các tính năng mới liên tục</li>
                  <li>Hỗ trợ đa nền tảng (PC, Mac, Mobile, Web)</li>
                  <li>Chia sẻ và cộng tác thời gian thực</li>
                </ul>
                
                <div className="ms-pricing-section">
                  <div className="ms-pricing-options">
                    <div className="ms-pricing-option">
                      <div className="ms-price" data-testid="office365-personal-price">159,000₫</div>
                      <div className="ms-price-label">Personal/tháng</div>
                    </div>
                    <div className="ms-pricing-option">
                      <div className="ms-price" data-testid="office365-family-price">219,000₫</div>
                      <div className="ms-price-label">Family/tháng</div>
                    </div>
                    <div className="ms-pricing-option">
                      <div className="ms-price" data-testid="office365-business-price">279,000₫</div>
                      <div className="ms-price-label">Business/tháng</div>
                    </div>
                  </div>
                </div>
                
                <button 
                  className="ms-btn-secondary" 
                  data-testid="office365-cta"
                  onClick={() => submitContact('Office 365')}
                >
                  Mua Office 365
                </button>
              </div>
              
              {/* Other Microsoft Services */}
              <div className="ms-service-card" data-testid="other-services">
                <div className="ms-service-icon">☁️</div>
                <h3 data-testid="other-services-title">Dịch Vụ Microsoft Khác</h3>
                <p data-testid="other-services-description">
                  Các giải pháp Microsoft nâng cao cho doanh nghiệp và tổ chức với nhu cầu đặc biệt và quy mô lớn.
                </p>
                
                <ul className="ms-service-features">
                  <li>Microsoft Azure Cloud Platform - Infrastructure as a Service</li>
                  <li>Microsoft 365 Enterprise với bảo mật nâng cao</li>
                  <li>Windows Server Licenses cho datacenter</li>
                  <li>SQL Server Licenses với hiệu suất cao</li>
                  <li>Exchange Server cho email doanh nghiệp</li>
                  <li>Power Platform (Power BI, Power Apps, Power Automate)</li>
                </ul>
                
                <div className="ms-pricing-section">
                  <div className="ms-pricing-options">
                    <div className="ms-pricing-option">
                      <div className="ms-price" data-testid="azure-price">Liên hệ</div>
                      <div className="ms-price-label">Azure Cloud</div>
                    </div>
                    <div className="ms-pricing-option">
                      <div className="ms-price" data-testid="server-price">Liên hệ</div>
                      <div className="ms-price-label">Server Licenses</div>
                    </div>
                    <div className="ms-pricing-option">
                      <div className="ms-price" data-testid="enterprise-price">Liên hệ</div>
                      <div className="ms-price-label">Enterprise</div>
                    </div>
                  </div>
                </div>
                
                <button 
                  className="ms-btn-secondary" 
                  data-testid="other-services-cta"
                  onClick={() => submitContact('Microsoft Services')}
                >
                  Tư vấn chi tiết
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="ms-comparison" data-testid="comparison-section">
          <div className="ms-container">
            <div className="ms-section-title">
              <h2 data-testid="comparison-title">Bảng So Sánh Office 365</h2>
              <p data-testid="comparison-subtitle">So sánh chi tiết các gói Office 365 để lựa chọn phù hợp với nhu cầu sử dụng của bạn</p>
            </div>
            
            <div className="ms-comparison-table">
              <table>
                <thead>
                  <tr>
                    <th data-testid="comparison-feature-header">Tính năng</th>
                    <th data-testid="comparison-personal-header">Personal</th>
                    <th data-testid="comparison-family-header">Family</th>
                    <th data-testid="comparison-business-header">Business</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="ms-feature-name">Số người dùng</td>
                    <td data-testid="personal-users">1 người</td>
                    <td data-testid="family-users">Tối đa 6 người</td>
                    <td data-testid="business-users">Không giới hạn</td>
                  </tr>
                  <tr>
                    <td className="ms-feature-name">Ứng dụng Desktop đầy đủ</td>
                    <td data-testid="personal-desktop"><span className="ms-check">✓</span></td>
                    <td data-testid="family-desktop"><span className="ms-check">✓</span></td>
                    <td data-testid="business-desktop"><span className="ms-check">✓</span></td>
                  </tr>
                  <tr>
                    <td className="ms-feature-name">OneDrive Cloud Storage</td>
                    <td data-testid="personal-storage">1TB</td>
                    <td data-testid="family-storage">6TB (1TB/người)</td>
                    <td data-testid="business-storage">1TB/người</td>
                  </tr>
                  <tr>
                    <td className="ms-feature-name">Microsoft Teams</td>
                    <td data-testid="personal-teams"><span className="ms-cross">✗</span></td>
                    <td data-testid="family-teams"><span className="ms-check">✓</span></td>
                    <td data-testid="business-teams"><span className="ms-check">✓</span></td>
                  </tr>
                  <tr>
                    <td className="ms-feature-name">Outlook Email</td>
                    <td data-testid="personal-outlook"><span className="ms-check">✓</span></td>
                    <td data-testid="family-outlook"><span className="ms-check">✓</span></td>
                    <td data-testid="business-outlook"><span className="ms-check">✓</span></td>
                  </tr>
                  <tr>
                    <td className="ms-feature-name">Email doanh nghiệp</td>
                    <td data-testid="personal-business-email"><span className="ms-cross">✗</span></td>
                    <td data-testid="family-business-email"><span className="ms-cross">✗</span></td>
                    <td data-testid="business-business-email"><span className="ms-check">✓</span></td>
                  </tr>
                  <tr>
                    <td className="ms-feature-name">SharePoint</td>
                    <td data-testid="personal-sharepoint"><span className="ms-cross">✗</span></td>
                    <td data-testid="family-sharepoint"><span className="ms-cross">✗</span></td>
                    <td data-testid="business-sharepoint"><span className="ms-check">✓</span></td>
                  </tr>
                  <tr>
                    <td className="ms-feature-name">Admin Console</td>
                    <td data-testid="personal-admin"><span className="ms-cross">✗</span></td>
                    <td data-testid="family-admin"><span className="ms-cross">✗</span></td>
                    <td data-testid="business-admin"><span className="ms-check">✓</span></td>
                  </tr>
                  <tr>
                    <td className="ms-feature-name">Hỗ trợ 24/7</td>
                    <td data-testid="personal-support"><span className="ms-cross">✗</span></td>
                    <td data-testid="family-support"><span className="ms-check">✓</span></td>
                    <td data-testid="business-support"><span className="ms-check">✓</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="ms-faq" data-testid="faq-section">
          <div className="ms-container">
            <div className="ms-section-title">
              <h2 data-testid="faq-title">Câu Hỏi Thường Gặp</h2>
              <p data-testid="faq-subtitle">Những câu hỏi phổ biến về việc mua và sử dụng sản phẩm Microsoft bản quyền</p>
            </div>
            
            <div className="ms-faq-container">
              <div className="ms-faq-item" data-testid="faq-item-1">
                <button className="ms-faq-question" onClick={() => toggleFAQ(0)} data-testid="faq-question-1">
                  <span>Bản quyền Microsoft có khác gì với bản crack không?</span>
                  <span className="faq-icon">▼</span>
                </button>
                <div className="faq-answer" id="faq-0" data-testid="faq-answer-1">
                  <p>Bản quyền Microsoft đảm bảo tính pháp lý hoàn toàn, bảo mật cao với cập nhật định kỳ, hỗ trợ chính thức từ Microsoft và không có nguy cơ virus/malware. Bản crack có nhiều rủi ro bảo mật, không được cập nhật và vi phạm pháp luật về bản quyền.</p>
                </div>
              </div>
              
              <div className="ms-faq-item" data-testid="faq-item-2">
                <button className="ms-faq-question" onClick={() => toggleFAQ(1)} data-testid="faq-question-2">
                  <span>Tôi có thể cài đặt Office 365 trên bao nhiêu thiết bị?</span>
                  <span className="faq-icon">▼</span>
                </button>
                <div className="faq-answer" id="faq-1" data-testid="faq-answer-2">
                  <p>Office 365 Personal cho phép cài đặt trên tối đa 5 thiết bị (PC, Mac, tablet, smartphone). Office 365 Family cho phép mỗi thành viên trong gia đình (tối đa 6 người) cài đặt trên 5 thiết bị riêng của họ, tổng cộng lên đến 30 thiết bị.</p>
                </div>
              </div>
              
              <div className="ms-faq-item" data-testid="faq-item-3">
                <button className="ms-faq-question" onClick={() => toggleFAQ(2)} data-testid="faq-question-3">
                  <span>Office 365 có thể sử dụng offline hoàn toàn không?</span>
                  <span className="faq-icon">▼</span>
                </button>
                <div className="faq-answer" id="faq-2" data-testid="faq-answer-3">
                  <p>Có, sau khi cài đặt và kích hoạt, bạn hoàn toàn có thể sử dụng Word, Excel, PowerPoint offline. Tuy nhiên, các tính năng đồng bộ đám mây, OneDrive, và một số template online cần kết nối internet để hoạt động tối ưu.</p>
                </div>
              </div>
              
              <div className="ms-faq-item" data-testid="faq-item-4">
                <button className="ms-faq-question" onClick={() => toggleFAQ(3)} data-testid="faq-question-4">
                  <span>Chính sách hoàn tiền và bảo hành như thế nào?</span>
                  <span className="faq-icon">▼</span>
                </button>
                <div className="faq-answer" id="faq-3" data-testid="faq-answer-4">
                  <p>Chúng tôi có chính sách hoàn tiền 100% trong 30 ngày đầu nếu sản phẩm không hoạt động đúng như mô tả. Bản quyền Microsoft được bảo hành trọn đời với hỗ trợ kỹ thuật miễn phí và cập nhật bảo mật thường xuyên.</p>
                </div>
              </div>
              
              <div className="ms-faq-item" data-testid="faq-item-5">
                <button className="ms-faq-question" onClick={() => toggleFAQ(4)} data-testid="faq-question-5">
                  <span>Làm thế nào để migrate từ Office cũ sang Office 365?</span>
                  <span className="faq-icon">▼</span>
                </button>
                <div className="faq-answer" id="faq-4" data-testid="faq-answer-5">
                  <p>Chúng tôi hỗ trợ miễn phí toàn bộ quá trình chuyển đổi: gỡ bỏ Office cũ, cài đặt Office 365 mới, và di chuyển dữ liệu. Tất cả file, email, và cài đặt cá nhân của bạn sẽ được bảo toàn và chuyển đổi một cách an toàn.</p>
                </div>
              </div>
              
              <div className="ms-faq-item" data-testid="faq-item-6">
                <button className="ms-faq-question" onClick={() => toggleFAQ(5)} data-testid="faq-question-6">
                  <span>Có thể sử dụng cùng lúc trên nhiều hệ điều hành khác nhau không?</span>
                  <span className="faq-icon">▼</span>
                </button>
                <div className="faq-answer" id="faq-5" data-testid="faq-answer-6">
                  <p>Hoàn toàn có thể! Office 365 hỗ trợ đa nền tảng: Windows, macOS, iOS, Android và thậm chí có thể sử dụng qua web browser. Dữ liệu được đồng bộ tự động giữa tất cả các thiết bị thông qua OneDrive.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}