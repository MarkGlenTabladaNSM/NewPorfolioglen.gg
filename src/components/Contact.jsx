import { motion } from 'framer-motion';

const Contact = () => {
    return (
        <section id="contact" style={{
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Glow */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '600px',
                height: '600px',
                background: 'var(--glow-color)',
                filter: 'blur(150px)',
                borderRadius: '50%',
                zIndex: -1,
                opacity: 0.3
            }}></div>

            <div className="container">
                <motion.div
                    className="glass-panel"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    style={{
                        maxWidth: '800px',
                        margin: '0 auto',
                        textAlign: 'center',
                        padding: '4rem 2rem'
                    }}>
                    <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Let's work <span className="text-gradient">together</span></h2>
                    <p style={{
                        color: 'var(--text-secondary)',
                        marginBottom: '3rem',
                        fontSize: '1.1rem',
                        maxWidth: '500px',
                        margin: '0 auto 3rem auto'
                    }}>
                        I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                    </p>

                    <form 
                        action="https://formsubmit.co/markglentablada55@gmail.com" 
                        method="POST"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.5rem',
                            maxWidth: '500px',
                            margin: '0 auto',
                            textAlign: 'left'
                        }}
                    >
                        {/* Honeypot to prevent spam */}
                        <input type="text" name="_honey" style={{ display: 'none' }} />
                        {/* Disable Captcha for better UX (optional, you can remove this if you want captcha) */}
                        <input type="hidden" name="_captcha" value="false" />
                        
                        <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                            <input type="text" name="name" placeholder="Your Name" style={inputStyle} required />
                            <input type="email" name="email" placeholder="Your Email" style={inputStyle} required />
                        </div>
                        <textarea name="message" rows="5" placeholder="Your Message" style={{ ...inputStyle, resize: 'vertical' }} required></textarea>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '1rem' }}>
                            Send Message
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

const inputStyle = {
    width: '100%',
    padding: '1rem',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid var(--glass-border)',
    borderRadius: '8px',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-sans)',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.3s ease'
};

export default Contact;
