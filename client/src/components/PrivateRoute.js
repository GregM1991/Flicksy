import React from 'react'
import {Route} from 'react-router-dom'
import {Login} from '../components/auth/Login'

export default function PrivateRoute(props) {

    const {token} = localStorage
    const {component, ...rest} = props
    return (
        <div>
            <Route {...rest} component={token ? component : Login}/>
        </div>
    )
}
