import frases from './frases.json'
import {COLORS} from './enviroment'

export function formatPhone(phone, callCode){
    
    let phoneNumber = ""


    
    for(let letter of phone.replace(' ','')){
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
    if(!name){
        return ''
    }
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
        return text.charAt(0).toUpperCase() + text.substring(1).toLocaleLowerCase()
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


export function thousandSeparator(value, simbol=false){
    let negative = false
    let tempValue = parseInt(value)
    const afterPoint =  parseFloat(parseFloat(value-tempValue).toFixed(2))*100
    if(value<0){
        //valor negativo
        negative = true
        tempValue = tempValue * -1
    }
    const temp = tempValue.toString().split('').reverse()
    const withPionts = temp.map((val, index)=>{
        if((index+1)%3 === 0){
            if(index === (temp.length-1)){
                return val
            }
            return '.' + val
        }else{
            return val
        }
    })
    return  (negative? '-':'') + (simbol? '$' : '') + withPionts.reverse().join('') + ',' + afterPoint
} 


export const randomFrase = ()=>{
    const randomIndex = Math.floor(Math.random() * frases.length)
    return frases[randomIndex]
}



//-------------------- Internal functions --------------------

function randomNumber(min = 0, max = 255){
    return Math.floor((Math.random()*(max - min) + min));
}



// Funcion para formater las prendas y dejarlas listas para imprimir con el formato clasico


const getColorHex = (color = "")=>{
    const listOfWords = color.split(" ")
    
    const exactColor = Object.keys(COLORS).find(currColor =>{
        return listOfWords.some(word => word.toLowerCase().trim() === currColor)
    })

    return COLORS[exactColor] || 'black'
}


export function getFlagImageUrl(country) {
    if (country.flag) {
        return `https://flagcdn.com/${country.alpha2Code.toLowerCase()}.svg`;
    }
    return country.flags.svg;
}


export const formatProductForTable = (products=[]) => {
    const finalData = products.reduce((prev, curr) => {
      const index = compareProducts(prev, curr);
      if (index !== -1) {
        prev[index].sizes[curr.size] = parseInt(curr.quantity, 10);
        return prev;
      } else {
        return [
          ...prev,
          {
            id: curr.id,
            product: curr.product,
            reference: curr.reference,
            color: capitalize(curr.color),
            line: curr.line,
            colorHex: getColorHex(curr.color),
            mold: curr.mold,
            label: curr.label,
            labelName: curr.labelName || 'Personalizada',
            price: curr.price,
            name: curr.name,
            name_en: curr.name_en,
            details: curr.details || '',
            sizes: {
              [curr.size]: parseInt(curr.quantity, 10) 
            }
          }
        ];
      }
    }, []);
  
    const sizesTemp = finalData.reduce((prev, curr) => {
      const array = Object.keys(curr.sizes);
      return prev.concat(array).sort((a, b) => a - b);
    }, []);
  
    
    const arrayLength = ((parseInt(sizesTemp[sizesTemp.length - 1],10) - parseInt(sizesTemp[0],10))/2) + 1
  
    const sizesList = Array(arrayLength || 0).fill(0).reduce((prev, curr, idx) => {
      if (idx === 0) {
        return [parseInt(sizesTemp[0],10)];
      }
      return [...prev, prev[idx - 1] + 2];
    }, []);
  
    const data = finalData.map((product)=>{
      const temp = sizesList.reduce((prev, curr)=>{
          return[
            ...prev,
            product.sizes[curr] || 0
          ]
      },[])
  
      const quantity =  temp.reduce((prev, curr)=>{
        return prev + parseInt(curr,10)
      }, 0)
  
      return{
        ...product,
        sizesList: temp,
        quantity
      }
    })
  
    return [data, sizesList];
  };
  

  // modifiar para cuando sea procucción no se tome en cuenta el precio
   
  const compareProducts = (productList, product)=>{
    let i = -1
  
    productList.forEach((curr, index)=>{
        const currDetails = curr.details? curr.details : "";
        const productDetails = product.details? product.details : "";
        
        if(curr.reference !== product.reference){
          return 
        }
        if(curr.color.trim().toLocaleLowerCase() !== product.color.trim().toLocaleLowerCase()){
          return 
        }
        if(curr.mold !== product.mold){
          return 
        }
        if(curr.label !== product.label){
          return 
        }
        if(curr.price !== product.price){
            return 
        }  
        if(currDetails !== productDetails){
            return 
        }  
        i = index
        return
    })
    return i
  }
