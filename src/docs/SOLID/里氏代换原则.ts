// 里氏替换原则要求子类必须能够替换它的基类
// 即子类可以在任何地方替换基类，并且原有的程序逻辑不变且正确

/* class Bird {
  fly() {
    console.log('Bird can fly');
  }
}

class Penguin extends Bird {
  fly() {
    throw new Error('Penguins cannot fly');
  }
}

function makeBirdFly(bird: Bird) {
  bird.fly();
} 
// 反例  
*/

class Bird {
  move() {
    console.log('Bird can fly');
  }
}

class Penguin extends Bird {
  move() {
    console.log('Penguins can swim');
  }
}

function makeBirdMove(bird: Bird) {
  bird.move();
}
