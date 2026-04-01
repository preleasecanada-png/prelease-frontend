import React, { useEffect, useState } from 'react';
import { 
  HeroSection, 
  FeatureCard, 
  TestimonialCard, 
  StatCard, 
  AnimatedSection,
  AnimatedButton,
  SearchBar,
  EnhancedPagination
} from '@/components';
import { authFetch } from '@/Helper/helper';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProperties: 0,
    totalApplications: 0,
    activeLeases: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [role, setRole] = useState('');

  useEffect(() => {
    const r = localStorage.getItem('role');
    setRole(r || '');
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const data = await authFetch('/dashboard/stats');
      if (data?.status === 200) {
        const d = data.data;
        if (d.role === 'host') {
          setStats({
            totalProperties: d.total_properties || 0,
            totalApplications: d.pending_applications || 0,
            activeLeases: d.active_leases || 0,
            totalRevenue: d.total_revenue || 0,
          });
        } else {
          setStats({
            totalProperties: d.my_applications || 0,
            totalApplications: d.pending_applications || 0,
            activeLeases: d.active_leases || 0,
            totalRevenue: d.total_paid || 0,
          });
        }
      }
      setLoading(false);
    } catch (error) {
      toast.error('Failed to load dashboard data');
      setLoading(false);
    }
  };

  const features = [
    {
      icon: <div className="display-4">🏠</div>,
      title: "Find Your Perfect Home",
      description: "Browse through thousands of verified rental properties across Canada"
    },
    {
      icon: <div className="display-4">📋</div>,
      title: "Easy Application Process",
      description: "Apply to multiple properties with just a few clicks and track your applications"
    },
    {
      icon: <div className="display-4">🔐</div>,
      title: "Secure Payments",
      description: "Safe and secure online payment system with multiple payment options"
    },
    {
      icon: <div className="display-4">📱</div>,
      title: "Mobile Friendly",
      description: "Access your account and manage rentals on the go with our mobile app"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Renter",
      avatar: "https://picsum.photos/seed/sarah/60/60",
      rating: 5,
      testimonial: "Prelease Canada made finding my apartment so easy! The application process was smooth and I found the perfect place in just 2 weeks."
    },
    {
      name: "Michael Chen",
      role: "Landlord",
      avatar: "https://picsum.photos/seed/michael/60/60",
      rating: 5,
      testimonial: "As a landlord, this platform has helped me find reliable tenants quickly. The verification process gives me peace of mind."
    },
    {
      name: "Emily Rodriguez",
      role: "Renter",
      avatar: "https://picsum.photos/seed/emily/60/60",
      rating: 4,
      testimonial: "Great platform with excellent customer support. Found my dream apartment and the whole process was hassle-free."
    }
  ];

  if (loading) {
    return (
      <section className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title="Welcome to Prelease Canada"
        subtitle="Your trusted partner for finding the perfect rental home in Canada"
        backgroundImage="https://picsum.photos/seed/hero/1920/800"
        ctaText="Get Started"
        onCTAClick={() => window.location.href = '/properties'}
      />

      {/* Stats Section */}
      <section className="container py-5 section-spacing">
        <AnimatedSection animation="fadeInUp" delay={100}>
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-gradient mb-3">Platform Statistics</h2>
            <p className="lead text-muted">Join thousands of satisfied renters and landlords</p>
          </div>
        </AnimatedSection>

        <div className="row g-4">
          <div className="col-md-3">
            <AnimatedSection animation="fadeInUp" delay={200}>
              <StatCard 
                title="Properties Listed"
                value={stats.totalProperties}
                color="primary"
                trend={{ direction: 'up', percentage: 12 }}
              />
            </AnimatedSection>
          </div>
          <div className="col-md-3">
            <AnimatedSection animation="fadeInUp" delay={300}>
              <StatCard 
                title="Applications"
                value={stats.totalApplications}
                color="info"
                trend={{ direction: 'up', percentage: 8 }}
              />
            </AnimatedSection>
          </div>
          <div className="col-md-3">
            <AnimatedSection animation="fadeInUp" delay={400}>
              <StatCard 
                title="Active Leases"
                value={stats.activeLeases}
                color="success"
                trend={{ direction: 'up', percentage: 15 }}
              />
            </AnimatedSection>
          </div>
          <div className="col-md-3">
            <AnimatedSection animation="fadeInUp" delay={500}>
              <StatCard 
                title="Revenue Processed"
                value={`$${(stats.totalRevenue / 1000).toFixed(1)}k`}
                color="warning"
                trend={{ direction: 'up', percentage: 20 }}
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 section-gradient-1">
        <div className="container">
          <AnimatedSection animation="fadeInUp" delay={100}>
            <div className="text-center mb-5">
              <h2 className="display-5 fw-bold text-white mb-3">Why Choose Prelease Canada?</h2>
              <p className="lead text-white">Everything you need for a seamless rental experience</p>
            </div>
          </AnimatedSection>

          <div className="row g-4">
            {features.map((feature, index) => (
              <div key={index} className="col-md-6 col-lg-3">
                <AnimatedSection animation="fadeInUp" delay={200 + index * 100}>
                  <FeatureCard
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    gradient={true}
                  />
                </AnimatedSection>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="container py-5 section-spacing">
        <AnimatedSection animation="fadeInUp" delay={100}>
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-gradient mb-3">Find Your Next Home</h2>
            <p className="lead text-muted">Search from thousands of verified rental properties</p>
          </div>
        </AnimatedSection>

        <AnimatedSection animation="fadeInUp" delay={200}>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <SearchBar
                placeholder="Search by city, neighborhood, or property type..."
                onSearch={(query) => setSearchQuery(query)}
                showFilters={true}
                filters={[
                  { label: 'Apartments', value: 'apartment' },
                  { label: 'Houses', value: 'house' },
                  { label: 'Condos', value: 'condo' },
                  { label: 'Townhouses', value: 'townhouse' }
                ]}
              />
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection animation="fadeInUp" delay={300}>
          <div className="text-center mt-4">
            <AnimatedButton 
              variant="primary" 
              size="large"
              onClick={() => window.location.href = '/properties'}
            >
              Browse All Properties
            </AnimatedButton>
          </div>
        </AnimatedSection>
      </section>

      {/* Testimonials Section */}
      <section className="py-5 section-spacing background-pattern">
        <div className="container">
          <AnimatedSection animation="fadeInUp" delay={100}>
            <div className="text-center mb-5">
              <h2 className="display-5 fw-bold text-gradient mb-3">What Our Users Say</h2>
              <p className="lead text-muted">Real experiences from our community</p>
            </div>
          </AnimatedSection>

          <div className="row g-4">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="col-md-4">
                <AnimatedSection animation="fadeInUp" delay={200 + index * 100}>
                  <TestimonialCard
                    name={testimonial.name}
                    role={testimonial.role}
                    avatar={testimonial.avatar}
                    rating={testimonial.rating}
                    testimonial={testimonial.testimonial}
                  />
                </AnimatedSection>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 section-gradient-2">
        <div className="container">
          <AnimatedSection animation="fadeInUp" delay={100}>
            <div className="text-center">
              <h2 className="display-5 fw-bold text-white mb-4">Ready to Find Your Perfect Home?</h2>
              <p className="lead text-white mb-4">Join thousands of satisfied renters and landlords</p>
              <div className="d-flex gap-3 justify-content-center">
                <AnimatedButton 
                  variant="outline"
                  onClick={() => window.location.href = '/signup'}
                >
                  Sign Up Free
                </AnimatedButton>
                <AnimatedButton 
                  variant="primary"
                  onClick={() => window.location.href = '/properties'}
                >
                  Browse Properties
                </AnimatedButton>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
