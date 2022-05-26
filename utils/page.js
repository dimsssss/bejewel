const getPageCount = (total, quantity) => {
    if (total <= quantity) {
        return 1
    }
    if (total % quantity === 0) {
        return total / quantity
    }
    return Math.floor(total / quantity) + 1;
}

const getPageStartLocation = (pageIndex, quantity) => {
    return (pageIndex - 1) * quantity
}

module.exports = {
    getPageCount,
    getPageStartLocation
}
