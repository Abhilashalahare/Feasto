import axios from 'axios'
import React, { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from '../Redux/userSlice'
import { setMyShopData } from '../Redux/ownerSlice'

function useGetMyshop() {
    const dispatch=useDispatch()
    // const {userData}=useSelector(state=>state.user)
  useEffect(()=>{
  const fetchShop=async () => {
    try {
           const result=await axios.get(`${serverUrl}/api/shop/get-my`,{withCredentials:true})
            dispatch(setMyShopData(result.data))
  
    } catch (error) {
        console.log(error)
    }
}
fetchShop()
 
  },[])
}

export default useGetMyshop