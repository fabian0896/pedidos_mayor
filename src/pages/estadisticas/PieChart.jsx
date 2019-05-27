import React, { useMemo } from 'react'
import { withStyles, Paper, Typography, Divider } from '@material-ui/core';
import {Pie} from 'react-chartjs-2';
import { 
    cyan,
    lime,
    orange,
    purple,
    red
} from '@material-ui/core/colors'


const PieChart = withStyles(theme=>({
    root:{
        padding: theme.spacing.unit*2,
        height: '100%'
    },
    divider:{
        marginTop: theme.spacing.unit*2,
        marginBottom: theme.spacing.unit*2,
    },
    noData:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 250,
    }
}))(({classes, data, type, title})=>{
    
    const finalData = useMemo(()=>{
        const listObject = data? (data[type] || []) : []
    
        const listArray =  Object.keys(listObject).map(id => listObject[id])
        const sortList = listArray.sort((a,b)=>b.quantity - a.quantity)
    
        return sortList.reduce((prev, curr,index)=>{
            if(index > 3){
                prev.labels[4] = "Otras"
                prev.datasets[0].data[4] = (prev.datasets[0].data[4] || 0)  + curr.quantity
            }else{
                prev.labels[index] = curr.name
                prev.datasets[0].data[index] = curr.quantity
            }
            return prev
        },{
            labels:[],
            datasets:[{
                data:[],
                backgroundColor: [
                    cyan[600],
                    lime[600],
                    red[600],
                    purple[600],
                    orange[600],
                ],
                hoverBackgroundColor: [
                    cyan[800],
                    lime[800],
                    red[800],
                    purple[800],
                    orange[800],
                ]
            }]
        })
    }, [data])
    

    return(
        <Paper className={classes.root}>
            <div>
                <Typography align="center" variant="h4">{title}</Typography>
                <Divider className={classes.divider}/>
            </div>
            {
                !!finalData.labels.length ?
                <div>
                    <Pie
                        options={{maintainAspectRatio: false}}
                        width={320}
                        height={320}  
                        data={finalData} />
                </div>
                :
                <div className={classes.noData}>
                    <Typography align="center" variant="overline">No hay suficientes datos</Typography>
                </div>
            }
        </Paper>
    )
})



export default PieChart