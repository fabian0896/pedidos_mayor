import React, { useMemo } from 'react'
import { withStyles, Paper, Typography } from '@material-ui/core'
import { randomFrase } from '../../lib/utilities'
import { FormatQuote as QuoteIcon } from '@material-ui/icons'


const Frases = withStyles(theme =>({
    root:{
        minHeight: 200,
        padding: `${theme.spacing.unit*3}px ${theme.spacing.unit*6}px`,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        marginBottom: theme.spacing.unit*4,
        '&:before':{
            content: "''",
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: 8,
            background: theme.palette.secondary.main
        },
        [theme.breakpoints.down('sm')]:{
            padding: `${theme.spacing.unit*3}px ${theme.spacing.unit*3}px`,
        }
    },
    icon:{
        transform: 'rotate(180deg)',
        fontSize: 200,
        position: 'absolute',
        color: 'rgba(0,0,0, 0.1)',
        left: theme.spacing.unit,
        top: -theme.spacing.unit*3
    }
}))(({classes})=>{
    const data = useMemo(()=>randomFrase(),[]) 
    return(
        <Paper className={classes.root}>
        <QuoteIcon className={classes.icon} />
            {
                data.message.map((text, index)=>(
                    <Typography 
                        variant="h5" 
                        align="center"
                        gutterBottom
                        key={index}>
                        {text}
                    </Typography>
                ))
            }
            <Typography variant="subtitle1" color="textSecondary">{data.author}</Typography>
        </Paper>
    )
})



export default Frases