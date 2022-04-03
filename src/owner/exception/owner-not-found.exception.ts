import { HttpException, HttpStatus } from "@nestjs/common";

export class OwnerNotFoundException extends HttpException {
    constructor() {
      super('Owner not found.', HttpStatus.NOT_FOUND);
    }
  }