import { HttpException, HttpStatus } from "@nestjs/common";

export class CatAlreadyOwnByThisOwnerException extends HttpException {
    constructor() {
      super('This Cat already own by this owner.', HttpStatus.NOT_FOUND);
    }
  }