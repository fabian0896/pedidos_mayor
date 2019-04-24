import React from 'react'
import {
    withStyles,
    Paper,
    Typography,
    Button,
    Collapse,
    List,
    ListItem,
    ListItemText
} from '@material-ui/core';





const stylesShippingData = theme => ({
    infoItem: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing.unit,
        '& :nth-child(1)': {
            flex: 1
        }
    },
    icon: {
        fontSize: '18px'
    }
})


let ShippingData = ({ classes, title, value, selected }) => (
    <ListItem selected={selected}>
        <ListItemText
            primary={value}
            secondary={title}
        />
    </ListItem>
)

ShippingData = withStyles(stylesShippingData)(ShippingData)







const styles = theme => ({
    root: {
        overflow: 'hidden',
        marginBottom: theme.spacing.unit * 2
    },
    header: {
        padding: theme.spacing.unit*2,
        background: theme.palette.secondary.dark,
        color: theme.palette.secondary.contrastText,
        marginBottom: theme.spacing.unit,
    },
    content:{
        //padding: theme.spacing.unit * 2,
    },
    divider: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2
    },
    actions: {
        padding: theme.spacing.unit*2,
        marginTop: theme.spacing.unit * 2,
        display: 'flex',
        justifyContent: 'flex-end'
    }
})










class ShippingInfoCard extends React.Component {

    state = {
        showMore: false
    }

    toggleShowMore = () => {
        this.setState(({ showMore }) => ({
            showMore: !showMore
        }))
    }

    render() {
        const { classes, data } = this.props
        const { showMore } = this.state

        return (
            <Paper className={classes.root}>
                <div className={classes.header}>
                    <Typography color="inherit" align="center" component="h6" variant="h6">INFORMACION DEL ENVIO</Typography>
                </div>
                <div className={classes.content}>
                    <List>
                        <ShippingData
                            title="Nombre"
                            value={data.name} />
                        <ShippingData    
                            title="Ciudad"
                            value={data.city}/>
                        <ShippingData
                            title="Pais"
                            value={data.country} />
                        <ShippingData
                            title="Telefono"
                            value={data.phone} />
                        <Collapse in={showMore}>
                            <ShippingData
                                title="Dirección"
                                value={data.address} />
                            <ShippingData
                                title="Codigo Postal"
                                value={data.zipCode} />
                            <ShippingData
                                title="correo"
                                value={data.email} />
                        </Collapse>
                    </List>
                </div>
                <div className={classes.actions}>
                    <Button
                        size="small"
                        onClick={this.toggleShowMore}
                    >
                        {showMore ? 'mostrar menos' : 'mostrar mas'}
                    </Button>
                    <Button
                        color="primary"
                        size="small"
                    >
                        agregar Envio
                    </Button>
                </div>


            </Paper>
        )
    }
}



export default withStyles(styles)(ShippingInfoCard)