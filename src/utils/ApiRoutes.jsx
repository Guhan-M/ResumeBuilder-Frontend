const ApiRoutes ={
    LOGIN:{
        path:"/user/login",
        authenticate:false
    },
    SIGNUP:{
        path:"/user/signup",
        authenticate:false
    },
    
    FORGETPASSWORD:{
        path:"/user/forgetPassword",
        authenticate:false
    },
    
    RESETPASSWORD:{
        path:"/user/resetPassword",
        authenticate:true
    },
    DASHBOARD:{
        path:"/user/dashboard",
        authenticate:false
    },
    USERS:{
        path:"/user",
        authenticate:true
    },
    GENERATEPDF:{
        path:"/generatepdf",
        authenticate:false
    },
    IMG:{
        path:"/images",
        authenticate:true
    }
}

// it is next of the axiosService link plus add the path if need, mention same way authenticate 

export default ApiRoutes 