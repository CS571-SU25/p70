import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Alert, Pagination, Tab, Tabs } from 'react-bootstrap';
import { useSteam } from '../context/SteamContext';
import '../inventory.css';
const dummyData = {
  steam: [
    {
      id: 'steam1',
      name: 'Steam Trading Card',
      icon_url: 'https://placehold.co/360x360/1b2838/c7d5e0?text=Steam+Card',
      marketable: true,
      quality: 'Common',
      type: 'Trading Card',
      game: 'Steam'
    },
    {
      id: 'steam2',
      name: 'Profile Background',
      icon_url: 'https://placehold.co/360x360/1b2838/c7d5e0?text=Profile+BG',
      marketable: true,
      quality: 'Uncommon',
      type: 'Background',
      game: 'Steam'
    },
    {
      id: 'steam3',
      name: 'Summer Sale 2023 Badge',
      icon_url: 'https://placehold.co/360x360/1b2838/c7d5e0?text=Summer+Badge',
      marketable: false,
      quality: 'Event',
      type: 'Badge',
      game: 'Steam'
    },
    {
      id: 'steam4',
      name: 'Animated Avatar Frame',
      icon_url: 'https://placehold.co/360x360/1b2838/c7d5e0?text=Avatar+Frame',
      marketable: true,
      quality: 'Rare',
      type: 'Avatar',
      game: 'Steam'
    }
  ],
  tf2: [
    {
      id: 'tf21',
      name: 'Strange Rocket Launcher',
      icon_url: 'https://placehold.co/360x360/1b2838/c7d5e0?text=TF2+Weapon',
      marketable: true,
      quality: 'Strange',
      type: 'Weapon',
      game: 'Team Fortress 2'
    },
    {
      id: 'tf22',
      name: 'Unusual Team Captain',
      icon_url: 'https://placehold.co/360x360/1b2838/c7d5e0?text=TF2+Hat',
      marketable: true,
      quality: 'Unusual',
      type: 'Hat',
      game: 'Team Fortress 2'
    },
    {
      id: 'tf23',
      name: 'Australium Scattergun',
      icon_url: 'https://placehold.co/360x360/1b2838/c7d5e0?text=TF2+Australium',
      marketable: true,
      quality: 'Australium',
      type: 'Weapon',
      game: 'Team Fortress 2'
    },
    {
      id: 'tf24',
      name: 'Burning Flames Killer Exclusive',
      icon_url: 'https://placehold.co/360x360/1b2838/c7d5e0?text=TF2+Unusual',
      marketable: true,
      quality: 'Unusual',
      type: 'Hat',
      game: 'Team Fortress 2'
    },
    {
      id: 'tf25',
      name: 'Professional Killstreak Kit',
      icon_url: 'https://placehold.co/360x360/1b2838/c7d5e0?text=TF2+Killstreak',
      marketable: true,
      quality: 'Professional',
      type: 'Tool',
      game: 'Team Fortress 2'
    }
  ],
  csgo: [
    {
      id: 'csgo1',
      name: 'AWP | Asiimov',
      icon_url: 'https://placehold.co/360x360/1b2838/c7d5e0?text=CSGO+AWP',
      marketable: true,
      quality: 'Field-Tested',
      type: 'Rifle',
      game: 'CS:GO'
    },
    {
      id: 'csgo2',
      name: '★ Karambit | Fade',
      icon_url: 'https://placehold.co/360x360/1b2838/c7d5e0?text=CSGO+Knife',
      marketable: true,
      quality: 'Factory New',
      type: 'Knife',
      game: 'CS:GO'
    },
    {
      id: 'csgo3',
      name: 'M4A4 | Howl',
      icon_url: 'https://placehold.co/360x360/1b2838/c7d5e0?text=CSGO+Howl',
      marketable: true,
      quality: 'Minimal Wear',
      type: 'Rifle',
      game: 'CS:GO'
    },
    {
      id: 'csgo4',
      name: '★ Butterfly Knife | Crimson Web',
      icon_url: 'https://placehold.co/360x360/1b2838/c7d5e0?text=CSGO+Butterfly',
      marketable: true,
      quality: 'Well-Worn',
      type: 'Knife',
      game: 'CS:GO'
    },
    {
      id: 'csgo5',
      name: 'StatTrak™ AK-47 | Vulcan',
      icon_url: 'https://placehold.co/360x360/1b2838/c7d5e0?text=CSGO+Vulcan',
      marketable: true,
      quality: 'Factory New',
      type: 'Rifle',
      game: 'CS:GO'
    },
    {
      id: 'csgo6',
      name: 'Operation Broken Fang Case',
      icon_url: 'https://placehold.co/360x360/1b2838/c7d5e0?text=CSGO+Case',
      marketable: true,
      quality: 'Base Grade',
      type: 'Container',
      game: 'CS:GO'
    }
  ],
  dota2: [
    {
      id: 'dota1',
      name: 'Dragonclaw Hook',
      icon_url: 'https://placehold.co/360x360/1b2838/c7d5e0?text=Dota+Hook',
      marketable: true,
      quality: 'Immortal',
      type: 'Weapon',
      game: 'Dota 2'
    },
    {
      id: 'dota2',
      name: 'Golden Roshan',
      icon_url: 'https://placehold.co/360x360/1b2838/c7d5e0?text=Dota+Roshan',
      marketable: true,
      quality: 'Immortal',
      type: 'Courier',
      game: 'Dota 2'
    },
    {
      id: 'dota3',
      name: 'Arcanas Bundle',
      icon_url: 'https://placehold.co/360x360/1b2838/c7d5e0?text=Dota+Arcanas',
      marketable: true,
      quality: 'Arcana',
      type: 'Bundle',
      game: 'Dota 2'
    },
    {
      id: 'dota4',
      name: 'Persona: Anti-Mage',
      icon_url: 'https://placehold.co/360x360/1b2838/c7d5e0?text=Dota+Persona',
      marketable: false,
      quality: 'Persona',
      type: 'Hero',
      game: 'Dota 2'
    },
    {
      id: 'dota5',
      name: 'The International 2023 Battle Pass',
      icon_url: 'https://placehold.co/360x360/1b2838/c7d5e0?text=Dota+TI2023',
      marketable: false,
      quality: 'Event',
      type: 'Pass',
      game: 'Dota 2'
    }
  ],
  rust: [
    {
      id: 'rust1',
      name: 'Bandana Mask',
      icon_url: 'https://placehold.co/360x360/1b2838/c7d5e0?text=Rust+Bandana',
      marketable: true,
      quality: 'Common',
      type: 'Clothing',
      game: 'Rust'
    },
    {
      id: 'rust2',
      name: 'MP5A4 Skin',
      icon_url: 'https://placehold.co/360x360/1b2838/c7d5e0?text=Rust+MP5',
      marketable: true,
      quality: 'Classified',
      type: 'Weapon',
      game: 'Rust'
    }
  ],
  pubg: [
    {
      id: 'pubg1',
      name: 'PLAYERUNKNOWN\'s Trenchcoat',
      icon_url: 'https://placehold.co/360x360/1b2838/c7d5e0?text=PUBG+Trenchcoat',
      marketable: true,
      quality: 'Rare',
      type: 'Outfit',
      game: 'PUBG'
    },
    {
      id: 'pubg2',
      name: 'Gold Plate - AKM',
      icon_url: 'https://placehold.co/360x360/1b2838/c7d5e0?text=PUBG+Gold+AKM',
      marketable: true,
      quality: 'Elite',
      type: 'Weapon',
      game: 'PUBG'
    }
  ],
  apex: [
    {
      id: 'apex1',
      name: 'Heirloom Set: Wraith',
      icon_url: 'https://placehold.co/360x360/1b2838/c7d5e0?text=Apex+Heirloom',
      marketable: false,
      quality: 'Heirloom',
      type: 'Melee',
      game: 'Apex Legends'
    },
    {
      id: 'apex2',
      name: 'Legendary Skin: Voidwalker',
      icon_url: 'https://placehold.co/360x360/1b2838/c7d5e0?text=Apex+Legendary',
      marketable: false,
      quality: 'Legendary',
      type: 'Skin',
      game: 'Apex Legends'
    }
  ]
};

