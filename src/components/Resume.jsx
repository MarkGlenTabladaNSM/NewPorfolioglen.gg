import { useState, useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Upload, FileText, Download, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const Resume = () => {
    const { isLoggedIn } = useContext(AuthContext);
    const [resumeData, setResumeData] = useState(null);
    const [isDefault, setIsDefault] = useState(false);
    const fileInputRef = useRef(null);

    const DEFAULT_RESUME_PATH = '/resume.pdf';

    useEffect(() => {
        const storedResume = localStorage.getItem('portfolio_resume');
        if (storedResume) {
            setResumeData(storedResume);
            setIsDefault(false);
        } else {
            // Try to load default resume from public folder
            fetch(DEFAULT_RESUME_PATH, { method: 'HEAD' })
                .then(res => {
                    if (res.ok) {
                        setResumeData(DEFAULT_RESUME_PATH);
                        setIsDefault(true);
                    }
                })
                .catch(() => {
                    console.log('No default resume found at /resume.pdf');
                });
        }
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type !== 'application/pdf') {
                alert('Please upload a PDF file.');
                return;
            }
            const reader = new FileReader();
            reader.onload = (event) => {
                const base64String = event.target.result;
                localStorage.setItem('portfolio_resume', base64String);
                setResumeData(base64String);
                setIsDefault(false);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <section id="resume" className="section" style={{ padding: '6rem 0' }}>
            <div className="container">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    style={{ textAlign: 'center', marginBottom: '3rem' }}
                >
                    <h2 className="section-title">My <span className="text-gradient">Resume</span></h2>
                    <p style={{ color: 'var(--text-secondary)' }}>View and download my professional career history.</p>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="glass-panel" 
                    style={{
                        maxWidth: '800px',
                        margin: '0 auto',
                        padding: '2rem 1rem',
                        borderRadius: '24px',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '1.5rem',
                        border: '1px solid var(--glass-border)'
                    }}
                >
                    {!resumeData && (
                        <div style={{
                            width: '90px',
                            height: '90px',
                            background: 'rgba(var(--accent-rgb), 0.1)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--accent-color)',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                        }}>
                            <FileText size={45} />
                        </div>
                    )}

                    {resumeData ? (
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            {/* PDF Preview Container - Responsive Height */}
                            <div style={{ 
                                width: '100%', 
                                height: '600px', 
                                maxHeight: '80vh',
                                marginBottom: '1.5rem', 
                                borderRadius: '12px', 
                                overflow: 'hidden', 
                                border: '1px solid var(--glass-border)', 
                                background: '#fff',
                                position: 'relative'
                            }}>
                                <iframe 
                                    src={`${resumeData}#toolbar=0&navpanes=0&scrollbar=0`} 
                                    width="100%" 
                                    height="100%" 
                                    style={{ border: 'none' }} 
                                    title="Resume Preview"
                                ></iframe>
                                
                                {/* Overlay for mobile to encourage direct view if iframe is wonky */}
                                <div className="md:hidden" style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
                                    <a href={resumeData} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '0.5rem', fontSize: '0.7rem' }}>
                                        <ExternalLink size={14} /> Full Screen
                                    </a>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
                                <a 
                                    href={resumeData} 
                                    download="Mark_Glentablada_Resume.pdf"
                                    className="btn btn-primary"
                                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', width: 'auto', padding: '1rem 2rem' }}
                                >
                                    <Download size={22} /> Download Resume
                                </a>
                                
                                <a 
                                    href={resumeData} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="btn btn-secondary md:hidden"
                                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', width: 'auto', padding: '1rem 2rem' }}
                                >
                                    <ExternalLink size={22} /> View Full PDF
                                </a>
                            </div>
                        </div>
                    ) : (
                        <div style={{ padding: '2rem 0' }}>
                            <h3 style={{ marginBottom: '0.5rem', fontSize: '1.4rem' }}>No Resume Available</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>
                                {isLoggedIn ? 'Please upload your resume (PDF) below.' : 'The resume has not been uploaded yet. Please check back later.'}
                            </p>
                        </div>
                    )}

                    {isLoggedIn && (
                        <div style={{
                            marginTop: '2rem',
                            paddingTop: '2.5rem',
                            borderTop: '1px solid var(--glass-border)',
                            width: '100%'
                        }}>
                            <h4 style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem' }}>Admin Controls</h4>
                            <input 
                                type="file" 
                                accept="application/pdf"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
                                <button 
                                    onClick={triggerFileInput}
                                    className="btn btn-secondary"
                                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', justifyContent: 'center' }}
                                >
                                    <Upload size={20} /> {resumeData ? 'Replace Resume (Local)' : 'Upload Resume (Local)'}
                                </button>
                                <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', maxWidth: '300px' }}>
                                    Note: Local uploads only save on this device. For a permanent fix, place <b>resume.pdf</b> in your project's <b>public</b> folder.
                                </p>
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default Resume;

