// run backend server by npm run watch
// http://localhost:3001/api/persons

const express = require('express');
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

const app = express();
//const PORT = 3001;
const PORT = process.env.PORT || 3001
app.listen(PORT,()=>{
    console.log(`Backend server start on port ${PORT}`);
});
// using cors
app.use(cors())

// using middleware to parse body content in json format
app.use(bodyParser.json())

// using morgan middleware to log information
app.use(morgan('tiny'))

/* app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join('').push(JSON.stringify(req.body))
}))
 */
let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
      },
      {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
      },
      {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
      },
      {
        "name": "kalpana",
        "number": "23456",
        "id": 5
      }
    
]
// 3.1 
app.get('/api/persons', (request, response) => {
    response.json(persons)
  })
 // 3.2 
app.get('/info', (request, response) =>{
    const noOfPeople = persons.length;
    const todayDate = new Date();
    response.send(`<p> Ponebook has info of ${noOfPeople}</p><p> ${todayDate}</p>`)
})  
// 3.3
app.get('/api/persons/:id', (request, response)=>{
 const id = Number(request.params.id); // converting string to number
 const person = persons.find( person => person.id === id )
 if(person){
     console.log(person)
     response.json(person)
 }
 else{
     response.status(404).end()
 }
})
// 3.4
app.delete('/api/persons/:id', (require, response)=>{
 const id = Number(request.params.id);
 persons = persons.filter( person => person.id !== id )
 //console.log(persons)
 response.status(204).end()
})
// 3.5 
const getRandomNumber = () =>{
   return Math.floor(Math.random(100) * Math.floor(100))
}

app.post('/api/persons',(request, response) => {
 const body = request.body
 if(!body.name)
 {
   return response.status(400).json({
     error:'Name is missing'})
 }
 if(!body.number)
 {
   return response.status(400).json({
     error:'Number is missing'})
 }
 const personExist = persons.find( person => person.name === body.name )
 if(personExist)
 {
    return response.status(400).json({
      error:'The name already exists in the phonebook'
    })
 }
 

   const person = {
     name:body.name,
     number:body.number,
     id: getRandomNumber(),
   }
   persons = persons.concat(person)
   //console.log(person)
   response.json(person)
 
})