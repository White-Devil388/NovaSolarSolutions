import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';

// Placeholder Pages
import Solutions from './pages/Solutions';
import Products from './pages/Products';
import Calculator from './pages/Calculator';
import Projects from './pages/Projects';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="solutions" element={<Solutions />} />
          <Route path="products" element={<Products />} />
          <Route path="calculator" element={<Calculator />} />
          <Route path="projects" element={<Projects />} />
          <Route path="about" element={<About />} />
          <Route path="blog" element={<Blog />} />
          <Route path="contact" element={<Contact />} />
          <Route path="faq" element={<FAQ />} />
          
          <Route path="*" element={
            <div style={{ padding: '8rem 5%', textAlign: 'center' }}>
              <h2 className="section-title">Looks like this page went off-grid.</h2>
              <p className="section-subtitle" style={{marginBottom: '2rem'}}>The page you are looking for does not exist.</p>
              <a href="/"><button className="btn btn-primary">Back Home</button></a>
            </div>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
