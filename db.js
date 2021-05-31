const Pool = require("pg").Pool;

const pool = new Pool({
    user: "tidhirqdhfcwzl",
    password: "77d8e110543b36cb9b6bfc028222345a6776faea0c8367d5982628118856d241",
    host: "ec2-18-214-195-34.compute-1.amazonaws.com",
    port: 5432,
    database: "d9m3ua066jijug",
    ssl: {
        rejectUnauthorized: false
    }
});
module.exports = pool;