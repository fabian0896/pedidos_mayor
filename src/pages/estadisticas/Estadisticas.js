import React, { Component, Fragment } from 'react';
import Header from '../../componets/headerLayout/HeaderLayout'
import StatsCardList from '../../componets/statsCard/StatsCardList'
import { Grid } from '@material-ui/core'
import StatsCard from '../../componets/statsCard/StatsCard'
import {
    AttachMoney as MoneyIcon,
    Widgets as WidgetsIcon,
    AccessibilityNew as AccessibilityNewIcon
} from '@material-ui/icons'
import { getYearStats, getMonthsOfYear } from '../../lib/statsService'
import moment from 'moment'
import YearSelector from './YearSelector';
import LineChart from './LineChart';

import Title from '../../componets/title/Title'
import PieChart from './PieChart';
import MonthCard from './MonthCard';




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






class Estadisticas extends Component {

    state = {
        year: null,
        disableNext: false,
        disablePrevius: false,
        months: {},
        limit: false
    }

    async componentDidMount() {

    }

    handleChangeYear = async (year) => {
        const [
            actualYear,
            previusYear,
            nextYear,
            months
        ] = await Promise.all([
            getYearStats(year),
            getYearStats(year + 1),
            getYearStats(year - 1),
            getMonthsOfYear(year)
        ])

        this.setState({
            year: actualYear,
            disableNext: !Boolean(nextYear),
            disablePrevius: !Boolean(previusYear),
            months,
            limit: (year === moment().year())
        })
        document.title = "Estadisticas | " + year
    }


    handleMonthClick = (month) => () => {
        this.props.history.push({
            pathname: `estadisticas/${month.year}/${month.month}`,
            state: month
        })
    }

    render() {

        const {
            year,
            disableNext,
            disablePrevius,
            months,
            limit
        } = this.state


        const productsPerOrder = year? (year.totalProducts/year.totalOrders).toFixed(0) : 0


        return (
            <div>
                <Header>
                    <YearSelector
                        disableNext={disableNext}
                        disablePrevius={disablePrevius}
                        getYear={this.handleChangeYear} />
                </Header>
                <Fragment>
                 
                        <StatsCardList style={{ marginBottom: 50 }}>
                            <StatsCard
                                icon={<WidgetsIcon />}
                                title="Pedidos Totales"
                                value={ year? (year.totalOrders || 0): 0}
                                secondary={`${months[moment().month()+1]? months[moment().month()+1].totalOrders : 'No hay datos'} este mes`}
                            />
                            <StatsCard
                                icon={<AccessibilityNewIcon />}
                                title="Prendas Totales"
                                value={year? (year.totalProducts || 0):0}
                                secondary={`${productsPerOrder} prendas por pedido`}
                            />
                            <StatsCard
                                icon={<MoneyIcon />}
                                title="Igresos COP"
                                value={`${year?(year.income.COP || 0):0}`}
                                secondary="Ingreso en Pesos"
                            />
                            <StatsCard
                                icon={<MoneyIcon />}
                                title="Ingresos USD"
                                value={`${year? (year.income.USD || 0):0}`}
                                secondary="ingresos en Dolares"
                            />
                        </StatsCardList>
            
                </Fragment>

                <Title
                    style={{ marginTop: 32 }}
                    align="left"
                    primary="Graficas"
                    secondary="valores mensuales del este año"
                />

                <Grid style={{ marginTop: 24 }} container spacing={24}>
                    <Grid item xs={12} md={6}>
                        <LineChart
                            title="PEDIDOS DEL AÑO"
                            label="Pedidos Realizados"
                            limit={limit}
                            type='totalOrders'
                            data={months} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <LineChart
                            title="PRENDAS DEL AÑO"
                            label="Prendas Vendidas"
                            limit={limit}
                            type='totalProducts'
                            data={months} />
                    </Grid>
                    <Grid item xs={12}>
                        <PieChart
                            title="PRENDAS MAS VENDIDAS"
                            type="products"
                            data={year}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <PieChart
                            title="TOP TALLAS"
                            type="sizes"
                            data={year}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <PieChart
                            title="PAISES CON MAS PEDIDOS"
                            type="countries"
                            data={year}
                        />
                    </Grid>
                </Grid>

                <Title
                    style={{ marginTop: 40 }}
                    align="center"
                    primary="Meses"
                    secondary="Informacion segmentada por meses"
                />

                <Grid style={{marginBottom: 40}} container spacing={24}>
                    {
                        Object.keys(MONTHS).map(id=>(
                            <Grid key={id} item xs={12} sm={4} md={3}>
                                <MonthCard
                                    handleMonthClick={this.handleMonthClick}
                                    monthName={MONTHS[id]} 
                                    month={months[id]} />
                            </Grid>
                        ))
                    }
                </Grid>

            </div>
        )
    }
}



export default Estadisticas;