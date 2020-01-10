const mongoose = require('mongoose')
require('dotenv').config()
mongoose.Promise = global.Promise;

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(console.log('Connected to MongoDB'))
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message)
  })

  const personSchema = new mongoose.Schema({
    name: { required: true, unique: true, type: String, minlength: 3 },
    number: { type: String, required: true, minlength: 8 }
  })

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)