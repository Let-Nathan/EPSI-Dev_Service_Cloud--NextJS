import { ObjectId } from 'mongodb';
import clientPromise from '../../../lib/mongodb';
import { movieObject } from './movieObject';
import { OrmService } from '../../../services/OrmService';

export default async function handler(req, res) {
    try {
        const { idMovie } = req.query;
        const movieId = new ObjectId(idMovie);
        switch (req.method) {
            case 'GET':
                const movie = await OrmService.connectAndFind('movies');
                if (!movie) {
                    res.status(404).json({ status: 404, message: 'Movie not found' });
                    return;
                }
                res.status(200).json({ status: 200, data: movie });
                break;
            case 'POST':
                const newMovie = { ...movieObject, ...req.body };
                // const insertResult = await db.collection('movies').insertOne(newMovie);
                const insertMovie = await OrmService.insertOne({_newMovie: newMovie});
                if (insertMovie.insertedCount === 1) {
                    res.status(201).json({ status: 201, data: { message: 'Movie created successfully' } });
                } else {
                    res.status(500).json({ status: 500, message: 'Error creating movie' });
                }
                break;
            case 'PUT':
                const updatedMovie = { ...movieObject, ...req.body };
                delete updatedMovie._id;
                const updateResult = await db.collection('movies').updateOne({ _id: objectId }, { $set: updatedMovie });
                if (updateResult.modifiedCount === 1) {
                    res.status(200).json({ status: 200, data: { message: 'Movie updated successfully' } });
                } else {
                    res.status(500).json({ status: 500, message: 'Error updating movie' });
                }
                break;
            case 'DELETE':
                const deleteMovie = await OrmService.deleteOne('movies', {_id: movieId});
                // const deleteResult = await db.collection('movies').deleteOne({ _id: movieId });
                if (deleteMovie.deletedCount === 1) {
                    res.status(200).json({ status: 200, message: 'Movie deleted successfully' });
                } else {
                    res.status(404).json({ status: 404, message: 'Movie not found' });
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
