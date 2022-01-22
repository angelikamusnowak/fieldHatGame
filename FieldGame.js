const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field, x, y) {
      this.field = field;
      this.continueGame = true;
      this.x = x;
      this.y = y;
      this.currPosition = this.field[x][y];
    }
    print() {
      for (let subArr of this.field) {
        console.log(subArr.join(''));
      }
    }
    updatePosition() {
      let way = prompt('Which way to go? Please enter "r" for right, "l" for left, "d" for down and "u" for up. ');
      way = way.toUpperCase();
      this.currPosition = this.field[this.x][this.y];
      this.currPosition = pathCharacter;
      if (way === 'R') {
        this.y += 1;
        this.currPosition = this.field[this.x][this.y];
        this.currPosition = pathCharacter;
      } else if (way === 'L') {
        this.y -= 1;
        this.currPosition = this.field[this.x][this.y];
        this.currPosition = pathCharacter;
      } else if (way === 'U') {
        this.x -= 1;
        this.currPosition = this.field[this.x][this.y];
        this.currPosition = pathCharacter;
      } else if (way === 'D') {
        this.x += 1;
        this.currPosition = this.field[this.x][this.y];
        this.currPosition = pathCharacter;
      } else {console.log("Please enter valid character")};
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
        console.log(this.x);
        console.log(this.y);
        this.print();
        this.updatePosition();
        console.log(this.x);
        console.log(this.y);
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
};

updatePosition(myField, 'R');*/