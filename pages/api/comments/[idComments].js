import { ObjectId } from 'mongodb';
import clientPromise from '../../../lib/mongodb';
import { commentObject } from './commentObject';
import { OrmService } from '../../../services/OrmService';

export default async function handler(req, res) {
    try {
        const { idComment } = req.query;
        const commentId = new ObjectId(idComment);

        const client = await clientPromise;
        const db = client.db('sample_mflix');

        switch (req.method) {
            case 'GET':
                console.log('ID du commentaire:', idComment);
                const comment = OrmService.findOne('comments', )
                const comment = await db.collection('comments').findOne({ _id: commentId });
                console.log('Commentaire trouvé:', comment);

                if (!comment) {
                    res.status(404).json({ status: 404, message: 'Comment not found' });
                    return;
                }
                res.status(200).json({ status: 200, data: comment });
                break;
            case 'POST':
                const newComment = { ...commentObject, ...req.body };
                const insertResult = await db.collection('comments').insertOne(newComment);
                if (insertResult.insertedCount === 1) {
                    res.status(201).json({ status: 201, data: { message: 'Comment created successfully' } });
                } else {
                    res.status(500).json({ status: 500, message: 'Error creating comment' });
                }
                break;
            case 'PUT':
                const updatedComment = { ...commentObject, ...req.body };
                delete updatedComment._id; // On ne met pas à jour l'identifiant
                const updateResult = await db.collection('comments').updateOne({ _id: commentId }, { $set: updatedComment });
                if (updateResult.modifiedCount === 1) {
                    res.status(200).json({ status: 200, data: { message: 'Comment updated successfully' } });
                } else {
                    res.status(500).json({ status: 500, message: 'Error updating comment' });
                }
                break;
            case 'DELETE':
                const deleteResult = await db.collection('comments').deleteOne({ _id: commentId });
                if (deleteResult.deletedCount === 1) {
                    res.status(200).json({ status: 200, message: 'Comment deleted successfully' });
                } else {
                    res.status(404).json({ status: 404, message: 'Comment not found' });
                }
                break;
            default:
                res.status(405).json({ status: 405, message: 'Method Not Allowed' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
}
