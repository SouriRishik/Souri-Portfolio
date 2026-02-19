import { motion } from 'framer-motion';
import Link from 'next/link';

const footerLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const scrollTo = (e, href) => {
  e.preventDefault();
  if (href === '#hero') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
};

export default function Footer() {
  return (
    <footer
      className="relative mt-20"
      style={{
        borderTop: '1px solid var(--border)',
        background: 'var(--bg-secondary)',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-[5fr_1fr_1fr] gap-10">
          <div>
            <h3 className="text-xl font-bold gradient-text mb-3">&lt;/Souri&gt;</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Data Science Engineering student passionate about building intelligent systems and solving real-world problems through code.
              Enthusiastic about technology, creativity, and making a positive impact.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              Quick Links
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => scrollTo(e, link.href)}
                    className="text-sm transition-colors hover:translate-x-1 inline-block"
                    style={{ color: 'var(--text-secondary)' }}
                    onMouseEnter={(e) => (e.target.style.color = 'var(--accent)')}
                    onMouseLeave={(e) => (e.target.style.color = 'var(--text-secondary)')}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              Connect
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/SouriRishik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm transition-colors hover:translate-x-1 inline-block"
                  style={{ color: 'var(--text-secondary)' }}
                  onMouseEnter={(e) => (e.target.style.color = 'var(--accent)')}
                  onMouseLeave={(e) => (e.target.style.color = 'var(--text-secondary)')}
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/souri-rishik-02a188284"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm transition-colors hover:translate-x-1 inline-block"
                  style={{ color: 'var(--text-secondary)' }}
                  onMouseEnter={(e) => (e.target.style.color = 'var(--accent)')}
                  onMouseLeave={(e) => (e.target.style.color = 'var(--text-secondary)')}
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="mailto:souri.rishik27@gmail.com"
                  className="text-sm transition-colors hover:translate-x-1 inline-block"
                  style={{ color: 'var(--text-secondary)' }}
                  onMouseEnter={(e) => (e.target.style.color = 'var(--accent)')}
                  onMouseLeave={(e) => (e.target.style.color = 'var(--text-secondary)')}
                >
                  Email
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/souri.rishik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm transition-colors hover:translate-x-1 inline-block"
                  style={{ color: 'var(--text-secondary)' }}
                  onMouseEnter={(e) => (e.target.style.color = 'var(--accent)')}
                  onMouseLeave={(e) => (e.target.style.color = 'var(--text-secondary)')}
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            &copy; {new Date().getFullYear()} Souri Rishik. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="status-dot" />
            <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              Open to collaborate
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
