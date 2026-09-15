import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';
import SocialDock from '@/components/SocialDock';
import Head from 'next/head';

const skills = [
  'Python', 'C/C++', 'Java', 'TypeScript', 'JavaScript', 'SQL', 'PostgreSQL', 'Oracle',
  'HTML', 'CSS', 'React.js', 'Next.js', 'Node.js', 'Express', 'Spring Boot',
  'TensorFlow', 'PyTorch', 'NumPy', 'Pandas', 'Keras', 'Scipy', 'Matplotlib', 'OpenCV',
  'ROS', 'ROS2', 'Git', 'GitHub Actions', 'Docker', 'AWS', 'Ubuntu'
];

const certifications = [
  {
    title: 'Generative AI with Large Language Models',
    issuer: 'DEEPLEARNING.AI · COURSERA',
    description: 'A comprehensive deep dive into the generative AI lifecycle. Covers transformer architecture, LLM training, fine-tuning, and deployment.',
    image: 'https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~EW0GN1TQR63F/CERTIFICATE_LANDING_PAGE~EW0GN1TQR63F.jpeg',
    verifyLink: 'https://www.coursera.org/account/accomplishments/verify/EW0GN1TQR63F',
  },
  {
    title: 'Natural Language Processing in TensorFlow',
    issuer: 'DEEPLEARNING.AI · COURSERA',
    description: 'Explores advanced NLP techniques including tokenization, sentiment analysis, word embeddings, RNNs, and LSTMs using TensorFlow.',
    image: 'https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~TJ6G1IAQFMF0/CERTIFICATE_LANDING_PAGE~TJ6G1IAQFMF0.jpeg',
    verifyLink: 'https://www.coursera.org/account/accomplishments/verify/TJ6G1IAQFMF0',
  },
  {
    title: 'MongoDB: The Complete Guide to NoSQL Database Development',
    issuer: 'COURSERA',
    description: 'Master MongoDB NoSQL database development, covering CRUD operations, indexing, aggregation framework, and data modeling.',
    image: 'https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~810F9ULM5FUB/CERTIFICATE_LANDING_PAGE~810F9ULM5FUB.jpeg',
    verifyLink: 'https://www.coursera.org/account/accomplishments/verify/810F9ULM5FUB',
  },
  {
    title: 'C++ Data Structures in the STL',
    issuer: 'COURSERA',
    description: 'An in-depth exploration of C++ Standard Template Library, focusing on vectors, maps, sets, and efficient algorithmic implementations.',
    image: 'https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~N3T1VU9RRU3F/CERTIFICATE_LANDING_PAGE~N3T1VU9RRU3F.jpeg',
    verifyLink: 'https://www.coursera.org/account/accomplishments/verify/N3T1VU9RRU3F',
  },
  {
    title: 'Build Your First GUI App With Java',
    issuer: 'COURSERA PROJECT NETWORK',
    description: 'Hands-on project developing a graphical user interface application using Java Swing and basic event-driven programming.',
    image: 'https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~62HTR5A2I5G6/CERTIFICATE_LANDING_PAGE~62HTR5A2I5G6.jpeg',
    verifyLink: 'https://www.coursera.org/account/accomplishments/verify/62HTR5A2I5G6',
  },
  {
    title: 'Introduction to Java Programming',
    issuer: 'COURSERA',
    description: 'Foundational concepts of Java programming including object-oriented design, syntax, control structures, and basic data types.',
    image: 'https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~O902CZA2WN7Y/CERTIFICATE_LANDING_PAGE~O902CZA2WN7Y.jpeg',
    verifyLink: 'https://www.coursera.org/account/accomplishments/verify/O902CZA2WN7Y',
  },
];

const education = [
  {
    institution: 'Manipal Institute of Technology, MAHE',
    duration: 'Jul 2023 — Sep 2027',
    degree: 'B.Tech in Data Science Engineering',
    logo: '/logos/mit-manipal.jpeg',
  },
  {
    institution: 'Mahatma Gandhi Memorial PU College',
    duration: 'Jul 2021 — Apr 2023',
    degree: 'Higher Secondary Education (PCMC)',
    logo: '/logos/mgm.png',
  },
  {
    institution: 'Little Rock Indian School',
    duration: '',
    degree: 'CBSE 10th Board',
    logo: '/logos/lris.jpeg',
  },
];

