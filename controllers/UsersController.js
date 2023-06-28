import sha1 from 'sha1';
import { ObjectId } from 'mongodb';
import RedisClient from '../utils/redis';
import dbClient from '../utils/db';

export async function postNew(req, res) => {
  const { email, password } = req.body;

  if (!email) res.status(400).send({ error: 'Missing email' });
  if (!password) res.status(400).send({ error: 'Missing password' });

  const emailExists = await dbClient.db.collection('users').findOne({ email });
  if (emailExists) {
    return res.status(400).send({ error: 'Already exist' });
  }

  let userId;
  const hashedPassword = sha1(password);

  const newUser = {
    email: email,
    password: hashedPassword,
  }

  try {
    await dbClient.db.collection('users').insertOne(newUser, (err) => {
      userId = newUser._id;
      return res.status(201).send({
        email: email,
        id: userId,
      });
    });
  } catch (error) {
    return res.status(err.status).send({
        'error': err,
      });
  }
};
