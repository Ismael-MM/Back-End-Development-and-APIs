require('dotenv').config();
const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let Person;


// esquemas
const personSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,} , // String is shorthand for {type: String}
  age: Number,
  favoriteFoods: [String],
});


//modelos
Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {

  let person = new Person({
    name: 'John Doe',
    age: 25,
    favoriteFoods: ['pizza', 'hamburger']
  });

  person.save(function(err, data) {

    if (err) {
      return done(err);
    }
    done(null , data);
  });
};


let arrayOfPeople = [
  {name: "Frankie", age: 74, favoriteFoods: ["Del Taco"]},
  {name: "Sol", age: 76, favoriteFoods: ["roast chicken"]},
  {name: "Robert", age: 78, favoriteFoods: ["wine"]}
];

const createManyPeople = (arrayOfPeople, done) => {

  Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  })
};

const findPersonById = function(personId, done) {
  Person.findById(personId, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, person) => {
    if(err) return console.log(err); 

    person.favoriteFoods.push(foodToAdd);

    person.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet},{new: true}, (err, data) => {
    if(err) return console.log(err);
    done(null, data);
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({ name: nameToRemove},(err, data) => {
    if(err) return console.log(err);
    done(null, data);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  let findQuery = Person.find({favoriteFoods: foodToSearch});

  findQuery.sort({name:1})
  findQuery.limit(2)
  findQuery.select({age: 1 });
  findQuery.exec(function(err, data) {
    if(err) return console.log(err);
    done(null , data);
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
