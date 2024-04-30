import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AxiosService from '../utils/AxiosService'
import ApiRoutes from '../utils/ApiRoutes'
import toast from 'react-hot-toast'
import useLogout from '../hooks/useLogout'
import { Button,Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
// import "./Dashboardstyle.css"

function Profile() {
  const navigate = useNavigate()
  let {id} = useParams()
  // get id from params 
  let [data,setData] = useState([])
// get the data in object 
  let logout = useLogout()
  // call the useLogout function 
  const getProfileData = async()=>{
    try {
      let res = await AxiosService.get(`${ApiRoutes.USERS.path}/${id}`,{
        authenticate:ApiRoutes.USERS.authenticate
        // check authenticate is true  or false
      })
      if(res.status===200)
      {
        setData(res.data.user)
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message)
      if(error.response.status===402)
        logout()
    }
  }

  useEffect(()=>{
    if(id) // if id render the getProfileData
      getProfileData()
  },[])
  
function handleresumeid(e){
  if(e.resumeid == 1){
    navigate(`/profile/${id}/formalresume1model`)
  }
  else if (e.resumeid == 2){
    navigate(`/profile/${id}/formalresume2model`)
  }
  else if (e.resumeid == 3){
    navigate(`/profile/${id}/formalresume3model`)
  }

}

  return <>

   <Navbar expand="lg"   className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
        <Container>
          <i className="fa-solid fa-hashtag" style={{color:"white",marginRight:"5px"}}></i> 
          <Navbar.Brand >Resume Builder</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            <Link to={`/profile/${id}/viewresumedata`} style={{color:"white",textDecoration:"none", marginLeft:"40px",fontSize:"15px"}} >View Resumes</Link>
            </Nav>
          </Navbar.Collapse>
          <Button variant='danger' onClick={()=>logout()}>Logout</Button>
        </Container>
      </Navbar>

      <h2 style={{textAlign: "center", marginBottom: "2rem", marginTop:"5rem"}}>Explore Our Resume Templates</h2>
  <div className='wrapper'>
    <div style={{display:"flex",justifyContent:"space-evenly",marginTop:"5%",flexWrap:'wrap'}}>
  {data.map((e,i)=>{
    return <div key={i}>
       <Card style={{ width: '20rem', margin: '20px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
      <Card.Img variant="top" src={e.image} style={{width:"100%",height:"40vh"}} />
      <Card.Body>
        <Card.Title></Card.Title>
        <Card.Text>{e.content}</Card.Text>
        <Button variant="primary" onClick={()=>handleresumeid(e)}>Start</Button>
      </Card.Body>
    </Card>
    </div>
    })}
    </div> 
  </div>
    
    {/* <!-- About section--> */}
        <section id="about">
    <div className="container px-4">
        <div className="row gx-4 justify-content-center">
            <div className="col-lg-8">
                <h2>About Our Resume Builder</h2>
                <p className="lead">Welcome to our resume builder platform! Our service is designed to help you create professional resumes quickly and easily. Here are some key features:</p>
                <ul>
                    <li>Easy-to-use interface for crafting your resume</li>
                    <li>Customizable templates to suit various industries and job roles</li>
                    <li>Step-by-step guidance to ensure you include all relevant information</li>
                    <li>Option to save your progress and come back later</li>
                    <li>Download your resume in  (PDF)</li>
                </ul>
                <p>Whether you're a recent graduate entering the job market or an experienced professional looking to update your resume, our platform is here to assist you in showcasing your skills and experiences effectively.</p>
            </div>
        </div>
    </div>
</section>
  
{/* <!-- Footer--> */}
<footer className="py-5 bg-dark">
            <div className="container px-4"><p className="m-0 text-center text-white">Copyright &copy; Your Website 2024</p></div>
        </footer>
  </>
}

export default Profile