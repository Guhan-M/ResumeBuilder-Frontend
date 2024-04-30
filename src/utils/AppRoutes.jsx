import Login from '../components/Login'
import Signup from '../components/Signup'
import Dashboard from '../components/dashboard/Dashboard'
import Profile from '../components/Profile'
import {Navigate} from 'react-router-dom'
import UserGuard from './UserGuard'
import FormValue from "../components/Forms/FormValue"
import Formalresume1 from '../components/resume/Formalresume1'
import Formalresuem2 from '../components/Forms/Form2'
import FormValue3 from '../components/Forms/Form3'
import ViewResume from '../components/ViewResume'
import Viewresume2 from '../components/resume/viewresume2'
import ForgetPassword from '../components/forgetpassword/Forgetpassword'
import ResetPassword from '../components/forgetpassword/ResetPassword'
import UserContextcomp from '../utils/UserContext'
import ResumetoPdf from'../components/topdf/ResumetoPdf'


const AppRoutes = [
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/signup",
        element:<Signup/>
    },
    {
        path:"/forgetpassword",
        element:<ForgetPassword/>
    },
    {
        path:"/resetpassword/:token",
        element:<ResetPassword/>
    },
    {
        path:"/dashboard",
        element:<Dashboard/>
    },
    {
        path:"/ResumetoPdf/:id",
        element:<UserContextcomp>< ResumetoPdf/></UserContextcomp>
    },
    {
        path:"/profile/:id",
        element:<UserGuard>
            <Profile/>
            </UserGuard>/* if given user is check fist admin and profile  or not */
    },
    {
        path:"/profile/:id/formalresume1model",
        element:<UserGuard>
            <FormValue/>
            </UserGuard>
    },
    {
        path:"/profile/:id/formalresume2model",
        element:<UserGuard>
            <Formalresuem2/>
            </UserGuard>
    },
    {
        path:"/profile/:id/formalresume3model",
        element:< FormValue3/>
    },
  
    {
        path:"/profile/:id/getresumedata",
        element:<Formalresume1/>
    },
    {
        // View all resume
        path:"/profile/:id/viewresumedata",
        element:<UserContextcomp><ViewResume/></UserContextcomp>
    },
    {
         // View resume2
        path:"/profile/:id/viewresumedata2",
        element:<Viewresume2/>
    },
     {
         path:"*",
        element:<Navigate to='/dashboard'/>
    }
]


/* This AppRoutes import in app.jsx file and it recieve the data with createBrowserprovider and RouterProvider hit the path, return the element file */
export default AppRoutes