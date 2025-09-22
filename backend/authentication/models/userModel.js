const mongooes = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')


const Schema = mongooes.Schema


const userSchema = new Schema({

    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    mobilenumber:{
        type:String,
        required:true
    },  
    type:{
        type:String,
        required:true,
    }, 
    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true
    }
})

userSchema.statics.signup = async function (firstname,lastname,mobilenumber,type,email,password,confirmpassword){
    //validation
    if(!email || !password){
        throw Error('All fields must be filled')
    }

    if(password != confirmpassword){
        throw Error('Password mismatch')
    }

    if(!validator.isEmail(email)){
        throw Error('Email is not valid')
    }

    if(!validator.isStrongPassword(password)){
        throw Error('Password not Strong enought')
    }

    const exists = await this.findOne({email})

    if(exists){
        throw Error("Email already in use")
    }

    //my password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)
    const user = await this.create({firstname,lastname,mobilenumber,type,email,password,email,password:hash})

    return user
}


userSchema.statics.login = async function (email,password){

    const user = await this.findOne({email})

    if(!user){
        throw Error ('Incorrect email')
    }

    const match = await bcrypt.compare(password,user.password)

    if(!match){
        throw Error ('Incorrect password')
    }
    return user
}


module.exports = mongooes.model('User',userSchema)