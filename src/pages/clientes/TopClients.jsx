import React, {Fragment} from 'react'
import { withStyles } from '@material-ui/core';
import { Grid, Paper, Typography, Divider, ListItem, List, ListItemText, ListItemIcon } from '@material-ui/core'
import { 
    LooksOneRounded,
    LooksTwoRounded,
    Looks3Rounded,
    Looks4Rounded,
    Looks5Rounded
 } from '@material-ui/icons'




const styles = theme => ({
    topContainer: {
        padding: `${theme.spacing.unit * 3}px`
    },
    divider: {
        margin: `${theme.spacing.unit * 1}px 0`
    }
})

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

const CLientItem = ({name, country, Icon, handleClick}) => (
    <ListItem onClick={handleClick} button>
    {   
        Icon &&
        <ListItemIcon>
            <Icon/>
        </ListItemIcon>
    }
        <ListItemText
            primary={name}
            secondary={country}
        />
    </ListItem>
)




const NoInfo = withStyles(noInfostyles)(({classes})=>(
    <div className={classes.container}>
        <Typography align="center" component="span" variant="overline">No hay sufucientes datos :(</Typography>
    </div>
))



const ListClient = withStyles(styles1)((props)=>{
    const {classes, title, withNumbers, data, handleClick} = props
    const formatData = data.map(client =>{
        return{
            ...client,
            country: client.country.translations.es || client.country.name
        }
    })
    return(
        <Paper className={classes.topContainer}>
            <Typography component="span" variant="h6" >{title}</Typography>
            <Divider className={classes.divider} />
            {
                data.length ? 
                <Fragment>
                    <List>
                        {
                            formatData.map((client, index) =>(
                                <CLientItem
                                    handleClick={handleClick(client.id)} 
                                    key={client.id} 
                                    Icon={withNumbers && numbers[index]} 
                                    name={client.name} 
                                    country={client.country} />
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


const ListContainer = ({children}) =>{
    const newChildren = React.Children.map(children, element =>{
        return(
            <Grid item sm={6} xs={12} md={12}>
                {element}
            </Grid> 
        ) 
    })
    return(
        <Grid container spacing={24}>
            {newChildren}
        </Grid>
    )
}


// ------------------------------------------------------------



function TopClients(props) {
    const { recent,top, handleClick } = props
    const recentList = Object.keys(recent).map(id => recent[id])
    const topList = Object.keys(top).map(id => top[id])
    return (
        <ListContainer>
            <ListClient 
                handleClick={handleClick} 
                data={topList} 
                withNumbers 
                title="Top Clientes" />
            
            <ListClient 
                handleClick={handleClick} 
                data={recentList}  
                title="Agregados Recientemente" />
        </ListContainer>
    )
}

export default withStyles(styles)(TopClients)