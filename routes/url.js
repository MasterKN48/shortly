const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const Url = require('../models/Url');
const passport = require('passport');
// @route     GET /:code
// @desc      Redirect to long/original URL
router.get('/:code', async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });

    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json('No url found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error');
  }
});
// @route     GET /all/:userId
// @desc      Get all shorted url by a user
router.get('/all/:userId', (req, res) => {
    //console.log(req.params.userId)
    Url.find({ userId: req.params.userId })
    .then((data,err)=>{
      if(err){
        //console.log(err);
        res.status(400).json({msg:'No Data found for current User'});
      }
      else{
        //console.log(data);
        res.status(200).json(data);
      }
    })

});
// @route     POST /api/url/shorten
// @desc      Create short URL
const authCheck=(req,res,next)=>{
  console.log(req.isAuthenticated())
  if(req.isAuthenticated()){
    next()
  }else{
    res.json({msg:'not login'})
  }
}
router.delete('/delete/:url_id', async(req,res)=>{
  const url_id=req.params.url_id;
  console.log(url_id);
  Url.findOneAndRemove({_id:url_id},(err,data)=>{
    if(err){
      res.status(400).json({msg:'Cannot find url'})
    }
    if(data===null){
      res.status(400).json({msg:'url not exists'});
    }
    else{
      res.status(200).json({msg:'delete success',data:data});
    }
  })
});

router.post('/shorten',async (req, res) => {
  const { longUrl } = req.body;
  console.log(req.body);
  const baseUrl = req.protocol+"://"+req.headers.host;

  // Check base url
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json({msg:'Invalid URL'});
  }

  // Create url code
  const urlCode = shortid.generate();

  // Check long url
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });

      if (url) {
        res.json(url);
      } else {
        const shortUrl = baseUrl + '/' + urlCode;

        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          userId:req.body.id,
          date: new Date()
        });

        await url.save();

        res.json(url);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({msg:'Server error'});
    }
  } else {
    res.status(401).json({msg:'Invalid url'});
  }
});

module.exports = router;
