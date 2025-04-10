import { Injectable } from "@nestjs/common";
@Injectable()
export class CommonService {
  log(mes) {
    console.log('common service')
  }
};