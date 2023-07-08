const mongoose = require("mongoose");
const Img = require("../modules/img");

//GET ALL IMGS
const getAllImg = async (req, res) => {
  try {
    const imgs = await Img.find({});
    res.json(imgs);
  } catch (err) {
    console.log(err);
  }
};
//CREATE NEW IMG
const postOneImg = async (req, res) => {
  try {
    const newImg = await Img.create(req.body);
    newImg.save();
    res.status(201).json({ msg: "Img successfully uploaded" });
  } catch (err) {
    res.status(409).json({ msg: err.msg });
  }
};
//DELETE A IMG
const deleteImg = async (req, res) => {
  try {
    const deleteOneImg = await Img.deleteOne({ _id: req.params.id });
    res.json(deleteOneImg);
  } catch (err) {
    res.send(err);
  }
};
//UPDATE A IMG
const updateImg = async (req, res) => {
  try {
    const updateImg = await Img.findByIdAndUpdate(
      { _id: req.params.id },
      req.body
    );
    res.json(updateImg);
  } catch (err) {
    res.send(err);
  }
};
//GET ALL IMGS OF ONE USER
const getAllUserImg = async (req, res) => {
  try {
    const imgs = await Img.find({ userId: req.params.userId });
    res.json(imgs);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAllImg,
  postOneImg,
  deleteImg,
  updateImg,
  getAllUserImg,
};
