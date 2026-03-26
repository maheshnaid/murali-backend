
import mysql from 'mysql2/promise'
import express from 'express'
const app = express()

let database;
const connectToDatabse = async () => {
    try{
        database = await mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'krishna@12311',
        database:'world'
    })
    }catch(error){
        console.log(`Database Error ${error}`)
    }

    return database
}


export default connectToDatabse