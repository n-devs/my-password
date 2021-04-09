// import React from 'react';
import {
    // BrowserRouter as Router,
    // Route,
    // Link,
    // Switch,
    // Redirect,
    useLocation
} from "react-router-dom";

export default function useQuery() {
    return new URLSearchParams(useLocation().search);
}

// export default useQuery;