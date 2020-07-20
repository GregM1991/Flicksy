import React from 'react'
import styles from '../layout/Landing.module.css'
import {Typography} from 'antd'
const {Title } = Typography
 
const MainImg = () => {
    return (
        
            <div className={styles.landingImg}>
                <div>
                    <div className={styles.main} >
                        <Title style= {{color: 'red'}}>Title</Title>
                        <p>Text goes here</p>

                    </div>
                </div>
            </div>
    )
}

export default MainImg