const experiences = [
  {
    role: 'Software Developer Intern',
    org: 'CodeLogs Technologies LLP',
    duration: 'May 2026 — Jul 2026',
    detail: 'Deployed an AWS serverless pipeline (S3, SQS, Lambda) and a Spring Boot Stripe backend for metered billing. Developed a React/Spring Boot admin portal automating 27,000+ products categorization and internal HR workflows.',
    logo: '/logos/codelogs.jpeg',
  },
  {
    role: 'Coding Subsystem Head',
    org: 'Robomanipal',
    duration: 'Sep 2025 — Present',
    detail: 'Enhanced the official Robomanipal website with 100%+ traffic growth and 98/100 Real Experience Score. Represented MIT MAHE at Technoxian 8.0 (quarterfinals). Secured 2nd Runner-Up at Robonautica, IISc Bangalore.',
    logo: '/logos/robomanipal.jpeg',
  },
  {
    role: 'Research Intern',
    org: 'Manipal Institute of Technology',
    duration: 'Jun 2025 — Jul 2025',
    detail: 'Engineered ML models (Gradient Boosting, CatBoost, XGBoost, Random Forest) to detect phishing URLs with 97.4% accuracy and 97.7% F1-score on 30,000+ samples. Deployed a Python-based web app.',
    logo: '/logos/mit-manipal.jpeg',
  },
];

const projects = [
  {
    title: 'PulseNotify',
    image: '/images/pulsenotify.png',
    description: 'Architected a scalable notification platform to schedule and broadcast templated alerts via Email, SMS, and Push, leveraging AWS SQS and Lambda. Implemented a distributed API rate limiter and offloaded token management to DynamoDB.',
    tags: ['Java', 'Spring Boot', 'PostgreSQL', 'AWS', 'Docker'],
    github: 'https://github.com/SouriRishik/PulseNotify',
  },
  {
    title: 'Planify',
    image: '/images/planify.png',
    description: 'Developed a full-stack project management platform featuring task filtering, interactive dashboards, and 15+ REST APIs. Optimized backend PostgreSQL and Node.js API performance, reducing response time by ~35%.',
    tags: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Docker'],
    github: 'https://github.com/SouriRishik/Planify',
    link: 'https://planify-project.vercel.app/',
  },
  {
    title: 'Sign Language Gesture Analysis',
    image: '/images/sign.png',
    description: 'Built a lightweight custom CNN (~227K parameters) to classify 24 static ASL hand gestures from the Sign Language MNIST dataset. Achieved 99.69% validation accuracy and demonstrated real-time webcam inference.',
    tags: ['Python', 'TensorFlow', 'Keras', 'OpenCV'],
    github: 'https://github.com/SouriRishik/Sign-Language-Gesture-Analysis',
  },
  {
    title: 'Phishing URL Detection',
    image: '/images/phishing.png',
    description: 'Engineered multiple ML models to detect phishing URLs, achieving 97.4% accuracy. Deployed a real-time Python web application reducing manual verification by 70%.',
    tags: ['Python', 'XGBoost', 'CatBoost', 'ML'],
    github: 'https://github.com/SouriRishik/Phising-URL-and-Website-Detection',
  },
  {
    title: 'Digit Recognition',
    image: '/images/digit.png',
    description: 'Developed a Feedforward Neural Network in TensorFlow/Keras with preprocessing, batch normalization, dropout, and L2 regularization for MNIST digit recognition. Achieved 98.13% classification accuracy.',
    tags: ['Python', 'TensorFlow', 'NumPy'],
    github: 'https://github.com/SouriRishik/MNIST-Dataset-Prediction',
  },
  {
    title: 'Open Volley',
    image: '/images/openvolley.png',
    description: 'Built a computer vision system in Python/OpenCV to track volleyball trajectories with 95% detection accuracy, processing 120+ frames per second for real-time analysis.',
    tags: ['Python', 'OpenCV', 'Computer Vision'],
    github: 'https://github.com/SouriRishik/OpenVolley',
  },
  {
    title: 'Autonav (RoboCUP@Work)',
    image: '/images/autonav.jpg',
    description: 'Programmed a 6-DOF Mecanum robot for RoboCUP@Work with 2D LiDAR and depth camera, using SLAM Toolbox and NAV2 for mapping and navigation. Achieved <10cm localization error in ROS2.',
    tags: ['ROS2', 'SLAM', 'LiDAR', 'NAV2'],
    github: 'https://github.com/SouriRishik/RCUP_scripts',
  },
  {
    title: 'Fastest Line Follower',
    image: '/images/linefollower.jpeg',
    description: 'Optimized PID algorithm improving motor precision by 30%. Created a Bluetooth-based Python GUI for real-time PID tuning. Competed at Technoxian 8.0, advancing to quarterfinals among 200+ teams.',
    tags: ['C', 'Python', 'PID', 'Embedded'],
    github: 'https://github.com/SouriRishik/LineFollower_Technoxian',
  },
];

