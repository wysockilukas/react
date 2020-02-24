


export const   checkValidity = (value, rules) => {
        if (Object.keys(rules).length === 0) return true;
        let isValid = false
        if (rules.required) {
           isValid = (value.trim() !=='') 
        }
        if (rules.minLenght) {
            isValid = (value.length >=rules.minLenght)
        }
        return isValid;
    }
    