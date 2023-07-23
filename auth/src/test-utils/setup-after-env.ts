import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

// Before everything
// 1. create instance
// 2. connect mongodb server
// let mongoMemoryServer : MongoMemoryServer;

// eslint-disable-next-line prefer-const
let mongoMemoryServer = MongoMemoryServer.create();

beforeAll(async () => {
  const asyncDB = await mongoMemoryServer;
  const mongoURI = asyncDB.getUri();
  await mongoose.connect(mongoURI);
});

// before each test
// 1. clean up the dnb
beforeEach(async () => {
  try {
    const userCollection = mongoose.connection.db.collection("User");
    // Delete all documents from the "user" collection
    return await userCollection.deleteMany({});
    // Get all the collection names in the database
    // const collectionNames = await mongoose.connection.db.listCollections().toArray();
    // console.log(collectionNames, "collectionName")
    // // Iterate through each collection and delete all documents
    // for (const collectionName of collectionNames) {
    //   const collection = mongoose.connection.model(collectionName.name);
    //   await collection.deleteMany({});
    //   console.log(`Deleted all documents from collection: ${collectionName.name}`);
    // }
  } catch (error) {
    console.error("Error deleting test documents:", error);
  }
});

// after every thing
// 1. cloce and stop the db connection after all test

afterAll(async () => {
  const asyncDB = await mongoMemoryServer;
  asyncDB.stop();
  await mongoose.connection.close();
});

// After all this file have to mention in th jest of package.json script
