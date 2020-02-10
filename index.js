// run backend server by npm run watch
// http://localhost:3001/api/persons
// https://kr-react-part3.herokuapp.com/api/persons

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const Person = require('./models/person');

const app = express();
//const PORT = 3001;
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Backend server start on port ${PORT}`);
});
// using cors
app.use(cors());
// To show static content, the page index.html from build folder for frontend,
//we have already copy build folder from frontend to backend on project root

app.use(express.static('build'));

// using middleware to parse body content in json format
app.use(bodyParser.json());

// instead of using body parser
// req.body  works
app.use(express.json());
// handle form submission which handle encoded url data
app.use(express.urlencoded({ extended: false }));

// using morgan middleware to log information
app.use(morgan('tiny'));

// -------------------- Get ----------------------

app.get('/api/persons', (req, res, next) => {
	Person.find({})
		.then(response => {
			res.json(response);
		})
		.catch(error => next(error));
});

// -------------------- Get Info ---------------------

app.get('/info', (req, res, next) => {
	Person.find({})
		.then(person => {
			const noOfPeople = `Phonebook has info for ${response.length} people`;
			const todayDate = new Date();
			res.send(`<p>${noOfPeople}</p><p>${todayDate}</p>`);
		})
		.catch(error => next(error));
});

// -------------------- Get Id ---------------------

app.get('/api/persons/:id', (req, res, next) => {
	const id = Number(request.params.id); // converting string to number
	Person.findById(id)
		.then(response => {
			if (!response) {
				res.status(404).send({ error: `Person with id ${id} not found` });
			} else {
				res.json(response);
			}
		})
		.catch(error => next(error));
});

// -------------------- Delete Id ---------------------

app.delete('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id);
	Person.findByIdAndRemove(id)
		.then(res.status(204).end())
		.catch(error => next(error));
});

// -------------------- Post ---------------------

app.post('/api/persons', (req, res, next) => {
	const body = req.body;
	if (!body.name) {
		return res.status(400).json({
			error: 'Name is missing'
		});
	}
	if (!body.number) {
		return res.status(400).json({
			error: 'Number is missing'
		});
	}
	new Person(body)
		.save()
		.then(response => {
			res.json(response);
		})
		.catch(error => next(error));
});

// -------------------- Put ---------------------

app.put('/api/persons/:id', (req, res, next) => {
	Person.findByIdAndUpdate(req.params.id, {
		name: req.body.name,
		number: req.body.number
	})
		.then(response => {
			res.json(response);
		})
		.catch(error => next(error));
});

// -------------------- Unknown Endpoint---------------------

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'Unknown Endpoint' });
};
app.use(unknownEndpoint);

// -------------------- Error handler -----------------------

const errHandler = (error, request, response, next) => {
	console.error(error.message);
	if (error.name === 'CastError' && error.kind === 'ObjectId') {
		return response.status(400).send({ error: 'Malformatted id' });
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message });
	}
	next(error);
};
app.use(errHandler);
