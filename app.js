
const express = require('express');
const app = express();
const fs = require('fs');
const morgan = require('morgan');
const path = require('path')
const bodyParser = require('body-parser');
const jsonxml = require('jsontoxml');
const estimator = require('./src/estimator.js');

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

//middleware
app.use(morgan(':method :url :status :response-time ms', {stream: accessLogStream}));
app.use(bodyParser.json());

app.post('/api/v1/on-covid-19', (req, res) => {
    res.send(estimator(req.body))
});

app.post('/api/v1/on-covid-19/xml', (req, res) => {
    res.header("Content-Type", "text/xml");
    res.send(jsonxml(estimator(req.body)))
});

app.get('/api/v1/on-covid-19/xml/logs', (req, res) => {
	res.sendFile(path.join(__dirname, './access.log'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log("Server on " + port)
});
