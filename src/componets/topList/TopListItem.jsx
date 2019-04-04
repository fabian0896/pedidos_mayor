import React, {Fragment} from 'react'
import { withStyles } from '@material-ui/core';
import { Paper, Typography, Divider, ListItem, List, ListItemText, ListItemIcon } from '@material-ui/core'
import { 
    LooksOneRounded,
    LooksTwoRounded,
    Looks3Rounded,
    Looks4Rounded,
    Looks5Rounded
 } from '@material-ui/icons'






const noInfostyles = theme => ({
    container: {
        width: '100%',
        height: '150px',
        display: ' flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
})

const styles1 = theme => ({
    topContainer: {
        padding: `${theme.spacing.unit * 3}px`
    },
    divider: {
        margin: `${theme.spacing.unit * 1}px 0`
    }
})

const numbers = [
    LooksOneRounded,
    LooksTwoRounded,
    Looks3Rounded,
    Looks4Rounded,
    Looks5Rounded
]

const MyListItem = ({primary, secondary, Icon, handleClick}) => (
    <ListItem onClick={handleClick} button>
    {   
        Icon &&
        <ListItemIcon>
            <Icon/>
        </ListItemIcon>
    }
        <ListItemText
            primary={primary}
            secondary={secondary}
        />
    </ListItem>
)




const NoInfo = withStyles(noInfostyles)(({classes})=>(
    <div className={classes.container}>
        <Typography align="center" component="span" variant="overline">No hay sufucientes datos :(</Typography>
    </div>
))



const TopListItem = withStyles(styles1)((props)=>{
    const {classes, title, withNumbers, data, handleClick} = props
    return(
        <Paper className={classes.topContainer}>
            <Typography component="span" variant="h6" >{title}</Typography>
            <Divider className={classes.divider} />
            {
                data.length ? 
                <Fragment>
                    <List>
                        {
                            data.map((element, index) =>(
                                <MyListItem
                                    handleClick={handleClick(element.id)} 
                                    key={element.id} 
                                    Icon={withNumbers && numbers[index]} 
                                    primary={element.primary} 
                                    secondary={element.secondary} />
                            ))
                        }    
                    </List>
                </Fragment>
                :
                <NoInfo/>
            }
        </Paper>
    )
})


export default TopListItem



