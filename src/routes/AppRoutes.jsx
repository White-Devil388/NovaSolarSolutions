import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ProtectedRoute from '../components/auth/ProtectedRoute';

// Lazy Loaded Pages (Code Splitting)
const Home = React.lazy(() => import('../pages/Home'));
const Solutions = React.lazy(() => import('../pages/Solutions'));
const Products = React.lazy(() => import('../pages/Products'));
const Calculator = React.lazy(() => import('../pages/Calculator'));
const Projects = React.lazy(() => import('../pages/Projects'));
const About = React.lazy(() => import('../pages/About'));
const Blog = React.lazy(() => import('../pages/Blog'));
const Contact = React.lazy(() => import('../pages/Contact'));
const FAQ = React.lazy(() => import('../pages/FAQ'));
const ProductDetail = React.lazy(() => import('../pages/ProductDetail'));
const PMSuryaGhar = React.lazy(() => import('../pages/PMSuryaGhar'));

const AdminLogin = React.lazy(() => import('../pages/AdminLogin'));
const AdminDashboard = React.lazy(() => import('../pages/AdminDashboard'));
const EmployeePortal = React.lazy(() => import('../pages/EmployeePortal'));
const EmployeeDashboard = React.lazy(() => import('../pages/EmployeeDashboard'));

// Generic Loader for Suspense
const SuspenseLoader = () => (
  <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a' }}>
    <div style={{ width: '40px', height: '40px', border: '4px solid rgba(255,255,255,0.1)', borderTop: '4px solid #38bdf8', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
    <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
  </div>
);

function AppRoutes() {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="solutions" element={<Solutions />} />
          <Route path="solutions/:category" element={<ProductDetail />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:category" element={<ProductDetail />} />
          <Route path="calculator" element={<Calculator />} />
          <Route path="projects" element={<Projects />} />
          <Route path="about" element={<About />} />
          <Route path="blog" element={<Blog />} />
          <Route path="contact" element={<Contact />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="pm-surya-ghar" element={<PMSuryaGhar />} />
          
          <Route path="*" element={
            <div style={{ padding: '8rem 5%', textAlign: 'center' }}>
              <h2 className="section-title">Looks like this page went off-grid.</h2>
              <p className="section-subtitle" style={{marginBottom: '2rem'}}>The page you are looking for does not exist.</p>
              <a href="/"><button className="btn btn-primary">Back Home</button></a>
            </div>
          } />
        </Route>

        <Route path="/portal" element={<EmployeePortal />} />
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
        
        {/* Hidden Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route 
          path="/admin/panel" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
