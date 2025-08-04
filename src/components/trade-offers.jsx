import { useState } from 'react';
import { Container, Row, Col, Card, Tab, Tabs, Badge, Button, ListGroup, ProgressBar, Alert } from 'react-bootstrap';
import { FaExchangeAlt, FaHistory, FaBell, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { GiTwoCoins } from 'react-icons/gi';
import '../trade-offers.css';

const TradeOffers = () => {
  const [activeTab, setActiveTab] = useState('current');
  const [currentTrades, setCurrentTrades] = useState([
    {
      id: 'trade1',
      partner: 'CSGOLover92',
      status: 'pending',
      itemsOffered: 3,
      itemsRequested: 2,
      valueDifference: 12.50,
      timeLeft: '23:59:59',
      partnerAvatar: 'https://placehold.co/80x80/1b2838/c7d5e0?text=CL',
      items: [
        { name: 'AWP | Asiimov (FT)', icon: 'https://placehold.co/60x60/1b2838/c7d5e0?text=AWP' },
        { name: 'M4A4 | Howl (MW)', icon: 'https://placehold.co/60x60/1b2838/c7d5e0?text=M4A4' }
      ]
    },
    {
      id: 'trade2',
      partner: 'Dota2Trader',
      status: 'counter-offer',
      itemsOffered: 2,
      itemsRequested: 1,
      valueDifference: -5.20,
      timeLeft: '12:30:45',
      partnerAvatar: 'https://placehold.co/80x80/1b2838/c7d5e0?text=DT',
      items: [
        { name: 'Dragonclaw Hook', icon: 'https://placehold.co/60x60/1b2838/c7d5e0?text=Hook' }
      ]
    }
  ]);

  const [pastTrades, setPastTrades] = useState([
    {
      id: 'past1',
      partner: 'TF2Collector',
      status: 'accepted',
      date: '2023-10-15',
      itemsOffered: 1,
      itemsRequested: 3,
      valueDifference: 8.75,
      partnerAvatar: 'https://placehold.co/80x80/1b2838/c7d5e0?text=TC',
      items: [
        { name: 'Unusual Team Captain', icon: 'https://placehold.co/60x60/1b2838/c7d5e0?text=Hat' }
      ]
    },
    {
      id: 'past2',
      partner: 'RustTrader',
      status: 'declined',
      date: '2023-10-10',
      itemsOffered: 2,
      itemsRequested: 2,
      valueDifference: 0.00,
      partnerAvatar: 'https://placehold.co/80x80/1b2838/c7d5e0?text=RT',
      items: [
        { name: 'Bandana Mask', icon: 'https://placehold.co/60x60/1b2838/c7d5e0?text=Bandana' },
        { name: 'MP5A4 Skin', icon: 'https://placehold.co/60x60/1b2838/c7d5e0?text=MP5' }
      ]
    }
  ]);

  const handleAccept = (tradeId) => {
    setCurrentTrades(currentTrades.map(trade => 
      trade.id === tradeId ? { ...trade, status: 'processing' } : trade
    ));
    setTimeout(() => {
      const acceptedTrade = currentTrades.find(t => t.id === tradeId);
      setPastTrades([{
        ...acceptedTrade,
        status: 'accepted',
        date: new Date().toISOString().split('T')[0]
      }, ...pastTrades]);
      setCurrentTrades(currentTrades.filter(t => t.id !== tradeId));
    }, 1500);
  };

  const handleDecline = (tradeId) => {
    setCurrentTrades(currentTrades.map(trade => 
      trade.id === tradeId ? { ...trade, status: 'processing' } : trade
    ));
    setTimeout(() => {
      const declinedTrade = currentTrades.find(t => t.id === tradeId);
      setPastTrades([{
        ...declinedTrade,
        status: 'declined',
        date: new Date().toISOString().split('T')[0]
      }, ...pastTrades]);
      setCurrentTrades(currentTrades.filter(t => t.id !== tradeId));
    }, 1500);
  };

  return (
    <Container className="trade-offers-container py-4">
      <h2 className="mb-4 d-flex align-items-center">
        <FaExchangeAlt className="me-3 text-steam-accent" />
        Trade Offers
      </h2>
      
      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="steam-tabs mb-4"
      >
        <Tab eventKey="current" title={
          <span className="d-flex align-items-center">
            <FaBell className="me-2" />
            Current Trades
            {currentTrades.length > 0 && (
              <Badge pill bg="danger" className="ms-2">
                {currentTrades.length}
              </Badge>
            )}
          </span>
        }>
          <Row className="mt-3">
            <Col>
              {currentTrades.length === 0 ? (
                <Alert variant="info" className="text-center">
                  You have no current trade offers
                </Alert>
              ) : (
                <div className="current-trades-grid">
                  {currentTrades.map(trade => (
                    <Card key={trade.id} className="mb-4 trade-card">
                      <Card.Body>
                        <div className="d-flex align-items-start">
                          <img 
                            src={trade.partnerAvatar} 
                            alt={trade.partner} 
                            className="rounded-circle me-3 trade-avatar"
                          />
                          <div className="flex-grow-1">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                              <h5 className="mb-0">
                                Trade with <span className="text-steam-accent">{trade.partner}</span>
                              </h5>
                              <Badge 
                                bg={trade.status === 'pending' ? 'warning' : 'info'} 
                                text={trade.status === 'pending' ? 'dark' : 'white'}
                              >
                                {trade.status === 'pending' ? 'Pending' : 'Counter Offer'}
                              </Badge>
                            </div>
                            
                            <div className="d-flex mb-3">
                              <div className="me-4">
                                <small className="text-muted">Items Offered</small>
                                <div className="fw-bold">{trade.itemsOffered}</div>
                              </div>
                              <div className="me-4">
                                <small className="text-muted">Items Requested</small>
                                <div className="fw-bold">{trade.itemsRequested}</div>
                              </div>
                              <div>
                                <small className="text-muted">Value Difference</small>
                                <div className={`fw-bold ${trade.valueDifference >= 0 ? 'text-success' : 'text-danger'}`}>
                                  {trade.valueDifference >= 0 ? '+' : ''}{trade.valueDifference.toFixed(2)} USD
                                </div>
                              </div>
                            </div>
                            
                            <div className="d-flex align-items-center mb-3">
                              <GiTwoCoins className="me-2 text-warning" />
                              <small className="text-muted me-2">Time remaining:</small>
                              <span className="fw-bold">{trade.timeLeft}</span>
                            </div>
                            
                            <div className="trade-items-preview mb-3">
                              {trade.items.map((item, idx) => (
                                <img 
                                  key={idx} 
                                  src={item.icon} 
                                  alt={item.name} 
                                  className="trade-item-icon me-2"
                                  title={item.name}
                                />
                              ))}
                            </div>
                            
                            <div className="d-flex justify-content-end">
                              <Button 
                                variant="outline-danger" 
                                size="sm" 
                                className="me-2"
                                onClick={() => handleDecline(trade.id)}
                                disabled={trade.status === 'processing'}
                              >
                                {trade.status === 'processing' ? (
                                  <>
                                    <span className="spinner-border spinner-border-sm me-1" />
                                    Declining...
                                  </>
                                ) : (
                                  'Decline'
                                )}
                              </Button>
                              <Button 
                                variant="steam-accept" 
                                size="sm"
                                onClick={() => handleAccept(trade.id)}
                                disabled={trade.status === 'processing'}
                              >
                                {trade.status === 'processing' ? (
                                  <>
                                    <span className="spinner-border spinner-border-sm me-1" />
                                    Accepting...
                                  </>
                                ) : (
                                  'Accept Trade'
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              )}
            </Col>
          </Row>
        </Tab>
        
        <Tab eventKey="past" title={
          <span className="d-flex align-items-center">
            <FaHistory className="me-2" />
            Past Trades
          </span>
        }>
          <Row className="mt-3">
            <Col>
              {pastTrades.length === 0 ? (
                <Alert variant="info" className="text-center">
                  You have no past trade history
                </Alert>
              ) : (
                <ListGroup variant="flush">
                  {pastTrades.map(trade => (
                    <ListGroup.Item key={trade.id} className="past-trade-item">
                      <div className="d-flex align-items-center">
                        <img 
                          src={trade.partnerAvatar} 
                          alt={trade.partner} 
                          className="rounded-circle me-3 trade-avatar-sm"
                        />
                        <div className="flex-grow-1">
                          <div className="d-flex justify-content-between">
                            <h6 className="mb-1">
                              Trade with {trade.partner}
                            </h6>
                            <small className="text-muted">{trade.date}</small>
                          </div>
                          
                          <div className="d-flex align-items-center mb-1">
                            {trade.status === 'accepted' ? (
                              <FaCheckCircle className="text-success me-2" />
                            ) : (
                              <FaExclamationTriangle className="text-danger me-2" />
                            )}
                            <span className={`text-${trade.status === 'accepted' ? 'success' : 'danger'}`}>
                              {trade.status === 'accepted' ? 'Accepted' : 'Declined'}
                            </span>
                            <span className="mx-2">•</span>
                            <span>{trade.itemsOffered} items offered</span>
                            <span className="mx-2">•</span>
                            <span>{trade.itemsRequested} items received</span>
                          </div>
                          
                          <div className="trade-items-preview">
                            {trade.items.map((item, idx) => (
                              <img 
                                key={idx} 
                                src={item.icon} 
                                alt={item.name} 
                                className="trade-item-icon-sm me-1"
                                title={item.name}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Col>
          </Row>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default TradeOffers;