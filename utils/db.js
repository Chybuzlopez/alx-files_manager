const MongoClient = require('mongodb');

const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || 27017;
const dbName = process.env.DB_DATABASE || 'files_manager';

class DBClient {
  constructor() {
    this.db = null;
    MongoClient.connect(`mongodb://${host}:${port}/${dbName}`, { useUnifiedTopology: true }, (err, client) => {
      if (err) console.log(err);
      this.db = client.db(dbName);
      this.db.createCollection('users');
      this.db.createCollection('files');
    });
  }

  isAlive() {
    return !!this.db;
  }

  async nbUsers() {
    return this.db.collection('users').countDocuments();
  }

  async nbFiles() {
    return this.db.collection('files').countDocuments();
  }
}
const dbClient = new DBClient();

module.exports = dbClient;
