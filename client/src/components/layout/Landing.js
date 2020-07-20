import React, {useEffect, useState} from "react"
import {API_URL, API_KEY} from '../Config'
import axios from "axios"

export const Landing = () => {

  useEffect(() => {
    // fetch(`${API_URL}movie/popular?api_key=${API_KEY}&languague=en-US&page=1`)
    //   .then(res => res.json)
    //   .then(res => {
    //     console.log(res);
    //   })
    async function getMovie(){
      try{
        const res = await axios.get(`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
        console.log(res);
      } catch(err){
        console.log(err);
      }
    }
    getMovie ()
  }, [])
  return (
    <>
           
        <h1>Our Landing Page</h1>
        <div>popular movie</div> 
    </>
  )
}
