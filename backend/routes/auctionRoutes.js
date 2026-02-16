const express = require('express');
const {
    createAuction,
    getAllAuctions,
    placeBid,
    getAuctionDetails,
    closeAuction,
    deleteAuction,
    getCurrentBids,
    updateBid,
    getTopBidders,
    cancelAuction,
    getAuctionStats
} = require('../controllers/auctionController');
const upload = require('../config/multerConfig');

const router = express.Router();

// Create new auction
router.post('/', upload.array('images', 10), createAuction);

// Get all auctions with optional filters
router.get('/', getAllAuctions);

// Get auction details
router.get('/:auctionId', getAuctionDetails);

// Get auction statistics
router.get('/:auctionId/stats', getAuctionStats);

// Get top bidders for auction
router.get('/:auctionId/top-bidders', getTopBidders);

// Place/update bid
router.put('/bid', updateBid);

// Close auction
router.put('/close/:auctionId', closeAuction);

// Cancel auction
router.put('/cancel/:auctionId', cancelAuction);

// Delete auction
router.delete('/:auctionId', deleteAuction);

module.exports = router;
