import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import useLogout from '../hooks/useLogout'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
function TopBar() {
    let {id}=useParams()
    const navigate= useNavigate()
    let role = sessionStorage.getItem('role')
    let logout = useLogout()
    return (
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
        <i className="fa-solid fa-hashtag" style={{color:"black",marginRight:"5px"}}></i> 
          <Navbar.Brand >Resume Builder</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {role==='admin'?<Nav.Link><Link to='/dashboard' className='link'>Dashboard</Link></Nav.Link>:<></>}
            </Nav>
          </Navbar.Collapse>
          <Button variant='danger' onClick={()=>logout()}>Logout</Button>
          &nbsp;
          <Button variant='info' onClick={()=>navigate(`/profile/${id}`)}>Home</Button>
        </Container>
      </Navbar>
    );
  }
  
  export default TopBar;