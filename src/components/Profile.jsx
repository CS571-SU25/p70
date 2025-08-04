import { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner, Alert, Image, ListGroup, ProgressBar, Tab, Tabs } from 'react-bootstrap';
import { SteamContext } from '../context/SteamContext';
import '../Profile.css';

const Profile = () => {
  const { steamId, logout } = useContext(SteamContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const [userProfile] = useState({
    steamid: '76561198028175941',
    personaname: 'SteamMaster',
    avatarfull: 'https://placehold.co/150x150/1b2838/c7d5e0?text=SM',
    realname: 'Johnny Johnson Johnathan',
    timecreated: 1262275200, 
    lastlogoff: Date.now() / 1000 - 3600, 
    communityvisibilitystate: 3,
    profileurl: 'https://steamcommunity.com/id/steammaster',
  });

  const [gameStats] = useState({
    totalGames: 42,
    totalHours: 876,
    totalDLCs: 18,
    recentGames: [
      {
        name: 'Counter-Strike 2',
        hours: 342,
        lastPlayed: '2023-10-15',
        currentPlayers: '456,789',
        price: 'Free',
        achievements: '87/167'
      },
      {
        name: 'Dota 2',
        hours: 287,
        lastPlayed: '2023-10-10',
        currentPlayers: '678,901',
        price: 'Free',
        achievements: '45/132'
      },
      {
        name: 'Team Fortress 2',
        hours: 156,
        lastPlayed: '2023-09-28',
        currentPlayers: '123,456',
        price: 'Free',
        achievements: '32/98'
      }
    ],
    dlcs: [
      { name: 'CS:GO - Operation Broken Fang', ownedSince: '2021-01-15' },
      { name: 'Dota 2 - The International 2023 Battle Pass', ownedSince: '2023-05-01' }
    ],
    reviews: [
      { game: 'Portal 2', rating: '★★★★★', date: '2022-03-15' },
      { game: 'Cyberpunk 2077', rating: '★★★☆☆', date: '2021-12-20' }
    ]
  });

  useEffect(() => {
    if (steamId) {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 800);
      return () => clearTimeout(timer);
    }
  }, [steamId]);

  if (!steamId) {
    return (
      <Container className="text-center py-5">
        <Alert variant="warning">
          Please login with Steam to view your profile.
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4 profile-container">
      <Row className="mb-4 align-items-center">
        <Col>
          <h2 className="mb-0 text-white">Steam Profile</h2>
        </Col>
        <Col className="text-end">
          <button onClick={logout} className="btn btn-outline-danger">
            Logout
          </button>
        </Col>
      </Row>
      
      {loading && (
        <div className="text-center py-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="text-white">Loading your profile...</p>
        </div>
      )}
      
      {error && <Alert variant="danger">{error}</Alert>}
      
      {!loading && (
        <>
          <Row className="mb-4">
            <Col md={4}>
              <Card className="h-100 bg-steam-card">
                <Card.Body className="text-center">
                  <Image 
                    src={userProfile.avatarfull} 
                    roundedCircle 
                    className="mb-3 border border-3 border-steam"
                    style={{ width: '150px', height: '150px' }}
                  />
                  <h3 className="text-white">{userProfile.personaname}</h3>
                  {userProfile.realname && <p className="text-steam-light">{userProfile.realname}</p>}
                  <div className="d-flex justify-content-center gap-3 mt-3">
                    <div>
                      <div className="fs-5 fw-bold text-white">{gameStats.totalGames}</div>
                      <div className="text-steam-light small">Games</div>
                    </div>
                    <div>
                      <div className="fs-5 fw-bold text-white">{gameStats.totalHours}h</div>
                      <div className="text-steam-light small">Played</div>
                    </div>
                    <div>
                      <div className="fs-5 fw-bold text-white">{gameStats.totalDLCs}</div>
                      <div className="text-steam-light small">DLCs</div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={8}>
              <Card className="h-100 bg-steam-card">
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item className="d-flex justify-content-between align-items-center bg-steam-item text-white">
                      <span><strong>Steam ID:</strong></span>
                      <span className="font-monospace">{userProfile.steamid}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between align-items-center bg-steam-item text-white">
                      <span><strong>Member Since:</strong></span>
                      <span>{new Date(userProfile.timecreated * 1000).toLocaleDateString()}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between align-items-center bg-steam-item text-white">
                      <span><strong>Last Online:</strong></span>
                      <span>{new Date(userProfile.lastlogoff * 1000).toLocaleString()}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between align-items-center bg-steam-item text-white">
                      <span><strong>Profile Status:</strong></span>
                      <span className="badge bg-success">Public</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="bg-steam-item">
                      <div className="d-flex justify-content-between align-items-center text-white">
                        <span><strong>Profile URL:</strong></span>
                        <a href={userProfile.profileurl} target="_blank" rel="noopener noreferrer" className="text-truncate text-steam-link" style={{ maxWidth: '200px' }}>
                          {userProfile.profileurl}
                        </a>
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="mb-4 steam-tabs"
            fill
          >
            <Tab eventKey="overview" title="Overview" className="text-white">
              <Row className="mt-3">
                <Col md={6}>
                  <Card className="mb-4 bg-steam-card">
                    <Card.Header className="bg-steam-dark text-white">
                      <h5 className="mb-0">Recently Played Games</h5>
                    </Card.Header>
                    <Card.Body>
                      {gameStats.recentGames.map((game, index) => (
                        <div key={index} className="mb-3">
                          <div className="d-flex justify-content-between mb-1 text-white">
                            <span className="fw-bold">{game.name}</span>
                            <span>{game.hours} hours</span>
                          </div>
                          <ProgressBar now={(game.hours / gameStats.totalHours) * 100} className="mb-2 steam-progress" />
                          <div className="d-flex justify-content-between small text-steam-light">
                            <span>Last played: {game.lastPlayed}</span>
                            <span>{game.currentPlayers} playing now</span>
                          </div>
                          <div className="d-flex justify-content-between small text-steam-light">
                            <span>Price: {game.price}</span>
                            <span>Achievements: {game.achievements}</span>
                          </div>
                        </div>
                      ))}
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card className="mb-4 bg-steam-card">
                    <Card.Header className="bg-steam-dark text-white">
                      <h5 className="mb-0">Game Statistics</h5>
                    </Card.Header>
                    <Card.Body>
                      <div className="mb-3">
                        <h6 className="text-white">Hours Played</h6>
                        <div className="d-flex align-items-center text-white">
                          <div style={{ width: '80px' }}>CS2:</div>
                          <ProgressBar now={(342 / gameStats.totalHours) * 100} className="flex-grow-1 mx-2 steam-progress" />
                          <div>342h</div>
                        </div>
                        <div className="d-flex align-items-center mt-2 text-white">
                          <div style={{ width: '80px' }}>Dota 2:</div>
                          <ProgressBar now={(287 / gameStats.totalHours) * 100} className="flex-grow-1 mx-2 steam-progress" />
                          <div>287h</div>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <h6 className="text-white">Game Distribution</h6>
                        <div className="d-flex small text-steam-light mb-1">
                          <span style={{ width: '100px' }}>FPS:</span>
                          <span>12 games</span>
                        </div>
                        <div className="d-flex small text-steam-light mb-1">
                          <span style={{ width: '100px' }}>RPG:</span>
                          <span>8 games</span>
                        </div>
                        <div className="d-flex small text-steam-light">
                          <span style={{ width: '100px' }}>Strategy:</span>
                          <span>5 games</span>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>

                  <Card className="bg-steam-card">
                    <Card.Header className="bg-steam-dark text-white">
                      <h5 className="mb-0">Recent Reviews</h5>
                    </Card.Header>
                    <Card.Body>
                      {gameStats.reviews.map((review, index) => (
                        <div key={index} className="mb-2">
                          <div className="d-flex justify-content-between text-white">
                            <span className="fw-bold">{review.game}</span>
                            <span className="text-steam-accent">{review.rating}</span>
                          </div>
                          <div className="small text-steam-light">Posted on {review.date}</div>
                        </div>
                      ))}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Tab>
            <Tab eventKey="games" title="All Games" className="text-white">
              <Card className="mt-3 bg-steam-card">
                <Card.Header className="bg-steam-dark text-white">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Owned Games ({gameStats.totalGames})</h5>
                    <div className="small">Total Value: ~$1,245</div>
                  </div>
                </Card.Header>
                <Card.Body>
                  <Row>
                    {gameStats.recentGames.concat([
                      { name: 'Portal 2', hours: 24 },
                      { name: 'Half-Life: Alyx', hours: 18 },
                      { name: 'Stardew Valley', hours: 56 }
                    ]).map((game, index) => (
                      <Col md={4} key={index} className="mb-3">
                        <Card className="h-100 bg-steam-card">
                          <Card.Body>
                            <div className="d-flex justify-content-between text-white">
                              <h6 className="mb-1">{game.name}</h6>
                              <span className="small text-steam-light">{game.hours}h</span>
                            </div>
                            <div className="d-flex justify-content-between small text-steam-light">
                              <span>Last played: {game.lastPlayed || '2023-08-15'}</span>
                              <span>{game.price || '$9.99'}</span>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Card.Body>
              </Card>
            </Tab>
            <Tab eventKey="dlcs" title="DLCs" className="text-white">
              <Card className="mt-3 bg-steam-card">
                <Card.Header className="bg-steam-dark text-white">
                  <h5 className="mb-0">Owned DLCs ({gameStats.totalDLCs})</h5>
                </Card.Header>
                <Card.Body>
                  <ListGroup variant="flush">
                    {gameStats.dlcs.concat([
                      { name: 'Skyrim - Dawnguard', ownedSince: '2020-06-10' },
                      { name: 'Civilization VI - Gathering Storm', ownedSince: '2021-03-22' }
                    ]).map((dlc, index) => (
                      <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center bg-steam-item text-white">
                        <span>{dlc.name}</span>
                        <span className="small text-steam-light">Owned since {dlc.ownedSince}</span>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Tab>
          </Tabs>
        </>
      )}
    </Container>
  );
};

export default Profile;