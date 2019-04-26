import React from 'react'
import {
    Paper, withStyles, Typography
} from '@material-ui/core'
import moment from 'moment'
import { compose } from 'redux'
import { connect } from 'react-redux'




const Item = withStyles(theme=>({
    item:{
        display: 'flex',
        '&:first-child $lineTop':{
            background: 'transparent',
    
        },
        '&:last-child $lineBottom':{
            background: 'transparent',
            
        },
        '&:hover $boll':{
            background: theme.palette.secondary.dark
        }
    },
    decorator:{
        paddingRight: theme.spacing.unit*1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    lineTop:{
        flex:1,
        width: 2,
        background: theme.palette.grey[400],
        marginBottom: '4px'
    },
    lineBottom:{
        flex:1,
        width: 2,
        background: theme.palette.grey[400],
        marginTop: '4px'
    },
    boll:{
        width: 30,
        height: 30,
        background: theme.palette.primary.dark,
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: theme.palette.primary.contrastText,
        boxShadow: theme.shadows[5],
        transition:'.3s'
    },
    messageContainer:{
        paddingTop: theme.spacing.unit*2,
        paddingLeft: theme.spacing.unit,
        paddingRight:  theme.spacing.unit,
        paddingBottom: theme.spacing.unit*2,
        display: 'flex',
        flex: 1,
        borderRadius: '5px',
        transition: '.3s',
        '&:hover':{
            background: theme.palette.grey[200],
            '&:before':{
                content: "''",
                position: 'absolute',
                width: 0,
                height: 0,
                borderLeft: '8px solid transparent',
                borderRight: `8px solid ${theme.palette.grey[200]}`,
                borderTop: '8px solid transparent',
                borderBottom: '8px solid transparent',
                left: -16,
                top: '50%',
                transform: 'translateY(-50%)',
            }
        },
        position: 'relative',
    },
    mainMessage:{
        flex: 1,
        paddingRight: theme.spacing.unit
    },
    secondaryMessage:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    subMessage:{
        lineHeight: '1em'
    }

}))(({classes, item, index, author})=>(
    <div className={classes.item}>
        <div className={classes.decorator}>
            <div className={classes.lineTop} />
            <div className={classes.boll}>
                <Typography style={{lineHeight: 1}} component="span" variant="subtitle2" color="inherit">{index + 1}</Typography>
            </div>
            <div className={classes.lineBottom} />
        </div>
        <div className={classes.messageContainer}>
            <div className={classes.mainMessage}>
                <Typography component="p" variant="body2">
                    {moment(item.date.seconds*1000).format('DD/MM/YYYY')}
                </Typography>
                <Typography component="p" variant="subtitle2" >
                    {item.title}
                </Typography>
                <Typography className={classes.subMessage} variant="body1">{item.message}</Typography>
                <Typography component="span" variant="overline" color="textSecondary">
                    {author.name}
                </Typography>
            </div>
            <div className={classes.secondaryMessage}>
                <Typography color="textSecondary" component="span" variant="body2">
                    {moment(item.date.seconds*1000).format('h:mm A')}
                </Typography>
            </div>
        </div>
    </div>
))




const styles = theme => ({
    root:{
        padding: `${theme.spacing.unit*3}px ${theme.spacing.unit*2}px`,
        marginTop: theme.spacing.unit*3,
        marginBottom: theme.spacing.unit*3,
    }
})


function TimeLine({classes, data, sellers}){

    return(
        <Paper className={classes.root}>
        <Typography component='h3' variant='h3' align="center" gutterBottom>Historial</Typography>
        <div>
        {
            data.map((item, index)=>{
                return <Item 
                            author={sellers[item.author]} 
                            item={item} 
                            index={index} 
                            key={index} />
            }) 
        }
        </div>
        </Paper>
    )
}


function mapStateToProps(state){
    return{
        sellers: state.sellers
    }
}


export default compose(
                    withStyles(styles),
                    connect(mapStateToProps)
                )(TimeLine)

