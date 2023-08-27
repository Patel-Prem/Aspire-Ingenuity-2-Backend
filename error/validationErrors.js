class ValidationErrors extends Error {
  constructor(message, code) {
    super(message);
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.status = code || 400;
  }

  statusCode() {
    return this.status;
  }
  msg = [];
  addMsg(ms) {
    this.msg.push(ms);
  }
  addMsgs(mss) {
    if (mss.length > 0) {
      mss.forEach((m) => {
        this.msg.push({ msg: m });
      });
    }
  }
  getMsgs() {
    return this.msg;
  }
}

module.exports = ValidationErrors;
