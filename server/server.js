const PROTO_PATH = './proto/products.proto';

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const { v4: uuidv4 } = require('uuid');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
});

const productsProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

// Using in-memory database
const products = [
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

server.addService(productsProto.ProductService.service, {
  getAll: (_, callback) => {
    callback(null, { products });
  },

  get: (call, callback) => {
    let product = products.find((n) => n.id == call.request.id);

    if (products) callback(null, product);
    else callback({ code: grpc.status.NOT_FOUND, details: 'Not found' });
  },

  insert: (call, callback) => {
    let product = call.request;

    product.id = uuidv4();
    products.push(product);
    callback(null, product);
  },

  update: (call, callback) => {
    let existingProduct = products.find((n) => n.id == call.request.id);

    if (existingProduct) {
      existingProduct.name = call.request.name;
      existingProduct.price = call.request.price;
      existingProduct.description = call.request.description;
    } else {
      callback({ code: grpc.status.NOT_FOUND, details: 'Not found' });
    }
  },
  remove: (call, callback) => {
    let existingProductIndex = products.findIndex((n) => n.id == call.request.id);

    if (existingProductIndex) {
      products.splice(existingProductIndex, 1);
      callback(null, {});
    } else {
      callback({ code: grpc.status.NOT_FOUND, details: 'Not found' });
    }
  },
});

server.bind('127.0.0.1:30043', grpc.ServerCredentials.createInsecure());
server.start();
