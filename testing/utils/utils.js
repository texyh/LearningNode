module.exports.add = (a, b) => {
    return a + b;
}

module.exports.square = (x) => x*x;

module.exports.addAsync = (a, b, callBack) => {
    setTimeout(() => {
       callBack(a + b);
    }, 1000)
}