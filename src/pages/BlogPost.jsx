import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const ARTICLES = {
  'featured': {
    title: 'The Future of High-Efficiency Panels',
    author: 'NovaSolar Research & Development',
    date: 'Oct 9, 2026',
    image: '/images/green_solar_panels_1791614319680.png',
    content: `
      <h2>Pushing the Boundaries of Monocrystalline Technology</h2>
      <p>The solar industry has seen remarkable advancements over the past decade, but the transition to next-generation HJT (Heterojunction Technology) monocrystalline cells represents a paradigm shift. Our latest case study explores how NovaSolar is integrating these panels into residential and commercial arrays in India, shattering previous efficiency boundaries.</p>
      
      <h3>1. The Temperature Coefficient Advantage</h3>
      <p>One of the biggest challenges in standard solar installations is heat. traditional panels lose up to 0.4% efficiency for every degree above 25°C. The new high-efficiency panels reduce this coefficient to just 0.25%, meaning under the blazing summer sun, they continue to operate at near-peak capacity.</p>
      
      <h3>2. Low-Light Performance</h3>
      <p>Thanks to an improved anti-reflective coating and multi-busbar designs, these panels capture ambient and diffuse light much more effectively. Customers are reporting up to 15% more power generation during early mornings, late afternoons, and overcast monsoon days.</p>
      
      <h3>3. Space Efficiency</h3>
      <p>With an efficiency rating exceeding 23%, homeowners with limited roof space can now install fewer panels to meet their total energy requirements. A 5kW system that previously required 15 panels can now be achieved with just 10 or 11 high-output modules.</p>
      
      <blockquote>"The integration of HJT panels has allowed our commercial clients to offset 100% of their energy costs using 20% less roof space." - Marcus Rodriguez, Head of Engineering</blockquote>
    `
  },
  '1': {
    title: 'How Many Solar Panels Do You Need?',
    author: 'Tech Guides',
    date: 'Sep 14, 2026',
    image: '/images/blog_tech_guides.png',
    content: `
      <h2>Calculating Your Perfect Solar Array</h2>
      <p>Sizing a solar system is a critical first step. Installing too many panels increases upfront costs with diminishing returns, while installing too few means you'll still be heavily reliant on the grid. Here is a comprehensive guide to sizing your array.</p>
      
      <h3>Step 1: Determine Your Daily Energy Usage</h3>
      <p>Look at your electricity bills from the past year. Find the total kWh (kilowatt-hours) used over 12 months, and divide by 365. This gives you your daily average usage. For an average 3-bedroom home, this is typically between 15 and 25 kWh per day.</p>
      
      <h3>Step 2: Understand Peak Sun Hours</h3>
      <p>Peak sun hours refer to the total amount of direct, usable sunlight your roof gets per day. In most parts of India, a conservative estimate is 4 to 5 peak sun hours per day.</p>
      
      <h3>Step 3: The Calculation</h3>
      <p>Divide your daily usage by your peak sun hours. If you use 20 kWh per day, and have 5 peak sun hours, you need a system that can produce 4 kW dynamically. A 4kW system typically requires around 8 to 10 modern 400W solar panels.</p>
    `
  },
  '2': {
    title: 'Monocrystalline vs Polycrystalline',
    author: 'Analysis',
    date: 'Aug 21, 2026',
    image: '/images/blog_analysis.png',
    content: `
      <h2>Which Panel Technology Wins?</h2>
      <p>When shopping for solar panels, the two most common terms you will hear are monocrystalline and polycrystalline. While both serve the same purpose, understanding the difference is key to making the best investment for your property.</p>
      
      <h3>Monocrystalline: The Premium Choice</h3>
      <p>Recognizable by their sleek, solid black color, monocrystalline panels are made from a single, continuous crystal lattice. This purity gives them the highest efficiency rates (often 20-23%), making them much better at generating power in limited spaces. They are slightly more expensive, but the long-term ROI is usually superior.</p>
      
      <h3>Polycrystalline: The Budget-Friendly Option</h3>
      <p>These panels are distinctively blue and feature a fragmented, mosaic-like appearance. They are manufactured by melting multiple silicon fragments together. This process is cheaper, making the panels more affordable, but their efficiency is slightly lower (typically 15-18%).</p>
      
      <h3>The Verdict</h3>
      <p>If you have limited roof space or want the cleanest aesthetic, Monocrystalline is the clear winner and is the exclusive standard used by NovaSolar.</p>
    `
  },
  '3': {
    title: 'New Solar Incentives for 2025',
    author: 'Industry News',
    date: 'Nov 02, 2026',
    image: '/images/blog_news.png',
    content: `
      <h2>Maxmizing Your ROI with Subsidies</h2>
      <p>The push for renewable energy has never been stronger. To meet ambitious national targets, several key incentives have been renewed or expanded for 2025. Here is what you need to know.</p>
      
      <h3>PM Surya Ghar Subsidy Restructuring</h3>
      <p>The national portal has streamlined the subsidy disbursement process. For residential systems up to 3kW, the upfront capital subsidy has been increased by 15%, significantly lowering the initial barrier to entry for standard homeowners.</p>
      
      <h3>Commercial Accelerated Depreciation</h3>
      <p>For our business clients, the accelerated depreciation benefit allows companies to write off a large percentage of the solar asset's value in the very first year, leading to massive immediate tax savings.</p>
      
      <h3>Net Metering Guarantees</h3>
      <p>New regulations mandate state electricity boards to process net metering applications within a strict 30-day window, eliminating the bureaucratic delays that previously hindered solar adoption.</p>
    `
  }
};

