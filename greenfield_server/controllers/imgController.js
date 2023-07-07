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
    res.json({ msg: "Img successfully uploaded" });
  } catch (err) {
    res.send(err);
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

// const img = require("../modules/todo");

// const getAllImg = async (req, res) => {
//   try {
//     const img = await Img.find({});
//     res.json(img);
//   } catch (err) {
//     console.log(err);
//   }
// };
// //POST*************

// const postOneImg = async (req, res) => {
//   try {
//     const newImg = await post.create(req.body);
//     newImg.save();
//     res.status(201).json({ msg: "img uploaded" });
//   } catch (error) {
//     res.status(409).json({ msg: error.msg });
//   }
// };
// // app.post("/upload", async (req, res) => {
// //   try {
// //     const newImg = await post.create(req.body);
// //     newImg.save();
// //     res.status(201).json({ msg: "img uploaded" });
// //   } catch (error) {
// //     res.status(409).json({ msg: error.msg  });
// //   }
// // });

// // app.post("/", upload.single("image"), (req, res, next) => {
// //     const data = {image: req.file.path,};
// //     cloudinary.uploader.upload(data.image).then((result) => {
// //         const image = new imgModel({
// //             img: result.url,
// //         });
// //         const response = image.save();
// //         res.status(200).send({
// //             message: "success",
// //             result,
// //         });
// //     })
// //     .catch((error) => {
// //         res.status(500).send({
// //             message: "failure",
// //             error,
// //         });
// //     });
// // });

// // const postOneTodo = async (req, res) => {
// //     try {
// //       const newTodo = await Todo.create(req.body);
// //       //res.json(newTodo);
// //       res.json({ msg: "success" });
// //     } catch (err) {
// //       res.send(err);
// //     }
// //   };
// module.exports = { getAllImg, postOneImg };
