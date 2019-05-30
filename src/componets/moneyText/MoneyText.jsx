import React from 'react'
import NumberFormat from 'react-number-format';
import { Typography } from '@material-ui/core'

function MoneyText({children,currency ,...rest}){

    return(
        <NumberFormat 
         value={children}
         displayType="text"
         thousandSeparator={true}
         prefix={`${currency === 'COP'?'':(currency||'')}$`}
         renderText={value=><Typography {...rest}>{value}</Typography>} />
    )
}



export default MoneyText