//const flash = require('connect-flash')

module.exports = (req,res) => {
    var username = ""
    var password = ""

    //console.log(req.flash('data'))
    //console.log(req.flash('data').length)
    //console.log(req.flash('data')[0])

    //console.log(req.flash('validationErrors'))

    const data = req.flash('data')[0];

    if(typeof data != 'undefined'){
        username = data.username
        password = data.password
    }

    res.render('register',{
        
        //errors: req.session.validationErrors
        errors:req.flash('validationErrors'),
        username: username,
        password: password
    })
    
    
}