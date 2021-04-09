import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ListSubheader from '@material-ui/core/ListSubheader';

const bfd = require('blackboard-format-date')

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function HistoryList(props) {
    const { historyList } = props;
    const classes = useStyles();
    React.useEffect(() => {
        console.log(historyList[0]);
    })
    return (
        <List component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    {"History"}
                </ListSubheader>
            } className={classes.root}>
            {historyList.map((_lsit, i) => (
                <ListItem key={i}>
                    <ListItemAvatar>
                        <Avatar>
                            <VpnKeyIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={_lsit.password}
                        secondary={bfd.toFormat('yyyy-MM-dd hh:mm:ss.SSS', _lsit.created)}
                    />
                </ListItem>
            ))}

        </List>
    );
}
