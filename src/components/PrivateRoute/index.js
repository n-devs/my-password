import React, { useContext, createContext, useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";

function PrivateRoute({ children, user, ...rest }) {
    //Get the whole state from characterReducer
    
    return (
        <Route
            {...rest}
            render={({ location }) => {
               
                if (user !== null) {
                    
                    return (children)
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}
                        />
                    )
                }
            }
            }
        />
    );
}

export default PrivateRoute