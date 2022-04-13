

export const findCurrencyColor = (value) => {
    try {
        const checkValue = parseFloat(value)
        if (checkValue > 0) {
            return "rgb(48, 190, 129)"
        } else if (checkValue < 0) {
            return "rgb(235, 65, 55)"
        } else {
            return "rgba(0, 0, 0, 0.6)"
        }
    }
    catch {
        return "rgba(0, 0, 0, 0.6)"
    }
}

export const handleNumber = (value) => {
    try {
        if (+value === 0) {
            return 0
        }
        if (!value) {
            return "-"
        }
        return parseFloat(parseFloat(value).toFixed(2)).toLocaleString();
    } catch {
        return value
    }
}