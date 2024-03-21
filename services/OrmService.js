import clientPromise from "../lib/mongodb";
export const OrmService = {
    
    connectAndFind: async (dbName) => {
        const client = await clientPromise; 
        const db = client.db("sample_mflix");
        return await db.collection(dbName).find({}).limit(10).toArray();
    },

    connectAndFindOneById: async (dbName, id) => {
        const client = await clientPromise; 
        const db = client.db("sample_mflix");
        return await db.collection(dbName).findOne(id);
    },

    insertOne: async (dbName, data) => {
        const client = await clientPromise;
        const db = client.db("sample_mflix");
        const result = await db.collection(dbName).insertOne(data);
        return result;
    },

    deleteOne: async (dbName, id) => {
        const client = await clientPromise;
        const db = client.db("sample_mflix");
        return await db.collection(dbName).deleteOne(id);
    },

    updateOne: async (dbName, filter, update) => {
        const client = await clientPromise;
        const db = client.db("sample_mflix");
        return await db.collection(dbName).updateOne(filter, update);
    },
    
} 
