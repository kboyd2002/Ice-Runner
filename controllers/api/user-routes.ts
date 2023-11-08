
import { Router, Request, Response } from 'express';
import { User } from '../../models';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

const router: Router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const newUser: any = req.body;
    newUser.password = await bcrypt.hash(req.body.password, 10);

    const userData = await User.create({
      username: req.body.username,
      password: req.body.password,
      id: uuidv4(),
    });

    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!newUser) {
      res
        .status(400)
        .json({ message: 'No such User ID. Please try again, or create an account' });
      return;
    }

    const newUser: any = user.get({ plain: true });

    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Invalid password. Please try again.' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json({ message: 'Thanks for logging in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/logout', (req: Request, res: Response) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

export default router;
