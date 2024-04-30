import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { SiGmail } from "react-icons/si";
import { IoLocation } from "react-icons/io5";
import { FaPhoneAlt, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { CiLink } from "react-icons/ci";
import { userContext } from '../../utils/UserContext';
import AxiosService from '../../utils/AxiosService';
import AppRoutes from '../../utils/AppRoutes';
import ApiRoutes from '../../utils/ApiRoutes';
import { API_URL } from '../../App';
import { useNavigate } from 'react-router-dom';

function ResumetoPdf() {
  const { id } = useParams();
  const navigate = useNavigate();
  const sendid = { id: id };
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [requestSent, setRequestSent] = useState(false); // Flag to track whether request has been sent

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resume1 = await AxiosService.get(`${ApiRoutes.USERS.path}/generateresumeid/${id}`, {
          authenticate: ApiRoutes.USERS.authenticate
        });
        if (resume1.status === 200) {
          setData(resume1.data?.data); 
        } else {
          setData([]);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      }
    };
    fetchData();
  }, []);


  const personalDetails  = data.personalDetails;
  const  qualifications  = data.qualifications;
  const  resumeid  = data.resumeid;
  const  jobs  = data.jobs;
  const  skills  = data.skills;
  console.log(personalDetails,qualifications,resumeid)

  const elementId= data.resumeid 
  console.log(elementId)
  // const image = data.image
  // console.log(image)

  if(elementId === "1"){
    return <>
        <div className="containerform">
      <header className="formheaderstyle">
        <h1 className="h1form">
          {personalDetails.firstname} {personalDetails.lastname}
        </h1>
        <div className="contact-info">
          <p className="pform">
            <SiGmail /> &nbsp;
            {personalDetails.email}
          </p>
          <p className="pform">
            <FaPhoneAlt />&nbsp;
            {personalDetails.mobile}
          </p>
          <p className="pform">
            <IoLocation />&nbsp;
            {personalDetails.address},&nbsp;{personalDetails.city},&nbsp;
            {personalDetails.state},&nbsp;{personalDetails.zip}
          </p>
          <p className="pform">
            <FaLinkedinIn />&nbsp;
            {personalDetails.linkedin}
          </p>
          <p className="pform">
            <FaGithub />&nbsp;
            {personalDetails.github}
          </p>
          <p className="pform">
            <CiLink />&nbsp;
            {personalDetails.portfolio}
          </p>
        </div>
      </header>
                    <section className="section">
                      <h2 className="h2form">Objective</h2>
                      <p className="pform">
                        A brief statement about your career objectives or what you are seeking in a
                        position.
                      </p>
                    </section>
                    <section className="section">
                      <h2 className="h2form">Skills</h2>
                      <ul className="uform">
                        {skills.map((skill, index) => (
                          <li className="liform" key={index}>
                            <i className="fas fa-check icon"></i>
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </section>
                    <section className="section">
                      <h2 className="h2form">Education</h2>
                      {qualifications.map((qualification, index) => (
                        <div key={index}>
                          <h3 className="h3form">{qualification.CourseDetails}</h3>
                          <p className="pform">
                            {qualification.InstituteName},{qualification.Location}
                          </p>
                          <p className="pform" style={{ marginBottom: "2%" }}>
                            {qualification.StartYear}-{qualification.EndYear}
                          </p>
                        </div>
                      ))}
                    </section>
                    {jobs.length > 0 ? (
                      <section className="section">
                        <h2 className="h2form">Experience</h2>
                        {e.jobs.map((job, index) => (
                          <div key={index}>
                            <h3 className="h3form">{job.Jobtitle}</h3>
                            <p className="pform">{job.Employer},{job.Location}</p>
                            <p className="pform">
                              {job.StartYear}-{job.EndYear}
                            </p>
                            <ul className="uform">
                              <li className="liform">Description of responsibilities and achievements.</li>
                              <li className="liform">Description of responsibilities and achievements.</li>
                              <li className="liform">Description of responsibilities and achievements.</li>
                            </ul>
                          </div>
                        ))}
                      </section>
                    ) : null}
                    <footer className="footerform">
                      <p className="pform">Feel free to contact me for any further information.</p>
                    </footer>
    </div>
    </>
  }

else if(elementId === "2"){
    return <>
                  <div className="containerresume2"  id="content2">
                    <div className="left-column">
                      <img src={`${API_URL}/images/${data.image}`} alt="Your Photo" className="photo" />
                      <div className="address">
                        <p className="pform">
                          <IoLocation />
                          {personalDetails.address}
                        </p>
                        <p className="pform">
                          <SiGmail />{personalDetails.email}
                        </p>
                        <p className="pform" style={{ marginBottom: "20%" }}>
                          <FaPhoneAlt />
                          {personalDetails.mobile}
                        </p>
                        <p className="pform">
                          <FaLinkedinIn />
                          <span style={{ fontSize: "10px" }}>{personalDetails.linkedin}</span>
                        </p>
                        <p className="pform">
                          <FaGithub />
                          <span style={{ fontSize: "10px" }}>{personalDetails.github}</span>
                        </p>
                        <p className="pform">
                          <CiLink />
                          <span style={{ fontSize: "10px" }}>{personalDetails.portfolio}</span>
                        </p>
                      </div>
                    </div>
                    <div className="right-column">
                      <header>
                        <h1 className="h1form" style={{ color: "black" }}>
                          {personalDetails.firstname} {personalDetails.lastname}
                        </h1>
                      </header>
                      <section className="section">
                        <h2 className="h2form">Objective</h2>
                        <p className="pform">
                          A brief statement about your career objectives or what you are seeking in a
                          position.
                        </p>
                      </section>
                      <section className="section">
                        <h2 className="h2form">Skills</h2>
                        <ul className="uform">
                          {skills.map((skill, index) => (
                            <li className="liform" key={index}>
                              <i className="fas fa-check icon"></i>
                              {skill}
                            </li>
                          ))}
                        </ul>
                      </section>
                      <section className="section">
                        <h2 className="h2form">Education</h2>
                        {qualifications.map((qualification, index) => (
                          <div key={index}>
                            <h3 className="h3form">{qualification.CourseDetails}</h3>
                            <p className="pform">
                              {qualification.InstituteName},{qualification.Location}
                            </p>
                            <p className="pform" style={{ marginBottom: "2%" }}>
                              {qualification.StartYear}-{qualification.EndYear}
                            </p>
                          </div>
                        ))}
                      </section>
                      {jobs.length > 0 ? (
                        <section className="section">
                          <h2 className="h2form">Experience</h2>
                          {jobs.map((job, index) => (
                            <div key={index}>
                              <h3 className="h3form">{job.Jobtitle}</h3>
                              <p className="pform">{job.Jobtitle}</p>
                              <p className="pform">
                                {job.StartYear}- {job.EndYear}
                              </p>
                              <ul className="uform">
                                <li className="liform">Description of responsibilities and achievements.</li>
                                <li className="liform">Description of responsibilities and achievements.</li>
                                <li className="liform">Description of responsibilities and achievements.</li>
                              </ul>
                            </div>
                          ))}
                        </section>
                      ) : null}
                      <footer className="footerall">
                        <p className="pform">Feel free to contact me for any further information.</p>
                      </footer>
                    </div>
                    </div>
    </>
  }
else if(elementId === "3"){
 return<> 
 <div className="containerformbody">
           <div id="containerform">
           <div id="container3">
            <div id="header3">
        <div id="name-container3">
          <div id="name3"> {personalDetails.firstname} {personalDetails.lastname}</div>
          {/* <div id="job-title3">{}</div> */}
        </div>
        <div id="contact3">
          <h3>Contact</h3>
          <p>Email: {personalDetails.email}</p>
          <p>Phone: {personalDetails.mobile}</p>
          <p>Address:{personalDetails.address},&nbsp;{personalDetails.city},&nbsp;
                    {personalDetails.state},&nbsp;{personalDetails.zip}</p>
        </div>
      </div>
  
      <div id="objective3">
        <h4>Objective</h4>
        <p>To utilize my skills and expertise in web development to contribute effectively to the success of a dynamic and innovative company.</p>
      </div>

      <div id="skills3">
        <h4>Skills</h4>
        <ul>
        {skills.map((skill, index) => (
        <li className="dot" key={index}>
        <i className="fas fa-check icon"></i>
        {skill}</li>
        ))}
          {/* <li><span class="dot"></span> HTML5</li>
          <li><span class="dot"></span> CSS3</li>
          <li><span class="dot"></span> JavaScript</li> */}
        </ul>
      </div>

      {jobs.length > 0 ? (       
            <div >
                    <div id="sectiontitle3">Experience</div>
                     <div className="experience3">
                        {e.jobs.map((job, index) => (
                          <div key={index}>
                             <h4>{job.Jobtitle}r</h4>
                               <p>{job.Employer},{job.Location}</p>
                       <p> {job.StartYear}-{job.EndYear}</p>
                          </div>
                        ))}       
                        </div>
                        </div>
                    ) : null}
              <div id="sectiontitle3">Education</div>
             {qualifications.map((qualification, index) => (
                        <div className="education3"  key={index}>
                          <h4>{qualification.CourseDetails}</h4>
        <p> {qualification.InstituteName},{qualification.Location}</p>
        <p>  {qualification.StartYear}-{qualification.EndYear}</p>
                        </div>
                      ))} 
                     
      </div>
      </div>
      </div>
      </>
}
else  {
    return <p>Loading...</p>;
}


}
export default ResumetoPdf;
