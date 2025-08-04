import { Navbar, Nav, Container, NavDropdown, Badge, Dropdown, OverlayTrigger, Popover } from 'react-bootstrap';
import { Link } from 'react-router';
import { 
  BsBellFill, 
  BsCollectionFill, 
  BsClockHistory, 
  BsGraphUp,
  BsCheckCircleFill,
  BsExclamationTriangleFill
} from 'react-icons/bs';
import { FaSteam, FaExchangeAlt } from 'react-icons/fa';
import { GiTrade } from 'react-icons/gi';
import { useState } from 'react';

const Navigation = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'trade',
      title: 'New Trade Offer',
      message: 'User_CSGOLover wants to trade with you',
      time: '2 min ago',
      read: false
    },
    {
      id: 2,
      type: 'market',
      title: 'Item Sold',
      message: 'Your AWP | Asiimov (Field-Tested) sold for $45.20',
      time: '1 hour ago',
      read: false
    },
    {
      id: 3,
      type: 'system',
      title: 'Inventory Updated',
      message: 'Your CS:GO inventory has been refreshed',
      time: '3 hours ago',
      read: true
    }
  ]);

  const tradeOffersCount = 2;
  const marketListings = 5;

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? {...n, read: true} : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({...n, read: true})));
  };

  const notificationPopover = (
    <Popover className="notification-popover">
      <Popover.Header as="h3" className="d-flex justify-content-between align-items-center">
        Notifications
        {unreadCount > 0 && (
          <button 
            className="btn btn-sm btn-outline-secondary"
            onClick={markAllAsRead}
          >
            Mark all as read
          </button>
        )}
      </Popover.Header>
      <Popover.Body className="p-0">
        <div className="notification-list" style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {notifications.length === 0 ? (
            <div className="text-center p-3 text-muted">No notifications</div>
          ) : (
            notifications.map(notification => (
              <div 
                key={notification.id} 
                className={`notification-item p-3 border-bottom ${!notification.read ? 'unread' : ''}`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="d-flex">
                  <div className="me-3">
                    {notification.type === 'trade' && (
                      <GiTrade className="text-primary" size={20} />
                    )}
                    {notification.type === 'market' && (
                      <BsGraphUp className="text-success" size={20} />
                    )}
                    {notification.type === 'system' && (
                      <BsCheckCircleFill className="text-info" size={20} />
                    )}
                  </div>
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between">
                      <strong>{notification.title}</strong>
                      <small className="text-muted">{notification.time}</small>
                    </div>
                    <div className="text-muted">{notification.message}</div>
                  </div>
                  {!notification.read && (
                    <span className="ms-2">
                      <BsExclamationTriangleFill className="text-warning" />
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
        <div className="text-center p-2 border-top">
          <Link to="/notifications" className="text-decoration-none">View all notifications</Link>
        </div>
      </Popover.Body>
    </Popover>
  );

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="px-3 w-100 sticky-top">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <FaSteam className="me-2" style={{ color: '#5c7e10' }} />
          Steam Inventory Viewer
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="main-navbar" />
        
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/inventory">
              <BsCollectionFill className="me-1" /> Inventory
            </Nav.Link>
            <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
            
            <NavDropdown title="Tools" id="tools-dropdown" className="text-light">
              <NavDropdown.Item as={Link} to="/trade-offers">
                <GiTrade className="me-2" /> Trade Offers
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/market-trends">
                <BsGraphUp className="me-2" /> Market Trends
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/item-comparator">
                <FaExchangeAlt className="me-2" /> Item Comparator
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/game-stats">
                <BsClockHistory className="me-2" /> Game Statistics
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          
          <Nav>
            <OverlayTrigger
              trigger="click"
              placement="bottom-end"
              overlay={notificationPopover}
              rootClose
            >
              <Nav.Link className="position-relative">
                <BsBellFill />
                {unreadCount > 0 && (
                  <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle">
                    {unreadCount}
                  </Badge>
                )}
              </Nav.Link>
            </OverlayTrigger>
            
            <NavDropdown 
              title={
                <>
                  <span className="d-inline d-lg-none">Account</span>
                  <span className="d-none d-lg-inline">JohnDoe</span>
                </>
              } 
              align="end"
            >
              <NavDropdown.Item as={Link} to="/trade-offers">
                Trade Offers {tradeOffersCount > 0 && <Badge bg="warning" text="dark" className="ms-2">{tradeOffersCount}</Badge>}
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/market-listings">
                Market Listings {marketListings > 0 && <Badge bg="info" className="ms-2">{marketListings}</Badge>}
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/settings">Settings</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/logout" onClick={(e) => {
  e.preventDefault();
  handleLogout();
}}>
  Logout
</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;