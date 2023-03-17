import React from 'react';
import './footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>Copyright &copy; {currentYear} Chirag Mandal All rights reserved.</p>
    </footer>
  );
}

export default Footer;
