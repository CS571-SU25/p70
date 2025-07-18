import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Alert, Pagination } from 'react-bootstrap';
import { useSteam } from '../context/SteamContext';

const Inventory = () => {
  const { steamId, fetchInventory } = useSteam();
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; 

  useEffect(() => {
    if (steamId) {
      const loadInventory = async () => {
        setLoading(true);
        try {
          const data = await fetchInventory(steamId);
          setInventory(data);
          setError(null);
        } catch (err) {
          setError('Failed to load inventory. Please try again.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      loadInventory();
    }
  }, [steamId, fetchInventory]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = inventory.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(inventory.length / itemsPerPage);

  if (!steamId) {
    return (
      <Container className="text-center py-5">
        <Alert variant="warning">
          Please login with Steam to view your inventory.
        </Alert>
      </Container>
    );
  }

  return (
    <Container fluid className="px-0"> 

      <Container className="px-4">
        <h2 className="mb-4 text-center">Your Team Fortress 2 Inventory</h2>
        
        {loading && (
          <div className="text-center py-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p>Loading your inventory...</p>
          </div>
        )}
        
        {error && <Alert variant="danger">{error}</Alert>}
      </Container>

      <Container className="px-4"> 
        {!loading && !error && (
          <>
            <Row className="g-4 justify-content-center">
              {currentItems.map((item) => (
                <Col key={item.id} xs={12} sm={6} md={4} lg={3} xl={2} className="d-flex">
                  <Card className="w-100 shadow-sm">
                    <div className="ratio ratio-1x1">
                      <Card.Img
                        variant="top"
                        src={item.icon_url}
                        className="object-fit-contain p-2"
                      />
                    </div>
                    <Card.Body className="text-center">
                      <Card.Title className="h6 mb-2">{item.name}</Card.Title>
                      <Card.Text className="small">
                        <span className={`badge ${item.marketable ? 'bg-success' : 'bg-secondary'}`}>
                          {item.marketable ? 'Marketable' : 'Not Marketable'}
                        </span>
                        {item.quality && (
                          <span className={`badge ms-1 bg-${getQualityColor(item.quality)}`}>
                            {item.quality}
                          </span>
                        )}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
            
            {totalPages > 1 && (
              <div className="d-flex justify-content-center mt-4">
                <Pagination>
                  <Pagination.Prev 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                    disabled={currentPage === 1}
                  />
                  {[...Array(totalPages)].map((_, idx) => (
                    <Pagination.Item
                      key={idx + 1}
                      active={idx + 1 === currentPage}
                      onClick={() => setCurrentPage(idx + 1)}
                    >
                      {idx + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                    disabled={currentPage === totalPages}
                  />
                </Pagination>
              </div>
            )}
          </>
        )}
      </Container>
    </Container>
  );
};

// Helper function for quality badges
function getQualityColor(quality) {
  switch(quality.toLowerCase()) {
    case 'unusual': return 'warning';
    case 'strange': return 'info';
    case 'vintage': return 'primary';
    case 'genuine': return 'success';
    default: return 'secondary';
  }
}

export default Inventory;