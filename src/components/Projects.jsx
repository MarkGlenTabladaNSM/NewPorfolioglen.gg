import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Projects = () => {
    const [selectedId, setSelectedId] = useState(null);

    const projects = [
        {
            id: 1,
            title: "Neon E-Commerce",
            description: "A high-performance modern e-commerce platform built with React, Node.js, and Stripe integration, featuring a sleek neon-inspired UI/UX.",
            tags: ["React", "Node.js", "MongoDB", "Stripe"],
            link: "https://github.com/NowUSeeMee?tab=repositories",
            image: null
        },
        {
            id: 2,
            title: "Milktea Ordering System",
            description: "A comprehensive milk tea ordering platform featuring a dynamic menu, custom add-ons, and size variations.",
            tags: ["Vue", "Node.js", "PHP", "MongoDB"],
            link: "https://github.com/NowUSeeMee?tab=repositories",
            image: "/images/milktea.png"
        },
        {
            id: 3,
            title: "Finance Dashboard",
            description: "Real-time cryptocurrency tracking dashboard with interactive charts, portfolio management, and advanced financial analytics.",
            tags: ["TypeScript", "Next.js", "Chart.js", "Tailwind"],
            link: "https://github.com/NowUSeeMee?tab=repositories",
            image: null
        },
        {
            id: 4,
            title: "AI Image Generator",
            description: "A feature-rich SaaS application utilizing OpenAI's DALL-E API to generate, edit, and share high-quality AI-generated images.",
            tags: ["OpenAI API", "React", "Express", "PostgreSQL"],
            link: "https://github.com/NowUSeeMee?tab=repositories",
            image: null
        },
        {
            id: 5,
            title: "Game Spoofer",
            description: "A powerful hardware spoofer tool for unbanning across multiple games, featuring HWID manipulation and system-level bypasses.",
            tags: ["C++", "C", "Windows API"],
            link: "https://github.com/NowUSeeMee?tab=repositories",
            image: "/images/Spoofer.png"
        },
        {
            id: 6,
            title: "DragController",
            description: "An advanced recoil control macro for FPS games, featuring customizable sensitivity profiles and real-time mouse movement adjustments.",
            tags: ["Python"],
            link: "https://github.com/NowUSeeMee?tab=repositories",
            image: "/images/Dragcontroller.png"
        },
        {
            id: 7,
            title: "School Monitoring System",
            description: "A comprehensive student monitoring platform with real-time attendance tracking, online grade viewing, Gmail parent notifications for time-in/time-out, and teacher class scheduling with meeting management.",
            tags: ["React", "Laravel", "Node.js"],
            link: "https://github.com/NowUSeeMee?tab=repositories",
            image: "/images/schoolmoniring.png"
        },
        {
            id: 8,
            title: "Anime Streaming Platform",
            description: "A feature-rich anime streaming application with a custom video player, backend proxying, and reliable access to diverse video sources.",
            tags: ["React", "Node.js"],
            link: "https://github.com/NowUSeeMee?tab=repositories",
            image: "/images/anime.png"
        },
        {
            id: 9,
            title: "Bravion VPN",
            description: "A professional-grade VPN application with a sleek, modern interface, powered by the WireGuard protocol for industry-leading speed and security.",
            tags: ["React", "Electron", "WireGuard", "Node.js"],
            link: "https://github.com/NowUSeeMee?tab=repositories",
            image: "/images/Vpn.png"
        }
    ];

    return (
        <section id="projects" style={{ background: 'var(--bg-color-secondary)' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Featured <span className="text-gradient">Projects</span></h2>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                        A selection of my best work, demonstrating my ability to build complex, scalable, and responsive web applications.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '2rem'
                }}>
                    {projects.map((project, index) => (
                        <motion.div
                            layoutId={`project-${project.id}`}
                            key={project.id}
                            className="glass-panel"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            onClick={() => setSelectedId(project.id)}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                                padding: '0',
                                overflow: 'hidden',
                                cursor: 'pointer'
                            }}>
                            {project.image ? (
                                <div style={{
                                    width: '100%',
                                    height: '200px',
                                    overflow: 'hidden',
                                    borderBottom: '1px solid var(--glass-border)'
                                }}>
                                    <img src={project.image} alt={project.title} style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform 0.3s ease'
                                    }} className="project-img"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.style.display = 'none';
                                            e.target.parentElement.innerHTML = '<span style="color: var(--text-secondary); font-size: 2rem; display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; background: var(--bg-color);">&lt;/&gt;</span>';
                                        }} />
                                </div>
                            ) : (
                                <div style={{
                                    width: '100%',
                                    height: '200px',
                                    background: 'var(--bg-color)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderBottom: '1px solid var(--glass-border)'
                                }}>
                                    <span style={{ color: 'var(--text-secondary)', fontSize: '2rem' }}>
                                        {'</>'}
                                    </span>
                                </div>
                            )}

                            <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{project.title}</h3>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', flexGrow: 1 }}>{project.description}</p>

                                <div style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '0.5rem',
                                    marginBottom: '2rem'
                                }}>
                                    {project.tags.map(tag => (
                                        <span key={tag} style={{
                                            fontSize: '0.8rem',
                                            padding: '0.3rem 0.8rem',
                                            background: 'rgba(255, 255, 255, 0.05)',
                                            borderRadius: '20px',
                                            color: 'var(--text-secondary)',
                                            border: '1px solid var(--glass-border)'
                                        }}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <a href={project.link} className="btn-secondary" style={{
                                    textAlign: 'center',
                                    padding: '0.6rem',
                                    borderRadius: '8px',
                                    marginTop: 'auto',
                                    display: 'block'
                                }} onClick={(e) => e.stopPropagation()}>
                                    View Source ↗
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedId && (
                    <div style={{
                        position: 'fixed',
                        top: 0, left: 0, right: 0, bottom: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000,
                        padding: '1rem'
                    }}>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{
                                position: 'absolute',
                                top: 0, left: 0, right: 0, bottom: 0,
                                background: 'rgba(0,0,0,0.8)',
                                backdropFilter: 'blur(5px)'
                            }}
                            onClick={() => setSelectedId(null)}
                        />
                        {(() => {
                            const project = projects.find(p => p.id === selectedId);
                            if (!project) return null;
                            return (
                                <motion.div
                                    layoutId={`project-${project.id}`}
                                    className="glass-panel"
                                    style={{
                                        width: '100%',
                                        maxWidth: '800px',
                                        maxHeight: '90vh',
                                        background: 'var(--bg-color)',
                                        zIndex: 1001,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        overflowY: 'auto',
                                        position: 'relative',
                                        padding: 0,
                                        borderRadius: '16px'
                                    }}
                                >
                                    <button
                                        onClick={() => setSelectedId(null)}
                                        style={{
                                            position: 'absolute',
                                            top: '1rem',
                                            right: '1rem',
                                            background: 'rgba(0,0,0,0.5)',
                                            border: 'none',
                                            color: 'white',
                                            width: '36px',
                                            height: '36px',
                                            borderRadius: '50%',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            zIndex: 10,
                                            fontSize: '1.2rem',
                                            backdropFilter: 'blur(4px)'
                                        }}
                                    >
                                        ✕
                                    </button>

                                    {project.image ? (
                                        <div style={{ width: '100%', height: '350px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.2)' }}>
                                            <img src={project.image} alt={project.title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                                        </div>
                                    ) : (
                                        <div style={{ width: '100%', height: '300px', background: 'var(--bg-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, borderBottom: '1px solid var(--glass-border)' }}>
                                            <span style={{ color: 'var(--text-secondary)', fontSize: '3rem' }}>{'</>'}</span>
                                        </div>
                                    )}

                                    <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column' }}>
                                        <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{project.title}</h3>
                                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '1.1rem', lineHeight: 1.6 }}>{project.description}</p>

                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
                                            {project.tags.map(tag => (
                                                <span key={tag} style={{
                                                    fontSize: '0.9rem',
                                                    padding: '0.4rem 1rem',
                                                    background: 'rgba(255, 255, 255, 0.05)',
                                                    borderRadius: '20px',
                                                    color: 'var(--text-secondary)',
                                                    border: '1px solid var(--glass-border)'
                                                }}>
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <a href={project.link} className="btn-secondary" style={{
                                            textAlign: 'center',
                                            padding: '0.8rem',
                                            borderRadius: '8px',
                                            display: 'block',
                                            fontSize: '1.1rem'
                                        }} onClick={(e) => e.stopPropagation()}>
                                            View Source ↗
                                        </a>
                                    </div>
                                </motion.div>
                            );
                        })()}
                    </div>
                )}
            </AnimatePresence>

            <style>{`
        .glass-panel:hover .project-img {
          transform: scale(1.05);
        }
      `}</style>
        </section>
    );
};

export default Projects;
