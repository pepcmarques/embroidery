import React from 'react';

const AboutPage: React.FC = () => (
    <main style={{ padding: '2rem', maxWidth: 600, margin: '0 auto' }}>
        <h1>About Us</h1>
        <p>
            Welcome to our embroidery app! We are passionate about helping you create beautiful designs and bring your ideas to life.
        </p>
        <section>
            <h2>Our Mission</h2>
            <p>
                To provide an intuitive platform for embroidery enthusiasts and professionals to design, share, and collaborate.
            </p>
        </section>
        <section>
            <h2>Contact</h2>
            <p>
                Have questions? Reach out at <a href="mailto:info@embroideryapp.com">info@embroideryapp.com</a>.
            </p>
        </section>
    </main>
);

export default AboutPage;