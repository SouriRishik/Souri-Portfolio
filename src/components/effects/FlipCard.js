import { motion } from 'framer-motion';

export default function FlipCard({ cert }) {
  return (
    <div className="flip-container perspective-1000 w-full cursor-pointer group" style={{ aspectRatio: '1.3' }}>
      <div className="flip-inner preserve-3d relative w-full h-full rounded-2xl shadow-lg transition-colors duration-300">
        
        {/* FRONT FACE */}
        <div className="backface-hidden absolute inset-0 w-full h-full rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] group-hover:border-[var(--border-hover)] p-2 sm:p-3 transition-colors duration-300">
          
          <div className="relative w-full h-full rounded-xl overflow-hidden bg-white/5">
            {cert.image ? (
              <img 
                src={cert.image} 
                alt={cert.title} 
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" 
              />
            ) : (
              <div className="w-full h-full flex flex-col justify-center items-center opacity-50">
                <div className="w-16 h-16 mb-4 rounded-full flex items-center justify-center" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17"></path>
                  </svg>
                </div>
                <h4 className="font-bold text-lg leading-tight px-4 text-center" style={{ color: 'var(--text-primary)' }}>
                  {cert.title}
                </h4>
              </div>
            )}
          </div>
          
        </div>

        {/* BACK FACE */}
        <div 
          className="backface-hidden rotate-y-180 absolute inset-0 w-full h-full rounded-2xl p-5 sm:p-6 flex flex-col justify-between"
          style={{ background: 'var(--bg-card)', backdropFilter: 'blur(16px) saturate(150%)', WebkitBackdropFilter: 'blur(16px) saturate(150%)' }}
        >
          <div>
            <span className="text-[10px] tracking-widest font-bold mb-2 uppercase block" style={{ color: 'var(--accent)' }}>
              {cert.issuer}
            </span>
            <h3 className="text-lg sm:text-xl font-bold mb-2 leading-tight line-clamp-2" style={{ color: 'var(--text-primary)' }}>
              {cert.title}
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed line-clamp-3 sm:line-clamp-4" style={{ color: 'var(--text-secondary)' }}>
              {cert.description}
            </p>
          </div>
          
          <a
            href={cert.verifyLink || '#'}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              if(!cert.verifyLink) e.preventDefault();
              e.stopPropagation();
            }}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 mt-2 rounded-lg font-medium text-sm transition-all hover:opacity-80"
            style={{
              border: '1px solid var(--accent)',
              color: 'var(--accent)',
              background: 'var(--accent-light)',
              width: 'fit-content'
            }}
          >
            Verify
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        </div>

      </div>
    </div>
  );
}
