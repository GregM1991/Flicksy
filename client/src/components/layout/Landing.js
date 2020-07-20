import React, {useEffect, useState} from "react"
import {API_URL, API_KEY} from '../Config'

import styles from './Landing.module.css'
import axios from "axios"
import {Typography, Row} from 'antd'
import MainImg from "../Sections/MainImg"
const {Title} = Typography


export const Landing = () => {
  const [Movies, setMovies] = useState([])

  useEffect(() => {
    async function getMovie(){
      try{
        const res = await axios.get(`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
        console.log(res);
        setMovies(res.results)

      } catch(err){
        console.log(err);
      }
    }
    getMovie ()
  }, [])
  return (
  
  <div style={{ width: '100%', margin:0 }}>
          {/* Landing movie img */}
    <MainImg/>
    
      {/* Body */}
      <div className={styles.landingBody}>
        <Title level={2}>Latest movies</Title>
        <hr/>

      
        

        {/* Load more button */}
        <div className={styles.buttonWrapper}>
          <button> 
            LOAD MORE
          </button>
        </div>
        
      </div>
    </div>
  
  )
}
