/* 
SQL Controller:
  - Creates the connection to SQL Database
  - Establishes Client for Querying and Release for Ending Connection
*/

// import of types
import { Pool, PoolClient } from 'pg';

const pg_URI = 'postgres://szflmvfg:2w-QgFR-qcMC1sYnmMd1XWOccmlOfyAc@bubble.db.elephantsql.com/szflmvfg';

// establishes connection to DB
const pool = new Pool({
  connectionString: pg_URI
})

export default async function connectToDatabase() {

  interface sqlFuncs {
    dbClient?: PoolClient, // connection
    dbRelease?: () => void // disconnection
  }

  const dbFuncs: sqlFuncs = {};

  try {
    const client = await pool.connect();
    console.log('Connected!');

    dbFuncs.dbClient = client; // PERSISTS CONNECTION THROUGH MIDDLEWARE
    dbFuncs.dbRelease = () => client.release(); // ENDS CONNECTION

    return dbFuncs;

  } catch (error) {
    console.log('Error connecting to SQL Database: ', error);
    throw error;
  }
};

// connect to sql

// const {dbClient, dbRelease} = connectToDatabase()

// dbClient.query('Query String', [values])

// at the end, dbRelease()