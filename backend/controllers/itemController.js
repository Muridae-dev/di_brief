const asyncHandler = require("express-async-handler");

const Item = require("../models/itemModel");
const User = require("../models/userModel");

// @desc       Get user items
// @route       GET /items
// @access      Private
const getItem = asyncHandler(async (req, res) => {
    const items = await Item.find({ user: req.user.id });

    console.log("get item ran")

    res.status(200).json(items)
})

const getAllItem = asyncHandler(async (req, res) => {
    const allItems = await Item.find();

    console.log("all items ran");

    res.status(200).json(allItems)
})

// @desc       set items
// @route       POST /items
// @access      Private
const setItem = asyncHandler(async (req, res) => {
    if(!req.body.text) {
        res.status(400);
        throw new Error("please add a text")
    }

    console.log(req.user)

    const item = await Item.create({
        text: req.body.text,
        user: req.user.id,
        username: req.user.name,
        picture: req.file.path,
        color: req.body.color,
        tags: req.body.tags
    })

    console.log(req.body);
    res.status(200).json(item)
})

// @desc       Update items
// @route       PUT /items/:id
// @access      Private
const updateItem = asyncHandler(async (req, res) => {
    const item = await Item.findById(req.params.id);

    if(!item) {
        res.status(400);
        throw new Error("Item not found");
    }

    // Check for user
    if(!req.user) {
        res.status(401);
        throw new Error("User not found");
    }

    // Make sure the logged in user matches the item user
    if(item.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }

    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {new: true,})

    res.status(200).json(updatedItem)
})

// @desc       Delete items
// @route       DELETE /items/:id
// @access      Private
const deleteItem = asyncHandler(async (req, res) => {
    const item = await Item.findById(req.params.id)

    if(!item) {
        res.status(400);
        throw new Error("Item not found")
    }

    // Check for user
    if(!req.user) {
        res.status(401);
        throw new Error("User not found");
    }

    // Make sure the logged in user matches the item user
    if(item.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }

    await item.remove();

    res.status(200).json({id: req.params.id})
})


module.exports = {
    getItem,
    setItem,
    updateItem,
    deleteItem,
    getAllItem,
}