import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button'
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';

const styles = theme =>({
    input:{
        width: '100%'
    },
    container:{
        display: 'flex',
        alignItems: 'center'
    }
})


class ClienteSearch extends Component{
        
    render(){
        const { 
            classes, 
            handleChangeInput, 
            checkValue, 
            textValue,
            handleChangeCheckbox,
            handleSubmit
         } = this.props
        
        return(
            <form onSubmit={ handleSubmit }>
                <Grid container spacing={24}>
                    <Grid item sm={6}>
                        <TextField
                            onChange={ handleChangeInput }
                            value={ textValue } 
                            variant="outlined"
                            margin="normal"
                            label="Buscar"
                            type="search"
                            className={ classes.input }
                        />
                    </Grid>
                    <Grid className={ classes.container } item sm={6}>
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
                   
                        <Button
                            color="primary"
                            variant="contained"
                            size="large"
                            type="submit"
                        >
                            Buscar
                        </Button>
                    </Grid>
                </Grid>
            </form>
        )
    }
}



export default withStyles(styles)(ClienteSearch);