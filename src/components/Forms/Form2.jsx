import React, {useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import toast from 'react-hot-toast';
import Row from "react-bootstrap/Row";
import AddIcon from "@mui/icons-material/Add";
import MinimizeIcon from "@mui/icons-material/Minimize";
import Button from "react-bootstrap/Button";
import '../Forms/form.css'
import AxiosService from "../../utils/AxiosService";
import ApiRoutes from "../../utils/ApiRoutes";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function FormValue2() {

  const navigate = useNavigate()
  const {id}=useParams()
  // const [formsData, setFormsData] = useState([]);
  const [counter, setCounter] = useState(1);
  const [jobCounter,setJobCounter]=useState(0)
  const [validated, setValidated] = useState(false);
  
  const imageref=useRef()


//  If you want to get the file data from the input element, you can use the files property

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const form = event.currentTarget;

      if (form.checkValidity() === false) {
        event.stopPropagation();
        setValidated(true); // Trigger validation feedback
        return;
      }

      const image = imageref.current;
      console.log(image)
      
      // Validate mobile number
      const formData = new FormData(form);
      let mobile = formData.get("mobile");
      console.log(mobile)
      var phoneno = /^\d{10}$/;
      if (!mobile.match(phoneno)) {
        toast.error("Please provide a valid mobile number.");
        return;
      }

      // Prepare data for submission
      const data = {
        id: id,
        resumeid: 2,
        personalDetails: {
          firstname: formData.get("firstname"),
          lastname: formData.get("lastname"),
          email: formData.get("email"),
          address: formData.get("address"),
          mobile: mobile,
          city: formData.get("city"),
          state: formData.get("state"),
          zip: formData.get("zip"),
          github: formData.get("Github"),
          linkedin: formData.get("Linkenin"),
          portfolio: formData.get("portfolio"),
        },
        qualifications: [],
        jobs: [],
        skills: formData.get("skills").split(",").map((skill) => skill.trim()),
      };

      // Extract qualifications
      for (let i = 0; i < counter; i++) {
        const qualification = {
          InstituteName: formData.get(`qualification_${i}_InstituteName`),
          Location: formData.get(`qualification_${i}_Location`),
          CourseDetails: formData.get(`qualification_${i}_CourseDetails`),
          StartYear: formData.get(`qualification_${i}_StartYear`),
          EndYear: formData.get(`qualification_${i}_EndYear`),
        };
        data.qualifications.push(qualification);
      }

      // Extract jobs
      for (let i = 0; i < jobCounter; i++) {
        const job = {
          Jobtitle: formData.get(`Job_${i}_Jobtitle`),
          Employer: formData.get(`Job_${i}_Employer`),
          Location: formData.get(`Job_${i}_Location`),
          StartYear: formData.get(`Job_${i}_StartYear`),
          EndYear: formData.get(`Job_${i}_EndYear`),
        };
        data.jobs.push(job);
      }

      // Log the prepared data
      console.log(data);

      // Send image and form data to server
      const imageData = { image: image?.files[0] };
      console.log(imageData);
      const responseImage = await AxiosService.post(
        `${ApiRoutes.USERS.path}/${id}/uploadresume2`,
        imageData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const responseData = await AxiosService.post(
        `${ApiRoutes.USERS.path}/${id}/formalresume2model`,
        JSON.stringify(data),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    
      // Handle responses
      if (responseImage.status === 201 && responseData.status === 201) {
        toast.success(responseData.data.message);
        // Redirect to profile page or any other page
        navigate(`/profile/${id}/viewresumedata`)
      } else {
        toast.error("Failed to submit the form.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

 
  const handleClick = () => {
    setCounter((prevCounter) => prevCounter + 1);
  };

  const handleClickm = () => {
    if (counter > 1) {
      setCounter((prevCounter) => prevCounter - 1);
    }
  };

  const handlejobclick =()=>{
    setJobCounter((prevCounter) => prevCounter + 1);
  }

  const handlejobclickm =()=>{
    if (jobCounter > 0) {
      setJobCounter((prevCounter) => prevCounter - 1);
    }
  }


  return (
    <>
    <h1 style={{textAlign:"center",marginTop:"2%"}}>Fill the form</h1>
    <div className="container formstyles">

            {/* Personal details */}
      <div style={{ margin: "2%" }}>
      <h3>Personal details</h3>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>

             {/* Upload image */}
             <Row className="mb-3">
              <Form.Group as={Col} controlId="formFile" className="mb-2" md='4'>
                <Form.Label>Upload Image</Form.Label>
                <Form.Control required type="file" ref={imageref} name="imageData"/>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="6">
                <Form.Label>First name</Form.Label>
                <Form.Control required type="text" placeholder="First name"  pattern="[A-Za-z]+" title="Only letters allowed" name="firstname" />
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Last name</Form.Label>
                <Form.Control required type="text" placeholder="Last name"  pattern="[A-Za-z]+" title="Only letters allowed" name="lastname" />
              </Form.Group>
            </Row>
            <Row className="mb-2">
              <Form.Group
                as={Col}
                className="mb-3"
                md="6"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  required 
                  placeholder="name@example.com"
                  name="email"
                />
              </Form.Group>

              <Form.Group
                as={Col}
                className="mb-3"
                md="4"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Mobile</Form.Label>
                <Form.Control type="text" required pattern="[0-9]+" title="Only numbers allowed"  name="mobile" />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="8" controlId="validationCustom03" >
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" placeholder="Address" required name="address" />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="3" controlId="validationCustom04" >
                <Form.Label>City</Form.Label>
                <Form.Control type="text" placeholder="City" required name="city" />
              </Form.Group>

              <Form.Group as={Col} md="3" controlId="validationCustom04">
                <Form.Label>State</Form.Label>
                <Form.Control type="text" placeholder="State" required name="state" />
              </Form.Group>

              <Form.Group as={Col} md="3" controlId="validationCustom05">
                <Form.Label>Zip</Form.Label>
                <Form.Control type="text" placeholder="Zip" required name="zip" />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="3" controlId="validationCustom04" >
                <Form.Label>Github</Form.Label>
                <Form.Control type="text" placeholder="Github link "  name="Github" />
              </Form.Group>

              <Form.Group as={Col} md="3" controlId="validationCustom04">
                <Form.Label>Linken In</Form.Label>
                <Form.Control type="text" placeholder="Linken In link"  name="Linkenin" />
              </Form.Group>

              <Form.Group as={Col} md="3" controlId="validationCustom05">
                <Form.Label>Portfolio </Form.Label>
                <Form.Control type="text" placeholder="portfolio link" required name="portfolio" />
              </Form.Group>
            </Row>
          
          {/* Qualification */}

          <div style={{ display: "flex" }}>
            <h3>Qualification details</h3>
            <div className="addthecontent" onClick={handleClick}>
              <AddIcon />
            </div>
            <div className="removethecontent" onClick={handleClickm}>
              <MinimizeIcon />
            </div>
          </div>

            {Array.from(Array(counter)).map((c, index) => {
            const uniqueKey = `qualification_${index}`;
            return (
              <div key={uniqueKey} style={{ marginTop: "2%" }}>
                  <Row className="mb-3 mt-4">
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                      <Form.Label>Institute Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Institute Name"
                        pattern="[A-Za-z ]+" title="Only letters allowed"
                        name={`qualification_${index}_InstituteName`}
                      />
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                      <Form.Label>Location</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="e.g. New Delhi, India"
                        name={`qualification_${index}_Location`}
                      />
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group
                      as={Col}
                      className="mb-2"
                      md="8"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Course Details</Form.Label>
                      <Form.Control type="text"   pattern="[A-Za-z ]+" title="Only letters allowed" name={`qualification_${index}_CourseDetails`} />
                    </Form.Group>
                  </Row>

                  <Row className="mb-3 ">
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                      <Form.Label>Start </Form.Label>
                      <Form.Control  type="text" placeholder="Year" pattern="[0-9]+" title="Only numbers allowed" name={`qualification_${index}_StartYear`} />
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                      <Form.Label>End </Form.Label>
                      <Form.Control type="text" placeholder="Year" pattern="[0-9]+" title="Only numbers allowed" name={`qualification_${index}_EndYear`}  />
                    </Form.Group>
                  </Row>
                <hr />
              </div>
            );
          })}

        {/* Experience */}

          <div style={{ display: "flex" }}>
           <h3>Experience</h3>
            <div className="addthecontent" onClick={handlejobclick}>
              <AddIcon />
            </div>
            <div className="removethecontent" onClick={handlejobclickm}>
              <MinimizeIcon />
            </div>
            </div>
               {Array.from(Array(jobCounter)).map((c, index) => {
             const uniqueKey = `job_${index}`;
            return (
              <div key={uniqueKey} style={{ marginTop: "5%" }}>
             
              <Row className="mb-3 ">
                 <Form.Group as={Col} md="4" controlId="validationCustom01">
                   <Form.Label>Job Title </Form.Label>
                   <Form.Control  type="text" placeholder="e.g.Analyst"  
                  pattern="[A-Za-z ]+"  title="Only letters allowed" 
                    name={`Job_${index}_Jobtitle`} />
                 </Form.Group>

                 <Form.Group as={Col} md="4" controlId="validationCustom02">
                   <Form.Label>Employer</Form.Label>
                   <Form.Control type="text" placeholder="e.g. Tata Group" 
                     pattern="[A-Za-z ]+" title="Only letters allowed" name={`Job_${index}_Employer`}  />
                 </Form.Group>
               </Row>
               <Row className="mb-3 ">
               <Form.Group as={Col} md="4" controlId="validationCustom02">
                   <Form.Label>Location</Form.Label>
                   <Form.Control type="text"  title="Only letters allowed" placeholder="e.g. New Delhi, India" name={`Job_${index}_Location`}  />
                 </Form.Group>
               </Row>
               <Row className="mb-3 ">
                 <Form.Group as={Col} md="4" controlId="validationCustom01">
                   <Form.Label>Start </Form.Label>
                   <Form.Control  type="text" placeholder="Year" pattern="[0-9]+" title="Only numbers allowed" name={`Job_${index}_StartYear`} />
                 </Form.Group>

                 <Form.Group as={Col} md="4" controlId="validationCustom02">
                   <Form.Label>End </Form.Label>
                   <Form.Control type="text" placeholder="Year" pattern="[0-9]+" title="Only numbers allowed" name={`Job_${index}_EndYear`}  />
                 </Form.Group>
               </Row>
               <hr />
              </div>
              );
            })
            }
        
            {jobCounter=== 0 ?<hr/>:null}

        {/* Skills */}

            <div className="container">
          <div style={{ display: "flex" }}>
          <h3>Skills</h3>
          </div>
           </div>
            <Row className="mb-3 ">
                 <Form.Group as={Col} md="4" controlId="validationCustom01">
                   <Form.Control required type="text" placeholder="e.g. Ms Office, HTML, CSS, PYTHON, JAVASCRIPT" name="skills" />
                 </Form.Group>
               </Row>
               <div  style={{display:"flex",justifyContent:"flex-end"}}>
               <Button type="submit"  >Submit</Button>
               </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default FormValue2;
