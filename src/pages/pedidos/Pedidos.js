import React, { Component } from 'react';
import {
    Typography,
    Grid,
    Divider
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
import OrderResume from '../../componets/orderResume/OrderResume';
import SearchBar from '../../componets/searchBar/SearchBar';
import OrederGrid from '../../componets/orderResume/OrderGrid';
import Section from '../../componets/section/Section';
import OrderSlideList from '../../componets/orderResume/OrderSlideList';



class Pedidos extends Component {
    render() {
        return (
            <div style={{width: '100%'}}>
                <HeaderLayout>
                    <SearchBar />
                </HeaderLayout>

                
                <StatsCardList style={{marginBottom: 50}}>
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
                        title="Este Mes"
                        value="34"
                    />
                    <StatsCard
                        icon={<AccessibilityNewIcon />}
                        title="Total Prendas"
                        value="4093"
                    />
                </StatsCardList>
                

               
                    <OrderSlideList title="Pedidos Pendientes">
                        <OrderResume width={300}/>
                        <OrderResume width={300}/>
                        <OrderResume width={300}/>
                        <OrderResume width={300}/>
                        <OrderResume width={300}/>
                        <OrderResume width={300}/>
                        <OrderResume width={300}/>
                    </OrderSlideList> 
       

                <OrederGrid title="Pedidos">
                    <OrderResume/>
                    <OrderResume/>
                    <OrderResume/>
                    <OrderResume/>
                    <OrderResume/>
                    <OrderResume/>
                    <OrderResume/>
                    <OrderResume/>
                    <OrderResume/>
                    <OrderResume/>
                </OrederGrid>
        
            
            </div>
        )
    }
}



export default Pedidos;