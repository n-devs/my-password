import React from "react";
import firebase from '../../services/firebase'
import { makeStyles } from '@material-ui/core/styles';
import {
    useHistory
} from "react-router-dom";
import useQuery from '../../components/useQuery';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import './style.css';

const HistoryList = React.lazy(() => import('../../components/HistoryList'))

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    rootButton: {
        borderRadius: "50%",
        padding: 20
    }
}));

export default function HistoryView(props) {
    const { user } = props
    const history = useHistory();
    const query = useQuery()
    const [historyList, setHistoryList] = React.useState([])

    const classes = useStyles();

    function toLink() {
        history.push('/')
    }

    React.useEffect(() => {
        var db = firebase.firestore();
        var bookCollect = db.collection("users").doc(user.uid).collection("books")
        bookCollect.doc(query.get("id")).collection("historys").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                setHistoryList(prevArray => ([...prevArray, { ...doc.data(), id: doc.id }]))
            });
        });
    }, [])

    return (<React.Fragment>
        <HistoryList user={user} historyList={historyList.sort(function (a, b) {
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.created) - new Date(a.created);
        })}></HistoryList>
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
    </React.Fragment>)
}