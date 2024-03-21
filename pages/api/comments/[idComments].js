import { ObjectId } from 'mongodb';
import clientPromise from '../../../lib/mongodb';
import { commentObject } from './commentObject';
import { OrmService } from '../../../services/OrmService';

export default async function handler(req, res) {
    try {
        const { idComment } = req.query;
        const commentId = new ObjectId(idComment);

        switch (req.method) {
            case 'GET':
                try {
                    const idComment = req.body;
                    const comment = await OrmService.connectAndFindOneById('comments', idComment);
                    if (!comment) {
                        res.status(404).json({ status: 404, message: 'Comment not found' });
                        return;
                    }
                    res.status(200).json({ status: 200, data: comment});
                } catch (e) {
                    console.error('Error:', error);
                    res.status(500).json({ status: 500, message: 'Internal Server Error' });
                }
                break;
            case 'POST':
                try {
                    
                    const newComment = req.body;
                    console.log(newComment);
                    const insertComment = await OrmService.insertOne('comments', newComment);
                    if (insertComment.result.ok === 1) {
                        res.status(201).json({ status: 201, data: { message: 'Comment created successfully' } });
                    } else {
                        res.status(500).json({ status: 500, message: 'Error creating comment' });
                    }
                } catch (error) {
                    console.error('Error:', error);
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
                const idComment = req.body;
                const deleteResult = await OrmService.deleteOne('comments', idComment);
                if (deleteResult.deletedCount === 1) {
                    res.status(200).json({ status: 200, message: 'Comment deleted successfully' });
                } else {
                    res.status(404).json({ status: 404, message: 'Comment not found' });
                }
                break;
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
}
