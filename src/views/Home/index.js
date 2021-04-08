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
import DetailedAccordion from '../../components/DetailedAccordion';
import firebase from '../../services/firebase';

import './style.css';

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

    function toLink() {
        history.push('/new-password')
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
        <div>
            <SearchBar
                input={input}
                onChange={updateInput}
            />
        </div>
        <div>
            {dataList.map((_list, i) => (
                <DetailedAccordion key={i} data={_list}></DetailedAccordion>
            ))}
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