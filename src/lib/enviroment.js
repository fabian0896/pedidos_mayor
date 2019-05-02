 export const SIZES = [
     {
         number: 28,
         letter: '2XS'
     },
     {
         number: 30,
         letter: 'XS'
     },
     {
         number: 32,
         letter: 'S'
     },
     {
         number: 34,
         letter: 'M'
     },
     {
         number: 36,
         letter: 'L'
     },
     {
         number: 38,
         letter: 'XL'
     },
     {
         number: 40,
         letter: '2XL'
     },
     {
         number: 42,
         letter: '3XL'
     },
     {
         number: 44,
         letter: '4XL'
     },
     {
         number: 46,
         letter: '5XL'
     },
     {
         number: 48,
         letter: '6XL'
     },
     {
         number: 50,
         letter: '7XL'
     },
     
 ]

 export const ORDER_STATUS = {
    pending: 'Pendiente',
    production: 'En Producción',
}



export const ShippingCompanies = {
    servientrega:{
        background: '#018833',
        color: '#FFF'
    },
    fedex:{
        background: '#4d148c',
        color: '#f60'
    },
    dhl:{
        background: '#ffcc03',
        color: '#d30710'
    },
    interrapidisimo:{
        background: '#060611',
        color: '#ee6902'
    },
    coordinadora:{
        background: '#0072BC',
        color: '#FFF'
    },
    copa:{
        background: '#2360a7',
        color: '#FFF'
    },
    envia:{
        background: '#da021a',
        color: '#FFF'
    },
    tcc:{
        background: '#fbda29',
        color: '#dc1e27'
    },
    default:{
        background: '#e0e0e0',
        color: '#323232'
    }
}

export function getShippingCompany(name){
    const _name = name.toLowerCase()
    return ShippingCompanies[_name]? ShippingCompanies[_name] : ShippingCompanies['default']
}