import React, { useEffect, useState } from 'react'
import AxiosService from '../../utils/AxiosService'
import { useParams } from 'react-router-dom'
import '../resume/resume1style.css'
import ApiRoutes from '../../utils/ApiRoutes'
import toast from 'react-hot-toast'
import useLogout from '../../hooks/useLogout'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { SiGmail } from "react-icons/si";
import { IoLocation } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { CiLink } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";
import TopBar from '../TopBar'


function Formalresume1() {

  const navigate = useNavigate()
 let {id} = useParams()
 let [data,setData] = useState([])

 const logout= useLogout()
 const getData = async()=>{
    try {
      let res = await AxiosService.get(`${ApiRoutes.USERS.path}/${id}/getresumedata`,{
        authenticate:ApiRoutes.USERS.authenticate
        // check authenticate is true  or false
      })

      if (res.status===200) {
        // Filter the data to find the item with matching id
        const filteredresume1Data = res.data.users.filter(item => item.id === id);
        console.log(filteredresume1Data)

        // Check if filteredData is not empty
        if (filteredresume1Data ) {
          // Set the state with the filtered data
          setData(filteredresume1Data);
        } else {
          // If no data matches the id, set data to an empty array or handle it as needed
          setData([]);
        }
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message)
    }
  }
  useEffect(()=>{ // if id render the getProfileData
    getData()
  },[])
console.log(data)
  

return <>

<TopBar/>
   { data.length>0 ? data.map((e,i)=>{
        if(e.id === id){
            return  <div  className="bodyformstyle" key={i}>
        <div className="containerform">
             <header className='formheaderstyle'>
                 <h1 className='h1form'>{e.personalDetails.firstname} {e.personalDetails.lastname}</h1>
                 <div className="contact-info">
                      <p className="pform">
                      <SiGmail /> &nbsp;
                       {e.personalDetails.email}
                      </p>
                      <p className="pform">
                      <FaPhoneAlt />&nbsp;
                        {e.personalDetails.mobile}
                      </p>
                      <p className="pform">
                      <IoLocation />&nbsp;
                        {e.personalDetails.address},&nbsp;{e.personalDetails.city},&nbsp;
                        {e.personalDetails.state},&nbsp;{e.personalDetails.zip}
                      </p>
                      <p className="pform">
                      <FaLinkedinIn />&nbsp;
                        {e.personalDetails.linkedin}, &nbsp;<FaGithub />&nbsp;{e.personalDetails.github},
                       
                      </p>
                      <p className="pform">
                      <CiLink /> &nbsp;{e.personalDetails.portfolio}
                      </p>
                    </div>
             </header>
             
             <section className="section">
                 <h2 className='h2form'>Objective</h2>
                 <p className='pform'>A brief statement about your career objectives or what you are seeking in a position.</p>
             </section>
             
             <section className="section">
                 <h2 className='h2form' >Skills</h2>
                 <ul className='uform'>
                    {e.skills.map((e,i)=>{
                        return <li className='liform' key={i}><i className="fas fa-check icon"></i>{e}</li>
                    })}
                     
                 </ul>
             </section>
     
             <section className="section">
             <h2 className='h2form'>Education</h2>
                {e.qualifications.map((e,i)=>{
                    return <div key={i} >
                     <h3 className='h3form'>{e.CourseDetails}</h3>
                    <p className='pform'>{e.InstituteName},{e.Location}</p>
                    <p className='pform'style={{marginBottom:"2%"}}>{e.StartYear}-{e.StartYear}</p>
                    </div> 
                    })}
             </section>
             {
            e.jobs.length > 0 ?  
                <section className="section">
                 <h2 className='h2form'>Experience</h2>
                 {e.jobs.map((e,i)=>{
                    return <div key={i} >
                    <h3 className='h3form'>{e.Jobtitle}</h3>
                     <p className='pform'>{e.Jobtitle}</p>
                     <p className='pform'>{e.StartYear}- {e.EndYear}</p>
                     <ul className='uform'>
                     <li className='liform'>Description of responsibilities and achievements.</li>
                     <li className='liform'>Description of responsibilities and achievements.</li>
                     <li className='liform'>Description of responsibilities and achievements.</li>
                 </ul>
                    </div> 
                    })}
             </section>
             : <></>
             }
     
             <footer className='footerform'>
                 <p className='pform'>Feel free to contact me for any further information.</p>
             </footer>
         </div>
         </div>
        }
        else{
          alert("no")
        } 
    })
    :<>
    <div style={{display:"flex",flexDirection:"column",alignItems:"center", marginTop:"15%"}}>
    <h1 >Please create new Resume !!</h1> 
     <Button variant='primary'  onClick={()=>{ navigate(`/profile/${id}`)}}>Refresh</Button>
     </div>
    </> 
  }

    </>
}

export default Formalresume1