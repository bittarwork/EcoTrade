const express = require('express');
const router = express.Router();
const {
    createScrapItem,
    getAllScrapItems,
    getScrapItemById,
    updateScrapItem,
    deleteScrapItem
} = require('../controllers/scrapItemController');
const upload = require('../config/multerConfig');

// مسارات CRUD مع رفع الصور
router.post('/', upload.array('images', 10), createScrapItem);
router.get('/', getAllScrapItems);
router.get('/:id', getScrapItemById);
router.put('/:id', upload.array('images', 10), updateScrapItem);
router.delete('/:id', deleteScrapItem);

module.exports = router;
