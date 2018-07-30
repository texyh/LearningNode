


module.exports = {
    registerHelpers(hbs) {
        hbs.registerHelper('getCurrentYear', () => {
            return new Date().getFullYear()
        })
        
        hbs.registerHelper('capIt', (text) => {
            return text.toUpperCase();
        })
    }
}