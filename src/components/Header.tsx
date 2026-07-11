import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'On Stage' },
  { to: '/on-set', label: 'On Set' },
  { to: '/portraits', label: 'Portraits' },
  { to: '/lifestyle', label: 'Lifestyle' },
  { to: '/contact', label: 'Contact' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="site-header">
      <nav className="nav" aria-label="Primary navigation">
        <div className="header-socials" aria-label="Social links">
          <a href="mailto:teogonzalesphoto@gmail.com" aria-label="Email">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m4 7 8 6 8-6" />
            </svg>
          </a>
          <a href="https://www.instagram.com/teotgonzales" target="_blank" rel="noreferrer" aria-label="Instagram">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/teo-gonzales-00962a420/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 9h4v11H4z" />
              <path d="M6 4.4a2.2 2.2 0 1 1 0 4.4 2.2 2.2 0 0 1 0-4.4z" />
              <path d="M10 9h3.8v1.5c.6-.9 1.7-1.8 3.4-1.8 2.5 0 4.3 1.7 4.3 5.1V20h-4v-5.5c0-1.5-.6-2.4-1.8-2.4-1 0-1.6.7-1.9 1.3-.1.2-.1.6-.1.9V20h-4V9z" />
            </svg>
          </a>
        </div>
        <NavLink className="brand" to="/" onClick={() => setIsOpen(false)}>
          TEO GONZALES
        </NavLink>
        <button
          className="menu-button"
          type="button"
          aria-expanded={isOpen}
          aria-controls="primary-menu"
          onClick={() => setIsOpen((current) => !current)}
        >
          Menu
        </button>
        <div className={`nav-links ${isOpen ? 'is-open' : ''}`} id="primary-menu">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'} onClick={() => setIsOpen(false)}>
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}
