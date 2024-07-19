const bookModel = require("../models/bookModel")

const validateBook = async(request, response) => {
    const bookISBN = request.body.isbn
    try {
        const bookData = await bookModel.findOne({isbn : bookISBN})
        if(bookData){
            return response.status(200).json(bookData)
        }
        return response.status(409).json({message: `Invalid Book ISBN!`})
    } catch (error) {
        return response.status(500).json({message:error.message})
    }
}

module.exports = {validateBook}