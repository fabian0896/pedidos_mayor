import React from 'react'
import { withStyles } from '@material-ui/core';
import { Grid, Paper, Typography, Divider, ListItem, List, ListItemText, ListItemIcon } from '@material-ui/core'
import { LooksOneRounded } from '@material-ui/icons'

const styles = theme =>({
    topContainer:{
        padding: `${theme.spacing.unit * 3}px`
    },
    divider:{
        margin: `${theme.spacing.unit * 1}px 0`
    }
})


function TopClients(props) {
    const {classes } = props
    return (
        <Paper className={classes.topContainer}>
            <Typography component="span" variant="h6" >Top Clientes</Typography>
            <Divider className={classes.divider} />
            <List>
                <ListItem>
                    <ListItemIcon>
                        <LooksOneRounded />
                    </ListItemIcon>
                    <ListItemText
                        primary="Leidy Lozada"
                        secondary="Colombia"
                    />
                </ListItem>
            </List>
        </Paper>
    )
}

export default withStyles(styles)(TopClients)