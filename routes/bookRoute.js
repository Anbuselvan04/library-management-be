const express = require('express')
const router = express.Router()
const {getAllBookData, addNewBookData, editBookData, deleteBookData} = require('../controllers/bookController')
const { validateBook } = require('../controllers/validateController')

router.route('/get').get(getAllBookData)
router.route('/add').post(addNewBookData)
router.route('/edit').patch(editBookData)
router.route('/validate').post(validateBook)
router.route('/delete/:isbn').delete(deleteBookData)

module.exports = router