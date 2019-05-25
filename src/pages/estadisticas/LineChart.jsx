import React from 'react'
import { Line } from 'react-chartjs-2'
import { withStyles, Paper } from '@material-ui/core';


const data = {
    labels: ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'],
    datasets: [
      {
        label: 'My First dataset',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 100, 56, 55, 40, 56, 55]
      }
    ]
  };


const LineChart = withStyles(theme => ({
    root:{
        padding: theme.spacing.unit
    }
}))(({classes})=>{
    




    return(
        <Paper className={classes.root}>
            <Line
                options={{
                    scales:{
                        yAxes:[{
                            ticks:{
                                beginAtZero: true
                            }
                        }]
                    }
                }} 
                data={data}/>
        </Paper>
    )
})



export default LineChart