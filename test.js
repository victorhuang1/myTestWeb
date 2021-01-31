const mongoose = require('mongoose')

const BlogPost = require('./models/BlogPost')

mongoose.connect('mongodb://localhost/my_database',{useNewUrlParser:true});

BlogPost.create({
    title:"The Mythinbsuter's guide to saft adfas",
    body:"If you hadve adsgadsgadsgadcvad ahdaldiiidas why there are so many cockroaches,If you hadve adsgadsgadsgadcvad ahdaldiiidas why there are so many cockroaches",
    image:"/img/timg.jpg"
},(error,blogpost)=>{
    console.log(error,blogpost)
}) 

