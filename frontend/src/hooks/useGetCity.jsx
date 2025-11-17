import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData, setCurrentCity, setCurrentState, setCurrentAddress, } from '../Redux/userSlice'

function useGetCity() {
    const dispatch = useDispatch()
    const {userData} = useSelector(state=>state.user)   
    const apiKey = import.meta.env.VITE_GEOAPIKEY
    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(async(position)=>{
            console.log(position);
            const latitude = position.coords.latitude
            const longitude = position.coords.longitude

            const result = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`)
            // console.log(result.data.results[0].city);
            dispatch(setCurrentCity(result?.data?.results[0]?.city))
            dispatch(setCurrentState(result?.data?.results[0]?.state))
            // console.log(result.data.results[0].state);
               dispatch(setCurrentAddress(result?.data?.results[0]?.address_line2 || result?.data?.results[0]?.address_line1))
                // console.log(result.data);
            
            
        })

    }, [userData])
    
}

export default useGetCity