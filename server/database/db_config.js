let db_config;

export default db_config = {
    user: 'postgres',
    database: 'andela-store-manager',
    password: 'point_god',
    port: 5432,
    max: 10, // max number of connection can be open to database
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};