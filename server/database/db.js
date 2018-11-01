import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new pg.Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS || '',
  port: process.env.DB_PORT,
  max: process.env.DB_MAX, // max number of connection can be open to database
  idleTimeoutMillis: process.env.DB_idleTimeoutMillis,
});

pool.connect((err, client, done) => {
  if (err) {
    return (`not able to get connection ${err}`);
    // res.status(400).send(err);
  }

  client.query((text, params, callback) => {
    done();
    // const start = Date.now();
    return pool.query(text, params, (error, res) => {
      // const duration = Date.now() - start;
      // console.log('executed query', { text, duration, rows: res.rowCount });
      callback(error, res);
    });
  });
  return ('success');
});

// pool.end();

export default pool;
