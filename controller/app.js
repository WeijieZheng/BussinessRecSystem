/*add route process function*/
exports.loadIndexPage = function (req, res) {
	res.sendfile('./public/views/index.html');
}

