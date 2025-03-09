// 接口隔离原则要求类之间的依赖关系应该建立在最好的接口上
// 也就是说不能强迫一个类依赖它不需要的接口

/* // 反例
interface Animal {
  eat(): void;
  fly(): void;
}

class Dog implements Animal {
  eat() {
    console.log('Dog can eat');
  }
  fly() {
    throw new Error('Dog cannot fly');
  }
} */

interface Eater {
  eat(): void;
}
interface Flyer {
  fly(): void;
}

class Dog implements Eater {
  eat() {
    console.log('Dog can eat');
  }
}

class Bird implements Eater, Flyer {
  eat() {
    console.log('Bird can eat');
  }
  fly() {
    console.log('Bird can fly');
  }
}

export {}