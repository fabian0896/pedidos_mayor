import React, { useEffect, useState, Fragment } from 'react'
import Header from '../../componets/headerLayout/HeaderLayout'
import { Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { getMonthStats } from '../../lib/statsService'
import NotFound from '../../componets/notFound/NotFound';
import StatsCard from '../../componets/statsCard/StatsCard'
import StatsCardList from '../../componets/statsCard/StatsCardList'
import {
    Widgets as WidgetsIcon,
    AccessibilityNew as AccessibilityNewIcon,
    AttachMoney as MoneyIcon
} from '@material-ui/icons'

import Title from '../../componets/title/Title'
import PieChart from './PieChart'
import { connect } from 'react-redux'
import { showBackButtom, hideBackButtom } from '../../actions'

import { monthReport } from '../../lib/jsReportService'

import { getAllSellers } from "../../lib/firebaseService"

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


const useLocation = (location, year, month) => {
    const [data, setData] = useState(null)
    const [err, setErr] = useState(true)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        if (location.state) {
            setData(location.state)
            setErr(false)
            setLoading(false)
        } else {
            getMonthStats(year, month).then(data => {
                setData(data)
                setErr(false)
                setLoading(false)
            }).catch(() => {
                setErr(true)
                setLoading(false)
            })
        }
    }, [year, month])
    return [data, loading, err]
}






function StatMonth({ match: { params: { year, month } }, location, showBackButtom, hideBackButtom, sellers }) {

    const [data, loading, error] = useLocation(location, year, month)
    const [loadingReport, setLoadingReport] = useState(false)
    const [seller, setSeller] = useState("")
    const [sellerList, setSellerList] = useState([])

    const productsPerOrder = data ? (data.totalProducts / data.totalOrders).toFixed(0) : 0

    useEffect(() => {
        getAllSellet()
        showBackButtom()
        document.title = `Estadisticas | ${MONTHS[month]}-${year} `
        return hideBackButtom
    }, [])

    const getAllSellet = async ()=>{
        const data = await getAllSellers(true)
        setSellerList(data)
    }


    const getReport = async () => {
        setLoadingReport(true)
        await monthReport(month, year, seller)
        setLoadingReport(false)
    }



    const handleChangeSeller = (e) => {
        setSeller(e.target.value)
    }


    return (
        <div>
            <Header>
                <Typography variant="h2" color="inherit">{`${year} ${MONTHS[month]}`}</Typography>
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
                                value={`${data.income ? (data.income.COP || 0) : 0}`}
                                secondary="Ingreso en Pesos"
                            />
                            <StatsCard
                                icon={<MoneyIcon />}
                                title="Ingresos USD"
                                value={`${data.income ? (data.income.USD || 0) : 0}`}
                                secondary="ingresos en Dolares"
                            />
                        </StatsCardList>

                        <Title
                            style={{ marginTop: 32 }}
                            align="left"
                            primary="Graficas"
                            secondary="valores de este mes"
                        />

                        <Grid style={{ marginTop: 24 }} container spacing={24}>
                            <Grid item xs={12}>
                                <PieChart
                                    title="PRENDAS MAS VENDIDAS"
                                    type="products"
                                    data={data}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <PieChart
                                    title="TOP TALLAS"
                                    type="sizes"
                                    data={data}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <PieChart
                                    title="PAISES CON MAS PEDIDOS"
                                    type="countries"
                                    data={data}
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <PieChart
                                    title="CLIENTES CON MAS PEDIDOS"
                                    type="clients"
                                    data={data}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <div>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel id="vendedor-id">Vendedor</InputLabel>
                                        <Select
                                            id="vendedor-id"
                                            value={seller}
                                            onChange={handleChangeSeller}
                                            label="Vendedor"
                                        >
                                            <MenuItem value="">
                                                <em>Todos</em>
                                            </MenuItem>
                                            {
                                                sellerList.map(seller =>(
                                                    <MenuItem key={seller.id} value={seller.id}>{seller.name}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                </div>
                            </Grid>

                            <Grid item xs={12}>
                                <div>
                                    <Button
                                        onClick={getReport}
                                        color="primary"
                                        fullWidth
                                        disabled={loadingReport}
                                        variant="contained">
                                        Descargar reporte del mes
                                    </Button>
                                </div>
                            </Grid>

                        </Grid>



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


const mapDispatchToProps = {
    hideBackButtom,
    showBackButtom
}



export default connect(null, mapDispatchToProps)(StatMonth)