import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import crypto from 'crypto'


const userSchema = new Schema({
   fullName:{
    type: 'String',
    required: [true, "NAme is required"],
    minLength:  [5, 'Name must be at least 5 charcter'],
    maxLength: [50, 'Name must be less then 50 charcter'],
    lowercase: true,
    trim: true

   },
   email:{
    type: 'String',
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    unique: true,
   },

   password: {
        type: 'String',
        required: [true, 'Password is required'],
        minLength: [8, 'Password must be at least 8 charcters'],
        select: false
   },
   avater: {
        public_id: {
            type: 'String'

        },
        secure_url:{
            type: 'String'
        }
    },
    role:{
        type: 'String',
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date ,
    subscription: {
        id:String,
        status: String
    }
}, {
    timestamps:true
})

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods={
    generateJWTToken: async function(){
        return await jwt.sign(
            {id: this._id, email: this.email, subscription: this.subscription,  role: this.role},
            process.env.JWT_SECRECT,
           {
            expires: process.env.JWT_EXPIRY,
           }

        )
    },

    comparePassword: async function(plainTextPassword){
        return  await bcrypt.compare(plainTextPassword, this.password)
    } ,
    generatePasswordResetToken: async function () {
         const resetToken = crypto.randomBytes(20).toString('hex')
         this.forgotPasswordToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex')
        ;

         this.forgotPasswordExpiry = Data.now() + 15 * 60 * 100
        return resetToken

    } 

}

const User = model('User', userSchema)

export default User