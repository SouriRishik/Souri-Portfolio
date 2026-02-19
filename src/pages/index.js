import { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';

const skillsRow1 = [
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'C/C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
  { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'TensorFlow', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
  { name: 'PyTorch', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
];

const skillsRow2 = [
  { name: 'NumPy', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg' },
  { name: 'Pandas', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg' },
  { name: 'OpenCV', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
  { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg' },
  { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
  { name: 'Ubuntu', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ubuntu/ubuntu-original.svg' },
  { name: 'SQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg' },
  { name: 'Keras', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/keras/keras-original.svg' },
  { name: 'ROS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ros/ros-original.svg' },
];



const certifications = [
  'Generative AI with Large Language Models',
  'Natural Language Processing in TensorFlow',
  'MongoDB: The Complete Guide to NoSQL Database Development',
  'C++ Data Structures in the STL',
  'Build Your First GUI App With Java',
  'Introduction to Java Programming: Java Fundamental Concepts',
];

const education = [
  {
    institution: 'Manipal Institute of Technology, MAHE',
    duration: 'Jul 2023 — Sep 2027',
    degree: 'B.Tech in Data Science Engineering',
    detail: '',
    logo: '/logos/mit-manipal.jpeg',
  },
  {
    institution: 'Mahatma Gandhi Memorial PU College, Udupi',
    duration: 'Jul 2021 — Apr 2023',
    degree: 'Higher Secondary Education (PCMC) — Karnataka State Board',
    detail: 'Percentage: 94.3%',
    logo: '/logos/mgm.png',
  },
  {
    institution: 'Little Rock Indian School, Brahmavar',
    duration: 'Mar 2021',
    degree: 'CBSE 10th Board',
    detail: 'Percentage: 91.6%',
    logo: '/logos/lris.jpeg',
  },
];

const experiences = [
  {
    role: 'Coding Subsystem Head',
    org: 'Robomanipal',
    duration: 'Sep 2025 — Present',
    detail:
      'Enhanced the official Robomanipal website with 100%+ traffic growth and 98/100 Real Experience Score. Represented MIT MAHE at Technoxian 8.0 (quarterfinals among 200+ teams). Secured 2nd Runner-Up at Robonautica, IISc Bangalore among 179 teams nationwide.',
    logo: '/logos/robomanipal.jpeg',
  },
  {
    role: 'Research Intern',
    org: 'Manipal Institute of Technology',
    duration: 'Jun 2025 — Jul 2025',
    detail:
      'Engineered ML models (Gradient Boosting, CatBoost, XGBoost, Random Forest) to detect phishing URLs with 97.4% accuracy and 97.7% F1-score on 30,000+ samples. Designed and deployed a Python-based phishing detection web app with real-time URL classification, reducing manual verification time by 70%.',
    logo: '/logos/mit-manipal.jpeg',
  },
];

const projects = [
  {
    title: 'Sign Language Gesture Analysis',
    image: '',
    description:
      'Built a lightweight custom CNN (~227K parameters) to classify 24 static ASL hand gestures from the Sign Language MNIST dataset. Achieved 99.69% validation accuracy and demonstrated real-time webcam inference, correctly recognizing 20/24 gestures under live conditions.',
    tags: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'NumPy'],
    github: 'https://github.com/SouriRishik/Sign-Language-Gesture-Analysis',
  },
  {
    title: 'Phishing URL Detection',
    image: '',
    description:
      'Engineered multiple ML models (Gradient Boosting, CatBoost, XGBoost, Random Forest) to detect phishing URLs, achieving 97.4% accuracy and 97.7% F1-score on 30,000+ samples. Deployed a real-time Python web application reducing manual verification by 70%.',
    tags: ['Python', 'XGBoost', 'CatBoost', 'Machine Learning'],
    github: 'https://github.com/SouriRishik/Phising-URL-and-Website-Detection',
  },
  {
    title: 'Digit Recognition',
    image: '',
    description:
      'Developed a Feedforward Neural Network in TensorFlow/Keras with preprocessing, batch normalization, dropout, and L2 regularization for MNIST digit recognition. Achieved 98.13% classification accuracy.',
    tags: ['Python', 'TensorFlow', 'Keras', 'NumPy', 'Pandas'],
    github: 'https://github.com/SouriRishik/MNIST-Dataset-Prediction',
  },
  {
    title: 'Fastest Line Follower',
    image: '',
    description:
      'Optimized PID algorithm with manual, Ziegler\u2013Nichols, and incremental tuning, improving motor precision by 30%. Created a Bluetooth-based Python GUI for real-time PID tuning, cutting adjustment time by 50%. Competed at Technoxian 8.0, advancing to quarterfinals among 200+ teams.',
    tags: ['C', 'Python', 'STM32CubeIDE', 'PID', 'Embedded'],
    github: 'https://github.com/SouriRishik/LineFollower_Technoxian',
  },
  {
    title: 'Autonav (RoboCUP@Work)',
    image: '',
    description:
      'Programmed a 6-DOF Mecanum robot for RoboCUP@Work with 2D LiDAR and depth camera, using SLAM Toolbox and NAV2 for mapping and navigation. Achieved <10cm localization error and 92% goal success in ROS2.',
    tags: ['ROS2', 'SLAM', 'LiDAR', 'NAV2', 'Robotics'],
    github: 'https://github.com/SouriRishik/RCUP_scripts',
  },
  {
    title: 'Open Volley',
    image: '',
    description:
      'Built a computer vision system in Python/OpenCV to track volleyball trajectories with 95% detection accuracy, processing 120+ frames per second for real-time analysis. Automated ball tracking and player count per team, reducing manual annotation time by 60%.',
    tags: ['Python', 'OpenCV', 'Computer Vision'],
    github: 'https://github.com/SouriRishik/OpenVolley',
  },
];

const contactInfo = [
  {
    label: 'Email',
    value: 'souri.rishik27@gmail.com',
    href: 'mailto:souri.rishik27@gmail.com',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    value: 'github.com/SouriRishik',
    href: 'https://github.com/SouriRishik',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/souri-rishik',
    href: 'https://linkedin.com/in/souri-rishik-02a188284',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

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
      </Head>
      <Navbar />
      <main>
        <HeroSection />

        <section id="about" className="section relative z-10 pt-28">
          <div className="blob blob-1" />
          <div className="blob blob-2" />
          <div className="grid-bg" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="section-title">
              About <span className="gradient-text">Me</span>
            </h2>
            <p className="section-subtitle mx-auto">
              A curious mind at the intersection of data science, robotics, and software engineering —
              always learning, always building.
            </p>
          </motion.div>

          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold mb-8" style={{ color: 'var(--text-primary)' }}>
              Education
            </h3>
            <div className="ml-4">
              {education.map((edu, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="timeline-item"
                >
                  <div className="card">
                    <div className="flex items-start gap-4">
                      <img
                        src={edu.logo}
                        alt={edu.institution}
                        className="w-14 h-14 rounded-xl object-contain shrink-0"
                        style={edu.logo === '/logos/mgm.png' ? { background: 'white', padding: '4px' } : {}}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-2">
                          <h4 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                            {edu.institution}
                          </h4>
                          <span className="tech-tag whitespace-nowrap">{edu.duration}</span>
                        </div>
                        <p style={{ color: 'var(--text-secondary)' }}>{edu.degree}</p>
                        <p className="font-semibold mt-1" style={{ color: 'var(--accent)' }}>
                          {edu.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold mb-8" style={{ color: 'var(--text-primary)' }}>
              Experience
            </h3>
            <div className="ml-4">
              {experiences.map((exp, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="timeline-item"
                >
                  <div className="card">
                    <div className="flex items-start gap-4">
                      <img
                        src={exp.logo}
                        alt={exp.org}
                        className="w-14 h-14 rounded-xl object-contain shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-2">
                          <h4 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                            {exp.role}
                          </h4>
                          <span className="tech-tag whitespace-nowrap">{exp.duration}</span>
                        </div>
                        <p className="font-medium" style={{ color: 'var(--accent)' }}>
                          {exp.org}
                        </p>
                        <p className="text-sm leading-relaxed mt-2" style={{ color: 'var(--text-secondary)' }}>
                          {exp.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-8" style={{ color: 'var(--text-primary)' }}>
              Skills & Technologies
            </h3>
            <div className="marquee-wrapper">
              <div className="marquee-row marquee-row-left">
                <div className="marquee-track marquee-left">
                  {[...skillsRow1, ...skillsRow1].map((skill, i) => (
                    <div key={i} className="marquee-item">
                      <img src={skill.icon} alt={skill.name} className="marquee-icon" />
                      <span className="marquee-label">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="marquee-row marquee-row-right">
                <div className="marquee-track marquee-right">
                  {[...skillsRow2, ...skillsRow2].map((skill, i) => (
                    <div key={i} className="marquee-item">
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className={
                          skill.name === 'GitHub'
                            ? 'marquee-icon bg-white rounded-lg p-1'
                            : 'marquee-icon'
                        }
                        style={
                          skill.name === 'GitHub'
                            ? { background: 'white', borderRadius: '0.5rem', padding: '0.25rem' }
                            : {}
                        }
                      />
                      <span className="marquee-label">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16"
          >
            <h3 className="text-2xl font-bold mb-8" style={{ color: 'var(--text-primary)' }}>
              Certifications
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {certifications.map((cert, i) => (
                <motion.div
                  key={cert}
                  custom={i}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="card flex items-center gap-3"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}
                  >
                    ✓
                  </div>
                  <p className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>
                    {cert}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <section id="projects" className="section relative z-10 pt-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="section-title">
              My <span className="gradient-text">Projects</span>
            </h2>
            <p className="section-subtitle mx-auto">
              A collection of projects spanning robotics, AI, computer vision, and web development.
              Each one taught me something new.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6"
          >
            {projects.map((project) => (
              <motion.div
                key={project.title}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                className="card relative overflow-hidden group flex flex-col"
                style={{
                  background: 'var(--gradient-card)',
                  borderColor: 'var(--border-hover)',
                }}
              >
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                ) : (
                  <div
                    className="w-full h-48 rounded-lg mb-4 flex items-center justify-center"
                    style={{ background: 'var(--bg-secondary)', border: '2px dashed var(--border)' }}
                  >
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-muted)' }}>
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  </div>
                )}

                <h3
                  className="text-xl font-bold mb-3"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {project.title}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-4 flex-grow"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-5 mt-auto">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tech-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
                  style={{ color: 'var(--accent)' }}
                >
                  View on GitHub
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover:translate-x-1 transition-transform"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </a>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section id="contact" className="section relative z-10 pt-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="section-title">
              Get In <span className="gradient-text">Touch</span>
            </h2>
            <p className="section-subtitle mx-auto">
              Have a question, want to collaborate, or just want to say hi?
              Drop me a message and I&apos;ll get back to you soon.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 space-y-4"
            >
              {contactInfo.map((info, i) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 4 }}
                  className="card flex items-center gap-4 cursor-pointer"
                  style={{ display: 'flex' }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: 'var(--accent-light)',
                      color: 'var(--accent)',
                    }}
                  >
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
                      {info.label}
                    </p>
                    <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                      {info.value}
                    </p>
                  </div>
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="card text-center"
              >
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Always open to interesting conversations and opportunities!
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <div className="card">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      Your Name
                    </label>
                    <input
                      name="name"
                      type="text"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      className="input-field"
                      required
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      Email Address
                    </label>
                    <input
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      className="input-field"
                      style={emailError ? { borderColor: '#ef4444' } : {}}
                      required
                    />
                    {emailError && (
                      <p className="text-xs mt-1" style={{ color: '#ef4444' }}>
                        {emailError}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      Message
                    </label>
                    <textarea
                      name="message"
                      placeholder="Enter your message"
                      value={formData.message}
                      onChange={handleChange}
                      className="input-field"
                      style={{ minHeight: '140px', resize: 'vertical' }}
                      required
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={sending || status === 'success'}
                    whileHover={{ scale: status === 'success' ? 1 : 1.02 }}
                    whileTap={{ scale: status === 'success' ? 1 : 0.98 }}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all duration-300
                      ${status === 'success' ? 'bg-green-600 text-white cursor-default' : 'btn-primary'}
                      ${sending ? 'opacity-70 cursor-not-allowed' : ''}`}
                    style={{ minHeight: '48px' }}
                  >
                    {sending ? (
                      <span className="flex items-center gap-2">
                        <span className="dot-flashing"></span>
                        Sending...
                      </span>
                    ) : status === 'success' ? (
                      <span className="flex items-center gap-2">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        Message Sent!
                      </span>
                    ) : (
                      <>
                        Send Message
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="22" y1="2" x2="11" y2="13" />
                          <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                      </>
                    )}
                  </motion.button>

                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-sm font-medium px-4 py-3 rounded-xl mt-2"
                      style={{
                        background: 'rgba(239, 68, 68, 0.1)',
                        color: '#ef4444',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                      }}
                    >
                      ✕ Something went wrong. Please try again or email me directly.
                    </motion.div>
                  )}
                </form>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
