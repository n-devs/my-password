import React from 'react';
// import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {
    useHistory
} from "react-router-dom";
import firebase from '../../services/firebase'

import './style.css';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
    rootButton: {
        borderRadius: "50%",
        padding: 20
    },
}));

function getSteps() {
    return ['Service name', 'My Email', 'My Password', 'Create ad'];
}

export default function NewPassword(props) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [values, setValues] = React.useState({
        serviceName: '',
        email: '',
        phoneNumber: '',
        password: '',
    })
    const { user } = props;
    const steps = getSteps();
    const history = useHistory()

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        if (activeStep === steps.length - 1) {
            var db = firebase.firestore();
            var bookCollect = db.collection("users").doc(user.uid).collection("books")
            bookCollect.add(values)
                .then((docRef) => {
                    console.log("Document successfully written!");
                    bookCollect.doc(docRef.id).collection("historys").add({
                        password: values.password,
                        created: new Date()
                    }).then((historyRef) => {
                        console.log("Document successfully written!");
                        history.push('/')
                        window.location.reload()
                    }).catch((error) => {
                        console.error("Error writing document: ", error);
                    });

                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });

        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    function toLink() {
        history.push('/')
    }

    return (
        <div className={classes.root}>

            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        <StepContent>
                            {/* <Typography>{getStepContent(index)}</Typography> */}
                            {/* <GetStepContent step={index}></GetStepContent> */}
                            {index === 0 ? (<div className="box-center-input">
                                <TextField id="serviceName" value={values.serviceName} className="text-field-flex" label="Service Name" onChange={handleChange('serviceName')} />
                            </div>) : index === 1 ? (<div className="box-center-input">
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <TextField id="email" value={values.email} className="text-field-flex" label="Email" onChange={handleChange('email')} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField id="phoneNumber" value={values.phoneNumber} className="text-field-flex" label="PhoneNumber" onChange={handleChange('phoneNumber')} />
                                    </Grid>
                                </Grid>
                            </div>) : index === 2 ? (<div className="box-center-input">
                                <FormControl className="text-field-flex">
                                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                    <Input
                                        id="standard-adornment-password"
                                        type={values.showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        onChange={handleChange('password')}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                >
                                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </div>) : index === 3 ? (
                                <div className="box-center-input">
                                    <Grid container spacing={1}>
                                        <Grid item xs={6} >
                                            <p className="ellipsis">{"Service Name :"}</p>

                                        </Grid>
                                        <Grid item xs={6} >
                                            <p className="ellipsis">{values.serviceName}</p>
                                        </Grid>
                                        <Grid item xs={6} >
                                            <p className="ellipsis">{"Email :"}</p>
                                        </Grid>
                                        <Grid item xs={6} >
                                            <p className="ellipsis">{values.email}</p>
                                        </Grid>
                                        <Grid item xs={6} >
                                            <p className="ellipsis">{"PhoneNumber :"}</p>
                                        </Grid>
                                        <Grid item xs={6} >
                                            <p className="ellipsis">{values.phoneNumber}</p>
                                        </Grid>
                                        <Grid item xs={6} >
                                            <p className="ellipsis">{"Password :"}</p>
                                        </Grid>
                                        <Grid item xs={6} >
                                            <p className="ellipsis">{values.password}</p>
                                        </Grid>
                                    </Grid>
                                </div>
                            ) : "0"}
                            <div className={classes.actionsContainer}>
                                <div>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className={classes.button}
                                    >
                                        Back
                  </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        className={classes.button}
                                    >
                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
                                </div>
                            </div>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} className={classes.resetContainer}>
                    <Typography>All steps completed - you&apos;re finished</Typography>
                    <Button onClick={handleReset} className={classes.button}>
                        Reset
          </Button>
                </Paper>
            )}
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
        </div>
    );
}
