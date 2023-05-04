import PostModel from "../models/Post.js"

export const GetAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.find()

    res.json(posts)
  } catch (err) {
    console.log(err)
    res.status(404).json({ 
      message: "Не удалось получить новости"
    })
  }
}

export const removePost = async (req, res) => {
  try {
    const postId = req.params.id

    PostModel.findByIdAndDelete({
      _id: postId, 
    } , (err, doc) => {
      if (err) {
        return res.status(500).json({
          message: "Не удалось удалить новость"
        })
      }

      if(!doc) {
        return res.status(404).json({
          message: "Не удалось найти новость"
        }); 
      }

      res.json({
        success: true,
      });
    })
  } catch (err) {
    console.log(err)
    res.status(404).json({ 
      message: "Не удалось получить новости"
    })
  }
}

export const GetOnePost = async (req, res) => {
  try {
    const postId = req.params.id

    PostModel.findOneAndUpdate({
      _id: postId,
  } , {
    $inc: { viewsCount: 1}
  }, 
  {
    returnDocument: "after"
  }, (err, doc) => {
    if (err) {
      return res.status(500).json({
        message: "Не удалось получить новость"
      })
    }
    if(!doc) {
      return res.status(404).json({
        message: "Статья не найдена"
      })
    }
    res.json(doc)
  }
  )
  } catch (err) {
    console.log(err)
    res.status(404).json({ 
      message: "Не удалось получить новости"
    })
  }
}

export const CreatePost = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageURL: req.body.imageURL,
      tags: req.body.tags,
    });

    const post = await doc.save();

    res.json(post);
  } catch(err){
    console.log(err);
    res.status(500).json({
      message: "Не удалось создать статью"
    })
  }
}

export const updatePost = async (req, res) => {
  try {
    const postId = req.params.id

    await PostModel.updateOne({
      _id: postId,
    }, {
      title: req.body.title,
      text: req.body.text,
      imageURL: req.body.imageURL,
      tags: req.body.tags,
    }, )
    res.json({
      success: true,
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: "Не удалось обновить статью"
    })
  }
}