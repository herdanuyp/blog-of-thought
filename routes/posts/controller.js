module.exports = {
  addNewPost: function(req, res, next) {
    res.io.emit('newPostFromServer', { ...req.body });
    res.send(`data is saved to db`).status(201);
  }
};
