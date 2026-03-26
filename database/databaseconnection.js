
import mysql from 'mysql2/promise'

let pool;

const connectToDatabse = async () => {
    if(pool) return pool

    try{
        pool = mysql.createPool({
        host:process.env.MYSQLHOST,
        user:process.env.MYSQLUSER,
        password:process.env.MYSQLPASSWORD,
        database:process.env.MYSQLDATABASE,
        port:process.env.MYSQLPORT
    })
    return pool

    }catch(error){
        console.log(`Database Error ${error}`)
    }
}


export default connectToDatabse