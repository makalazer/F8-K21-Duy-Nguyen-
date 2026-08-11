2;
function Calc(initValue) {
  this.result = initValue;

  this.add = function (value) {
    this.result += value;
    return this;
  };

  this.minus = function (value) {
    this.result -= value;
    return this;
  };

  this.mul = function (value) {
    this.result *= value;
    return this;
  };

  this.divi = function (value) {
    this.result /= value;
    return this;
  };

  this.get = function (value) {
    return this.result;
  };
}

Calc.start = function (value) {
  return new Calc(value);
};
const result = Calc.start(10).add(5).minus(3).mul(2).divi(3).get();

console.log(result);

//Kế thừa + setter, getter

class Animal {
  constructor(name) {
    this._speed = 0;
    this.name = 'black';
  }

  get speed() {
    return this._speed;
  }

  set speed(value) {
    this._speed = value;
  }
}

class Rabbit extends Animal {
  get speed() {
    return this._speed * 1.5;
  }
}

const rabbit = new Rabbit('White Rabbit');
rabbit.speed = 10;
console.log(rabbit.speed);
const z= undefined;
const obj ={z}