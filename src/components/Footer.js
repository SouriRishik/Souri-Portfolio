const footerLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Background', href: '#about' },
  { label: 'Selected Work', href: '#projects' },
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
    <footer className="w-full border-t border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-3xl pt-16 pb-8 mt-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
          <div className="col-span-2 md:col-span-6 lg:col-span-5 text-center md:text-left">
            <h3 className="text-2xl font-display font-semibold mb-4 tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Souri Rishik
            </h3>
            <p className="text-sm leading-relaxed max-w-md mx-auto md:mx-0" style={{ color: 'var(--text-secondary)' }}>
              Data Science Engineering student passionate about building intelligent systems and solving real-world problems through code. Enthusiastic about technology, creativity, and making a positive impact.
            </p>
          </div>

          <div className="col-span-1 md:col-span-3 lg:col-span-2 lg:col-start-9">
            <h4 className="text-sm font-semibold mb-4 tracking-wide" style={{ color: 'var(--text-primary)' }}>
              Navigation
            </h4>
            <ul className="space-y-3 text-sm">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => scrollTo(e, link.href)}
                    className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 md:col-span-3 lg:col-span-2">
            <h4 className="text-sm font-semibold mb-4 tracking-wide" style={{ color: 'var(--text-primary)' }}>
              Connect
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="https://github.com/SouriRishik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:translate-x-1 inline-block transition-all duration-200"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/souri-rishik-02a188284"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:translate-x-1 inline-block transition-all duration-200"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="mailto:souri.rishik27@gmail.com"
                  className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:translate-x-1 inline-block transition-all duration-200"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[var(--glass-border)] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            &copy; {new Date().getFullYear()} Souri Rishik. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
              Available for opportunities
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
