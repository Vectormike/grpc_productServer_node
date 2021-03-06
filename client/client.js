const PROTO_PATH = './proto/products.proto';

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  longs: String,
  enums: String,
  arrays: true,
});

const ProductService = grpc.loadPackageDefinition(packageDefinition).ProductService;
const client = new ProductService('localhost:3000', grpc.credentials.createInsecure());

module.exports = client;
