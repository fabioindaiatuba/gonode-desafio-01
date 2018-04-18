const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const bodyParser = require('body-parser');
const moment = require('moment');

const app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

app.set('view engine', 'njk');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('main');
});

app.get('/major', (req, res) => {
  res.render('major', { nome : req.query.nome });
});

app.get('/minor', (req, res) => {
  res.render('minor', { nome : req.query.nome });
});

app.post('/check', (req, res) => {
  if (req.body.nome && req.body.dataNascimento) {
    const idade = moment().diff(moment(req.body.dataNascimento,"YYYY-MM-DD"), 'years');
    if (idade >= 18)
      res.redirect(`major?nome=${req.body.nome}`);
    else
      res.redirect(`minor?nome=${req.body.nome}`);
  } else {
    res.redirect('/');
  }
});

app.listen(3000);
