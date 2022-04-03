import { HttpException, HttpStatus } from "@nestjs/common";

export class CatAlreadyHasOwnerException extends HttpException {
    constructor() {
      super('This Cat already has owner.', HttpStatus.NOT_FOUND);
    }
  }