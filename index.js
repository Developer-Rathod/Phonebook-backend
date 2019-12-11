const express = require('express');
const app = express();
const PORT = 3001;
app.listen(PORT,()=>{
    console.log(`Backend server start on port ${PORT}`);
});
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