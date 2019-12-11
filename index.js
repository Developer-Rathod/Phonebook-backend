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

app.get('/api/persons', (request, response) => {
    response.json(persons)
  })
app.get('/info', (request, response) =>{
    const noOfPeople = persons.length;
    const todayDate = new Date();
    response.send(`<p> Ponebook has info of ${noOfPeople}</p><p> ${todayDate}</p>`)
})  