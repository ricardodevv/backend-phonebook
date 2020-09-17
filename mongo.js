const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const phone = process.argv[4]

const url = `mongodb+srv://ricardoaqf:${password}@gettingstarted.3qndk.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const phoneSchema = new mongoose.Schema({
  name: String,
  phone: String,
})

const Phone = mongoose.model('Phone', phoneSchema)

if (name && phone) {
  const newPhone = new Phone({
    name: name,
    phone: phone,
  })

  newPhone.save().then(result => {
    console.log(`${name} ${phone} added to the phonebook`)
    mongoose.connection.close()
  })
} else {
  Phone.find({}).then(result => {
    console.log('Phonebook:\n')
    result.forEach(contact => {
      console.log(contact.name, contact.phone)
    })
    mongoose.connection.close()
  })
}


/*

*/