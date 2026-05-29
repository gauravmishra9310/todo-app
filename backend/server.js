// server.js

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'pass123',
    database: 'todo_app'
});

db.connect((err) => {
    if(err){
        console.log(err);
    }else{
        console.log('MySQL Connected');
    }
});

// Get Todos
app.get('/todos', (req, res) => {

    db.query('SELECT * FROM todos', (err, result) => {
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    });

});

// Add Todo
app.post('/todos', (req, res) => {

    const { task } = req.body;

    db.query(
        'INSERT INTO todos(task) VALUES(?)',
        [task],
        (err, result) => {
            if(err){
                res.send(err);
            }else{
                res.send('Todo Added');
            }
        }
    );

});

// Delete Todo
app.delete('/todos/:id', (req, res) => {

    const id = req.params.id;

    db.query(
        'DELETE FROM todos WHERE id = ?',
        [id],
        (err, result) => {
            if(err){
                res.send(err);
            }else{
                res.send('Todo Deleted');
            }
        }
    );

});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});