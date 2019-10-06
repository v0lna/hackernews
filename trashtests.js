class Person {
  constructor(name, bornYear) {
    this.name = name;
    this.bornYear = bornYear;
  }

  getFullName() {
    console.log(this);
    return `my name is ${
      this.name
    } and my age is ${this.getMyAge()} years old mafucka`;
  }
  getMyAge() {
    return new Date().getFullYear() - this.bornYear;
  }
}

const oleg = new Person("Oleja", 1998);

console.log(oleg.getFullName());
