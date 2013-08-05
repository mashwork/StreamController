exports.partials = function (req, res) {
  var resource = req.params.resource;
  var page = req.params.page;
  console.log("page");
  console.log(resource + "/" + page);
  res.render(resource + "/" + page);
};