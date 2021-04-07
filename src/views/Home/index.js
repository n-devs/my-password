import React, { useContext, createContext, useState } from "react";
import firebase from 'firebase';
import { useSelector, useDispatch } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import PrivateRoute from '../../components/PrivateRoute';

import './style.css';

const useStyles = makeStyles({
    rootButton: {
        borderRadius: "50%",
        padding: 20
    },
});

function HomeView(props) {
    const { user } = props
    const classes = useStyles();

    const history = useHistory()

    function toLink() {
        history.push('/new-password')
    }
    return (<div className="full-screen">

        <div className="button-add-password">
            <Button
                borderRadius="50%"
                variant="contained"
                color="primary"
                size="large"
                className={classes.rootButton}
                onClick={toLink}
            >
                <AddIcon />
            </Button>
        </div>
    </div>)
}

export default HomeView;