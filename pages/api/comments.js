// pages/api/movies.js
import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    const movies = await db.collection("comments").find({}).limit(50).toArray();
    
    switch(req.method) {
        case "POST":
            res.json({ status: 500, data: "Cannot post comments"});
            break;
        case "GET": 
            res.json({status: 200, data: movies});
            break;
    }
}