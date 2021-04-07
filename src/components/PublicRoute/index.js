import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
  } from "react-router-dom";

  
function PublicRoute({ children, user, ...rest }) {
    return (
        <Route
            {...rest}
            render={({ location }) => {
               
                if (user === null) {
                    
                    return (children)
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: "/",
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

export default PublicRoute;