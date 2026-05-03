import { useState, useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Upload, FileText, Download, ExternalLink, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../supabaseClient';

const Resume = () => {
    const { isLoggedIn } = useContext(AuthContext);
    const [resumeData, setResumeData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);

    const fetchResume = async () => {
        setIsLoading(true);
        try {
            // Get public URL
            const { data: { publicUrl } } = supabase.storage.from('portfolio').getPublicUrl('resume.pdf');
            
            // Verify if the file actually exists by trying to get its metadata or listing
            const { data, error } = await supabase.storage.from('portfolio').list('', {
                limit: 1,
                offset: 0,
                search: 'resume.pdf'
            });

            if (data && data.length > 0) {
                // Add a timestamp to bypass browser cache
                setResumeData(`${publicUrl}?t=${new Date().getTime()}`);
            } else {
                setResumeData(null);
            }
        } catch (err) {
            console.error('Error fetching resume:', err);
            setResumeData(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchResume();
    }, []);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.type !== 'application/pdf') {
            alert('Please upload a PDF file.');
            return;
        }

        setIsUploading(true);
        try {
            const { data, error } = await supabase.storage
                .from('portfolio')
                .upload('resume.pdf', file, {
                    upsert: true,
                    cacheControl: '0' // Force no-cache
                });

            if (error) throw error;
            
            alert('Resume updated successfully! It may take a minute to update on all devices.');
            fetchResume();
        } catch (error) {
            console.error('Upload error:', error);
            alert('Upload failed: ' + error.message);
        } finally {
            setIsUploading(false);
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
                        border: '1px solid var(--glass-border)',
                        minHeight: '300px',
                        justifyContent: 'center'
                    }}
                >
                    {isLoading ? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                            <Loader2 size={40} className="animate-spin text-accent-color" />
                            <p>Loading resume from cloud...</p>
                        </div>
                    ) : !resumeData ? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                            <div style={{
                                width: '90px',
                                height: '90px',
                                background: 'rgba(var(--accent-rgb), 0.1)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--accent-color)'
                            }}>
                                <FileText size={45} />
                            </div>
                            <div style={{ padding: '1rem 0' }}>
                                <h3 style={{ marginBottom: '0.5rem', fontSize: '1.4rem' }}>No Resume Available</h3>
                                <p style={{ color: 'var(--text-secondary)' }}>
                                    {isLoggedIn ? 'Please upload your resume (PDF) using the admin controls below.' : 'The resume has not been uploaded to the cloud yet.'}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
                    )}

                    {isLoggedIn && (
                        <div style={{
                            marginTop: '2rem',
                            paddingTop: '2.5rem',
                            borderTop: '1px solid var(--glass-border)',
                            width: '100%'
                        }}>
                            <h4 style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem' }}>Cloud Admin Controls</h4>
                            <input 
                                type="file" 
                                accept="application/pdf"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                                <button 
                                    onClick={triggerFileInput}
                                    disabled={isUploading}
                                    className="btn btn-secondary"
                                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', justifyContent: 'center', minWidth: '220px' }}
                                >
                                    {isUploading ? (
                                        <>
                                            <Loader2 size={20} className="animate-spin" /> Uploading to Cloud...
                                        </>
                                    ) : (
                                        <>
                                            <Upload size={20} /> {resumeData ? 'Replace Resume (Everywhere)' : 'Upload Resume (Everywhere)'}
                                        </>
                                    )}
                                </button>
                                <p style={{ fontSize: '0.75rem', color: 'var(--accent-color)', fontWeight: '500' }}>
                                    ⚡ This will update your resume for all users on all devices instantly.
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


