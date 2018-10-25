import pg from 'pg';
import db_config from './db_config';

const pool = new pg.Pool(db_config);

pool.connect(function(err,client,done) {
    if(err){
        return ("not able to get connection "+ err);
        // res.status(400).send(err);
    }

    client.query((text, params, callback) => {
        done();
        // const start = Date.now();
        return pool.query(text, params, (err, res) => {
            // const duration = Date.now() - start;
            // console.log('executed query', { text, duration, rows: res.rowCount });
            callback(err, res)
        })
    });

});

// pool.end();

export default pool;




// module.exports = {
//     query: (text, params, callback) => {
//         const start = Date.now();
//         return pool.query(text, params, (err, res) => {
//             const duration = Date.now() - start;
//             console.log('executed query', { text, duration, rows: res.rowCount });
//             callback(err, res)
//         })
//     }
// };



// const profiles =
//     [
//         {
//             id: 1,
//             firstname: "Marilyn",
//             lastname: "Cole",
//             role: "admin",
//             image: "images/pix1.png"
//         },
//         {
//             id: 2,
//             firstname: "Stevie",
//             lastname: "Nichol",
//             role: "store_attendant",
//             image: "images/pix2.png"
//         },
//         {
//             id: 3,
//             firstname: "Sebastian",
//             lastname: "Salazar",
//             role: "store_attendant",
//             image: "images/pix3.png"
//         },
//         {
//             id: 4,
//             firstname: "James",
//             lastname: "Bennett",
//             role: "store_attendant",
//             image: "images/pix4.png"
//         }
//     ];