import { defineConfig, devices } from '@playwright/test';
import { config } from 'dotenv';
import * as fs from 'fs';

const environment = process.env.ENVIRONMENT || 'default';
const envFilePath = `.env.${environment}`;

// Verifica si el archivo de entorno existe
if (environment !== 'default' && fs.existsSync(envFilePath)) {
  console.log('Environment: ', environment);
  config({ path: envFilePath, override: true });
} else {
  console.log('Environment: default (.env)');
  config({ path: '.env', override: true });
}

console.log('Loaded ENVIRONMENT:', process.env.ENVIRONMENT);

export default defineConfig({
  testDir: './e2e/tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});