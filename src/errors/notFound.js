function notFound(req, res, next) {
  res.json({ status: 404, message: `Path not found: ${req.originalUrl}` });
}

module.exports = notFound