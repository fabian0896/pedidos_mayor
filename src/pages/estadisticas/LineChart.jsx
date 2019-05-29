import React, { useMemo } from 'react'
import { Line } from 'react-chartjs-2'
import { withStyles, Paper, Typography, Divider } from '@material-ui/core';
import moment from 'moment'

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

const LineChart = withStyles(theme => ({
    root: {
        padding: `${theme.spacing.unit*2}px ${theme.spacing.unit*1}px`
    },
    divider:{
        marginTop: theme.spacing.unit*2,
        marginBottom: theme.spacing.unit*2,
    }
}))(({ classes, data, type, limit, label, title }) => {

    const monthsList = useMemo(() => limit ? Object.keys(MONTHS).slice(0, moment().month() + 1) : Object.keys(MONTHS), [limit])

    const dataArray = useMemo(() => {
        return monthsList.map(monthNumber => {
            let number = 0
            if (data[monthNumber]) {
                number = data[monthNumber][type]
            }
            return number
        })
    }, [data])

    const labels = useMemo(() => {
        return monthsList.map(id => MONTHS[id])
    }, [monthsList])


    return (
        <Paper className={classes.root}>
            <div>
                <Typography align="center" variant="h4">{title}</Typography>
                <Divider className={classes.divider}/>
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
                    data={{
                        labels,
                        datasets: [
                            {
                                label,
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
                                data: dataArray
                            }
                        ]
                    }} />
            </div>
        </Paper>
    )
})



export default LineChart