import { config } from 'dotenv';
import { join } from 'path';
import { z } from 'zod';

config({
  path: join(process.cwd(), `.env`),
});

const envVarsSchema = z.object({
  MONGODB_URI: z.string(),
});

const configEnv = envVarsSchema.parse(process.env);

type ConfigEnv = z.infer<typeof envVarsSchema>;

const CONFIG_ENV = 'CONFIG_ENV';

export { configEnv, CONFIG_ENV, ConfigEnv };
