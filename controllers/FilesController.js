import { ObjectID } from 'mongodb';
import { v4 as uuid } from 'uuid';
import mime from 'mime-types';

import redisClient from '../utils/redis';
import dbClient from '../utils/db';
import readFile from '../utils/read';
import writeFile from '../utils/write';
import fileQueue from '../worker';

export const postUpload = async (req, res) => {
  const token = req.header('X-Token');
  const userId = await redisClient.get(`auth_${token}`);

  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  const { name, type, data } = req.body;
  let { parentId, isPublic } = req.body;

  if (!parentId) parentId = 0;
  if (!isPublic) isPublic = false;
  if (!name) return res.status(400).json({ error: 'Missing name' });

  const fileTypes = ['folder', 'file', 'image'];

  if (!type || !fileTypes.includes(type)) {
    return res.status(400).json({ error: 'Missing type' });
  }
  if (!data && type !== 'folder') {
    return res.status(400).json({ error: 'Missing Data' });
  }
  if (parentId) {
    const parent = await dbClient.findFile({ _id: ObjectID(parentId) });

    if (!parent) return res.status(400).json({ error: 'Parent not found' });

    if (parent.type !== 'folder') {
      return res.status(400).json({ error: 'Parent is not a folder' });
    }
  }
  const fileData = {
    userId,
    name,
    type,
    parentId,
    isPublic,
  };

  if (type !== 'folder') {
    fileData.data = data;
    fileData.path = await writeFile(uuid(), data, type);
  }

  const newFile = await dbClient.uploadFile(fileData);

  if (type === 'image') await fileQueue.add(newFile);

  newFile.id = newFile._id;
  delete newFile._id;
  delete newFile.data;
  delete newFile.path;

  return res.json(newFile);
};
