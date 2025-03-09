// 开闭原则要求实体应该对拓展开放，对修改关闭

/* class Rectangel {
	constructor(public width: number, public height: number) {}
}

class Circle {
	constructor(public radius: number) {}
}

class AreaCalculator {
	calculate(shape: any) {
		if (shape instanceof Rectangel) {
			return shape.width * shape.height;
		} else if (shape instanceof Circle) {
			return shape.radius * shape.radius * Math.PI;
		}
	}
} */

interface Shape {
	area(): number;
}
class Rectangel implements Shape {
	constructor(public width: number, public height: number) {}
	area() {
		return this.width * this.height;
	}
}
class Circle implements Shape {
	constructor(public radius: number) {}
	area() {
		return this.radius * this.radius * Math.PI;
	}
}

class AreaCalculator {
	static calculate(shape: Shape) {
		return shape.area();
	}
}

let rect = new Rectangel(10, 20);
console.log(AreaCalculator.calculate(rect));