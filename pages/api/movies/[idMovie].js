import { ObjectId } from 'mongodb';
import clientPromise from '../../../lib/mongodb';

export default async function handler(req, res) {
    try {
        const { idComments } = req.query;
        const objectId = new ObjectId(idComments);

        const client = await clientPromise;
        const db = client.db('sample_mflix');

        const comments = await db.collection('comments').findOne({ _id: objectId });

        if (!comments) {
            res.status(404).json({ status: 404, message: 'Comments not found' });
            return;
        }

        res.status(200).json({ status: 200, data: comments });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
}
