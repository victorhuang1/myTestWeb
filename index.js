const express = require('express')
/* const path = require('path') */
const app = new express
const ejs = require('ejs')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const flash = require('connect-flash')
app.use(flash());

/* const BlogPost = require('./models/BlogPost.js') */
const fileUpload  = require('express-fileupload')

const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')

const validateMiddleWare = require('./middleware/validationMiddleware')
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')


const newUserController = require('./controllers/newUser')
/* const validateMiddleWare = (req,res,next)=>{
    if(req.files == null||req.body.title == null){
        return res.redirect('/posts/new')
    }
    next();
} */
const expressSession = require('express-session');
app.use(expressSession({
    secret:'keyboard cat'
}))

const authMiddleware = require('./middleware/authMiddleware')
global.loggedIn = null
app.use("*", (req,res,next) => {
    loggedIn = req.session.userId;
    next()
})




const logOutController = require('./controllers/logout')
app.get('/auth/logout',logOutController)

app.use(fileUpload())
app.use('/posts/store',validateMiddleWare)
mongoose.connect('mongodb://localhost/my_database',{useNewUrlParser:true})
app.set('view engine','ejs')
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
/* app.get('/',async(req,res)=>{
    const blogposts = await BlogPost.find({})
    res.render('index',{
        blogposts:blogposts
    });
}) */
/* app.get('/about',(req,res)=>{
    res.render('about');
})
app.get('/contact',(req,res)=>{
    res.render('contact');
}) */
app.get('/',homeController)
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController)
/* app.get('/post',(req,res)=>{
    res.render('post');
}) */
/* app.get('/post/:id',async(req,res)=>{
    const blogpost = await BlogPost.findById(req.params.id)
    res.render('post',{blogpost});
    //console.log(req.params)
}) */
app.get('/post/:id',getPostController)
/* app.get('/posts/new',(req,res)=>{
    res.render('create');
}) */
const newPostController = require('./controllers/newPost')
app.get('/posts/new', authMiddleware, newPostController)

app.post('/posts/store', authMiddleware, storePostController)
/* app.post('/posts/store',async(req,res)=>{
    //console.log(req.body)
    let image = req.files.image;
    //console.log(image)
    image.mv(path.resolve(__dirname,'public/img',image.name),
    async(error)=>{
        await BlogPost.create(req.body)
        res.redirect('/')
    }) 
    
    image.mv(path.resolve(__dirname,'public/img',image.name),
    async(error)=>{
        await BlogPost.create({
            ...req.body,
            image:'/img/'+image.name
    })
    res.redirect('/')
})
        async(error)=>{
            await BlogPost.create({
                ...req.body,
                image:'/img/'+image.name
            })
            res.redirect('/')
        })   
    BlogPost.create(req.body,(error,blogpost)=>{
    res.redirect('/') 
    //await BlogPost.create(req.body)
    //res.redirect('/')
}) 
*/
const storeUserController = require('./controllers/storeUser')
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController)

const loginController = require('./controllers/login')
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController)

const loginUserController = require('./controllers/loginUser')
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController)

app.use((req,res) => res.render('404'))

app.listen(4000,function () {   
        console.log("App listening on port 4000")
    })

function newFunction() {
    alert('Pls do not leave blank')
}

