const path =require('path')
const express= require ('express')
const hbs = require ('hbs')
const geocode = require('./utils/geocode')
const forecast= require('./utils/forecast')

const app =express()
const port = process.env.PORT || 3000

//define paths for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath= path.join(__dirname,'../templates/partials')

//setup handelbars engine and views location
app.set('views',viewsPath)
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)

//Setup static derectory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res)=>{
    res.render('index',{
        title:'Weather',
        name:'Mandi Disha'
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title:'About me',
        name:'Mandi Disha'
    })
})

app.get('/help',(req, res)=>{
    res.render('help',{
        helpText:'Help Message',
        title:'help',
        name:'Mandi'
    })
})


app.get('/weather',(req, res) => {

    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                error:error
            })
        }
        forecast(latitude, longitude, (error, forecastData)=>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location: location,
                address:req.query.address
            })
       
        })
    })

    
})

app.get('/products', (req , res)=>{
    if(!req.query.search){
       return res.send({
            error:'You must provide search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req, res)=>{
    res.render('404', {
        title:'404',
        name:'Mandi Disha',
        errorMesagge:'Help article not found'
    })
})

app.get('*',(req, res)=>{
    res.render('404', {
        title:'404 help',
        name:'Mandi Disha',
        errorMesagge:'Page not found'
    })
})
//app.com
//app.com/help
//app.com/about

app.listen(port, ()=>{
    console.log('Server is up on port '+ port)
})