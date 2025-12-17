import { ConfigService } from '@nestjs/config';
import { Knex } from 'knex';

export const createKnexConfig = (configService: ConfigService): Knex.Config => {
  const databaseUrl = configService.get<string>('database.url');
  const nodeEnv = configService.get<string>('nodeEnv') || 'development';

  // If DATABASE_URL is provided, use it directly
  if (databaseUrl) {
    return {
      client: 'pg',
      connection: databaseUrl,
      pool: {
        min: configService.get<number>('database.pool.min') || 2,
        max: configService.get<number>('database.pool.max') || 10,
      },
      migrations: {
        directory: './src/database/migrations',
        extension: 'ts',
        tableName: 'knex_migrations',
      },
      seeds: {
        directory: './src/database/seeds',
        extension: 'ts',
      },
      debug: nodeEnv === 'development',
    };
  }

  // Otherwise, use individual connection parameters
  return {
    client: 'pg',
    connection: {
      host: configService.get<string>('database.host'),
      port: configService.get<number>('database.port'),
      user: configService.get<string>('database.user'),
      password: configService.get<string>('database.password'),
      database: configService.get<string>('database.name'),
      ssl:
        configService.get<string>('database.ssl') === 'true'
          ? { rejectUnauthorized: false }
          : false,
    },
    pool: {
      min: configService.get<number>('database.pool.min') || 2,
      max: configService.get<number>('database.pool.max') || 10,
    },
    migrations: {
      directory: './src/database/migrations',
      extension: 'ts',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './src/database/seeds',
      extension: 'ts',
    },
    debug: nodeEnv === 'development',
  };
};
