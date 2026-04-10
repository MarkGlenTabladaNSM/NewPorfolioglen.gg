import { useState, useEffect, useContext } from 'react';
import { Sun, Moon, Menu, X, LogOut } from 'lucide-react';
import LoginModal from './LoginModal';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [theme, setTheme] = useState('dark');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const { isLoggedIn, logout } = useContext(AuthContext);

    const handleLogoClick = () => {
        if (!isLoggedIn) {
            setIsLoginModalOpen(true);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);

        // Check local storage for theme preference
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <header className="header" style={{
            position: 'fixed',
            top: 0,
            width: '100%',
            zIndex: 1000,
            transition: 'all 0.3s ease',
            padding: scrolled ? '1rem 0' : '1.5rem 0',
            background: scrolled ? 'rgba(var(--bg-rgb), 0.8)' : 'transparent',
            backdropFilter: scrolled ? 'blur(12px)' : 'none',
            borderBottom: scrolled ? '1px solid var(--glass-border)' : '1px solid transparent'
        }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'relative'
            }}>
                <div className="logo" onClick={handleLogoClick} style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    letterSpacing: '-0.5px',
                    cursor: isLoggedIn ? 'default' : 'pointer',
                    userSelect: 'none'
                }}>
                    Port<span className="text-gradient">folio.</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <nav className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
                        <ul>
                            <li><a href="#about" className="nav-link" onClick={() => setMobileMenuOpen(false)}>About</a></li>
                            <li><a href="#projects" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Projects</a></li>
                            <li><a href="#contact" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Contact</a></li>
                            <li><a href="#resume" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Resume</a></li>
                        </ul>
                    </nav>

                    <button
                        onClick={toggleTheme}
                        className="theme-toggle"
                        aria-label="Toggle theme"
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--text-primary)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '0.5rem',
                            borderRadius: '50%',
                            transition: 'background 0.3s ease'
                        }}
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    {isLoggedIn && (
                        <button
                            onClick={logout}
                            title="Admin Logout"
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#ff4d4f',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '0.5rem',
                                borderRadius: '50%',
                                transition: 'background 0.3s ease'
                            }}
                        >
                            <LogOut size={20} />
                        </button>
                    )}

                    <button
                        className="mobile-menu-btn"
                        onClick={toggleMobileMenu}
                        style={{
                            display: 'none',
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--text-primary)',
                            cursor: 'pointer',
                            padding: '0.5rem'
                        }}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>
            <style>{`
        .nav-menu ul {
          display: flex;
          gap: 2rem;
          list-style: none;
        }
        .nav-link {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-secondary);
          position: relative;
        }
        .nav-link:hover {
          color: var(--text-primary);
        }
        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -4px;
          left: 0;
          background: var(--accent-gradient);
          transition: width 0.3s ease;
        }
        .nav-link:hover::after {
          width: 100%;
        }
        .theme-toggle:hover {
          background: var(--glass-border) !important;
        }

        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: block !important;
          }
          .nav-menu {
            position: fixed;
            top: 0;
            right: -100%;
            width: 80%;
            height: 100vh;
            background: var(--bg-color);
            padding: 8rem 2rem;
            transition: 0.3s ease;
            box-shadow: -10px 0 30px rgba(0,0,0,0.5);
            z-index: -1;
          }
          .nav-menu.active {
            right: 0;
          }
          .nav-menu ul {
            flex-direction: column;
            gap: 3rem;
            align-items: center;
          }
          .nav-link {
            font-size: 1.5rem;
          }
        }
      `}</style>
            <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
        </header>
    );
};

export default Header;
