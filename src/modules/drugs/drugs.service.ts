import { Injectable } from '@nestjs/common';

@Injectable()
export class drugServices {

  getWelcome(): string {
    return 'hello, User (drumed)!';
  }

}