class CustomResponse {
  _statusCode;
  _message;
  _data;

  constructor(statusCode, message, data = null) {
    this._statusCode= statusCode;
    this._message= message;
    this._data= data;
  }
   static response(statusCode, message, data) {
    return { statusCode, message, data };
  }
}
module.exports = CustomResponse;
