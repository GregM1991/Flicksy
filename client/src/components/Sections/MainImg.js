import React from 'react'


const MainImg = (props) => {
    return (
        
                    <>
                <div style={{width:"100px"}}>
                    <div style={{background:`url(${props.image})`,height:"auto", width:"500px"}}>
                    
                    <span>{props.title}</span>
                  <p>{props.text}</p>
                    </div>
                </div>
            
              
                  
                  </>

                
    
    )
}

export default MainImg
