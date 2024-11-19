import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Footer = () => {
    return (
        <footer className="bg-dark text-white py-4 mt-5">
            <div className="container text-center">
                <h5 className="mb-3">E-com Dashboard</h5>
                {/* Dynamic Year */}
                <p className="mb-0">© {new Date().getFullYear()} E-com Dashboard. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
