import React,{useState,}from 'react'
export const userContext = React.createContext(null)
function UserContextcomp({children}) {
     let [currentdata,setCurrentData]=useState()
      
  // console.log(currentdata)
  return  <userContext.Provider value={{currentdata,setCurrentData}}>
    {children}
  </userContext.Provider>
}
export default UserContextcomp