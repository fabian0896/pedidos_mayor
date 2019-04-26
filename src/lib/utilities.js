


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
    if(names.length > 2){
        return `${names[0]} ${names[2] || ''}`
    }else{
        return name
    }
}


export function capitalize(text=""){
    if(typeof text === 'string'){
        return text.charAt(0).toUpperCase() + text.substring(1)
    }
    return ''
}

 

export function incrementSerial({letter, number}){
    const INITIAL_NUMBER = 0
    const MAX_NUMBER = 999
    const INITIAL_LETTER = 65
    const MAX_LETTER = 90


    let serialNumber = parseInt(number)
    let serialLetter = letter
    
    //le inclremento al numero
    serialNumber += 1


    //Verifico que el numero no haga overflow (mas de 999)
    if(serialNumber > MAX_NUMBER){
        //el numero hizo overflow, hay que aumentar las letras y reiniciar el numero 
        serialNumber = INITIAL_NUMBER

        const asciiCode = serialLetter.split('').map(item => item.charCodeAt(0))    
        
        let superOverflow = false
        for(let i in asciiCode){
            if(asciiCode[i]+1 > MAX_LETTER){
                if(parseInt(i) === (asciiCode.length-1)){
                    superOverflow = true
                    console.log('entre')
                }
                asciiCode[i] = INITIAL_LETTER
            }else{
                asciiCode[i]+= 1
                break;
            }
        }
        if(superOverflow){
            asciiCode.push(INITIAL_LETTER)
        }    
        const lettersResult = asciiCode.map(code => String.fromCharCode(code)).join('')
        return {letter: lettersResult, number: formatSerialNumber(serialNumber)}     
    }else{
        return {letter: serialLetter, number: formatSerialNumber(serialNumber)}
    }
}

function formatSerialNumber(number, digits=3){
    const letters = '000' + number
    const lettersArray = letters.split('').reverse().join('')
    const result = lettersArray.substring(0,digits).split('').reverse().join('')
    return result
}



export function isTheArrayEqual(oldArray, newArray, atrr){
    if(oldArray.length !== newArray.length){
        return false
    }
    oldArray.forEach(parentObject=>{
        const index = newArray.findIndex(childObject=> compareObjects(
                parentObject, 
                childObject, 
                atrr
        ))
        if(index >= 0){
            newArray.splice(index,1)
        }
    })
    return newArray.length? false : true
}

export function compareObjects(obj1, obj2, keysArray){  
    const keys = keysArray || Object.keys(obj1)
    const comparation = keys.map(key=>{
        return obj1[key] === obj2[key]
    })
    return comparation.reduce((previus, current)=>{
        return previus && current
    })
}

//-------------------- Internal functions --------------------

function randomNumber(min = 0, max = 255){
    return Math.floor((Math.random()*(max - min) + min));
}