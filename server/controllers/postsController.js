const db = require('../models/model');


const postsController = {
  getPosts: (req, res, next) => {
    const queryStr = `select p.postid, p.picurl, p.caption, p.posttype, p.calories, u.firstname
    FROM posts p
    LEFT join  users u
    on p.userid = u.userid;`;

    db.query(queryStr)
      .then(data => {
        res.locals.posts = data.rows;
        return next();
      })
      .catch(error => next({
        message: { err: `Error occurred in postController.getUsers: ${error}` },
      }))
  },

  updatePosts: (req, res, next) => {
    console.log ('updatePosts middleware >>> ', req.body);

    const { caption, id } = req.body;
    const params = [caption, id];
    const queryStr = `UPDATE Posts SET caption = $1 WHERE id = $2 returning *`
    db.query(queryStr, params)
    .then(data => {
        console.log('data.rows: ', data.rows);
        res.locals.posts = data.rows;
        return next();
      })
      .catch(error => next({
        message: { err: `Error occurred in postsController.updatePost: ${error}` },
      }))
  },

  createPosts: (req, res, next) => {
    console.log ('create post middleware: ', req.body);
    console.log('res.locals: ', res.locals)

    const { picUrl, userID, caption, postType, calories, timeStamp} = req.body;
    const params = [picUrl, userID, caption, postType, calories, timeStamp];
    console.log('params: ', params);
    
    const queryStr =  `INSERT INTO 
    Posts (picUrl, userID, caption, postType, calories, timeStamp) 
    VALUES ($1, $2, $3, $4, $5, $6)`;
   
    db.query(queryStr, params)
    .then(data => {
        console.log('data.rows: ', data.rows);
        res.locals.posts = data.rows;
        return next();
      })
      .catch(error => next({
        message: { err: `Error occurred in postController.createPost: ${error}` },
      }))
  },

  deletePosts: (req, res, next) => {
    const { id } = req.body;
    const params = [id]
    const queryStr = `delete from Posts where id = $1 returning *`;
    
    db.query(queryStr,params)
      .then(data => {
        res.locals.posts = data.rows;
        return next();
      })
      .catch(error => next({
        message: { err: `Error occurred in postController.deletePosts: ${error}` },
      }))
  }

};

module.exports = postsController;