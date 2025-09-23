const mongooes = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')


const Schema = mongooes.Schema


const userSchema = new Schema({

    firstname:{
        type:String,
        required:function() {
            return !this.googleId;
        }
    },
    lastname:{
        type:String,
        required:function() {
            return !this.googleId; 
        }
    },
    mobilenumber:{
        type:String,
        required:function() {
            return !this.googleId;
        }
    },  
    type:{
        type:String,
        required:function() {
            return this.profileComplete !== false; 
        },
        default: 'buyer'
    }, 
    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:function() {
            return !this.googleId; 
        }
    },

    googleId:{
        type:String,
        unique:true,
        sparse:true 
    },
    picture:{
        type:String 
    },
    isGoogleUser:{
        type:Boolean,
        default:false
    },
    profileComplete:{
        type:Boolean,
        default:true 
    }
})

userSchema.statics.signup = async function (firstname,lastname,mobilenumber,type,email,password,confirmpassword){
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

userSchema.statics.googleAuth = async function (googleProfile){
    const { sub, email, name, picture } = googleProfile;

    let user = await this.findOne({googleId: sub});

    if(user){
        user.picture = picture;
        user.email = email;
        await user.save();
        return { user, isNewUser: false };
    }

    user = await this.findOne({email: email});

    if(user){
        user.googleId = sub;
        user.picture = picture;
        user.isGoogleUser = true;
        await user.save();
        return { user, isNewUser: false };
    }

    const nameParts = name ? name.split(' ') : ['', ''];
    const firstname = nameParts[0] || '';
    const lastname = nameParts.slice(1).join(' ') || '';

    user = await this.create({
        firstname,
        lastname,
        mobilenumber: '', 
        type: 'buyer', 
        email,
        password: 'google_oauth_user', 
        googleId: sub,
        picture,
        isGoogleUser: true,
        profileComplete: false 
    });

    return { user, isNewUser: true };
}

userSchema.statics.completeGoogleProfile = async function (userId, profileData){
    const { firstname, lastname, mobilenumber, type } = profileData;

    if (!firstname || !lastname || !mobilenumber || !type) {
        throw Error('All fields are required');
    }

    if (!['buyer', 'seller', 'admin'].includes(type)) {
        throw Error('Invalid user type');
    }

    const user = await this.findByIdAndUpdate(
        userId,
        {
            firstname,
            lastname,
            mobilenumber,
            type,
            profileComplete: true
        },
        { new: true }
    );

    if (!user) {
        throw Error('User not found');
    }

    return user;
}


module.exports = mongooes.model('User',userSchema)