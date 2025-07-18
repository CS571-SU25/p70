import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import backgroundImage from './backgroundHome.jpg'; // Import the image
import './Home.css';

const Home = () => {
  // Debugging the image import
  console.log('Background image path:', backgroundImage);
  
  // Fallback background color if image fails to load
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: '#1b2838', // Steam's dark blue as fallback
  };

  return (
    <div className="home-container">
      {/* Background Image with Debugging */}
      <div 
        className="background-image" 
        style={backgroundStyle}
        onError={(e) => {
          console.error('Failed to load background image:', backgroundImage);
          e.target.style.backgroundImage = 'none'; // Remove failed image
        }}
      >
        {/* Fallback text for screen readers */}
        <span className="visually-hidden">Steam inventory manager background</span>
      </div>
      {/* Animated overlay elements */}
      <div className="animated-overlay">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} className="text-center">
              <h1 className="display-4 fw-bold mb-3 text-white hero-title">
                Steam Inventory Manager
              </h1>
              <p className="lead mb-4 text-light hero-subtitle">
                Comprehensive tool for managing and analyzing your Steam inventory
              </p>
              <Button 
                as={Link} 
                to="/login" 
                variant="primary" 
                size="lg"
                className="px-4 py-3 steam-connect-btn"
              >
                Connect Steam Account
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <Container className="py-5">
          <Row className="g-4 justify-content-center">
            {/* Inventory Card */}
            <Col xxl={3} xl={4} lg={5} md={6} className="d-flex">
              <Card className="w-100 shadow feature-card">
                <Card.Body className="d-flex flex-column p-4">
                  <div className="text-center mb-3">
                    <div className="icon-wrapper bg-primary bg-opacity-10">
                      <i className="bi bi-collection fs-3 text-primary"></i>
                    </div>
                  </div>
                  <Card.Title className="text-center h5 mb-3">Inventory Browser</Card.Title>
                  <Card.Text className="text-center text-muted flex-grow-1">
                    View your complete Steam inventory with detailed statistics
                  </Card.Text>
                  <Button 
                    as={Link} 
                    to="/inventory" 
                    variant="outline-primary" 
                    className="mt-3 align-self-center feature-btn"
                  >
                    Explore Items
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            {/* Profile Card */}
            <Col xxl={3} xl={4} lg={5} md={6} className="d-flex">
              <Card className="w-100 shadow feature-card">
                <Card.Body className="d-flex flex-column p-4">
                  <div className="text-center mb-3">
                    <div className="icon-wrapper bg-info bg-opacity-10">
                      <i className="bi bi-person-badge fs-3 text-info"></i>
                    </div>
                  </div>
                  <Card.Title className="text-center h5 mb-3">Profile Analytics</Card.Title>
                  <Card.Text className="text-center text-muted flex-grow-1">
                    Detailed statistics about your Steam profile
                  </Card.Text>
                  <Button 
                    as={Link} 
                    to="/profile" 
                    variant="outline-info" 
                    className="mt-3 align-self-center feature-btn"
                  >
                    View Profile
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            {/* Login Card */}
            <Col xxl={3} xl={4} lg={5} md={6} className="d-flex">
              <Card className="w-100 shadow feature-card">
                <Card.Body className="d-flex flex-column p-4">
                  <div className="text-center mb-3">
                    <div className="icon-wrapper bg-success bg-opacity-10">
                      <i className="bi bi-steam fs-3 text-success"></i>
                    </div>
                  </div>
                  <Card.Title className="text-center h5 mb-3">Secure Login</Card.Title>
                  <Card.Text className="text-center text-muted flex-grow-1">
                    Authenticate with Steam securely
                  </Card.Text>
                  <Button 
                    as={Link} 
                    to="/login" 
                    variant="success" 
                    className="mt-3 align-self-center feature-btn"
                  >
                    Sign In
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;