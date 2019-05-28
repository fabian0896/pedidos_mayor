import React, { useEffect, useState, Fragment } from 'react'
import Header from '../../componets/headerLayout/HeaderLayout'
import { Typography } from '@material-ui/core';
import { getMonthStats } from '../../lib/statsService'
import NotFound from '../../componets/notFound/NotFound';
import StatsCard from '../../componets/statsCard/StatsCard'
import StatsCardList from '../../componets/statsCard/StatsCardList'
import { 
    Widgets as WidgetsIcon,
    AccessibilityNew as AccessibilityNewIcon,
    AttachMoney as MoneyIcon
} from '@material-ui/icons'

const MONTHS = {
    1: 'ENERO',
    2: 'FEBRERO',
    3: 'MARZO',
    4: 'ABRIL',
    5: 'MAYO',
    6: 'JUNIO',
    7: 'JULIO',
    8: 'AGOSTO',
    9: 'SEPTIEMBRE',
    10: 'OCTUBRE',
    11: 'NOVIEMBRE',
    12: 'DICIEMBRE'
}


const useLocation = (location, year, month)=>{
    const [data, setData] = useState(null)
    const [err, setErr] = useState(true)
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        if(location.state){
            setData(location.state)
            setErr(false)
            setLoading(false)
        }else{
            getMonthStats(year,month).then(data=>{
                setData(data)
                setErr(false)
                setLoading(false)
            }).catch(()=>{
                setErr(true)
                setLoading(false)
            })
        }
    },[year, month])
    return [data, loading, err]
}


function StatMonth({match:{params:{year, month}}, location}){

    const [data, loading, error] = useLocation(location, year, month)

    const productsPerOrder = data? (data.totalProducts/data.totalOrders).toFixed(0) : 0    
    

    return(
        <div>
            <Header>
                <Typography  variant="h2" color="inherit">{`${year} ${MONTHS[month]}`}</Typography>
            </Header>
            {
                !error ?
                <Fragment>
                    <StatsCardList style={{ marginBottom: 50 }}>
                            <StatsCard
                                icon={<WidgetsIcon />}
                                title="Pedidos Totales"
                                value={data.totalOrders}
                                secondary={`este mes!`}
                            />
                            <StatsCard
                                icon={<AccessibilityNewIcon />}
                                title="Prendas Totales"
                                value={data.totalProducts}
                                secondary={`${productsPerOrder} prendas por pedido`}
                            />
                            <StatsCard
                                icon={<MoneyIcon />}
                                title="Igresos COP"
                                value={`${data.income.COP}`}
                                secondary="Ingreso en Pesos"
                            />
                            <StatsCard
                                icon={<MoneyIcon />}
                                title="Ingresos USD"
                                value={`${data.income.USD}`}
                                secondary="ingresos en Dolares"
                            />
                        </StatsCardList>
                </Fragment>
                :
                <Fragment>
                    {
                        !loading &&
                        <NotFound
                            title="No se encuentran datos!"
                            message="No hay estadisticas disponibles para esta fecha :("
                        />
                    }
                </Fragment>
            }
        </div>
    )
}



export default StatMonth