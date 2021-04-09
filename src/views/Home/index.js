import React from "react";
// import firebase from 'firebase';
// import { useSelector, useDispatch } from 'react-redux';
import {
    useHistory
} from "react-router-dom";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
// import PrivateRoute from '../../components/PrivateRoute';
import SearchBar from '../../components/SearchBar';
// import renderLoader from '../../components/renderLoader';
import firebase from '../../services/firebase';

import './style.css';

const DetailedAccordion = React.lazy(() => import('../../components/DetailedAccordion'));
const useStyles = makeStyles({
    rootButton: {
        borderRadius: "50%",
        padding: 20
    },
});

function HomeView(props) {
    const [input, setInput] = React.useState('');
    const [dataList, setDataList] = React.useState([])
    const [dataListDefault, setDataListDefault] = React.useState([])
    const { user } = props
    const classes = useStyles();

    const history = useHistory()
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    function toLink() {
        history.push('/add-data')
    }

    async function updateInput(input) {
        const filtered = await dataListDefault.filter(search => {
            return search.serviceName.toLowerCase().includes(input.toLowerCase()) || search.email.toLowerCase().includes(input.toLowerCase()) || search.phoneNumber.toLowerCase().includes(input.toLowerCase()) || search.id.toLowerCase().includes(input.toLowerCase())
        })
        setInput(input);
        setDataList(filtered);
    }

    React.useEffect(() => {
        var db = firebase.firestore();
        var docRef = db.collection("users").doc(user.uid).collection("books")

        docRef.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                setDataList(prevArray => ([...prevArray, { ...doc.data(), id: doc.id }]))
                setDataListDefault(prevArray => ([...prevArray, { ...doc.data(), id: doc.id }]))
            });
        });


    }, [user.uid]);

    return (<div className="full-screen">
        <div style={{
            position: 'fixed',
            top: 0,
            zIndex: 1,
            width: '100%',
        }}>
            <SearchBar
                input={input}
                onChange={updateInput}
            />
        </div>
        <div style={{
            marginTop: 85,
            height: '120%'
        }}>
            {/* <React.Suspense fallback={renderLoader()}> */}
            {dataList.map((_list, i) => (
                <DetailedAccordion key={i} i={i} expanded={expanded === `panel${i}`} onChange={handleChange(`panel${i}`)} data={_list} user={user}></DetailedAccordion>
            ))}
            {/* </React.Suspense> */}
        </div>
        {/* {data.map(_data => {

        })} */}
        <div className="button-add-password">
            <Button
                // borderRadius="50%"
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