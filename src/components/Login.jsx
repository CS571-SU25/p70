import { Button, Container, Alert, Card, Row, Col, ProgressBar } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useSteam } from '../context/SteamContext';
import { useState, useEffect } from 'react';
import { FaSteam, FaShieldAlt, FaLock, FaCheckCircle } from 'react-icons/fa';
import { BsArrowRight } from 'react-icons/bs';
import '../Login.css';

const Login = () => {
  const { loginWithSteam, isAuthenticated, setSteamId } = useSteam();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  const [loginMethod, setLoginMethod] = useState(null); 
  const [showLoginPanel, setShowLoginPanel] = useState(false);

  useEffect(() => {
    const storedAuth = localStorage.getItem('steamAuth');
    if (storedAuth) {
      const { isAuthenticated, isDemo, steamId } = JSON.parse(storedAuth);
      if (isAuthenticated && isDemo) {
        setSteamId(steamId);
      }
    }
    setShowLoginPanel(true);
  }, [setSteamId]);

  const handleLogin = async (method) => {
    setLoginMethod(method);
    setIsLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (method === 'steam') {
        await loginWithSteam();
        localStorage.setItem('steamAuth', JSON.stringify({
          isAuthenticated: true,
          isDemo: false,
          timestamp: new Date().getTime()
        }));
        navigate('/profile');
      } else if (method === 'demo') {
        const demoSteamId = '76561198028175941';
        setSteamId(demoSteamId);
        localStorage.setItem('steamAuth', JSON.stringify({
          steamId: demoSteamId,
          isAuthenticated: true,
          isDemo: true,
          timestamp: new Date().getTime()
        }));
        navigate('/inventory');
      }
    } catch (err) {
      setError('Failed to login. Please try again.');
      console.error(err);
      setLoginMethod(null);
    } finally {
      setIsLoading(false);
    }
  };
  if (!showLoginPanel) {
    return null;
  }
  if (isAuthenticated) {
    return (
      <Container className="text-center py-5">
        <Alert variant="info" className="d-inline-flex align-items-center">
          <FaCheckCircle className="me-2" size={24} />
          You're already logged in. <a href="/profile">Go to profile</a>
        </Alert>
      </Container>
    );
  }

  return (
    <div className="login-container">
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col lg={8} xl={6}>
            <Card className="custom-card">
              <Card.Body className="p-4 p-md-5">
                <div className="text-center mb-4">
                  <FaSteam size={48} className="steam-icon mb-3" />
                  <Card.Title as="h2" className="main-title">Steam Inventory Manager</Card.Title>
                  <Card.Text className="subtitle-text">
                    Access and manage your Steam inventory with powerful tools
                  </Card.Text>
                </div>
                
                {error && (
                  <Alert variant="danger" className="custom-alert">
                    <FaShieldAlt className="me-2" />
                    {error}
                  </Alert>
                )}
                
                <div className="d-grid gap-3">
                  <Button 
                    onClick={() => handleLogin('steam')}
                    variant="steam"
                    size="lg"
                    disabled={isLoading}
                    className="steam-login-btn"
                  >
                    {isLoading && loginMethod === 'steam' ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" />
                        Connecting to Steam...
                      </>
                    ) : (
                      <>
                        <FaSteam className="me-3" size={20} />
                        Sign in through Steam
                        <BsArrowRight className="ms-2" />
                      </>
                    )}
                  </Button>

                  <div className="divider-container">
                    <hr className="divider-line" />
                    <span className="divider-text">OR</span>
                  </div>

                  <Button 
                    onClick={() => handleLogin('demo')}
                    variant="outline-light"
                    size="lg"
                    disabled={isLoading}
                    className="demo-login-btn"
                  >
                    {isLoading && loginMethod === 'demo' ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" />
                        Loading Demo...
                      </>
                    ) : (
                      <>
                        <FaLock className="me-3" />
                        Continue as Demo User
                      </>
                    )}
                  </Button>
                </div>

                <div className="features-toggle">
                  <Button 
                    variant="link" 
                    className="features-toggle-btn"
                    onClick={() => setShowFeatures(!showFeatures)}
                    disabled={isLoading}
                  >
                    {showFeatures ? 'Hide features' : 'What can I do with this app?'}
                    <BsArrowRight className={`toggle-arrow ${showFeatures ? 'rotated' : ''}`} />
                  </Button>

                  {showFeatures && (
                    <div className="features-list">
                      <ul className="list-unstyled">
                        <li className="mb-2 d-flex align-items-start">
                          <span className="badge bg-steam me-3 mt-1">1</span>
                          <span>View your complete Steam inventory with detailed statistics</span>
                        </li>
                        <li className="mb-2 d-flex align-items-start">
                          <span className="badge bg-steam me-3 mt-1">2</span>
                          <span>Track market prices and value trends for your items</span>
                        </li>
                        <li className="mb-2 d-flex align-items-start">
                          <span className="badge bg-steam me-3 mt-1">3</span>
                          <span>Compare items and analyze your collection</span>
                        </li>
                        <li className="d-flex align-items-start">
                          <span className="badge bg-steam me-3 mt-1">4</span>
                          <span>100% secure - No credentials stored</span>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>

                <Card.Text className="security-notice">
                  <FaLock className="me-2" />
                  We use Steam's secure OpenID system. Your credentials are never shared with us.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;