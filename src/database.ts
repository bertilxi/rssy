import { MongoClient } from "npm:mongodb";
import Papr, { schema, types } from "npm:papr";

let client: MongoClient;

export const papr = new Papr();

export async function connect() {
  client = await MongoClient.connect("mongodb://localhost:27017");

  papr.initialize(client.db("test"));

  await papr.updateSchemas();
}

export async function disconnect() {
  await client.close();
}

const feedArticleSchema = schema({
  title: types.string({ required: true }),
  link: types.string({ required: true }),
  date: types.date({ required: true }),
  description: types.string({ required: true }),
});

export type FeedArticle = (typeof feedArticleSchema)[0];
export type FeedArticleData = Omit<FeedArticle, "_id">;

export const FeedArticleModel = papr.model("feedArticle", feedArticleSchema);
