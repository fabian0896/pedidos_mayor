import React from 'react'
import { withStyles, Paper, Typography } from '@material-ui/core';
import SearchSvg from '../../assets/search.svg'

const NotFound = withStyles(theme => ({
    paper:{
        marginBottom: theme.spacing.unit*3,
        height: 250,
        display: 'flex',
        justifyContent: 'space-between',
        padding: `${theme.spacing.unit*3}px ${theme.spacing.unit*5}px`,
        [theme.breakpoints.down('sm')]:{
            flexDirection: 'column',
            padding: `${theme.spacing.unit*2}px ${theme.spacing.unit*2}px`
        }
    },
    grid:{
        marginBottom: theme.spacing.unit*3,
    },
    svg:{
        width: 100,
        color: theme.palette.text.secondary,
        paddingLeft: theme.spacing.unit*2,
        [theme.breakpoints.down('sm')]:{
            width: 100,
        }
    },
    textContainer:{
        maxWidth: 350,
        display: 'block',
        [theme.breakpoints.down('sm')]:{
            width: '100%',
            overflow: 'hidden'
        }
    }
}))(({ classes, title, message }) => (
    <Paper className={classes.paper}>
        <div className={classes.textContainer}>
            <Typography component="p" color="textSecondary" gutterBottom variant="h4">{title}</Typography>
            <Typography color="textSecondary" variant="body1">
                {message}
            </Typography>
        </div>
        <img className={classes.svg} src={SearchSvg} alt="search" />
    </Paper>
))


export default NotFound