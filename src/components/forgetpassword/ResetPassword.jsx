import { useFormik } from "formik";
import * as Yup from "yup";
// import axios from "../config/axiosConfig.js";
import AxiosService from '../../utils/AxiosService.jsx';
import ApiRoutes from "../../utils/ApiRoutes.jsx";
import toast from 'react-hot-toast';
import './forgetpassword.css'
const ResetPassword = () => {
  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string().required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
        .required("Required"),
    }),

    onSubmit: async (values) => {
        const { newPassword } = values;
        const token = window.location.pathname.split("/").pop();
        console.log(token)
        try{
            let res = await AxiosService.post(`${ApiRoutes.RESETPASSWORD.path}/${token}`,{newPassword},{
                authenticate:ApiRoutes.RESETPASSWORD.authenticate
            })
            if(res.status=200){
                toast.success(res.data.message);
                setTimeout(() => {
                    window.location.href = "/dashboard";
                  }, 2000);
            }
             else {
                    toast.error("Your link has expired");
                  }
        }
        catch(error){
            toast.error(error.res.data.message || error.message)
        }
        },
      }); 

  return (
    <div  id='loginWrapper'>
       <div id='loginHeader'>
    <h2>Update New Password Here !!</h2>
  </div>
    <form onSubmit={formik.handleSubmit} id="formGroup">
      <label htmlFor="newPassword" id="formLabel">New Password</label>
      <input
      id="formControl"
        name="newPassword"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.newPassword}
      />
      {formik.touched.newPassword && formik.errors.newPassword ? (
        <div>{formik.errors.newPassword}</div>
      ) : null}

      <label htmlFor="confirmPassword" id="formLabel">Confirm Password</label>
      <input
         id="formControl"
        name="confirmPassword"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.confirmPassword}
      />
      {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
        <div>{formik.errors.confirmPassword}</div>
      ) : null}

      <button  id="btnPrimary" type="submit">Submit</button>
    </form>
    </div>
  );
};

export default ResetPassword;
