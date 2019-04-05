


export function formatPhone(phone, callCode){
    
    let phoneNumber = ""
    
    for(let letter of phone){
        if(!isNaN(letter)){
            phoneNumber += letter
        }
    }
    if(phoneNumber.length > 10){
        const dif = phoneNumber.length - 10;
        const number = phoneNumber.substring(dif, phoneNumber.length);
        const code = phoneNumber.substring(0,  dif)
        return `+(${code.replace(' ','')}) ${number}`
    } 
    
    return `+(${callCode}) ${phoneNumber}`
}



export function randomColor(max = 255, min = 0){
    const colorValues = Array(3).fill(0).map(color => {
        return randomNumber(max, min)
    });
    return colorValues
}


export function getNameLetters(name){
    const names = name.split(' ')
    if(names.length > 1){
        return names[0].charAt(0).toUpperCase() + names[1].charAt(0).toUpperCase()
    }else{
        return name.charAt(0).toUpperCase() + name.charAt(1).toUpperCase()
    }
}


export function limitName(name){
    const names = name.split(' ')
    return `${names[0]} ${names[1] || ''}`
}


 



//-------------------- Internal functions --------------------

function randomNumber(min = 0, max = 255){
    return Math.floor((Math.random()*(max - min) + min));
}