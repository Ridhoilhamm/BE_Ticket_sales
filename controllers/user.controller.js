//digunakan untuk memangil models untuk tabel user
const userModel = require(`../models/index`).user
const md5 = require(`md5`)

const Op =require(`sequelize`).Op

//berikut merupakan fungsi untuk mendapatkan data semua user(get)
exports.getAllUser = async (req, res)=> {
    let users = await userModel.findAll()
    return res.json({
        succes: true,
        data:users,
        message:"menampilkan semua data masbro"
    })
}

// digunakan untuk mencari salah satu element yang ada didata

exports.findUser = async(req,res)=> {
    let keyword =req.params.key
    let users =await userModel.findAll({
        where:{
            [Op.or]:[
                {userID:{[Op.substring]:keyword}},
                {firsname:{[Op.substring]:keyword}},
                {lastname:{[Op.substring]:keyword}},
                {email:{[Op.substring]:keyword}},
                {role:{[Op.substring]:keyword}},

            ]
        }
    })
    return res.json({
        success:true,
        data:users,
        message:"data success ditemukan"
    })
}

//digunakan untuk menambahkan user menggunakan method post
exports.addUser =( req,res)=>{
    let newUser ={
        firsname: req.body.firsname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    }
    //menambahkan data ke table user
    userModel.create(newUser)
    .then(result =>{
        return res.json({
            success:true,
            data:result,
            message:"berhasil menambahkan data baru"
        })
    })
    .catha(error =>{
        return res.json({
            succes:false,
            message:error.message
        })
    })
}

//digunakan untuk melakakukan update data users 
exports.updateUser= (req,res) =>{
    
    let dataUser ={
        firsname:req.body.firsname,
        lastname:req.body.lastname,
        email:req.body.email,
        role:req.body.role  

    }
    if(req.body.password){
        dataUser.password = md5(req.body.password)
    }
    let UserID = req.params.UserID
    userModel.update(dataUser,{where:{userID:userID}})
    .then(result =>{
        return res.json({
            success:true,
            message:"berhasil melakukan update data"
        })
    })
    .catch(error=>{
        return res.json({
            success:false,
            message:error.message
        })
    })
}

// fungtion yang digunakan untuk menghapus data
exports.deleteUser=(req,res)=>{
    letUserID = req.params.UserID
    userModel.destroy({where:{userID:userID}})
    .then(result =>{
        return res.json({
            succes:true,
            message:"berhasil data terhapus"
        })
    })
    .catch(error => {
        return res.json({
            success:false,
            message:error.message
        })
    })
}