const Inventory = () => {
  const { steamId } = useSteam();
  const [activeTab, setActiveTab] = useState('steam');
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
          await new Promise(resolve => setTimeout(resolve, 800));
          setInventory(dummyData[activeTab] || []);
          setError(null);
        } catch (err) {
          setError('Failed to load inventory. Please try again.');
          console.error('Error fetching inventory:', err);
        } finally {
          setLoading(false);
        }
      };
      loadInventory();
    }
  }, [steamId, activeTab]);

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
    <Container fluid className="px-0 dark-theme"> 
      <Container className="px-4">
        <h2 className="mb-4 text-center text-light">Your Steam Inventory</h2>
        
        <Tabs
          activeKey={activeTab}
          onSelect={(k) => {
            setActiveTab(k);
            setCurrentPage(1);
          }}
          className="mb-4 justify-content-center custom-tabs"
        >
          <Tab eventKey="steam" title="Steam Items" />
          <Tab eventKey="tf2" title="Team Fortress 2" />
          <Tab eventKey="csgo" title="CS:GO" />
          <Tab eventKey="dota2" title="Dota 2" />
        </Tabs>
        
        {loading && (
          <div className="text-center py-5">
            <Spinner animation="border" role="status" variant="light">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p className="text-light">Loading your {activeTab === 'steam' ? 'Steam' : activeTab.toUpperCase()} inventory...</p>
          </div>
        )}
        
        {error && (
          <Alert variant="danger">
            {error}
            <div className="mt-2">
              <button 
                className="btn btn-sm btn-danger"
                onClick={() => window.location.reload()}
              >
                Retry
              </button>
            </div>
          </Alert>
        )}
      </Container>

      <Container className="px-4"> 
        {!loading && !error && (
          <>
            {currentItems.length > 0 ? (
              <>
                <Row className="g-4 justify-content-center">
                  {currentItems.map((item) => (
                    <Col key={item.id} xs={12} sm={6} md={4} lg={3} xl={2} className="d-flex">
                      <Card className="w-100 shadow-sm inventory-card">
                        <div className="ratio ratio-1x1">
                          <Card.Img
                            variant="top"
                            src={item.icon_url}
                            className="object-fit-contain p-2"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://via.placeholder.com/360x360?text=Image+Not+Found';
                            }}
                            loading="lazy"
                          />
                        </div>
                        <Card.Body className="text-center">
                          <Card.Title className="h6 mb-2 text-light">{item.name}</Card.Title>
                          <Card.Text className="small">
                            <span className={`badge ${item.marketable ? 'bg-success' : 'bg-secondary'}`}>
                              {item.marketable ? 'Marketable' : 'Not Marketable'}
                            </span>
                            {item.quality && (
                              <span className={`badge ms-1 bg-${getQualityColor(item.quality)}`}>
                                {item.quality}
                              </span>
                            )}
                            <span className="badge ms-1 bg-info">{item.type}</span>
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
            ) : (
              <Alert variant="info" className="text-center">
                Your {activeTab === 'steam' ? 'Steam' : activeTab.toUpperCase()} inventory is empty.
              </Alert>
            )}
          </>
        )}
        {/* Footer */}
        <footer className="py-4 bg-steam-darker text-center">
          <Container>
            <p className="mb-0 text-steam-muted small">
              Steam Inventory Manager is not affiliated with Valve or Steam. All game content and materials are trademarks of their respective owners.
            </p>
          </Container>
        </footer>
      </Container>
    </Container>
  );
};

function getQualityColor(quality) {
  if (!quality) return 'secondary';
  
  const lowerQuality = quality.toLowerCase();
  if (lowerQuality.includes('unusual')) return 'warning';
  if (lowerQuality.includes('strange')) return 'info';
  if (lowerQuality.includes('vintage')) return 'primary';
  if (lowerQuality.includes('genuine')) return 'success';
  if (lowerQuality.includes('immortal')) return 'danger';
  if (lowerQuality.includes('unique')) return 'light text-dark';
  if (lowerQuality.includes('haunted')) return 'dark';
  if (lowerQuality.includes('field-tested')) return 'secondary';
  if (lowerQuality.includes('minimal wear')) return 'primary';
  if (lowerQuality.includes('factory new')) return 'success';
  return 'secondary';
}

export default Inventory;