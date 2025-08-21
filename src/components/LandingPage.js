import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="website-container">

      {/* === HEADER === */}
      <header className="header">
        <div className="logo">
          <h2>AI Appointment System</h2>
        </div>
        <div className="nav-links">
          <button className="nav-btn" onClick={() => navigate('/')}>Home</button>
          <button className="nav-btn" onClick={() => navigate('/studentlogin')}>Student Login</button>
          <button className="nav-btn" onClick={() => navigate('/teacherlogin')}>Teacher Login</button>
          <button className="nav-btn" onClick={() => navigate('/login')}>Admin Login</button>
        </div>
      </header>

      {/* === MAIN BODY === */}
      <main className="main-content dark-theme">

        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-text">
            <h1>
              Welcome to <span className="highlight">AI-Driven Appointment System</span>
            </h1>
           <p className="description">
  Our platform offers a seamless and intelligent solution for managing student-teacher appointments. Leveraging AI-enhanced scheduling, it ensures automatic conflict checks, optimal time slot allocation, and real-time updates. Students can easily view teacher availability, while teachers can manage bookings effortlessly. With robust security, a user-friendly interface, and smart reminders, you’ll never miss a slot again — making communication and learning more efficient than ever.
</p>

            <p className="cta-text">Book smarter. Learn faster. Teach better.</p>
          </div>

          <img
            src="/images/hero.jpg" // Ensure this is in your `public/images/` folder
            alt="Appointment"
            className="hero-image"
          />
        </div>

        {/* How It Works */}
        <section className="hero-text" style={{ marginTop: '50px' }}>
          <h2>How It Works</h2>
          <ul className="features">
            <li><strong>Students:</strong> Register, login, and view available teacher slots.</li>
            <li><strong>Teachers:</strong> Set your availability and manage appointment requests.</li>
            <li><strong>Admins:</strong> Manage users, oversee system activity, and maintain security.</li>
          </ul>
        </section>
      </main>

      {/* === FOOTER === */}
      <div className="footer-enhanced">
  <div className="footer-columns">
    <div className="footer-column">
      <h4>Get to Know Us</h4>
      <ul>
        <li>About Us</li>
        <li>Careers</li>
        <li>Press Releases</li>
        <li>AI Research</li>
      </ul>
    </div>
    <div className="footer-column">
      <h4>Connect with Us</h4>
      <ul>
        <li>LinkedIn</li>
        <li>Twitter</li>
        <li>Instagram</li>
        <li>YouTube</li>
      </ul>
    </div>
    <div className="footer-column">
      <h4>Build with Us</h4>
      <ul>
        <li>Developer Portal</li>
        <li>API Access</li>
        <li>Affiliate Program</li>
        <li>Documentation</li>
      </ul>
    </div>
    <div className="footer-column">
      <h4>Support</h4>
      <ul>
        <li>FAQs</li>
        <li>Help Center</li>
        <li>Feedback</li>
        <li>Contact Us</li>
      </ul>
    </div>
  </div>
  <div className="footer-bottom">
    <p>© 2025 AI-driven Appointment System. All rights reserved.</p>
  </div>
</div>

    </div>
  );
};

export default LandingPage;
