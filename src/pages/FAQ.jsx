import React, { useState } from 'react';

const faqs = [
  { q: "How much does solar cost?", a: "The cost varies depending on system size, location, and specific requirements. Reach out to get a custom quote." },
  { q: "How long do solar panels last?", a: "Modern solar panels are designed to last 25-30 years. Our premium panels come with a comprehensive 25-year warranty." },
  { q: "Does solar work on cloudy days?", a: "Yes! Solar panels still generate electricity on cloudy days, though at a reduced efficiency compared to direct sunlight." },
  { q: "Do I need batteries?", a: "Batteries are optional. If you have net metering, you may not need them. However, they are great for backup power and true energy independence." }
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="page-padding" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="section-header">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <p className="section-subtitle">Find answers to common questions about solar energy.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {faqs.map((faq, i) => (
          <div key={i} style={{ border: '1px solid var(--glass-border)', borderRadius: '8px', background: 'var(--bg-dark)', overflow: 'hidden' }}>
            <button 
              onClick={() => toggle(i)}
              style={{ width: '100%', padding: '1.5rem', textAlign: 'left', background: 'transparent', border: 'none', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontSize: '1.1rem', fontWeight: 'bold' }}
            >
              {faq.q}
              <span style={{ color: 'var(--primary)' }}>{openIndex === i ? '−' : '+'}</span>
            </button>
            {openIndex === i && (
              <div style={{ padding: '0 1.5rem 1.5rem', color: 'var(--text-muted)' }}>
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;
