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
    static generateField(height, width, percentage) {
      let twoDimArr = Array(height).fill().map(() => Array(width).fill(fieldCharacter));
      let places = width*height;
      let holePlaces = Math.floor(percentage*places/100);
      let i = 0;
      while (i<holePlaces) {
        twoDimArr[Math.floor(Math.random()*height)][Math.floor(Math.random()*width)] = hole;
        i++;
      };
      twoDimArr[Math.floor(Math.random()*height)][Math.floor(Math.random()*width)] = hat;
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

let newField = Field.generateField(8,10,30);
let secondField = Field.generateField(40,30,10);
let thirdField = Field.generateField(50,80,70);
/*for (let subArr of newField) {
  console.log(subArr.join(''));
};
console.log('-------')
for (let subArr of secondField) {
  console.log(subArr.join(''));
};
console.log('-------')
for (let subArr of thirdField) {
  console.log(subArr.join(''));
}*/

let piotrkaField = Field.generateField(30,30,50);
const piotrkaGra = new Field(piotrkaField, 10, 10);
//piotrkaGra.loop();

function solvable(inputField, u, w) {
  let field = inputField;
  field[u][w] = fieldCharacter;
  console.log(field[u][w]);
  let blankIndexes = [];
  for (let x=0; x<field.length; x++) {
    for (let y=0; y<field[0].length; y++) {
      if (field[x][y] === fieldCharacter) {
        blankIndexes.push([x,y]);
      }
    }
  };
  function searchForArray(haystack, needle){
    var i, j, current;
    for(i = 0; i < haystack.length; ++i){
      if(needle.length === haystack[i].length){
        current = haystack[i];
        for(j = 0; j < needle.length && needle[j] === current[j]; ++j);
        if(j === needle.length)
          return i;
      }
    }
    return -1;
  };
  function checkIfBlank(a, b) {
    if((searchForArray(blankIndexes, [a, b]) >= 0)) {
      return true;
    } else {return false;}
  };
  console.log(checkIfBlank(0,3));
  console.log(checkIfBlank(0,4));
  console.log(checkIfBlank(3,1));
  console.log(checkIfBlank(3,2));
  let fieldIndexes = [];
  for (let x=0; x<field.length; x++) {
    for (let y=0; y<field[0].length; y++) {
      if (field[x][y] === fieldCharacter || field[x][y] === hat || field[x][y] === hole  || field[x][y] === pathCharacter ) {
        fieldIndexes.push([x,y]);
      }
    }
  };
  function checkIfFieldIndex(a, b) {
    if(searchForArray(fieldIndexes, [a, b]) >= 0) {
      return true;
    } else {return false;}
  };
  console.log(checkIfFieldIndex(10,8));
  console.log(checkIfFieldIndex(4,4));
  console.log(checkIfFieldIndex(0,0));
  const wentThere = [];
  function goToHat(x, y) {
    console.log(x, y)
    if ((checkIfFieldIndex(x ,y) === true)) {
      console.log('przed czapka');
    if (checkIfFieldIndex(x-1 ,y)) {
      if (field[x-1][y] === hat) {
        console.log('hat');
        return true;
      }
    };
    if (checkIfFieldIndex(x+1 ,y)) {
      if (field[x+1][y] === hat) {
        console.log('hat');
        return true;
      }
    };
    if (checkIfFieldIndex(x ,y-1)) {
      if (field[x][y-1] === hat) {
        console.log('hat');
        return true;
      }
    };
    if (checkIfFieldIndex(x ,y+1)) {
      if (field[x][y] === hat) {
        console.log('hat');
        return true;
      }
    };
    if (field[x+1][y] === hat) {
        console.log('hat');
        return true;
      }
    };
    if ((searchForArray(wentThere, [x, y])) < 0) {
      if (checkIfBlank(x-1, y)) {
        console.log('jeden');
        goToHat(x-1, y);
        wentThere.push([x-1,y]);
      };
      if (checkIfBlank(x+1, y)) {
        console.log('dwa');
        goToHat(x+1, y);
        wentThere.push([x+1,y]);
      };
      if (checkIfBlank(x, y-1)) {
        console.log('trzy');
        goToHat(x, y-1);
        wentThere.push([x,y-1]);
      };
      if (checkIfBlank(x, y+1)) {
        console.log('cztery');
        goToHat(x, y+1);
        wentThere.push([x,y+1]);
      } else {
        console.log('o nie');
        return false;
      };
    } else {
      console.log('to tutaj');
      return false;
    }
  };
  console.log('przedostatni');
  return goToHat(u, w);
};

//console.log(solvable(piotrkaField, 10, 10));
const greenField = [
  ['░', '░', '^','░', 'O'],
  ['░', 'O', 'O', '░', '░'],
  ['O', 'O', '░', 'O', '░'],
  ['░', '░', '░', '░', '░'],
  ['░', '^', 'O','░', 'O']
];
console.log(solvable(greenField, 0, 0));
//console.log(solvable(newField, 0, 0));
//console.log(solvable(secondField, 0, 0));
//console.log(solvable(thirdField, 0, 0));