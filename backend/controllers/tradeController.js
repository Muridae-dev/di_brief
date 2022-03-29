const asyncHandler = require("express-async-handler");

const Trade = require("../models/tradeModel");

// @desc       Make trade request
// @route       POST /trade
// @access      Private
const setTrade = asyncHandler(async (req, res) => {
    const trade = await Trade.create({
        itemId: req.body.itemId,
        seller: req.body.seller,
        buyer: req.body.buyer
    })

    res.status(200).json(trade)
})

// @desc       Make trade request
// @route       POST /trade
// @access      Private
const getTrade = asyncHandler(async (req, res) => {
    const trades = await Trade.find({$or: [
        {buyer: req.user.id},
        {seller: req.user.id}
    ]});

    res.status(200).json(trades)
})

module.exports = {
    setTrade,
    getTrade
}