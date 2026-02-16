const Auction = require('../models/auctionModel');
const upload = require('../config/multerConfig');

// Create new auction with enhanced data
const createAuction = async (req, res) => {
    try {
        // Check if images are uploaded
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'At least one image is required.' });
        }

        // Create auction object with all fields
        const auctionData = {
            itemName: req.body.itemName,
            description: req.body.description,
            category: req.body.category,
            startPrice: req.body.startPrice,
            endDate: req.body.endDate,
            currentBid: 0,
            images: req.files.map(file => `http://localhost:5000/${file.path}`),
            quantity: req.body.quantity || '',
            location: req.body.location || '',
            condition: req.body.condition || 'Good',
            weight: req.body.weight || '',
            specifications: req.body.specifications || '',
        };

        // Save auction to database
        const newAuction = await Auction.create(auctionData);

        res.status(201).json(newAuction);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating auction.', error: error.message });
    }
};

// Get all auctions with optional filters and sorting
const getAllAuctions = async (req, res) => {
    try {
        const { status, category, sortBy, order } = req.query;
        
        // Build filter query
        let filter = {};
        if (status && status !== 'all') {
            filter.status = status;
        }
        if (category && category !== 'all') {
            filter.category = category;
        }

        // Build sort object
        let sort = {};
        if (sortBy) {
            sort[sortBy] = order === 'desc' ? -1 : 1;
        } else {
            sort.createdAt = -1; // Default: newest first
        }

        // Fetch auctions with filters and sorting
        const auctions = await Auction.find(filter)
            .sort(sort)
            .populate('currentBidder', 'name email profileImage')
            .populate('winner', 'name email profileImage');

        res.status(200).json(auctions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching auctions.', error: error.message });
    }
};

// دالة لتقديم عرض على مزاد معين
const placeBid = async (req, res) => {
    try {
        const { auctionId, bidAmount } = req.body;

        // تحقق من وجود المزاد
        const auction = await Auction.findById(auctionId);
        if (!auction) {
            return res.status(404).json({ message: 'Auction not found' });
        }

        // تحقق من صحة العرض
        if (bidAmount <= auction.currentBid) {
            return res.status(400).json({ message: 'Bid must be higher than current bid' });
        }

        // تحديث المزاد
        auction.currentBid = bidAmount;
        auction.currentBidder = req.user._id; // تعيين المزايد الحالي
        await auction.save();

        return res.status(200).json(auction);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};

// Get auction details with view counter
const getAuctionDetails = async (req, res) => {
    const { auctionId } = req.params;

    try {
        const auction = await Auction.findById(auctionId)
            .populate('currentBidder', 'name email profileImage')
            .populate('winner', 'name email profileImage')
            .populate({
                path: 'bids.bidder',
                select: 'name email profileImage'
            });

        if (!auction) {
            return res.status(404).json({ message: 'Auction not found.' });
        }

        // Increment view count
        auction.viewsCount += 1;
        await auction.save();

        res.status(200).json(auction);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching auction details.', error: error.message });
    }
};

// دالة لإغلاق مزاد معين
const closeAuction = async (req, res) => {
    const { auctionId } = req.params; // الحصول على auctionId من معلمات الطلب

    try {
        // تحديث حالة المزاد إلى 'closed'
        const auction = await Auction.findByIdAndUpdate(
            auctionId,
            { status: 'closed' },
            { new: true } // إعادة الوثيقة المحدّثة
        );

        // التحقق مما إذا كان المزاد موجودًا
        if (!auction) {
            return res.status(404).json({ message: 'المزاد غير موجود.' });
        }

        // إعادة المزاد المحدّث كاستجابة
        res.status(200).json({ message: 'المزاد مغلق بنجاح.', auction });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'حدث خطأ أثناء إغلاق المزاد.', error: error.message });
    }
};

