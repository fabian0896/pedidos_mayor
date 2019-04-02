import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import ClientDetailInfo from './ClientDetailInfo';
import { connect } from 'react-redux'
import { showBackButtom, hideBackButtom, showBackbuttonWithPath } from '../../../actions'
import ClientDetailHeader from './ClientDetailHeader';
import { getClientById } from '../../../lib/firebaseService'


const styles = theme => ({

    content: {
        position: 'relative',
        zIndex: 3,
        marginTop: '-80px'
    }
})

class ClientDetail extends Component {

    state = {
        loading: true,
        client: null
    }

    componentDidMount() {
        this.props.showBackButtom("/clientes")
        const { client, clientId } = this.props
        if (client) {
            this.setState({ loading: false, client })
        } else {
            this.getClient(clientId)
        }
    }


    getClient = async (id) => {
        const client = await getClientById(id).catch(err => console.log(err))
        this.setState({ loading: false, client })
        return
    }

    componentWillUnmount() {
        this.props.hideBackButtom()
    }


    handleEdit = (client) => () => {
        const from = this.props.location.pathname
        //const { clientId } = this.props
        this.props.history.push({
            pathname: '/clientes/nuevo',
            state: {
                from,
                clientId: client.id
            }
        })
    }


    render() {
        const { classes, sellers } = this.props
        const { loading, client } = this.state
        return (
            <div>
                {
                    (!client && !loading) &&
                    <div>
                        El Cliente no existe :(
                    </div>
                }
                {
                    (client && !loading) &&
                    <Fragment>
                        <ClientDetailHeader handleEdit={this.handleEdit(client)} client={client} />
                        <div className={classes.content}>
                            <ClientDetailInfo client={{...client, seller: sellers[client.seller]}} />
                        </div>
                    </Fragment>
                }
            </div>
        )
    }
}

const mapDispatchToProps = {
    showBackButtom,
    hideBackButtom,
    showBackbuttonWithPath: showBackbuttonWithPath('/clientes')
}

function mapStateToProps(state, props) {
    const id = props.match.params.id

    return {
        client: state.clients.all[id],
        clientId: id,
        sellers: state.sellers
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ClientDetail));