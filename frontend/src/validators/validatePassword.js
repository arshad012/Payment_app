export const validatePassword = password => {    
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%&*])[A-Za-z\d@#$%&*]+$/
    const isPasswordValid = passwordRegex.test(password);
    return isPasswordValid;
}