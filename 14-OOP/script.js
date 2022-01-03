'use strict';
/*
// Constructor functions and the new operator--------------------------------

const Person = function (firstName, birthYear) {
  //instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never do this
  //   this.calcAge = function(){
  //       console.log(2037 - this.birthYear);
  //   }
};

const jonas = new Person('Jonas', 1991);
console.log(jonas);

// 1. New {} is created
// 2. function is called, this = {}
// 3. {} is linked to prototype
// 4. function automatically return {}

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);
console.log(matilda, jack);

console.log(jonas instanceof Person); // true

Person.hey = function () {
  console.log('Hey there!');
  console.log(this);
};

Person.hey();
// Prototypes--------------------------------------------------------------

console.log(Person.prototype);

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

jonas.calcAge();
matilda.calcAge();

console.log(jonas.__proto__);
console.log(jonas.__proto__ == Person.prototype); // true

console.log(Person.prototype.isPrototypeOf(jonas)); // true
console.log(Person.prototype.isPrototypeOf(Person)); // false

// .prototypeOfLinkedObjects olis parempi määritelmä

Person.prototype.species = 'Homo Sapiens';
console.log(jonas.species, matilda.species); // species saadaan prototyypistä, ei objektista

console.log(jonas.hasOwnProperty('firstName')); // true
console.log(jonas.hasOwnProperty('species')); // false

console.log(jonas.__proto__);
console.log(jonas.__proto__.__proto__); // object.prototype
console.log(jonas.__proto__.__proto__.__proto__); // null

console.dir(Person.prototype.constructor);

// Prototypal inheritance on Built-in objects

const arr = [3, 6, 3, 4, 6, 7, 8, 8, 3]; // new Array === []
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype); // true

console.log(arr.__proto__.__proto__);

Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

const h1 = document.querySelector('h1');
console.dir(h1);

console.dir(x => x + 1);

// Coding challenge 1-----------------------------------------------------

const Car = function (mk, spd) {
  this.make = mk;
  this.speed = spd;

  console.log(`'${this.make}' going at ${this.speed} km/h`);
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`'${this.make}' going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`'${this.make}' going at ${this.speed} km/h`);
};

const car1 = new Car('BMW', 120);
const car2 = new Car('Mercedes', 95);

car1.accelerate();
car2.accelerate();
car1.brake();
car2.brake();

// ES6 classes---------------------------------------------------

// class expression
//const PersonCl = class {};

// class declaration
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  // Instance methods
  // Methods will be added to .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  set fullName(name){
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  static hey() {
    console.log('Hey there!');
    console.log(this);
  }
}

const jessica = new PersonCl('Jessica Davis', 1996);
console.log(jessica);
jessica.calcAge();
console.log(jessica.age);

console.log(jessica.__proto__ === PersonCl.prototype); // true

// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}`);
// };

jessica.greet();

// 1. Classes are NOT hoisted, cannot be used before daclaration
// 2. Classes are first-class citizens, can be passed into functions and be returned from functions
// 3. Classes are executed in strict mode

const walter = new PersonCl('Walter White', 1965);

PersonCl.hey();

// Setters and getters--------------------------------------------------

const account = {
  owner: 'jonas',
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

console.log(account.latest);

account.latest = 50;
console.log(account.movements);

//


// Object.create------------------------------------------------------------

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
console.log(steven);
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge();

console.log(steven.__proto__ === PersonProto); // true

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979);
sarah.calcAge();


// Coding challenge 2---------------------------------------------------------

class carES6 {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`'${this.make}' going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`'${this.make}' going at ${this.speed} km/h`);
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(spdUS) {
    this.speed = spdUS * 1.6;
  }
}

const ford = new carES6('Ford', 120);
console.log(ford);
console.log(ford.speedUS);
ford.accelerate();
ford.accelerate();
ford.brake();
ford.accelerate();
ford.speedUS = 90;
console.log(ford);


// Inheritance between "Classes": Constructor functions-------------------------

const Person = function (firstName, birthYear) {
  //instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};

// Linking prototypes
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 2020, 'Computer Science');
mike.introduce();
mike.calcAge();

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

console.log(mike instanceof Student);
console.log(mike instanceof Person);
console.log(mike instanceof Object);

Student.prototype.constructor = Student; // constructor on muuten Person luokasta
console.dir(Student.prototype.constructor);


// Coding challenge 3

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;

  //console.log(`'${this.make}' going at ${this.speed} km/h`);
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`'${this.make}' going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`'${this.make}' going at ${this.speed} km/h`);
};

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge -= 1;
  console.log(
    `'${this.make}' going at ${this.speed} km/h, with a charge of ${this.charge}%`
  );
};

EV.prototype.constructor = EV;

const tesla = new EV('Tesla', 120, 22);
console.log(tesla);

tesla.accelerate();
tesla.accelerate();
tesla.brake();
tesla.chargeBattery(90);
console.log(tesla);
console.dir(EV.prototype.constructor);


// Inheritance Between "Classes": ES6 classes--------------------------------

class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  // Instance methods
  // Methods will be added to .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  // Static method
  static hey() {
    console.log('Hey there!');
    console.log(this);
  }
}

class StudentCl extends PersonCl {
  // Constructoria ei tarvi jos muuttujat pysyvät samana kuin parent classi
  constructor(fullName, birthYear, course) {
    // Always need to happen first!
    super(fullName, birthYear);
    this.course = course;
  }
  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  calcAge() {
    console.log(
      `I'm ${
        2037 - this.birthYear
      } years old, but as a student I feel more like ${
        2037 - this.birthYear + 10
      }`
    );
  }
}

const martha = new StudentCl('Martha Jones', 2012, 'Computer Science');
console.log(martha);
martha.introduce();
martha.calcAge();


// Inheritance Between "Classes": Object.create--------------------------------

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto);

jay.init('Jay', 2010, 'Computer Science');
jay.introduce();
jay.calcAge();


// Another Class Example---------------------------------------------------------
// Encapsulation: Protected properties and methods-------------------------------
// Encapsulation: Private class fields and methods-------------------------------

// 1) Public fields
// 2) Private fields
// 3) Public methods
// 4) Private methods
// (There is also the static versions)

class Account {
  // 1) Public fields (instances)-- kaikilla luoduilla objekteilla on nämä muuttujat, näitä ei löydy prototyypistä.
  locale = navigator.language;

  // 2) Private fields ( instances)-- ei protossa
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    //Protected property => _attribute
    this.#pin = pin;
    // this._movements = [];
    // this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${owner}`);
  }

  // 3) Public methods
  // Public interface
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log('Loan approved');
      return this;
    }
  }

  static helper() {
    console.log('Helper');
  }

  // 4) Private methods -- selaimissa näkyy vielä private fieldinä, joten ei toimi kunnolla vielä

  // #approveLoan(val) {
  //   return true;
  // }

  _approveLoan(val) {
    return true;
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);
console.log(acc1);

// acc1._movements.push(250);
// acc1._movements.push(-140);
acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);
// acc1.#approveLoan(1000);
console.log(acc1.getMovements());

console.log(acc1);
// console.log(acc1.#pin); // error

//console.log(acc1.#movements); // error

Account.helper();

// Chaining methods

acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);
console.log(acc1.getMovements());
*/

// Coding challenge 4

class carCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`'${this.make}' going at ${this.speed} km/h`);
    return this;
  }

  brake() {
    this.speed -= 5;
    console.log(`'${this.make}' going at ${this.speed} km/h`);
    return this;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(spdUS) {
    this.speed = spdUS * 1.6;
  }
}

class EVCl extends carCl {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge -= 1;
    console.log(
      `'${this.make}' going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }%`
    );
    return this;
  }
}

const tesla = new EVCl('Tesla', 120, 22);
console.log(tesla);

tesla.accelerate();
tesla.accelerate();
tesla.brake();
tesla.chargeBattery(50);
console.log(tesla);
console.dir(EVCl.prototype.constructor);

tesla.accelerate().chargeBattery(70).brake().accelerate();
