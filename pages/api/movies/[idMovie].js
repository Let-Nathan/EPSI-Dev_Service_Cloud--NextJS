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
                const idMovie = req.body;
                const movie = await OrmService.connectAndFindOneById('movies', idMovie);
                if (!movie) {
                    res.status(404).json({ status: 404, message: 'Movie not found' });
                    return;
                }
                res.status(200).json({ status: 200, data: movie });
                break;
            case 'POST':
                try {
                    const newMovie = req.body;
                    const insertMovie = await OrmService.insertOne('movies', newMovie);
                    if (insertMovie.result.ok === 1) {
                        res.status(201).json({ status: 201, data: { message: 'Movie created successfully' } });
                    } else {
                        res.status(500).json({ status: 500, message: 'Error creating movie' });
                    }
                } catch (error) {
                    console.error('Error:', error);
                    res.status(500).json({ status: 500, message: 'Error creating movie' });
                }
                break;
            case 'PUT':
                try {
                    const updatedMovie = req.body;
                    if (!movieId) {
                        return res.status(400).json({ status: 400, message: 'Movie ID is required' });
                    }                
                    const updateResult = await OrmService.updateOne('movies', {_id: movieId}, { $set: updatedMovie });
                
                    if (updateResult.modifiedCount === 1) {
                        res.status(200).json({ status: 200, data: { message: 'Movie updated successfully' } });
                    } else {
                        res.status(404).json({ status: 404, message: 'Movie not found' });
                    }
                } catch (error) {
                    console.error('Error:', error);
                    res.status(500).json({ status: 500, message: 'Error updating movie' });
                }
                break;
            case 'DELETE':
                const deleteMovie = await OrmService.deleteOne('movies', {_id: movieId});
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
