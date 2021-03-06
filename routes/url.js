const express = require("express");
const router = express.Router();
const validUrl = require("valid-url");
const shortid = require("shortid");
const Url = require("../models/Url");

// @route     GET /:code
// @desc      Redirect to long/original URL
router.get("/:code", async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });
    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json({ msg: "No URL Found" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Something went wrong" });
  }
});

// @route     GET /all/:userId
// @desc      Get all shorted url by a user
router.get("/all/:userId", (req, res) => {
  //console.log(req.params.userId)
  Url.find({ userId: req.params.userId }).then((data, err) => {
    if (err) {
      //console.log(err);
      return res.status(400).json({ msg: "No Data found for current User" });
    } else {
      //console.log(data);
      return res.status(200).json(data);
    }
  });
});

const authCheck = (req, res, next) => {
  //console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    next();
  } else {
    res.json({ msg: "not login" });
  }
};

router.delete("/delete/:url_id", async (req, res) => {
  const url_id = req.params.url_id;
  //console.log(url_id);
  Url.findOneAndRemove({ _id: url_id }, (err, data) => {
    if (err) {
      return res.status(400).json({ msg: "Cannot find url" });
    }
    if (data === null) {
      return res.status(400).json({ msg: "url not exists" });
    } else {
      return res.status(200).json({ msg: "delete success", data: data });
    }
  });
});

router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;
  // console.log(req.body);
  const baseUrl = `${process.env.CLIENT_URL}`;

  // Check base url
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json({ msg: "Invalid URL" });
  }

  // Create url code
  const urlCode = shortid.generate();

  // Check long url
  if (validUrl.isUri(longUrl)) {
    try {
      const shortUrl = baseUrl + "/" + urlCode;
      url = new Url({
        longUrl,
        shortUrl,
        urlCode,
        userId: req.body.id,
        date: new Date(),
      });

      await url.save();

      return res.json(url);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Server error" });
    }
  } else {
    return res.status(401).json({ msg: "Invalid url" });
  }
});

module.exports = router;
