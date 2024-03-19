import clientPromise from "../lib/mongodb";
import { ObjectId } from "mongodb";
export const OrmService = {
    
    connectAndFind: async (dbName) => {
        const client = await clientPromise; 
        const db = client.db("sample_mflix");
        return await db.collection(dbName).find({}).limit(10).toArray();
    },

    connectAndFindOneById: async (dbName, id) => {
        const client = await clientPromise; 
        const db = client.db("sample_mflix");
        return await db.collection(dbName).findOne({ _id: new ObjectId(id) });
    }

} 
