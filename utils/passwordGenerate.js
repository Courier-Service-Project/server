const alpha ='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
const numbers = '0123456789'
const symbols = '!@#$%^&*()_+}{[]:;?><,./-='

const createPassword = (length,hasNumbers,hasSymbols) =>{
    let chars = alpha
    hasNumbers ? (chars += numbers) : ''
    hasSymbols ? (chars += symbols) : ''
    return generatedPassword(length,chars)
}

const generatedPassword = (length,char)=>{
    let password = ''
    for(i=0; i<length;i++){
        password += char.charAt(Math.floor(Math.random()* char.length))
    }
    return password
}

module.exports = createPassword