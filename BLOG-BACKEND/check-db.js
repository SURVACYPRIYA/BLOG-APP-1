import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.DB_URL;
console.log("DB_URL is present:", !!url);

mongoose.connect(url)
  .then(async () => {
    console.log("Connected to MongoDB.");
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    console.log("Collections:", collections.map(c => c.name));
    
    const articles = await db.collection("articles").find({}).toArray();
    console.log("Total articles in DB:", articles.length);
    console.log("Active articles:", articles.filter(a => a.isArticleActive !== false).length);
    console.log("Categories of articles:", articles.map(a => a.category));
    
    process.exit(0);
  })
  .catch(err => {
    console.error("DB Connection Error:", err);
    process.exit(1);
  });