// دالة لحذف مزاد معين
const deleteAuction = async (req, res) => {
    const { auctionId } = req.params; // الحصول على auctionId من معلمات الطلب

    try {
        // حذف المزاد من قاعدة البيانات
        const auction = await Auction.findByIdAndDelete(auctionId);

        // التحقق مما إذا كان المزاد موجودًا
        if (!auction) {
            return res.status(404).json({ message: 'المزاد غير موجود.' });
        }

        // إعادة استجابة النجاح
        res.status(200).json({ message: 'تم حذف المزاد بنجاح.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'حدث خطأ أثناء حذف المزاد.', error: error.message });
    }
};

// دالة لاسترجاع جميع العروض الحالية لمزاد معين
const getCurrentBids = async (req, res) => {
    try {
        const { auctionId } = req.params;

        // تحقق من وجود المزاد
        const auction = await Auction.findById(auctionId);
        if (!auction) {
            return res.status(404).json({ message: 'Auction not found' });
        }

        return res.status(200).json({ currentBid: auction.currentBid, currentBidder: auction.currentBidder });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};

// Update bid with enhanced features
const updateBid = async (req, res) => {
    try {
        const { auctionId, bidderId, percentageIncrease } = req.body;

        // Validate input
        if (!auctionId || !bidderId || !percentageIncrease) {
            return res.status(400).json({ error: 'All fields (auctionId, bidderId, percentageIncrease) are required' });
        }

        // Find auction
        const auction = await Auction.findById(auctionId)
            .populate('currentBidder', 'name email profileImage');
        
        if (!auction) {
            return res.status(404).json({ error: 'Auction not found' });
        }

        // Check if auction is open
        if (auction.status !== 'open') {
            return res.status(400).json({ error: 'Auction is not open for bidding' });
        }

        // Check if auction has expired
        if (new Date() > new Date(auction.endDate)) {
            auction.status = 'closed';
            auction.winner = auction.currentBidder;
            await auction.save();
            return res.status(400).json({ error: 'Auction has expired' });
        }

        // Calculate base bid value
        const baseBid = auction.currentBid === 0 ? auction.startPrice : auction.currentBid;

        // Calculate new bid amount
        const increaseAmount = baseBid * (percentageIncrease / 100);
        const newBidAmount = baseBid + increaseAmount;

        // Check if bidder is already the highest bidder
        if (auction.currentBidder && auction.currentBidder._id.toString() === bidderId) {
            return res.status(400).json({ error: 'You are already the highest bidder' });
        }

        // Update current bid and bidder
        auction.currentBid = newBidAmount;
        auction.currentBidder = bidderId;

        // Add bid to history
        auction.bids.push({
            bidder: bidderId,
            bidAmount: newBidAmount,
            bidTime: new Date(),
        });

        // Update participants count (count unique bidders)
        const uniqueBidders = new Set(auction.bids.map(bid => bid.bidder.toString()));
        auction.participantsCount = uniqueBidders.size;

        // Save changes
        await auction.save();

        // Populate the updated auction
        const updatedAuction = await Auction.findById(auctionId)
            .populate('currentBidder', 'name email profileImage')
            .populate({
                path: 'bids.bidder',
                select: 'name email profileImage'
            });

        res.status(200).json({ 
            message: 'Bid placed successfully', 
            auction: updatedAuction 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while updating the bid' });
    }
};


// Get top bidders for an auction
const getTopBidders = async (req, res) => {
    try {
        const { auctionId } = req.params;
        const limit = parseInt(req.query.limit) || 10;

        // Find auction
        const auction = await Auction.findById(auctionId)
            .populate({
                path: 'bids.bidder',
                select: 'name email profileImage'
            });

        if (!auction) {
            return res.status(404).json({ message: 'Auction not found' });
        }

        // Sort bids by amount and get top bidders
        const sortedBids = auction.bids
            .sort((a, b) => b.bidAmount - a.bidAmount)
            .slice(0, limit);

        return res.status(200).json({ topBidders: sortedBids });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Close auction and declare winner
const closeAuction = async (req, res) => {
    const { auctionId } = req.params;

    try {
        const auction = await Auction.findById(auctionId)
            .populate('currentBidder', 'name email profileImage');

        if (!auction) {
            return res.status(404).json({ message: 'Auction not found.' });
        }

        // Set winner as the current highest bidder
        if (auction.currentBidder) {
            auction.winner = auction.currentBidder._id;
        }

        // Update status to closed
        auction.status = 'closed';
        await auction.save();

        const closedAuction = await Auction.findById(auctionId)
            .populate('currentBidder', 'name email profileImage')
            .populate('winner', 'name email profileImage');

        res.status(200).json({ 
            message: 'Auction closed successfully.', 
            auction: closedAuction 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error closing auction.', error: error.message });
    }
};
// Cancel auction
const cancelAuction = async (req, res) => {
    const { auctionId } = req.params;

    try {
        const auction = await Auction.findByIdAndUpdate(
            auctionId,
            { status: 'canceled' },
            { new: true }
        ).populate('currentBidder', 'name email profileImage');

        if (!auction) {
            return res.status(404).json({ message: 'Auction not found.' });
        }

        res.status(200).json({ message: 'Auction canceled successfully.', auction });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error canceling auction.', error: error.message });
    }
};

// Delete auction
const deleteAuction = async (req, res) => {
    const { auctionId } = req.params;

    try {
        const auction = await Auction.findByIdAndDelete(auctionId);

        if (!auction) {
            return res.status(404).json({ message: 'Auction not found.' });
        }

        res.status(200).json({ message: 'Auction deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting auction.', error: error.message });
    }
};

// Get auction statistics
const getAuctionStats = async (req, res) => {
    try {
        const { auctionId } = req.params;

        const auction = await Auction.findById(auctionId);

        if (!auction) {
            return res.status(404).json({ message: 'Auction not found.' });
        }

        const stats = {
            totalBids: auction.bids.length,
            participantsCount: auction.participantsCount,
            viewsCount: auction.viewsCount,
            currentBid: auction.currentBid,
            startPrice: auction.startPrice,
            priceIncrease: auction.currentBid - auction.startPrice,
            priceIncreasePercentage: auction.startPrice > 0 
                ? ((auction.currentBid - auction.startPrice) / auction.startPrice * 100).toFixed(2) 
                : 0,
            timeRemaining: Math.max(0, new Date(auction.endDate) - new Date()),
            isExpired: new Date() > new Date(auction.endDate),
        };

        res.status(200).json(stats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching auction stats.', error: error.message });
    }
};

module.exports = {
    cancelAuction,
    createAuction,
    getAllAuctions,
    placeBid,
    getAuctionDetails,
    closeAuction,
    deleteAuction,
    getCurrentBids,
    updateBid,
    getTopBidders,
    getAuctionStats,
};
