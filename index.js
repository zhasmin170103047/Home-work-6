
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
 

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Bellial999',
  database: 'crud_db'
});
 

conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});
 

app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/assets',express.static(__dirname + '/public'));
 

app.get('/',(req, res) => {
  let sql = "SELECT * FROM p";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.render('views',{
      results: results
    });
  });
});
 
//route for insert data
app.post('/save',(req, res) => {
  let data = {name: req.body.name};
  let sql = "INSERT INTO p SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.redirect('/');
  });
});
 
//route for update data
app.post('/update',(req, res) => {
  let sql = "UPDATE p SET name='"+req.body.name+"', product_price='"+"' WHERE id="+req.body.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.redirect('/');
  });
});
 
//route for delete data
app.post('/delete',(req, res) => {
  let sql = "DELETE FROM p WHERE id="+req.body.id+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.redirect('/');
  });
});
 
//server listening
app.listen(8000, () => {
  console.log('Server is running at port 8000');
});
