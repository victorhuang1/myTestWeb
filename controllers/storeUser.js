const User = require('../models/User.js')
const path = require('path')
//const flash = require('connect-flash')

module.exports = (req,res) => {
    User.create(req.body,(error,user) => {
        //console.log(error)
        if(error){
            const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
            //req.session.validationErrors = validationErrors
            req.flash('validationErrors',validationErrors)
            req.flash('data',req.body)
            //console.log(error)
            // for (let i in error.errors){
            //     console.log(error.errors[i])
            // }
            //console.log(error.errors.password)
            //console.log(error._message)
            return res.redirect('/auth/register')
        }
        res.redirect('/')
    })
}