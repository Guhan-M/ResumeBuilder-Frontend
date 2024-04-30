import React, { useEffect, useState } from 'react'
import AxiosService from '../../utils/AxiosService'
import { useParams } from 'react-router-dom'
import ApiRoutes from '../../utils/ApiRoutes'
import toast from 'react-hot-toast'
import { API_URL } from '../../App'
import "./viewresume2.css"
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import useLogout from '../../hooks/useLogout'
import { SiGmail } from "react-icons/si";
import { IoLocation } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { CiLink } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";
import TopBar from '../TopBar'



function viewresume2() {
  let {id} = useParams()
  let [data,setData] = useState([])
  const logout= useLogout()
    const getData = async()=>{
        try {
          let res = await AxiosService.get(`${ApiRoutes.USERS.path}/${id}/viewresumedata2`,{
            authenticate:ApiRoutes.USERS.authenticate
            // check authenticate is true  or false
          })
          if(res.status===200)
          {
            setData(res.data.users)
          }
        } catch (error) {
          toast.error(error.response.data.message || error.message)
        }
      }
      useEffect(()=>{ // if id render the getProfileData
        getData()
      },[])

    console.log(data)
  // let image = data[0]?.image
  // console.log(AxiosService.get(`${ApiRoutes.IMG}/:${image}`))    
  
  return <>
  <TopBar/>
<div className='bodyclass'>
  {data.length > 0 ? data.map((e, i) => {
    if (e.id == id) {
      return <div className="containerresume2" key={i} style={{padding:"10px"}}>
        <div className="left-column">
          <img className="photo" src={`${API_URL}/images/${e.image}`} alt="Your Photo" />
          <div className="address">
                        <p className="pform">
                        <IoLocation />
                          {e.personalDetails.address}
                        </p>
                        <p className="pform">
                          <SiGmail />{e.personalDetails.email}
                        </p>
                        <p className="pform" style={{marginBottom:"20%"}}>
                        <FaPhoneAlt />
                          {e.personalDetails.mobile}
                        </p>
                        
                        <p className="pform">
                        <FaLinkedinIn />
                          <span style={{fontSize:"10px"}}>{e.personalDetails.linkedin}</span>
                        </p>
                        <p className="pform">
                          <FaGithub />
                          <span style={{fontSize:"10px"}}>{e.personalDetails.github}</span>
                        </p>
                        <p className="pform">
                          <CiLink />
                          <span style={{fontSize:"10px"}}>{e.personalDetails.portfolio}</span>
                        </p>
                        
                      </div>
        </div>

        <div className="right-column">
          <header >
            <h1 className="h1form" style={{color:"black"}}>{e.personalDetails.firstname} {e.personalDetails.lastname}</h1>
          </header>

          <section className="section">
            <h2 className="h2form">Objective</h2>
            <p className="pform">A brief statement about your career objectives or what you are seeking in a position.</p>
          </section>

          <section className="section">
            <h2 className="h2form">Skills</h2>
            <ul className="uform">
              {e.skills.map((e, i) => {
                return <li className="liform" key={i}><i className="icon fas fa-check"></i>{e}</li>
              })}
            </ul>
          </section>

          <section className="section">
            <h2 className="h2form">Education</h2>
            {e.qualifications.map((e, i) => {
              return <div key={i} >
                <h3 className="h3form">{e.CourseDetails}</h3>
                <p className="pform">{e.InstituteName},{e.Location}</p>
                <p className="pform" style={{ marginBottom: "2%" }}>{e.StartYear}-{e.StartYear}</p>
              </div>
            })}
          </section>
          {
            e.jobs.length > 0 ?
              <section className="section">
                <h2 className="h2form">Experience</h2>
                {e.jobs.map((e, i) => {
                  return <div key={i}>
                    <h3 className="h3form">{e.Jobtitle}</h3>
                    <p className="pform">{e.Jobtitle}</p>
                    <p className="pform">{e.StartYear}- {e.EndYear}</p>
                    <ul className="uform">
                      <li className="liform">Description of responsibilities and achievements.</li>
                      <li className="liform">Description of responsibilities and achievements.</li>
                      <li className="liform">Description of responsibilities and achievements.</li>
                    </ul>
                  </div>
                })}
              </section>
              : <></>
          }
          <footer className="footerall">
            <p className="pform">Feel free to contact me for any further information.</p>
          </footer>
        </div>
      </div>
    }
    else {
      logout()
    }
  }) : <>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "15%" }}>
      <h1>Please create new Resume !!</h1>
      <Button variant='primary' onClick={() => { navigate(`/profile/${id}`) }}>Refresh</Button>
    </div>
  </>
  }
</div>

     
      {/* <img src={`${API_URL}/images/${image}`} alt="helo" /> */}
      
      </>
}

export default viewresume2