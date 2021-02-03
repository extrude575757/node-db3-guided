const express = require("express");

const db = require("../../data/db-config.js");
const User = require('./user-model.js');
const UsersPo = require('./userPost-model')
const router = express.Router();

router.get('/:id/posts', async (req, res) => {

  const { id } = req.params;

  try{
    const posts = await User.findPosts(id);
    res.json(posts)
  }catch(er){
    console.log(er);
    res.status(500).json({
      message: 'failed get /id/posts 500 findPosts ',er
    })
  }



  // UsersPo.getPosts(req.params.id)
  //   .then(posts => {
  //     res.json(posts)
  //   })
  //   .catch(err => {
  //     res.status(500).json({ error: err.message })
  //   })
})

router.get("/", async (req, res) => {
  try{
    const users = await User.find()
    res.json(users);
  }catch(er){
    console.log(er)
    res.status(500).json({
      message: 'failed 500 get / async',er
    })
  }
  db("users")
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get users" });
    });
});

router.get("/:id", async(req, res) => {
  const { id } = req.params;

  try{
    const user = await User.findById(id);
    if(user != undefined){
      res.json(user);
    }else{
      res.status(404).json({
        message:'Failed 404 get /id findbyid for user ',user
      })
    }
  }catch(er){
    console.log(er);
    res.status(500).json({
      message:'Failed get /id findById ', er
    })
  }


  // db("users")
  //   .where({ id })
  //   .then(users => {
  //     const user = users[0];

  //     if (user) {
  //       res.json(user);
  //     } else {
  //       res.status(404).json({ message: "Could not find user with given id." });
  //     }
  //   })
  //   .catch(err => {
  //     res.status(500).json({ message: "Failed to get user" });
  //   });
});

router.post("/", async(req, res) => {
  const userData = req.body;
  try {
    const newUser = await User.add(userData);
    res.json(newUser); 
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'failed post / 500 user add',error
    })
  }
  // db("users")
  //   .insert(userData, "id")
  //   .then(ids => {
  //     res.status(201).json({ created: ids[0] });
  //   })
  //   .catch(err => {
  //     res.status(500).json({ message: "Failed to create new user" });
  //   });
});

router.put("/:id", async(req, res) => {
  const { id } = req.params;
  const changes = req.body;


try {
  const newUser = await User.update(id,changes);
  if(newUser){
    res.json(newUser);
  }else{
    res.status(404).json({
      message: 'fail put /id '
    })
  }
} catch (error) {
  console.log(error);
  res.status(500).json({
    message: 'Failed 500 put /id ',error
  })
}

  // db("users")
  //   .where({ id })
  //   .update(changes)
  //   .then(count => {
  //     if (count) {
  //       res.json({ update: count });
  //     } else {
  //       res.status(404).json({ message: "Could not find user with given id" });
  //     }
  //   })
  //   .catch(err => {
  //     res.status(500).json({ message: "Failed to update user" });
  //   });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

try {
  const  count = await User.remove(id);
  if(count){
    res.json({
      message: `${count} records removed`
    })
  }else{
    res.status(404).json({
      message: 'invalid id delete 404 /id '
    })
  }
} catch (error) {
  console.log(error);
  res.status(500).json({
    message: 'failed get delete users 500',error
  })
}

  // db("users")
  //   .where({ id })
  //   .del()
  //   .then(count => {
  //     if (count) {
  //       res.json({ removed: count });
  //     } else {
  //       res.status(404).json({ message: "Could not find user with given id" });
  //     }
  //   })
  //   .catch(err => {
  //     res.status(500).json({ message: "Failed to delete user" });
  //   });
});

module.exports = router;
