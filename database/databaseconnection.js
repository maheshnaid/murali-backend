
import mysql from 'mysql2/promise'


const connectToDatabse = async () => {
    try{
        const database = mysql.createPool({
        host:process.env.MYSQLHOST,
        user:process.env.MYSQLUSER,
        password:process.env.MYSQLPASSWORD,
        database:process.env.MYSQLDATABASE,
        port:process.env.MYSQLPORT
    })
    return database
    }catch(error){
        console.log(`Database Error ${error}`)
    }
}


export default connectToDatabse