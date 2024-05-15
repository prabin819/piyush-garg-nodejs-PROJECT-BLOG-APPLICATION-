const express = require('express')
const router = express.Router();
const {handleGenerateNewShortUrl,handleGetAnalytics, handleShortId} = require('../controllers/user');

router.post('/', handleGenerateNewShortUrl);
router.get('/analytics/:shortid', handleGetAnalytics);
router.get('/:shortid', handleShortId);

module.exports = router;