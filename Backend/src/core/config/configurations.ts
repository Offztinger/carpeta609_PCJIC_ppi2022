import { ConfigModuleOptions, registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export interface IConfig {
  // JWT
  jwtSecret: string;
  jwtExpiresIn: string;
  // URLS
  frontUrl: string;
  backendUrl: string;
  backendPort: number;
  // PRISMA
  databaseUrl: string;
  // POSTGRES
  postgresHost: string;
  postgresPort: number;
  postgresUser: string;
  postgresPassword: string;
  postgresDatabase: string;
  // GOOGLE
  googleClientId: string;
  googleClientSecret: string;
}

const configurations = registerAs(
  'configEnvs',
  (): IConfig => ({
    // JWT
    jwtSecret: process.env.JWT_SECRET || '',
    jwtExpiresIn: process.env.TOKEN_EXPIRATION || '',
    // URLS
    frontUrl: process.env.FRONT_URL || '',
    backendUrl: process.env.BACKEND_URL || '',
    backendPort: parseInt(process.env.BACKEND_PORT || '3080', 10) ,
    // PRISMA
    databaseUrl: process.env.DATABASE_URL || '',
    // POSTGRES
    postgresHost: process.env.POSTGRES_HOST || '',
    postgresPort: parseInt(process.env.POSTGRES_PORT || '', 10),
    postgresUser: process.env.POSTGRES_USER || '',
    postgresPassword: process.env.POSTGRES_PASSWORD || '',
    postgresDatabase: process.env.POSTGRES_DB || '',
    // GOOGLE
    googleClientId: process.env.GOOGLE_CLIENT_ID || '',
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  })
);

export default configurations;

export function configRoot(): ConfigModuleOptions {
  return {
    load: [configurations],
    isGlobal: true,
    validationSchema: Joi.object({
      // JWT
      JWT_SECRET: Joi.string().required(),
      TOKEN_EXPIRATION: Joi.string().required(),
      // URLS
      FRONT_URL: Joi.string().required(),
      BACKEND_URL: Joi.string().required(),
      BACKEND_PORT: Joi.number().required(),
      // PRISMA
      DATABASE_URL: Joi.string().required(),
      // POSTGRES
      POSTGRES_HOST: Joi.string().required(),
      POSTGRES_PORT: Joi.number().required(),
      POSTGRES_USER: Joi.string().required(),
      POSTGRES_PASSWORD: Joi.string().required(),
      POSTGRES_DB: Joi.string().required(),
      // GOOGLE
      GOOGLE_CLIENT_ID: Joi.string().required(),
      GOOGLE_CLIENT_SECRET: Joi.string().required(),
    }),
  };
}
