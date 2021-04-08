import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
// import DirectionsIcon from '@material-ui/icons/Directions';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        // width: 400,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));

export default function SearchBar(props) {
    const classes = useStyles();

    return (
        <Paper component="div" className={classes.root}>

            <InputBase
                value={props.input}
                onChange={(e) => props.onChange(e.target.value)}
                className={classes.input}
                placeholder="Search"
                inputProps={{ 'aria-label': 'search' }}
            />
            <Divider className={classes.divider} orientation="vertical" />
            <IconButton  className={classes.iconButton} aria-label="search">
                <SearchIcon />
            </IconButton>

        </Paper>
    );
}
