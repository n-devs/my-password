import React from 'react';
// import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import {
    useHistory
} from "react-router-dom";
import useQuery from '../../components/useQuery';
import './style.css';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    rootButton: {
        borderRadius: "50%",
        padding: 20
    }
}));

const FormData = React.lazy(() => import('../../components/FormData'))


export default function UpdateDataView(props) {
    const { user } = props;
    const query = useQuery()
    const [update] = React.useState({
        id: query.get("id"),
        serviceName: query.get("serviceName"),
        email: query.get("email"),
        phoneNumber: query.get("phoneNumber"),
        password: query.get("password")
    })
    const classes = useStyles();

    const history = useHistory();

    function toLink() {
        history.push('/')
    }

    // React.useEffect(() => { }, [query])

    return (<div className={classes.root}>
        <FormData user={user} update={update}></FormData>
        <div className="button-back-home">
            <Button
                // borderRadius="50%"
                variant="contained"
                color="primary"
                size="large"
                className={classes.rootButton}
                onClick={toLink}
            >
                <ArrowBackIcon />
            </Button>
        </div>
    </div>)
};

