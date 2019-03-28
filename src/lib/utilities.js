import color from "@material-ui/core/colors/red";

export function formatPhone(phone, callCode){
    if(phone.length > 10){
        const dif = phone.length - 10;
        const number = phone.substring(dif, phone.length);
        const code = phone.substring(0,  dif)
        return `+(${code.replace('+','')}) ${number}`
    } 
    
    return `+(${callCode}) ${phone}`
}



export function randomColor(max = 255, min = 0){
    const colorValues = Array(3).fill(0).map(color => {
        return randomNumber(max, min)
    });
    console.log(colorValues)
    return colorValues
}





function randomNumber(min = 0, max = 255){
    return Math.floor((Math.random()*(max - min) + min));
}