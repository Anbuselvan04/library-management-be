const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema(
    {
        bookName : {
            type : String,
            required : true
        },
        authorName : {
            type : String,
            required : true
        },
        isbn : {
            type : Number,
            required : true,
            unique : true,
            index : true
        },
        genre : {
            type:String,
            required:true,
        },
        availability:{
            type : String,
            default : "Available"
        }
    },
    {
        collection : 'books'
    }
)

module.exports = mongoose.model('books',bookSchema)