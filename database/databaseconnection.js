
import mysql from 'mysql2/promise'
import express from 'express'


let database;
const connectToDatabse = async () => {
    try{
        database = await mysql.createConnection({
        host:process.env.MYSQLHOST,
        user:process.env.MYSQLUSER,
        password:process.env.MYSQLPASSWORD,
        database:process.env.MYSQLDATABASE,
        port:process.env.MYSQLPORT
    })
    }catch(error){
        console.log(`Database Error ${error}`)
    }

    return database
}


export default connectToDatabse