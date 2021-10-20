require('dotenv').config()
const express = require ('express')
const app = express()
const mysql = require('mysql2')
//registramos um middleware
app.use(express.json())

const { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE, PORT } = process.env
const porta = PORT || 3000

app.listen(porta, () => console.log(`Em execução. Porta: ${porta}.`))

app.get('/medicos', (req, res) => {
    const connection = mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_DATABASE
    })
    const sql = 'SELECT * FROM tb_medico'
    connection.query(
        sql,
        (err, results, fields) => {
            console.log(results)
            console.log(fields)
            res.send('OK')
        }
    )
})


app.get('/pacientes', (req, res) => {
    const connection = mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_DATABASE
    })
    const sql = 'SELECT * FROM tb_paciente'
    connection.query(
        sql,
        (err, results, fields) => {
            res.json(results)
        }
    )
})


app.post('/medicos', (req, res) => {
    const connection = mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_DATABASE
    })
    const { crm, nome } = req.body
    let sql = 'INSERT INTO tb_medico (crm, nome) VALUES (?, ?)'
    connection.query(
        sql,
        [crm, nome],
        (err, results, fields) => {
            console.log(results)
            res.send('OK')
        }
    )
})