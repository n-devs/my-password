import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import clsx from 'clsx';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import firebase from '../../services/firebase'
import { useClipboard } from "use-clipboard-copy";


import './style.css';
import {
    useHistory
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
    },
    details: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    column: {
        flexBasis: '33.33%',
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: theme.spacing(1, 2),
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
}));

export default function DetailedAccordion(props) {
    const { user, data } = props;
    const classes = useStyles();
    const history = useHistory();
    const clipboard = useClipboard();
    const [open, setOpen] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);


    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function deleteData() {
        var db = firebase.firestore();
        var bookCollect = db.collection("users").doc(user.uid).collection("books")
        bookCollect.doc(data.id).delete().then(() => {
            console.log("Document successfully deleted!");
            window.location.reload()
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }


    const clipboardText = (prop) => (event) => {
        /* Get the text field */
        var copyText = document.getElementById(`${prop}`);

        /* Select the text field */
        copyText.select();
        copyText.setSelectionRange(0, 99999); /* For mobile devices */

        /* Copy the text inside the text field */
        document.execCommand("copy");
        clipboard.copy(copyText.value)

        window.NativeAndroid.copyToClipboard(copyText.value);
        /* Alert the copied text */
        console.log("Copied the text: " + copyText.value);

    }

    return (
        <div className={classes.root}>
            <Accordion square {...props}>
                <AccordionSummary

                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${props.i}bh-content`}
                    id={`panel${props.i}c-header`}
                >
                    <div className={classes.column}>
                        <Typography className={classes.heading}>{data.serviceName}</Typography>
                    </div>
                    <div className={classes.column}>
                        <Typography className={classes.secondaryHeading}>{data.email}</Typography>
                    </div>
                </AccordionSummary>
                <AccordionDetails className={classes.details}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <FormControl className="text-field-flex">
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <Input
                                    id={`email-${props.i}`}
                                    type={'text'}
                                    value={data.email}
                                    disabled
                                    endAdornment={
                                        <React.Fragment>

                                            <InputAdornment position="end">
                                                <IconButton
                                                    color="primary"
                                                    aria-label="copy"
                                                    component="span"
                                                    onClick={clipboardText(`email-${props.i}`)}
                                                >
                                                    <FileCopyIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        </React.Fragment>
                                    }
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl className="text-field-flex">
                                <InputLabel htmlFor="phoneNumber">PhoneNumber</InputLabel>
                                <Input
                                    id={`phoneNumber-${props.i}`}
                                    type={'text'}
                                    value={data.phoneNumber}
                                    disabled
                                    endAdornment={
                                        <React.Fragment>

                                            <InputAdornment position="end">
                                                <IconButton
                                                    color="primary"
                                                    aria-label="copy"
                                                    component="span"
                                                    onClick={clipboardText(`phoneNumber-${props.i}`)}
                                                >
                                                    <FileCopyIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        </React.Fragment>
                                    }
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl className="text-field-flex">
                                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                <Input
                                    // id="standard-adornment-password"
                                    id={`password-${props.i}`}
                                    type={showPassword ? 'text' : 'password'}
                                    value={data.password}
                                    disabled
                                    endAdornment={
                                        <React.Fragment>

                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                                <IconButton
                                                    color="primary"
                                                    aria-label="copy"
                                                    component="span"
                                                    onClick={clipboardText(`password-${props.i}`)}
                                                >
                                                    <FileCopyIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        </React.Fragment>
                                    }
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </AccordionDetails>
                <Divider />
                <AccordionActions>
                    <Button size="small" onClick={handleClickOpen}>{"DELETE"}</Button>
                    <Button size="small" onClick={() => { history.push(`/update-data?id=${data.id}&serviceName=${data.serviceName}&email=${data.email}&phoneNumber=${data.phoneNumber}&password=${data.password}`) }} color="primary">
                        {"EDIT"}
                    </Button>
                    <Button size="small" onClick={() => { history.push(`/history?id=${data.id}`) }} color="primary">
                        {"HISTORY"}
                    </Button>
                </AccordionActions>
            </Accordion>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Delete"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div className={classes.column}>
                            <Typography className={classes.secondaryHeading}>ต้องการลบ <span style={{
                                color: "orange"
                            }} >{data.email}</span> ใช่หรือไม่</Typography>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Disagree
          </Button>
                    <Button onClick={deleteData} color="primary" autoFocus>
                        Agree
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
