import React, { Component, Fragment } from 'react';
import Header from '../../componets/headerLayout/HeaderLayout'
import StatsCardList from '../../componets/statsCard/StatsCardList'
import { Typography } from '@material-ui/core'
import StatsCard from '../../componets/statsCard/StatsCard'
import {
    AttachMoney as MoneyIcon,
    Widgets as WidgetsIcon,
    AccessibilityNew as AccessibilityNewIcon
} from '@material-ui/icons'
import { getYearStats } from '../../lib/statsService'
import moment from 'moment'
import YearSelector from './YearSelector';

class Estadisticas extends Component {

    state = {
        year: null,
        disableNext: false,
        disablePrevius: false
    }

    async componentDidMount() {
        const year = moment().year()

    }

    handleChangeYear = async (year) => {
        console.log(year)
        const actualYear = await getYearStats(year)
        const previusYear = await getYearStats(year+1)
        const nextYear = await getYearStats(year-1)
        this.setState({ 
            year: actualYear, 
            disableNext: !Boolean(nextYear),
            disablePrevius: !Boolean(previusYear) 
        })
    }

    render() {

        const { 
            year,
            disableNext,
            disablePrevius
        } = this.state

        return (
            <div>
                <Header>
                    <YearSelector
                        disableNext={disableNext}
                        disablePrevius={disablePrevius} 
                        getYear={this.handleChangeYear} />
                </Header>
                <Fragment>
                    {
                        year &&
                        <StatsCardList style={{ marginBottom: 50 }}>
                            <StatsCard
                                icon={<WidgetsIcon />}
                                title="Pedidos Totales"
                                value={year.totalOrders}
                                secondary="Año 2019"
                            />
                            <StatsCard
                                icon={<AccessibilityNewIcon />}
                                title="Prendas Totales"
                                value={year.totalProducts}
                                secondary="Año 2019"
                            />
                            <StatsCard
                                icon={<MoneyIcon />}
                                title="Igresos COP"
                                value={`${year.income.COP}`}
                                secondary="Ingreso en Pesos"
                            />
                            <StatsCard
                                icon={<MoneyIcon />}
                                title="Ingresos USD"
                                value={`${year.income.USD}`}
                                secondary="ingresos en Dolares"
                            />
                        </StatsCardList>
                    }
                </Fragment>
            </div>
        )
    }
}



export default Estadisticas;