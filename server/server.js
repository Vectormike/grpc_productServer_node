const PROTO_PATH = './products.proto';

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

// const { v4: uuidv4 } = require('uuid');

const packageDefinistion = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
});

const productsProto = grpc.loadPackageDefinition(packageDefinistion);

const server = new grpc.Server();

// Using in-memory database
const customers = [
  {
    id: 'a68b823c-7ca6-44bc-b721-fb4d5312cafc',
    name: 'Milo',
    price: 3000,
    description: 'Big size',
  },
  {
    id: '34415c7c-f82d-4e44-88ca-ae2a1aaa92b7',
    name: 'Peak',
    price: 2000,
    description: 'Big size',
  },
];
