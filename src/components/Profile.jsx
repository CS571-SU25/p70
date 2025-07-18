import { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner, Alert, Image, ListGroup } from 'react-bootstrap';
import { SteamContext } from '../context/SteamContext';

const Profile = () => {
  const { steamId, userProfile, fetchUserProfile, logout } = useContext(SteamContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (steamId) {
      const loadProfile = async () => {
        setLoading(true);
        try {
          await fetchUserProfile(steamId);
          setError(null);
        } catch (err) {
          setError('Failed to load profile. Please try again.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      loadProfile();
    }
  }, [steamId, fetchUserProfile]);

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
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h2>Steam Profile</h2>
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
          <p>Loading your profile...</p>
        </div>
      )}
      
      {error && <Alert variant="danger">{error}</Alert>}
      
      {!loading && userProfile && (
        <Row>
          <Col md={4}>
            <Card>
              <Card.Body className="text-center">
                <Image 
                  src={userProfile.avatarfull} 
                  roundedCircle 
                  className="mb-3"
                  style={{ width: '150px', height: '150px' }}
                />
                <h3>{userProfile.personaname}</h3>
                {userProfile.realname && <p className="text-muted">{userProfile.realname}</p>}
              </Card.Body>
            </Card>
          </Col>
          <Col md={8}>
            <Card>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <strong>Steam ID:</strong> {userProfile.steamid}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Profile Created:</strong> {new Date(userProfile.timecreated * 1000).toLocaleDateString()}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Last Online:</strong> {new Date(userProfile.lastlogoff * 1000).toLocaleString()}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Profile Visibility:</strong> {userProfile.communityvisibilitystate === 3 ? 'Public' : 'Private'}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Profile URL:</strong> 
                    <a href={userProfile.profileurl} target="_blank" rel="noopener noreferrer" className="ms-2">
                      {userProfile.profileurl}
                    </a>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Profile;