import React, { Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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
const BlogPost = React.lazy(() => import('../pages/BlogPost'));
const Contact = React.lazy(() => import('../pages/Contact'));
const FAQ = React.lazy(() => import('../pages/FAQ'));
const ProductDetail = React.lazy(() => import('../pages/ProductDetail'));
const PMSuryaGhar = React.lazy(() => import('../pages/PMSuryaGhar'));
const Gallery = React.lazy(() => import('../pages/Gallery'));
const Team = React.lazy(() => import('../pages/Team'));
const Certifications = React.lazy(() => import('../pages/Certifications'));

const AdminLogin = React.lazy(() => import('../pages/AdminLogin'));
const AdminDashboard = React.lazy(() => import('../pages/AdminDashboard'));
const EmployeePortal = React.lazy(() => import('../pages/EmployeePortal'));
const EmployeeDashboard = React.lazy(() => import('../pages/EmployeeDashboard'));

import { PageSkeleton, AdminDashboardSkeleton } from '../components/ui/Skeleton';

// Route-Aware Skeleton Fallback for Suspense
const SuspenseSkeletonFallback = () => {
  const { pathname } = useLocation();
  if (pathname.startsWith('/admin') || pathname.startsWith('/employee-dashboard') || pathname.startsWith('/portal')) {
    return <AdminDashboardSkeleton />;
  }
  return <PageSkeleton />;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<SuspenseSkeletonFallback />}>
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
          <Route path="blog/:id" element={<BlogPost />} />
          <Route path="contact" element={<Contact />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="pm-surya-ghar" element={<PMSuryaGhar />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="team" element={<Team />} />
          <Route path="certifications" element={<Certifications />} />
          
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
    </>
  );
}

export default AppRoutes;
