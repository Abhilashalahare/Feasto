import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setUserData } from '../Redux/userSlice'

function useGetCurrentUser() {
    const dispatch = useDispatch()
 useEffect(()=>{
    const fetchUser = async()=>{
        try {
            const result = await axios.get(`${serverUrl}/api/user/current`,
            {withCredentials: true}      
        )
        dispatch(setUserData(result.data))
        console.log(result)
        } catch (error) {
           console.log(error) 
        }
    }
    fetchUser()
 },[])
}

export default useGetCurrentUser