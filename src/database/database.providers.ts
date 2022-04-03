import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => await createConnection({
      type: 'postgres', // mysql
      host: 'localhost', // localhost
      port: 5432, // 3306
      username: 'postgres', // root
      password: 'postgres', // ลบ
      database: 'bank-nestjs',
      entities: [
          __dirname + '/../**/*.entity{.ts,.js}',
      ],
      synchronize: true,
      logging: true
    }),
  },
];