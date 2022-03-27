import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => await createConnection({
      type: 'postgres',
      host: '192.168.1.102',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'bank-nestjs',
      entities: [
          __dirname + '/../**/*.entity{.ts,.js}',
      ],
      synchronize: true,
      logging: true
    }),
  },
];