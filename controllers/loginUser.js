const bcrypt = require('bcrypt')
const User = require('../models/User')

module.exports = (req, res) =>{
    const { username, password } = req.body;
    User.findOne({username:username}, (error,user) => {
        if (user){
            //console.log(user._id)
            //console.log(req.session)
            bcrypt.compare(password, user.password, (error,same) => {
                 if(same){
                     //console.log(same)
                     //console.log(req.session)
                     req.session.userId = user._id
                     res.redirect('/')
                 }
                 else{
                     res.redirect('/auth/login')
                 }
            })
        }
        else{
            res.redirect('/auth/login')
        }
    })
}