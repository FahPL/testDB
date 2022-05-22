const { connection } = require('../db/sql_connection');

const query = (options, value = []) => {
    return new Promise((resolve, reject) => {
        connection.getConnection(function (err,conn) {
            if (err) {
                throw err
            } else {
                console.log('You are now connected with start-db database...');
                conn.query(options, value, function (error, results, fields) {
                    // console.log(results);
                    if (error) {
                        reject(error);
                    } else {
                        resolve(JSON.parse(JSON.stringify(results)));
                    }
                    conn.release()
                });
            }

        });

    });
};

module.exports = {
    query
};