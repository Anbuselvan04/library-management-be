const { request, response } = require('express');
const bookData = require('../data/bookData')
const bookModel = require('../models/bookModel')

const getAllBookData = async(request, response) => { 
    try {
        let books = await bookModel.find({availability:"Available"});

        if(books.length === 0){
            console.log(`first`)
            const initialBooks = await bookModel.create(bookData)
            books = await bookModel.find({availability:"Available"})
        }
        return response.status(200).json(books)

    } catch (error) {
        return response.status(500).json({message:error.message})
    }
}

const addNewBookData = async(request, response) => {
    try {
        const newBookData = request.body
        const existingBook = await bookModel.findOne({isbn:newBookData.isbn})
        if(!existingBook){
            const addBook = await bookModel.create(newBookData)
            return response.status(201).json({message: `New Book Added`})
            
        }
        return response.status(409).json({message: `Book with ISBN ${newBookData.isbn} already exists!`})
    } catch (error) {
        return response.status(500).json({message:error.message})
    }
}

const editBookData = async(request, response) => {
    const bookToBeUpdated = request.body
    try {
        const updatedBookData = await bookModel.updateMany({isbn : bookToBeUpdated.isbn}, bookToBeUpdated)
        return response.status(201).json(bookToBeUpdated)
    } catch (error) {
        return response.status(500).json({message:error.message})
    }
}

const deleteBookData = async(request, response) => {
    const isbn = request.params.isbn
    try{
        const deletedBookData = await bookModel.findOneAndUpdate({isbn:isbn}, {availability: "NA"})
        return response.status(201).json(deletedBookData)
    }   
    catch(error){
        return response.status(500).json({message:error.message})
    }
}

module.exports = {getAllBookData, addNewBookData, editBookData, deleteBookData}

