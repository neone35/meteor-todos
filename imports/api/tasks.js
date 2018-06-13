import { Mongo } from 'meteor/mongo';

// On server sets up a MongoDB collection 
// On client creates a cache connected to the server collection
export const Tasks = new Mongo.Collection('tasks');