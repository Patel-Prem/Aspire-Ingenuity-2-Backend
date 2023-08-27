const { PrismaClientKnownRequestError } = require("@prisma/client/runtime");
const ValidationError = require("../error/validationError");
const ValidationErrors = require("../error/validationErrors");

const makeExpressCallback = (controller) => {
  return (req, res) => {
    const httpRequest = {
      body: req.body,
      query: {
        ...req.query,
        page: req.query.page ? req.query.page : 1,
        size: req.query.size ? req.query.size : 10,
      },
      params: req.params,
      ip: req.ip,
      method: req.method,
      path: req.path,
      cookies: req.cookies,
      user: req.user,
      file: req.file,
      files: req.files,
      headers: {
        "Content-Type": req.get("Content-Type"),
        Referer: req.get("referer"),
        "User-Agent": req.get("User-Agent"),
        Cookie: req.get("Authorization"),
        "Access-Control-Allow-Origin": "*",
      },
    };
    controller(httpRequest, res)
      .then((httpResponse) => {
        if (httpResponse.headers) {
          res.set("Access-Control-Allow-Origin", "*");
          res.set(httpResponse.headers);
        }
        res.type("json");
        res.status(httpResponse.statusCode).send({
          statusCode: httpResponse.statusCode || "200",
          status: httpResponse.status || "OK",
          data: httpResponse.body,
          pagination: httpResponse.pagination,
        });
      })
      .catch((err) => {
        if (err instanceof ValidationError) {
          return res.status(err.status).json({
            statusCode: err.status,
            status: "ERROR",
            errors: [{ msg: err.message }],
          });
        }
        if (err instanceof ValidationErrors) {
          return res.status(err.status).json({
            statusCode: err.status,
            status: err.status,
            status: "ERROR",
            errors: err.getMsgs(),
          });
        }
        if (err instanceof PrismaClientKnownRequestError) {
          console.log(err);
          return res.status(400).json({
            statusCode: 400,
            status: err.status,
            status: "ERROR",
            errors: [{ msg: err.meta.message }],
          });
        }
        console.log("The error is");
        console.log(err);
        return res.status(500).json({
          statusCode: 500,
          status: err.status,
          status: "ERROR",
          errors: [{ msg: "Oops! Something Wrong with the server" }],
        });
      });
  };
};

module.exports = makeExpressCallback;
