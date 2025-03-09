// 单一职责原则要求一个类应该只有一个引起它变化的原因，即一个类只负责一项职责。
class User {
  // 一个类只负责一项职责
  constructor(public name: string,public email:string) {}
}

class UserRespository {
  save(user: User) {
    console.log('save user');
  }
}

class EmailService {
  sendEmail(user: User) {
    console.log('send email');
  }
}