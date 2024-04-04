const eventModel = require(`../models/index`).event
const Op = require(`sequelize`).Op
const path = require(`path`)
const fs = require(`fs`) //digunakan untuk meload library path and filestream
const { error } = require("console")

//ini merupakan function yang digunakan untuk melihat semua data
exports.getAllEvent = async (req,res)=> {
    let event = await eventModel.findAll()
    return res.json({
        success:true,
        data:event,
        message:`tampil all data event`
    })
}

//function yang digunakan untuk mencari data berdasarkan keyword 
exports.findEvent = async (req,res) => {
    let keyword = req.params.key
    let events = await eventModel.findAll({
        where:{
            [Op.or]:[
                {eventName:{[Op.substring]:keyword}},
                {eventDate:{[Op.substring]:keyword}},
                {vanue:{[Op.substring]:keyword}},
                {price:{[Op.substring]:keyword}}
            ]
        }
    })
    return res.json({
        success:true,
        data:events,
        message:`berhasil menampilkan data sesuai yg anda cari`
    })
}

//digunakan untuk memuat file image
const upload = require (`./upload-image`).single(`image`) 

//fuction yang digunakan untuk menambahkan event 
exports.addEvent = (req,res)=>{
    upload(req,res, async error =>{
        if(error){
            return res.json({message:error})
        }
        if (!require.file){
            return res.json({message:`Nothing to upload`})
        }
        //syarat untuk menambahkan event
        let newEvent ={
            eventName: req.body.eventName,
            eventDate: req.body.eventDate,
            venue: req.body.vanue,
            price: req.body.price,
            image: req.file.filename
            
        }
        //menginsert(menambahkan data ke table event)
        eventModel.crete(newEvent)
        .then(result => {
            return res.json({
                success:true,
                data:result,
                message:`data berhasil ditambahkan`
            })
        })
        .catch(error =>{
            return res.json({
                success:false,
                message:error.message
            })
        })
    })
}

//function yang digunakan untuk mengupdate data event
exports.updateEvent= async(req,res) =>{
    upload(req,res,async error =>{
        //percabangan jika kondisi error 
        if(error){
            return res.json({message:error})
        }
        let eventID =req.params.id
        let dataEvent ={
            eventName: req.body.eventName,
            eventDate: req.body.eventDate,
            vanue: req.body.vanue,
            price: req.body.price
        }

        if(req.file){
            const selectEvent = await eventModel.findOne({
                where:{eventID:eventID}
            })
            const oldImage = selectEvent.image
            const pathImage =path.join(__dirname,`../image`,oldImage)
            if(fs.existsSync(pathImage)){
                fs.unlink(pathImage, error => console.log(error))
            }
            dataEvent.image =req.file.filename
        }
        //insert update data to table event
        eventModel.update(dataEvent,{where:{eventID:eventID}})
        .then(result =>{
            return res.json({
                success:true,
                message:`Data event berhasil diupdate`
            })
        })
        .catch(error=>{
            return res.json({
                success:false,
                message:error.message
            })
        })

    })
}

//fuction delete event 
exports.deleteEvent = async(req,res) =>{
    const eventID = req.params.id
    const event = await eventModel.findOne({where:{eventID:eventID}})
    const oldlmage=event.image
    const pathImage = path.join(__dirname,`../image`,oldlmage)
    if (fs.existsSync(pathImage)) {
       
       fs.unlink(pathImage, error => console.log(error))
    }

    eventModel.destroy({ where: { eventID: eventID } })
        .then(result => {
           
            return response.json({
                success: true,
                message: `Data event has been deleted`
            })
        })
        .catch(error => {
          
            return response.json({
                success: false,
                message: error.message
            })
        })
}





