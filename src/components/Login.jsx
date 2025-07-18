import { Button, Container, Alert, Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useSteam } from '../context/SteamContext';
import React, { useState } from 'react';

const Login = () => {
  const { loginWithSteam, isAuthenticated, setSteamId } = useSteam();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      await loginWithSteam();
      navigate('/profile');
    } catch (err) {
      setError('Failed to login with Steam. Please try again.');
      console.error(err);
    }
  };

  // Test function to bypass login and use my Steam account
  const handleTestLogin = () => {
    setSteamId('76561198028175941'); // Your SteamID64
    navigate('/inventory');
  };

  if (isAuthenticated) {
    return (
      <Container className="text-center py-5">
        <Alert variant="info">
          You are already logged in. Redirecting to profile...
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body className="text-center p-5">
              <Card.Title as="h2" className="mb-4">Login with Steam</Card.Title>
              <Card.Text className="mb-4">
                To view your Steam inventory, please authenticate with your Steam account.
              </Card.Text>
              
              {error && <Alert variant="danger" className="mb-4">{error}</Alert>}
              
              <Button 
                onClick={handleLogin}
                variant="primary"
                size="lg"
                className="steam-login-btn mb-3"
              >
                <i className="fab fa-steam me-2"></i>
                Sign in through Steam
              </Button>

              {/* Test login button */}
              <div className="mt-4 border-top pt-4">
                <p className="text-muted small mb-3">For testing purposes only:</p>
                <Button 
                  onClick={handleTestLogin}
                  variant="outline-secondary"
                  size="sm"
                >
                  Skip Sign-In (View Monsoonification's Inventory)
                </Button>
                <p className="text-muted small mt-2">
                  This will show inventory from: steamcommunity.com/id/monsoonification (DOESNT WORK, WILL IMPLEMENT SOON)
                </p>
              </div>
              
              <Card.Text className="mt-4 text-muted">
                We don't store your Steam credentials. Authentication is handled securely through Steam's OpenID.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;