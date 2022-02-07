const request = require("request")
const forecast= (latitude, longitude, callback) =>{
    const url ='http://api.weatherstack.com/current?access_key=ccde9bbb71f9617697a6341fc3808f56&query='+latitude +','+ longitude +'&units=f'

    request({url, json:true }, (error, {body}={})=>{
        if(error){
            callback('unable to connect to weather servecis', undefined)
        }else if (body.error){
            callback('unable to find cordinates Try another search', undefined)
        }else{
            callback(undefined ,body.current.weather_descriptions[0] + '. It currently is '+body.current.temperature + ' degrees out. It feels like '+ body.current.feelslike+ ' degrees out')
        }
        
    })
}

 module.exports= forecast