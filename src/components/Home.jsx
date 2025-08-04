import { Container, Row, Col, Card, Button, ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router';
import { FiUsers, FiDollarSign, FiPieChart, FiTrendingUp, FiClock, FiServer } from 'react-icons/fi';
import backgroundImage from '../backgroundHome.jpg';
import '../Home.css';

const Home = () => {
  const stats = {
    users: 12543,
    itemsTracked: 8924567,
    marketValue: 4528912,
    dailyChange: 2.4,
    weeklyChange: -1.2,
    activeUsers: 3842,
    apiCalls: 12567843,
    lastUpdated: 'Just now'
  };

  return (
    <div className="home-container dark-theme">
      <div className="background-wrapper">
        <div 
          className="background-image"
          style={{ backgroundImage: `url(${backgroundImage})` }}
          aria-hidden="true"
        />
        <div className="background-overlay" />
      </div>  
    
      <div className="content-wrapper">
        <section className="hero-section">
          <Container>
            <Row className="justify-content-center">
              <Col lg={8} className="text-center">
                <h1 className="display-4 fw-bold mb-3 text-white hero-title">
                  Steam Inventory Manager
                </h1>
                <p className="lead mb-4 text-light hero-subtitle">
                  Comprehensive tool for managing and analyzing your Steam inventory across all games
                </p>
                <Button 
                  as={Link} 
                  to="/login" 
                  variant="success" 
                  size="lg"
                  className="px-4 py-3 steam-connect-btn fw-bold"
                >
                  Connect Steam Account
                </Button>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="stats-section py-4">
          <Container>
            <Row className="g-4">
              <Col md={4}>
                <Card className="stat-card h-100 border-dark">
                  <Card.Body className="d-flex flex-column">
                    <div className="d-flex align-items-center mb-3">
                      <FiUsers className="stat-icon me-3 text-steam-light" size={24} />
                      <h3 className="mb-0 text-steam-light">Users</h3>
                    </div>
                    <div className="stat-value text-white">{stats.users.toLocaleString()}</div>
                    <div className="stat-label mt-auto text-steam-muted">Total registered users</div>
                  </Card.Body>
                </Card>
              </Col>
              
              <Col md={4}>
                <Card className="stat-card h-100 border-dark">
                  <Card.Body className="d-flex flex-column">
                    <div className="d-flex align-items-center mb-3">
                      <FiDollarSign className="stat-icon me-3 text-steam-light" size={24} />
                      <h3 className="mb-0 text-steam-light">Market Value</h3>
                    </div>
                    <div className="stat-value text-white">${stats.marketValue.toLocaleString()}</div>
                    <div className="stat-label mt-auto text-steam-muted">Total inventory value tracked</div>
                  </Card.Body>
                </Card>
              </Col>
              
              <Col md={4}>
                <Card className="stat-card h-100 border-dark">
                  <Card.Body className="d-flex flex-column">
                    <div className="d-flex align-items-center mb-3">
                      <FiPieChart className="stat-icon me-3 text-steam-light" size={24} />
                      <h3 className="mb-0 text-steam-light">Items Tracked</h3>
                    </div>
                    <div className="stat-value text-white">{stats.itemsTracked.toLocaleString()}</div>
                    <div className="stat-label mt-auto text-steam-muted">Total items in database</div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="features-section py-5">
          <Container>
            <h2 className="text-center mb-5 text-steam-light section-title">Key Features</h2>
            <Row className="g-4 justify-content-center">
              <Col xxl={3} xl={4} lg={5} md={6} className="d-flex">
                <Card className="w-100 shadow feature-card border-dark">
                  <Card.Body className="d-flex flex-column p-4">
                    <div className="text-center mb-3">
                      <div className="icon-wrapper bg-steam-dark">
                        <i className="bi bi-collection fs-3 text-primary"></i>
                      </div>
                    </div>
                    <Card.Title className="text-center h5 mb-3 text-steam-light">Inventory Browser</Card.Title>
                    <Card.Text className="text-center text-steam-muted flex-grow-1">
                      View your complete Steam inventory with detailed statistics and filters
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

              <Col xxl={3} xl={4} lg={5} md={6} className="d-flex">
                <Card className="w-100 shadow feature-card border-dark">
                  <Card.Body className="d-flex flex-column p-4">
                    <div className="text-center mb-3">
                      <div className="icon-wrapper bg-steam-dark">
                        <i className="bi bi-person-badge fs-3 text-info"></i>
                      </div>
                    </div>
                    <Card.Title className="text-center h5 mb-3 text-steam-light">Profile Analytics</Card.Title>
                    <Card.Text className="text-center text-steam-muted flex-grow-1">
                      Detailed statistics about your Steam profile and game activity
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

              <Col xxl={3} xl={4} lg={5} md={6} className="d-flex">
                <Card className="w-100 shadow feature-card border-dark">
                  <Card.Body className="d-flex flex-column p-4">
                    <div className="text-center mb-3">
                      <div className="icon-wrapper bg-steam-dark">
                        <i className="bi bi-steam fs-3 text-success"></i>
                      </div>
                    </div>
                    <Card.Title className="text-center h5 mb-3 text-steam-light">Market Tracker</Card.Title>
                    <Card.Text className="text-center text-steam-muted flex-grow-1">
                      Real-time market prices and historical trends for all items
                    </Card.Text>
                    <Button 
                      as={Link} 
                      to="/market" 
                      variant="outline-success" 
                      className="mt-3 align-self-center feature-btn"
                    >
                      View Market
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="trends-section py-5 bg-steam-dark">
          <Container>
            <h2 className="text-center mb-5 text-steam-light section-title">Market Trends</h2>
            <Row className="g-4">
              <Col lg={6}>
                <Card className="trend-card h-100 border-dark">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h3 className="mb-0 text-steam-light">
                        <FiTrendingUp className="me-2 text-success" />
                        Daily Changes
                      </h3>
                      <span className={`badge ${stats.dailyChange >= 0 ? 'bg-success' : 'bg-danger'}`}>
                        {stats.dailyChange >= 0 ? '+' : ''}{stats.dailyChange}%
                      </span>
                    </div>
                    <ProgressBar 
                      now={Math.abs(stats.dailyChange)} 
                      variant={stats.dailyChange >= 0 ? 'success' : 'danger'}
                      className="mb-3 bg-steam-darker"
                    />
                    <div className="trend-description text-steam-muted">
                      Overall market value change in the last 24 hours across all tracked items
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              
              <Col lg={6}>
                <Card className="trend-card h-100 border-dark">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h3 className="mb-0 text-steam-light">
                        <FiClock className="me-2 text-info" />
                        Weekly Changes
                      </h3>
                      <span className={`badge ${stats.weeklyChange >= 0 ? 'bg-success' : 'bg-danger'}`}>
                        {stats.weeklyChange >= 0 ? '+' : ''}{stats.weeklyChange}%
                      </span>
                    </div>
                    <ProgressBar 
                      now={Math.abs(stats.weeklyChange)} 
                      variant={stats.weeklyChange >= 0 ? 'success' : 'danger'}
                      className="mb-3 bg-steam-darker"
                    />
                    <div className="trend-description text-steam-muted">
                      7-day market trend showing the overall movement of item values
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="status-section py-5">
          <Container>
            <h2 className="text-center mb-5 text-steam-light section-title">System Status</h2>
            <Row className="g-4">
              <Col md={6}>
                <Card className="status-card border-dark">
                  <Card.Body>
                    <div className="d-flex align-items-center mb-3">
                      <FiUsers className="me-3 text-steam-light" size={24} />
                      <h3 className="mb-0 text-steam-light">Active Users</h3>
                    </div>
                    <div className="status-value text-white">{stats.activeUsers.toLocaleString()}</div>
                    <div className="status-description text-steam-muted">
                      Currently browsing the site in last 15 minutes
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              
              <Col md={6}>
                <Card className="status-card border-dark">
                  <Card.Body>
                    <div className="d-flex align-items-center mb-3">
                      <FiServer className="me-3 text-steam-light" size={24} />
                      <h3 className="mb-0 text-steam-light">API Requests</h3>
                    </div>
                    <div className="status-value text-white">{stats.apiCalls.toLocaleString()}</div>
                    <div className="status-description text-steam-muted">
                      Steam API calls processed today
                    </div>
                    <div className="text-end mt-2 text-steam-muted small">
                      Last updated: {stats.lastUpdated}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>

        <footer className="py-4 bg-steam-darker text-center">
          <Container>
            <p className="mb-0 text-steam-muted small">
              Steam Inventory Manager is not affiliated with Valve or Steam. All game content and materials are trademarks of their respective owners.
            </p>
          </Container>
        </footer>
      </div>
    </div>
  );
};

export default Home;