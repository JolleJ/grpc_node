const path = require('path');
const protoLoader = require('@grpc/proto-loader');
const grpc = require('grpc');

const environment = process.env.ENVIRONMENT || 'development';
const config = require('./knexfile.js')[environment];
const knex = require('knex')(config);

const productProtoPath = path.join(__dirname, '..', 'protos', 'product.proto');
const productProtoDefinition = protoLoader.loadSync(productProtoPath);
const productPackageDefinition = grpc.loadPackageDefinition(productProtoDefinition).product;

const tagPath = path.join(__dirname, '..', 'protos', 'tags.proto');
const tagProtoDefinition = protoLoader.loadSync(tagPath);
const tagPackageDefinition = grpc.loadPackageDefinition(tagProtoDefinition).tags;

function readProduct(call, callback) {}
function createProduct(call, callback) {}
function updateProduct(call, callback) {}
function deleteProduct(call, callback) {}

function listProducts(call, callback) {
  /*
  Using 'grpc.load'? Send back an array: 'callback(null, { data });'
  */
  knex('products')
      .then((data) => { callback(null, { products: data }); });
  }

  function addTag(call, callback) {
    knex('tags')
      .insert({
        tagId: call.request.tageId,
        pin: call.request.pin,
        name: call.request.name,   
      })
      .then(() => { callback(null, { status: 'success' }); });
  }

  function listTags(call, callback) {
    knex('tags')
      .then((data) => {callback(null, {tags: data});
    });
  }

function main() {
    const server = new grpc.Server();
    // gRPC service
    server.addService(productPackageDefinition.ProductService.service, {
      listProducts: listProducts,
      readProduct: readProduct,
      createProduct: createProduct,
      updateProduct: updateProduct,
      deleteProduct: deleteProduct,
    });

    server.addService(tagPackageDefinition.TagsService.service, {
      addTag: addTag,
      listTags: listTags
    });
    // gRPC server
    server.bind('localhost:50051', grpc.ServerCredentials.createInsecure());
    server.start();
    console.log('gRPC server running at http://127.0.0.1:50051');
  }
main();