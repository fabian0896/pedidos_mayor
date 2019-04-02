import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper'
import {
    IconButton,
    InputBase,
    Divider,
    Fab
} from '@material-ui/core'

import {
    Search,
    Add
} from '@material-ui/icons'

const styles = theme => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        flex: 1
    },
    container:{
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        marginBottom: `${theme.spacing.unit * 5}px`
    },
    input: {
        marginLeft: 8,
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        width: 1,
        height: 28,
        margin: 4,
    },
    fab:{
        marginLeft: `${theme.spacing.unit * 3}px`
    },
    helper:{
        flex: 1
    }
})


class ClienteSearch extends Component {

    render() {
        const {
            classes,
            handleChangeInput,
            checkValue,
            textValue,
            handleChangeCheckbox,
            handleSubmit
        } = this.props

        return (
            <div className={classes.container}>
                <form className={classes.helper} onSubmit={handleSubmit}>
                            <Paper elevation={1} className={classes.root}>
                                <IconButton
                                    color="primary"
                                    className={classes.iconButton}
                                    >
                                <Search
                                    
                                    />
                                </IconButton>

                                <InputBase
                                    type="search"
                                    className={classes.input}
                                    placeholder="Busqueda..."
                                    onChange={handleChangeInput}
                                    value={textValue}
                                />
                                <Divider className={classes.divider} />
                                <FormGroup row>
                                    <FormControlLabel
                                        label="Solo mis pedidos"
                                        control={
                                            <Checkbox
                                                value="checkBox"
                                                checked={checkValue}
                                                onChange={handleChangeCheckbox}
                                            />
                                        }
                                    />
                                </FormGroup>
                            </Paper>
                </form>
                <Fab 
                    size="medium" 
                    className={classes.fab} 
                    color="secondary"
                    onClick={this.props.handleAddClient}>
                   <Add/>
                </Fab>                       
            </div>
        )
    }
}



export default withStyles(styles)(ClienteSearch);