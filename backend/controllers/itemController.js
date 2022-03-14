const asyncHandler = require("express-async-handler");

// @desc       Get items
// @route       GET /items
// @access      Private
const getItem = asyncHandler(async (req, res) => {
    

    res.status(200).json({message: "get items"})
})

// @desc       set items
// @route       POST /items
// @access      Private
const setItem = asyncHandler(async (req, res) => {
    if(!req.body.text) {
        res.status(400);
        throw new Error("please add a text")
    }


    res.status(200).json({message: "post items"})
})

// @desc       Update items
// @route       PUT /items/:id
// @access      Private
const updateItem = asyncHandler(async (req, res) => {
    res.status(200).json({message: `put items ${req.params.id}`})
})

// @desc       Delete items
// @route       DELETE /items/:id
// @access      Private
const deleteItem = asyncHandler(async (req, res) => {
    res.status(200).json({message: `delete items ${req.params.id}`})
})


module.exports = {
    getItem,
    setItem,
    updateItem,
    deleteItem,
}