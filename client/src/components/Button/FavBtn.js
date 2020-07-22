import React,{useEffect, useState} from 'react'
import axios from 'axios'

const FavBtn = (props) => {
    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    useEffect(() => {

        const variable = {
            // userFrom: ,
            movieId: props.movieId ,
            movieTitle: props.movieInfo.original_title ,
            movieImage: props.movieInfo.backdrop_path ,
            movieRunTime: props.movieInfo.runtime
        }

        axios.post('/api/favorite/favoriteNumber', variable)
            .then(res =>{
                if(res.data.success){
                    setFavoriteNumber(res.data.favoriteNumber )
                }else{
                    alert('failed to get favorite number')
                }
            })

            axios.post('/api/favorite/favorited', variable)
            .then(res =>{
                if(res.data.success){
                    setFavoriteNumber(res.data.favoriteNumber )
                }else{
                    alert('failed to get favorited Movies')
                }
            })
    },[])

    return (
        <div>
            <button>Add to favorite</button>
        </div>
    )
}

export default FavBtn
