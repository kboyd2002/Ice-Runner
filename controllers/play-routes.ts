import { Request, Response, Router } from 'express';
import { User, Scores, Character } from "../models";

// const loggedIn =  require

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