export default function Home() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);
  const [emailError, setEmailError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status === 'success') setStatus('');
    if (e.target.name === 'email') {
      const val = e.target.value;
      if (val && !/^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(val)) {
        setEmailError('Please enter a valid @gmail.com address');
      } else {
        setEmailError('');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    setSending(true);

    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(formData.email)) {
      setEmailError('Please enter a valid @gmail.com address');
      setSending(false);
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setEmailError('');
      } else {
        const data = await res.json().catch(() => null);
        if (data?.message?.includes('gmail')) {
          setEmailError(data.message);
        } else {
          setStatus('error');
        }
      }
    } catch {
      setStatus('error');
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <Head>
        <title>Souri Rishik | Portfolio</title>
        <meta name="description" content="Portfolio of Souri Rishik — Data Science, AI, Robotics, and Full-Stack Development." />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </Head>
      <Navbar />
      <main>
        <HeroSection />

        {/* ==================== ABOUT SECTION ==================== */}
        <section id="about" className="section">
          <h2 className="section-title">Background</h2>
          <p className="section-subtitle">A blend of academic rigor and practical engineering.</p>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Experience Panel */}
            <div className="premium-glass p-8 lg:p-10">
              <h3 className="font-display text-2xl font-semibold mb-8">Experience</h3>
              <div className="space-y-8">
                {experiences.map((exp, i) => (
                  <div key={i} className="flex gap-5 items-start">
                    <div className="w-12 h-12 rounded-2xl overflow-hidden shrink-0 bg-white p-1 shadow-sm">
                      <img src={exp.logo} alt={exp.org} className="w-full h-full object-contain rounded-xl" />
                    </div>
                    <div>
                      <h4 className="font-display font-medium text-lg leading-tight mb-1">{exp.role}</h4>
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span style={{ color: 'var(--text-secondary)' }} className="text-sm">{exp.org}</span>
                        <span className="text-xs font-medium px-2 py-1 rounded-full" style={{ background: 'var(--glass-border)' }}>
                          {exp.duration}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{exp.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education & Skills Panel */}
            <div className="flex flex-col gap-8">
              <div className="premium-glass p-8 lg:p-10">
                <h3 className="font-display text-2xl font-semibold mb-8">Education</h3>
                <div className="space-y-6">
                  {education.map((edu, i) => (
                    <div key={i} className="flex gap-4 items-center">
                      <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 bg-white p-1 shadow-sm">
                        <img src={edu.logo} alt={edu.institution} className="w-full h-full object-contain rounded-full" />
                      </div>
                      <div>
                        <h4 className="font-medium text-base leading-tight mb-0.5">{edu.institution}</h4>
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{edu.degree}</p>
                          {edu.duration && (
                            <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: 'var(--glass-border)' }}>
                              {edu.duration}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="premium-glass p-8 lg:p-10 flex-grow">
                <h3 className="font-display text-2xl font-semibold mb-6">Core Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span 
                      key={skill} 
                      className="px-3 py-1.5 text-sm font-medium rounded-full transition-colors duration-200 cursor-default bg-[var(--glass-border)] text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== PROJECTS SECTION ==================== */}
        <section id="projects" className="section">
          <h2 className="section-title">Selected Work</h2>
          <p className="section-subtitle">A collection of projects spanning robotics, AI, and full-stack development.</p>
          
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {projects.map((project, i) => (
              <div 
                key={project.title} 
                className="premium-glass premium-glass-hover flex flex-col overflow-hidden group"
              >
                <div className="h-64 w-full p-6 flex items-center justify-center bg-[rgba(0,0,0,0.02)] dark:bg-[rgba(255,255,255,0.02)] border-b border-[var(--glass-border)] relative">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[var(--glass-border)] to-transparent rounded-xl flex items-center justify-center">
                      <span className="text-xl font-display font-medium text-[var(--text-muted)] opacity-50 tracking-widest">{project.title}</span>
                    </div>
                  )}
                </div>

                <div className="p-6 md:p-8 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-3 gap-4">
                    <h3 className="font-display text-2xl font-semibold">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-4 text-[var(--text-secondary)] mt-1 shrink-0">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)] hover:scale-110 transition-all" aria-label="GitHub Repository">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                          </svg>
                        </a>
                      )}
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)] hover:scale-110 transition-all" aria-label="Live Demo">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-base leading-relaxed mb-6 flex-grow" style={{ color: 'var(--text-secondary)' }}>
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tech-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ==================== CERTIFICATIONS SECTION ==================== */}
        <section className="section">
          <h2 className="section-title">Certifications</h2>
          <p className="section-subtitle">Continuous learning and skill validation.</p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert) => (
              <div 
                key={cert.title}
                className="premium-glass premium-glass-hover p-6 flex flex-col h-full group"
              >
                <div className="w-full aspect-video rounded-xl overflow-hidden mb-5">
                  <img src={cert.image} alt={cert.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                
                <div className="flex justify-between items-start mb-2 gap-3">
                  <h4 className="font-display font-medium text-lg leading-tight">{cert.title}</h4>
                  {cert.verifyLink && (
                    <a href={cert.verifyLink} target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:scale-110 transition-all shrink-0 mt-0.5" aria-label="View Credential">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  )}
                </div>
                
                <p className="text-xs font-semibold tracking-wider uppercase mb-3" style={{ color: 'var(--text-muted)' }}>{cert.issuer}</p>
                <p className="text-sm leading-relaxed flex-grow" style={{ color: 'var(--text-secondary)' }}>{cert.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ==================== CONTACT SECTION ==================== */}
        <section id="contact" className="section pb-32">
          <div className="premium-glass p-8 md:p-12 max-w-4xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-3 text-center">Get in Touch</h2>
            <p className="text-center mb-10" style={{ color: 'var(--text-secondary)' }}>
              Whether you have a question or want to collaborate, my inbox is open.
            </p>
            
            <SocialDock />

            <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl mx-auto">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium mb-2 pl-1" style={{ color: 'var(--text-secondary)' }}>Name</label>
                  <input
                    name="name"
                    type="text"
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={handleChange}
                    className="premium-input"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 pl-1" style={{ color: 'var(--text-secondary)' }}>Email</label>
                  <input
                    name="email"
                    type="email"
                    placeholder="jane@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="premium-input"
                    required
                  />
                  {emailError && (
                    <p className="text-xs mt-2 pl-1 text-red-500 font-medium">
                      {emailError}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 pl-1" style={{ color: 'var(--text-secondary)' }}>Message</label>
                <textarea
                  name="message"
                  placeholder="How can we work together?"
                  value={formData.message}
                  onChange={handleChange}
                  className="premium-input"
                  style={{ minHeight: '140px', resize: 'vertical' }}
                  required
                />
              </div>

              <div className="pt-2 flex justify-center">
                <button
                  type="submit"
                  disabled={sending || status === 'success'}
                  className={`apple-btn-primary w-full sm:w-auto min-w-[200px] ${status === 'success' ? '!bg-green-600 !text-white' : ''}`}
                >
                  {sending ? (
                    <span className="flex items-center gap-2">
                      <span className="dot-flashing"></span>
                      Sending
                    </span>
                  ) : status === 'success' ? (
                    <span className="flex items-center gap-2">
                      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                      Message Sent
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
