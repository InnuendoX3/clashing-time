exports.success = function(req, res, data, message, status) {
  res.status(status || 200).send({
    message,
    data,
  });
}

exports.error = function(req, res, error, message, status) {
  res.status(status || 500).send({
    message,
    error,
  });
}