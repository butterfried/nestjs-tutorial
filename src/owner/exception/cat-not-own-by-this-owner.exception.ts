import { HttpException, HttpStatus } from "@nestjs/common";

export class CatNotOwnByThisOwnerException extends HttpException {
    constructor() {
      super('Cat not own by this owner.', HttpStatus.NOT_FOUND);
    }
  }