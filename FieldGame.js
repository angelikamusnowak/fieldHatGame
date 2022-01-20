const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field) {
      this.field = field;
      this.currPosition = this.field[0][0];
      this.continueGame = true;
    }
    print() {
      for (let subArr of this.field) {
        console.log(subArr.join(''));
      }
    }
    updatePosition() {
      let way = prompt('Which way to go? Please enter "r" for right, "l" for left, "d" for down and "u" for up. ');
      way = way.toUpperCase();
      this.currPosition = pathCharacter;
      if (way === 'R') {
        this.field.splice(1, 1, '*');
       } else if (way === 'L') {
        this.currPosition = this.field[x][y-1];
       } else if (way === 'U') {
        this.currPosition = this.field[x+1][y];
       } else if (way === 'D') {
        this.currPosition = this.field[x-1][y];
       } else {console.log("Please enter valid character")};
      this.currPosition = pathCharacter;
    }
    check() {
      if (this.currPosition === hat) {
        console.log("You found hat");
        this.continueGame = false;
      } else if (this.currPosition === hole) {
        console.log("You felt in a hole");
        this.continueGame = false;
      } else if (this.currPosition === undefined) {
        console.log("You went outside the field");
        this.continueGame = false;
      } else if (this.currPosition === fieldCharacter) {
        this.continueGame = true;
      }
    }
    loop() {
      while (this.continueGame === true) {
        this.print();
        this.updatePosition();
        this.check();
      }
    }
  };

const myField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
  ], 0, 0);

myField.loop();

/*function updatePosition(field, way) {
  let x = 0;
  let y = 0;
  let position = '*';
  field[x][y] = position;
  if (way === 'R') {
    field[x][y+1] = position;
   } else if (way === 'L') {
    field[x][y-1] = 'A';
   } else if (way === 'U') {
    field[x+1][y] = 'A';
   } else if (way === 'D') {
    field[x-1][y] = 'A';
   } else {console.log("Please enter valid character")};
  console.log(JSON.stringify(field));
};*/

updatePosition(myField, 'R');