const shortid = require('shortid');
const URL = require('../models/url');

async function handleGenerateNewShortUrl (req, res){
    const body = req.body;
    if(!body.url) return res.status(400).json({ err: "url is required."});

    const shortId = shortid();

    await URL.create({
        shortUrl: shortId,
        redirectUrl: body.url,
        visitHistory: []
    });

    return res.json({ id: shortId });
}


async function handleGetAnalytics(req, res){
    const shortidp = req.params.shortid;
    const result = await URL.findOne({shortUrl: shortidp});
    return res.json({totalClicks: result.visitHistory.length, analytics: result.visitHistory});
}


async function handleShortId (req, res){
    const shortId = req.params.shortid;

    const entry = await URL.findOneAndUpdate(
        {shortUrl: shortId},
        {$push:{visitHistory: {timestamp: Date.now()}}});

    res.redirect(entry.redirectUrl);

}


module.exports = {
    handleGenerateNewShortUrl,
    handleGetAnalytics,
    handleShortId
}