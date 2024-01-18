import {model, Schema}from "mongoose"

const courseSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        minLength: [8, 'Title must be atlest 8 charcaters'],
        maxLength: [59, 'Title should be less then 100 charcters'],
        tirm: true,


    },
    decription: {
        type: String, 
        required: [true, 'decription is required'],
        minLength: [8, 'decription must be atlest 8 charcaters'],
        maxLength: [100, 'decription should be less then 60 charcters'],
    },

    category: {
        type: String,
        required: [true, 'category is required'],
    },
    thumnail: {
        public_id:{
            type: String,
            required: true
        },
        secure_url:{
            type: String,
            required: true
        }
    },

    lectures: [
        {
            title: String,
            decription: String,
            lecture: {
                public_id:{
                    type: String,
                    required: true
                },
                secure_url:{
                    type: String,
                    required: true
                }
            }
        }
    ],
    numberOfLectures:{
        type: Number,
        default: 0,
    },
    createBy:{
        type: String,
        required: true


    },
}, {
    timestamps: true
})

const Course = model('Course', courseSchema)
export default Course