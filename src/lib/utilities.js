export function formatPhone(phone, callCode){
    if(phone.length > 10){
        const dif = phone.length - 10;
        const number = phone.substring(dif, phone.length);
        const code = phone.substring(0,  dif)
        return `+(${code.replace('+','')}) ${number}`
    } 
    
    return `+(${callCode}) ${phone}`
}