export default function BlogPost() {
  const { id } = useParams();
  
  const article = useMemo(() => ARTICLES[id], [id]);

  if (!article) {
    return (
      <div style={{ padding: '8rem 5%', textAlign: 'center', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
        <h2 style={{ color: 'var(--navy-900)', fontSize: '2rem', marginBottom: '1rem' }}>Article Not Found</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>The article you are looking for has been moved or deleted.</p>
        <Link to="/blog"><button style={{ padding: '0.8rem 1.5rem', background: 'var(--teal-600)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Back to Blog</button></Link>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', paddingBottom: '7rem' }}>
      
      <div style={{ position: 'relative', zIndex: 1, paddingTop: '4rem' }}>
        <div style={{ padding: '0 5%', maxWidth: '1000px', margin: '0 auto' }}>
          <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--blue-600)', textDecoration: 'none', marginBottom: '3rem', fontWeight: 'bold' }}>
            <ArrowLeft size={18} /> Back to Blog
          </Link>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 5%' }}
        >
          {/* Title Section */}
          <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
            <span style={{ display: 'inline-block', padding: '0.4rem 1rem', background: 'var(--sky-100)', color: 'var(--teal-600)', fontWeight: 'bold', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', borderRadius: '20px', marginBottom: '1rem' }}>
              {article.author}
            </span>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--navy-900)', margin: '0 0 1rem 0', fontWeight: '800', lineHeight: '1.2' }}>{article.title}</h1>
            <span style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: '500' }}>Published on {article.date}</span>
          </div>

          {/* Hero Image */}
          <div style={{ height: '550px', width: '100%', borderRadius: '24px', overflow: 'hidden', marginBottom: '4rem', boxShadow: '0 20px 40px rgba(18,48,107,0.1)', border: '1px solid rgba(18,48,107,0.05)', backgroundColor: 'var(--white)' }}>
            <img src={article.image} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          {/* Content */}
          <div 
            className="article-content"
            style={{
              color: 'var(--text-body)',
              fontSize: '1.15rem',
              lineHeight: '1.9',
              maxWidth: '850px',
              margin: '0 auto',
              background: 'var(--white)',
              padding: 'clamp(2rem, 5vw, 4rem)',
              borderRadius: '24px',
              boxShadow: '0 10px 40px rgba(18,48,107,0.06)',
              border: '1px solid rgba(18,48,107,0.05)'
            }}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <style>
            {`
              .article-content h2 {
                color: var(--navy-900);
                font-size: 2.2rem;
                margin-top: 2rem;
                margin-bottom: 1.5rem;
                font-weight: 800;
              }
              .article-content h3 {
                color: var(--teal-600);
                font-size: 1.4rem;
                margin-top: 2.5rem;
                margin-bottom: 1rem;
                font-weight: 700;
              }
              .article-content p {
                margin-bottom: 1.5rem;
                color: #475569;
              }
              .article-content blockquote {
                border-left: 4px solid var(--teal-600);
                padding-left: 1.5rem;
                margin: 2.5rem 0;
                font-size: 1.3rem;
                font-style: italic;
                color: var(--navy-900);
                background: #f1f5f9;
                padding: 2rem;
                border-radius: 0 16px 16px 0;
                line-height: 1.6;
              }
            `}
          </style>

        </motion.div>
      </div>
    </div>
  );
}
