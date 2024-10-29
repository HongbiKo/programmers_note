// 멤버 변수 == 속성 == 프로퍼티
// 멤버 함수 == 메소드

class Employee {
  constructor(
    private _empName : string,
    private _age : number, 
    private _empJob : string
  ) {

  }

  // get/set
  get empName() {
    return this._empName;
  }

  set empName(val : string) {
    this._empName = val;
  }

  printEmp = () : void => {
    console.log(`${this._empName}의 나이는 ${this._age}이고, 직업은 ${this._empJob}입니다.`)
  }
}

let employee1 = new Employee('kim', 20, 'devloper');
employee1.empName = 'lee';
employee1.printEmp();
