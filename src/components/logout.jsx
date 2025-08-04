import { Button, Container, Alert, Card, Row, Col, ProgressBar } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router';
import { useSteam } from '../context/SteamContext';
import { useState, useEffect } from 'react';
import { FaSteam, FaSignOutAlt, FaHome } from 'react-icons/fa';
import { BsArrowLeft } from 'react-icons/bs';
import '../Logout.css';

const Logout = () => {
  const { steamId, logout, isAuthenticated } = useSteam();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    setIsLoggingOut(true);
    
    setTimeout(() => {
      localStorage.removeItem('steamAuth');
      logout();
      
      setShowSuccess(true);
      const timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
      setTimeout(() => {
        clearInterval(timer);
        navigate('/');
      }, 5000);
      
      setIsLoggingOut(false);
    }, 1000);
  };

  const handleCancel = () => {
    navigate(-1); 
  };

  if (showSuccess) {
    return (
      <Container className="text-center py-5">
        <Alert variant="success" className="d-inline-flex align-items-center">
          <FaSignOutAlt className="me-2" size={24} />
          You've been logged out successfully. Redirecting in {countdown} seconds...
        </Alert>
        <ProgressBar 
          animated 
          now={(5 - countdown) * 20} 
          className="mt-3" 
          style={{ maxWidth: '300px', margin: '0 auto' }} 
        />
        <Button 
          as={Link}
          to="/"
          variant="outline-primary" 
          className="mt-3"
        >
          <FaHome className="me-2" />
          Go Home Now
        </Button>
      </Container>
    );
  }

  return (
    <div className="logout-container">
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col lg={8} xl={6}>
            <Card className="custom-card">
              <Card.Body className="p-4 p-md-5 text-center">
                <FaSteam size={48} className="steam-icon mb-3" />
                <Card.Title as="h2" className="main-title mb-4">
                  Confirm Logout
                </Card.Title>
                
                <Card.Text className="mb-4">
                  Are you sure you want to log out of your Steam account?
                </Card.Text>
                
                <div className="d-grid gap-3">
                  <Button 
                    onClick={handleLogout}
                    variant="danger"
                    size="lg"
                    disabled={isLoggingOut}
                    className="logout-btn"
                  >
                    {isLoggingOut ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" />
                        Logging out...
                      </>
                    ) : (
                      <>
                        <FaSignOutAlt className="me-3" size={20} />
                        Logout
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    onClick={handleCancel}
                    variant="outline-secondary"
                    size="lg"
                    className="cancel-btn"
                  >
                    <BsArrowLeft className="me-3" />
                    Cancel
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Logout;