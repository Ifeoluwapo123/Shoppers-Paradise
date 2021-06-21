module.exports = function handleResponse(req, res, statusCode, data, message) {
  let isError = false;
  let newMessage = false;

  switch (statusCode) {
    case (200, 204):
      break;
    case 401:
      isError = true;
      newMessage = message || "Authorization Required";
      break;
    case 403:
      isError = true;
      newMessage = message || "Access to this resource is denied.";
      break;
    case 404:
      isError = true;
      newMessage = message || "Not found.";
      break;
    case 500:
      isError = true;
      newMessage = message || "Internal Server Error.";
      break;
    case 503:
      isError = true;
      newMessage = message || "Service Unavailable.";
      break;
    default:
      break;
  }

  const resObj = data || {};

  if (isError) {
    resObj.error = isError;
    resObj.message = newMessage;
  }

  resObj.success = !isError;
  resObj.statusCode = statusCode;

  return res.json(resObj);
};
