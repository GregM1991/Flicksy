import React, {useState} from 'react'
import axios from "axios"



const SearchMovie = () => {
    const [formData, setFormData] = useState("")
    return (
        <div>
            <form onSubmit="">
                <input 
                    type="text" 
                    placeholder="search movie by title" 
                    value={formData}
                    onChange={(e)=> setFormData(e.target.value)}>

                    </input>
                <input type="submit" value="search"></input>
            </form>
        </div>
    )
}

export default SearchMovie

