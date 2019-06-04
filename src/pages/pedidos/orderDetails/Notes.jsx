import React, { useState, Fragment } from 'react'
import { withStyles, Paper, Typography, IconButton, TextField, CircularProgress } from '@material-ui/core'
import { Edit, Save, Close } from '@material-ui/icons';
import { updateOrdersNotes } from '../../../lib/firebaseService'

const Notes = withStyles(theme => ({
    root: {
        overflow: 'hidden',
        marginBottom: theme.spacing.unit * 3
    },
    header: {
        padding: theme.spacing.unit * 3,
        background: theme.palette.secondary.dark,
        color: theme.palette.secondary.contrastText,
        position: 'relative'
    },
    editButtom: {
        position: 'absolute',
        color: theme.palette.secondary.contrastText,
        right: theme.spacing.unit,
        top: '50%',
        transform: 'translateY(-50%)'
    },
    content: {
        padding: theme.spacing.unit * 3,
        minHeight: 150
    },
    buttonContainer: {
        display: 'flex',
        position: "absolute",
        right: 0
    },
    editContent:{
        padding: theme.spacing.unit * 2
    },
    loading:{
        position: 'absolute',
        right: theme.spacing.unit*3,
        top: theme.spacing.unit*3,
    },
    noContent:{
        height: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}))(({ classes, order, onUpdate }) => {
    const [edit, setEdit] = useState(false)
    const [note, setNote] = useState(()=>order.notes)
    const [loading, setLoading] = useState(false)


    const handleChange = (e) =>{
        const value = e.target.value
        setNote(value)
    }

    const handleSave = async () =>{
        setLoading(true)
        await updateOrdersNotes(order, note)
        setLoading(false)
        setEdit(false)
        onUpdate && onUpdate()
    }

    return (
        <Paper className={classes.root}>
            <div className={classes.header}>
                {
                    loading?
                    <CircularProgress className={classes.loading} color="inherit"/>
                    :
                    <Fragment>
                    {
                        !edit ?
                            <IconButton onClick={() => setEdit(true)} className={classes.editButtom}>
                                <Edit />
                            </IconButton>
                            :
                            <div className={classes.editButtom}>
                                <IconButton onClick={handleSave} color="inherit" >
                                    <Save />
                                </IconButton>
                                <IconButton onClick={() => setEdit(false)} color="inherit" >
                                    <Close />
                                </IconButton>
                            </div>
                    }
                    </Fragment>
                }
                <Typography variant="h4" color="inherit">Notas</Typography>
            </div>
            {
                !edit ?
                    <Fragment>
                        {
                            note?
                            <div className={classes.content}>
                                <Typography color="textSecondary" variant="subtitle1" >{note}</Typography>
                            </div>
                            :
                            <div className={classes.noContent}>
                                <Typography variant="overline" align="center">No hay notas para este pedido</Typography>
                            </div>
                        }
                    </Fragment>
                    :
                    <div className={classes.editContent}>
                        <TextField
                            disabled={loading}
                            value={note}
                            onChange={handleChange}
                            fullWidth
                            label="Nota"
                            multiline
                            rows="4"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"/>
                </div>
            }
        </Paper>
    )
            })
            
            
            
export default Notes