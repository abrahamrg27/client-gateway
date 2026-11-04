import 'dotenv/config.js';
import joi from 'joi';

interface EnvVars {
  PORT: number;
  PRODUCT_MICROSERVICE_HOST: string;
  PRODUCT_MICROSERVICE_PORT: number;
  ORDERS_MICROSERVICE_HOST: string;
  ORDERS_MICROSERVICE_PORT: number;
}

interface EnvConfig {
  port: number;
  productMicroserviceHost: string;
  productMicroservicePort: number;
  ordersMicroserviceHost: string;
  ordersMicroservicePort: number;
}

const envsSchema = joi
  .object<EnvVars>({
    PORT: joi.number().integer().min(1).max(65535).required(),
    PRODUCT_MICROSERVICE_HOST: joi.string().required(),
    PRODUCT_MICROSERVICE_PORT: joi
      .number()
      .integer()
      .min(1)
      .max(65535)
      .required(),

    ORDERS_MICROSERVICE_HOST: joi.string().required(),
    ORDERS_MICROSERVICE_PORT: joi
      .number()
      .integer()
      .min(1)
      .max(65535)
      .required(),
  })
  .unknown(true);

const result = envsSchema.validate(process.env, { abortEarly: false });

if (result.error) {
  throw new Error(`config validation error: ${result.error.message}`);
}
const envVars = result.value;

export const envs: EnvConfig = {
  port: envVars.PORT,
  productMicroserviceHost: envVars.PRODUCT_MICROSERVICE_HOST,
  productMicroservicePort: envVars.PRODUCT_MICROSERVICE_PORT,

  ordersMicroserviceHost: envVars.ORDERS_MICROSERVICE_HOST,
  ordersMicroservicePort: envVars.ORDERS_MICROSERVICE_PORT,
} as const;
