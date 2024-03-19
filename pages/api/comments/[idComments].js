import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
    const { idComments } = req.query;
    console.log("ID comments ==> ", idComments);

    const client = await clientPromise;
    const db = client.db("sample_mflix");

    try {
        const dbComment = await db.collection("comments").findOne({ _id: new ObjectId(idComments) });
        if (!dbComment) {
            res.status(404).json({ status: 404, message: "Comment not found" });
            return;
        }
        res.status(200).json({ status: 200, data: { comment: dbComment } });
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
}
