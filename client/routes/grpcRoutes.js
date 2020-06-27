// requirements
const path = require('path');
const protoLoader = require('@grpc/proto-loader');
const grpc = require('grpc');

// gRPC client
const productProtoPath = path.join(__dirname, '..', '..', 'protos', 'product.proto');
const productProtoDefinition = protoLoader.loadSync(productProtoPath);
const productPackageDefinition = grpc.loadPackageDefinition(productProtoDefinition).product;

// gRPC client
const tagProtoPath = path.join(__dirname, '..', '..', 'protos', 'tags.proto');
const tagProtoDefinition = protoLoader.loadSync(tagProtoPath);
const tagPackageDefinition = grpc.loadPackageDefinition(tagProtoDefinition).tags;


const client = new productPackageDefinition.ProductService(
  'localhost:50051', grpc.credentials.createInsecure());

  const client2 = new tagPackageDefinition.TagsService(
    'localhost:50051', grpc.credentials.createInsecure());
/*
Using an older version of gRPC?
(1) You won't need the @grpc/proto-loader package
(2) const productPackageDefinition = grpc.load(productProtoPath).product;
(3) const client = new productPackageDefinition.ProductService(
  'localhost:50051', grpc.credentials.createInsecure());
*/

// handlers
const readProduct = (req, res) => {};
const createProduct = (req, res) => {};
const updateProduct = (req, res) => {};
const deleteProduct = (req, res) => {};

const listProducts = (req, res) => {
  /*
  gRPC method for reference:
  listProducts(Empty) returns (ProductList)
  */
  client.listProducts({}, (err, result) => {
    res.json(result);
  });
};


  const addTag = (req, res) => {
    const payload = { tagId: req.body.tagId, pin: req.body.pin, name: req.body.name };
    /*
    gRPC method for reference:
    createProduct(newProduct) returns (result)
    */
    client2.addTag(payload, (err, result) => {
      res.json(result);
    });
  };

const listTags = (req, res) => {
    /*
    gRPC method for reference:
    listProducts(Empty) returns (ProductList)
    */
    client2.listTags({}, (err, result) => {
      res.json(result);
    });
  };

module.exports = {
  listProducts,
  readProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  addTag,
  listTags,
};