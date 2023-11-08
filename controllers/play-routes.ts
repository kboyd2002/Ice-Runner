import { Request, Response, Router } from 'express';
import { User, Scores, Character } from "../models";
import router from './index.js';


router.get('/', async (req: Request, res: Response) => {
    try {
        const gamePlay = await User.findOne({
            include: [
            {
                model: Character,
                attributes: ['']
            }
            ]
        })
    } catch {}
})
