import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer className="bg-gray-50 mt-auto py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between space-y-8 md:space-y-0">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">스텝픽</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>주소: 서울특별시 강남구 테헤란로 123</p>
              <p>사업자등록번호: 123-45-67890</p>
              <p>대표: 홍길동</p>
              <p>전화: 02-123-4567</p>
              <p>이메일: contact@steppick.com</p>
            </div>
          </div>

          {/* Sitemap */}
          <div className="flex space-x-12">
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-900">서비스</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-sm text-gray-600 hover:text-gray-900">홈</Link></li>
                <li><Link to="/about" className="text-sm text-gray-600 hover:text-gray-900">소개</Link></li>
                <li><Link to="/services" className="text-sm text-gray-600 hover:text-gray-900">서비스</Link></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-900">고객지원</h4>
              <ul className="space-y-2">
                <li><Link to="/faq" className="text-sm text-gray-600 hover:text-gray-900">자주묻는질문</Link></li>
                <li><Link to="/contact" className="text-sm text-gray-600 hover:text-gray-900">문의하기</Link></li>
                <li><Link to="/terms" className="text-sm text-gray-600 hover:text-gray-900">이용약관</Link></li>
                <li><Link to="/privacy" className="text-sm text-gray-600 hover:text-gray-900">개인정보처리방침</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
