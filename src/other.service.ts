import { Injectable } from "@nestjs/common";
import { CommonService } from "./common.service";
@Injectable()
export class OtherService {
  constructor(private commonService: CommonService) {

  }
  log(mes) {
    this.commonService.log(mes);
    console.log('other service', mes);
  }
};