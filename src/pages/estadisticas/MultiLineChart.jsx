import React  from 'react'
import { Line } from 'react-chartjs-2'
import { withStyles, Paper, Typography, Divider } from '@material-ui/core';
import { 
    cyan,
    lime,
    orange,
    purple,
    red
} from '@material-ui/core/colors'

const MONTHS = {
    1: 'ENE',
    2: 'FEB',
    3: 'MAR',
    4: 'ABR',
    5: 'MAY',
    6: 'JUN',
    7: 'JUL',
    8: 'AGO',
    9: 'SEP',
    10: 'OCT',
    11: 'NOV',
    12: 'DIC'
}

const defatultOptions = {
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
}



const colors =[
    cyan[700],
    lime[700],
    orange[700],
    purple[700],
    red[700],
]

function getRandomColor(){
    const index = Math.floor(Math.random() * colors.length)
    const actualColor = colors[index]
    return actualColor
}



const MultiLineChart = withStyles(theme => ({
    root: {
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 1}px`
    },
    divider: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
    }
}))(({ classes, data, type, limit, label, title }) => {
    
    const listData = Object.keys(data).reduce((prev,curr)=>{
        prev[curr] = data[curr].income
        return prev
    },{})

    const datasets = Object.keys(MONTHS).reduce((prev, curr, index) => {
        label.forEach((label, labelIndex)=>{
            if(!prev.datasets[labelIndex]){
                const color = getRandomColor()
                prev.datasets[labelIndex] = {
                    ...defatultOptions, 
                    label: label,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: `${color}`,
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                }
                prev.datasets[labelIndex].data = [listData[curr]? listData[curr][label]:0]
            }else{
                prev.datasets[labelIndex].data.push(listData[curr]? listData[curr][label]:0)
            }
        })
        
        return prev
    }, {
        labels: Object.keys(MONTHS).map(id=>MONTHS[id]),
        datasets: []
    })

    return (
        <Paper className={classes.root}>
            <div>
                <Typography align="center" variant="h4">{title}</Typography>
                <Divider className={classes.divider} />
            </div>
           <div>
                <Line
                    height={280}
                    options={{
                        maintainAspectRatio: false,
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }}
                    data={datasets}/>
            </div> 
        </Paper>
    )
})



export default MultiLineChart