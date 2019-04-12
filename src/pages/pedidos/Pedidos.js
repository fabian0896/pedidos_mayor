import React, { Component } from 'react';
import {
    Typography,
    Grid
} from '@material-ui/core'
import HeaderLayout from '../../componets/headerLayout/HeaderLayout'
import StatsCard from '../../componets/statsCard/StatsCard';
import {
    Widgets as WidgetsIcon,
    Event as EventIcon,
    AssignmentLate as AssignmentLateIcon,
    AccessibilityNew as AccessibilityNewIcon
} from '@material-ui/icons'
import StatsCardList from '../../componets/statsCard/StatsCardList';



class Pedidos extends Component {
    render() {
        return (
            <div>
                <HeaderLayout>
                </HeaderLayout>
                <Grid container spacing={24}>
                    <Grid item md={9}>

                    </Grid>
                    <Grid item md={3}>
                        <StatsCardList>
                            <StatsCard
                                icon={<AssignmentLateIcon />}
                                title="Pedidos Pendientes"
                                value="10"
                            />
                            <StatsCard
                                icon={<WidgetsIcon />}
                                title="Pedidos Totales"
                                value="139"
                            />
                            <StatsCard
                                icon={<EventIcon />}
                                title="Pedidos De Este Mes"
                                value="34"
                            />
                            <StatsCard
                                icon={<AccessibilityNewIcon />}
                                title="Total Prendas"
                                value="4093"
                            />
                        </StatsCardList>

                    </Grid>
                </Grid>

            </div>
        )
    }
}



export default Pedidos;