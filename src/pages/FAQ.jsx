import React, { useState, useMemo, useCallback } from 'react';
import AnimatedList from '../components/reactbits/AnimatedList';
import useLocalStorageData from '../hooks/useLocalStorageData';
import usePagination from '../hooks/usePagination';
import useDebounce from '../hooks/useDebounce';

const INITIAL_FAQS = [
  { q: "How much does solar cost?", a: "The cost varies depending on system size, location, and specific requirements. Reach out to get a custom quote." },
  { q: "How long do solar panels last?", a: "Modern solar panels are designed to last 25-30 years. Our premium panels come with a comprehensive 25-year warranty." },
  { q: "Does solar work on cloudy days?", a: "Yes! Solar panels still generate electricity on cloudy days, though at a reduced efficiency compared to direct sunlight." },
  { q: "Do I need batteries?", a: "Batteries are optional. If you have net metering, you may not need them. However, they are great for backup power and true energy independence." },
  { q: "Will solar panels damage my roof?", a: "No, our installation uses non-penetrating or properly sealed mounting tech that protects your roof's integrity entirely." },
  { q: "How long does the installation take?", a: "Typically, the physical installation takes 1 to 3 days depending on the system size. The permitting process can take a few weeks prior." },
  { q: "What is Net Metering?", a: "Net metering is a system where you sell excess power your panels produce back to the grid, resulting in lower monthly utility bills." },
  { q: "Do the panels require maintenance?", a: "Minimal maintenance is required. Occasional rinsing with a hose to remove dust or debris is usually sufficient to maintain peak performance." },
  { q: "Can I go completely off-grid?", a: "Yes, by sizing your system correctly and adding enough battery storage, you can achieve complete independence from the local electrical grid." },
  { q: "How does the warranty work?", a: "We offer comprehensive warranties covering both the equipment (up to 25 years) and our workmanship." },
  { q: "Will extreme weather damage my panels?", a: "Our panels are engineered to withstand extreme conditions, including heavy snow loads and hurricane-force winds." },
  { q: "What happens during a power outage?", a: "Standard grid-tied systems shut down during an outage for safety. With a battery addition, you can maintain power." }
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 250);
  
  const fetchedFaqs = useLocalStorageData('faq');

  const activeFaqs = useMemo(() => {
    const raw = fetchedFaqs.length > 0
      ? fetchedFaqs.map(p => ({ q: p.question, a: p.answer }))
      : INITIAL_FAQS;

    if (!debouncedQuery.trim()) return raw;
    const qLower = debouncedQuery.toLowerCase().trim();
    return raw.filter(item => 
      item.q.toLowerCase().includes(qLower) || 
      item.a.toLowerCase().includes(qLower)
    );
  }, [fetchedFaqs, debouncedQuery]);

  const { currentData, currentPage, totalPages, nextPage, prevPage, goToPage, itemsRangeText, pagesList } = usePagination(activeFaqs, 6);

  const toggle = useCallback((i) => {
    setOpenIndex(prev => (prev === i ? null : i));
  }, []);

  return (
    <div style={{
      backgroundImage: 'linear-gradient(rgba(2, 6, 23, 0.15), rgba(2, 6, 23, 0.4)), url(/images/green_solar_field_1791612498444.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      minHeight: '100vh',
      paddingTop: '2rem',
      paddingBottom: '4rem'
    }}>
      <div className="page-padding" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">Find answers to common questions about solar energy.</p>
        </div>

        {/* Debounced Search Bar */}
        <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
          <input 
            type="text"
            placeholder="🔍 Search questions or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              maxWidth: '550px',
              padding: '0.85rem 1.6rem',
              borderRadius: '50px',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              background: 'rgba(15, 23, 42, 0.65)',
              backdropFilter: 'blur(10px)',
              color: 'white',
              fontSize: '1rem',
              outline: 'none',
              boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
            }}
          />
        </div>

      <AnimatedList 
        className="faq-list"
        items={currentData.map((faq, i) => (
          <div key={i} style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', background: 'rgba(15, 23, 42, 0.55)', backdropFilter: 'blur(12px)', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', transition: 'all 0.3s ease' }}>
            <button 
              onClick={(e) => { e.stopPropagation(); toggle(i); }}
              style={{ width: '100%', padding: '1.5rem', textAlign: 'left', background: 'transparent', border: 'none', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontSize: '1.1rem', fontWeight: 'bold' }}
            >
              {faq.q}
              <span style={{ color: 'var(--teal-400)', fontSize: '1.4rem', transition: 'transform 0.3s', transform: openIndex === i ? 'rotate(45deg)' : 'rotate(0)' }}>
                +
              </span>
            </button>
            {openIndex === i && (
               <div style={{ padding: '0 1.5rem 1.5rem', color: 'var(--text-light)', lineHeight: '1.7', opacity: 0.9 }}>
                 {faq.a}
               </div>
            )}
          </div>
        ))}
      />

      {currentData.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'rgba(255,255,255,0.8)' }}>
          No questions found matching "{searchQuery}".
        </div>
      )}
      
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '0.6rem', marginTop: '2.5rem' }}>
          <button 
            onClick={prevPage} 
            disabled={currentPage === 1} 
            style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: currentPage === 1 ? 'transparent' : 'rgba(255,255,255,0.15)', color: 'white', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}
          >
            &larr; Prev
          </button>
          
          {pagesList.map(pg => (
            <button
              key={pg}
              onClick={() => goToPage(pg)}
              style={{
                padding: '0.5rem 0.9rem',
                borderRadius: '8px',
                border: currentPage === pg ? '1px solid var(--teal-400)' : '1px solid rgba(255,255,255,0.15)',
                background: currentPage === pg ? 'var(--teal-500)' : 'rgba(255,255,255,0.08)',
                color: 'white',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              {pg}
            </button>
          ))}
          
          <button 
            onClick={nextPage} 
            disabled={currentPage === totalPages} 
            style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: currentPage === totalPages ? 'transparent' : 'rgba(255,255,255,0.15)', color: 'white', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}
          >
            Next &rarr;
          </button>
        </div>
      )}
     </div>
    </div>
  );
}

export default FAQ;
