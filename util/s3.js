const AWS = require("aws-sdk");
const fs = require("fs");
const { v4 } = require("uuid");

const region = "us-west-2";
const bucketName = "tempsii";
const accessKeyId = "AKIAUKU5FWJIUX7INBOE";
const secretAccessKey = "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";


const s3 = new AWS.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});

async function uploadFile(file, folder, loggedInUserId) {
  console.log("file to upload");
  console.log(file);
  const imageName =
    loggedInUserId +
    "-" +
    file.fieldname +
    "-" +
    Date.now() +
    "." +
    file.originalname.split(".")[1];

  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: folder + "/" + imageName,
  };

  return s3.upload(uploadParams).promise();
}

module.exports = { uploadFile };
