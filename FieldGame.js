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
      this.x = 0;
      this.y = 0;
    }
    print() {
      for (let subArr of this.field) {
        console.log(subArr.join(''));
      }
    }
    updatePosition() {
      let way = prompt('Which way to go? Please enter "r" for right, "l" for left, "d" for down and "u" for up. ');
      way = way.toUpperCase();
      let field = this.field;
      if (way === 'R') {
        y += 1;
        field[x][y] = position;
      } else if (way === 'L') {
        y -= 1;
        field[x][y] = position;
      } else if (way === 'U') {
        x -= 1;
        field[x][y] = position;
      } else if (way === 'D') {
        x += 1;
        field[x][y] = position;
      } else {console.log("Please enter valid character")};
      for (let subArr of field) {
        console.log(JSON.stringify(subArr.join('')));
      };
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
      let x = this.x;
      let y = this.y;
      let position = '*';
      this.field[x][y] = position;
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
  ]);

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