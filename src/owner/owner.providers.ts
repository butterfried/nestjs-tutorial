import { Connection } from 'typeorm';
import { Address } from './entities/address.entity';
import { Owner } from './entities/owner.entity';

export const ownerProviders = [
  {
    provide: 'OWNER_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Owner),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'ADDRESS_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Address),
    inject: ['DATABASE_CONNECTION'],
  },
];