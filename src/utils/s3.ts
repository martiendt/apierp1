import { S3Client } from "@aws-sdk/client-s3";

// const wasabiEndpoint = new AWS.Endpoint("s3.wasabisys.com");
const accessKeyId = process.env.AWS_ACCESS_KEY ?? "";
const secretAccessKey = process.env.AWS_SECRET_KEY ?? "";

// Create an Amazon S3 service client object.
const s3Client = new S3Client({
  endpoint: "https://s3.us-east-005.backblazeb2.com",
  region: "us-east-005",
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  },
});
export { s3Client };
