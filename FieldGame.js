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
      this.currPosition = this.field[this.x][this.y];
      this.field[this.x][this.y] = pathCharacter;
    }
    print() {
      for (let subArr of this.field) {
        console.log(subArr.join(''));
      }
    }
    updatePosition() {
      let way = prompt('Which way to go? Please enter "r" for right, "l" for left, "d" for down and "u" for up. ');
      way = way.toUpperCase();
      if (way === 'R') {
        this.y += 1;
        this.currPosition = this.field[this.x][this.y];
      } else if (way === 'L') {
        this.y -= 1;
        this.currPosition = this.field[this.x][this.y];
      } else if ((way === 'U') & (this.x > 0)) {
        this.x -= 1;
        this.currPosition = this.field[this.x][this.y];
      } else if ((way === 'D') & (this.x < (this.field.length -1))) {
        this.x += 1;
        this.currPosition = this.field[this.x][this.y];
      } else if ((way === 'U') & (this.x <= 0)){
        this.currPosition = undefined;
      } else if ((way === 'D') & (this.x >= (this.field.length -1))){
        this.currPosition = undefined;
      } else {console.log("Please enter a valid character.")};
    }
    check() {
      if (this.currPosition === hat) {
        console.log("You found hat. Congratulations! You won!");
        this.continueGame = false;
      } else if (this.currPosition === hole) {
        console.log("You felt in a hole. You've lost. Game over.");
        this.continueGame = false;
      } else if (this.currPosition === undefined) {
        console.log("You went outside the field. Game over.");
        this.continueGame = false;
      } else if (this.currPosition === fieldCharacter) {
        this.continueGame = true;
      this.field[this.x][this.y] = pathCharacter;
      }
    }
    loop() {
      while (this.continueGame === true) {
        this.print();
        this.updatePosition();
        this.check();
      }
    }
    static randomField(height, width, percentage) {
      let arr = Array(width).fill(fieldCharacter);
      let twoDimArr = Array(height).fill(arr);
      let ranHIndex = Math.floor(Math.random()*height);
      let ranWIndex = Math.floor(Math.random()*width);
      let places = width*height;
      let holePlaces = Math.floor(percentage*places);
      for (let i=0; i<holePlaces; i++) {
        twoDimArr[ranHIndex][ranWIndex] = hole;
      };
      twoDimArr[ranHIndex][ranWIndex] = hat;
      return twoDimArr;
    }
  };

const myField = new Field([
    ['░', '░', '░','░', 'O'],
    ['░', 'O', 'O', '░', '░'],
    ['O', 'O', '░', 'O', '░'],
    ['░', '░', '░', '░', '░'],
    ['░', '^', 'O','░', 'O'],
  ], 1, 0);

myField.loop();