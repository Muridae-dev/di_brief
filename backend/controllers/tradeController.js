const asyncHandler = require("express-async-handler");

const Trade = require("../models/tradeModel");

// @desc       Make trade request
// @route       POST /trade
// @access      Private
const setTrade = asyncHandler(async (req, res) => {
    const trade = await Trade.create({
        itemId: req.body.itemId,
        seller: req.body.seller,
        buyer: req.body.buyer,
        buyername: req.body.buyername
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

const deleteTrade = asyncHandler(async (req, res) => {
    const trade = await Trade.findById(req.params.id)

    if(!trade) {
        res.status(400);
        throw new Error("Item not found")
    }

    if(!req.user) {
        res.status(401);
        throw new Error("User not found");
    }

    await trade.remove();
    res.status(200).json({id: req.params.id})
})

module.exports = {
    setTrade,
    getTrade,
    deleteTrade
}