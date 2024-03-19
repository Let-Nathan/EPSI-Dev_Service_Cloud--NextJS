// pages/api/movies.js
import { mongoConfigService } from "../../services/mongoConfigService";
import { OrmService } from "../../services/OrmService";

export default async function handler(req, res) {
   
    const movies = await OrmService.connectAndFind(mongoConfigService.collection.movies);
    switch(req.method) {
        case "POST":
            res.json({ status: 200, data: "POST METHOD"});
            break;
        case "GET": 
            res.json({status: 200, data: movies});
            break;
    }
}