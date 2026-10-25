import { chromium, defineConfig, devices } from '@playwright/test';

export default defineConfig({
  fullyParallel: true,
  timeout: 30000,
  expect: {
    timeout: 5000
  },
  reporter: 'html',
  use: {
    browserName: 'chromium',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure'
  },
  projects: [ {
    name: 'saucedemo',
    testDir: './saucedemo/tests',
    use: {
      baseURL: 'https://www.saucedemo.com'
    }
  },
  {
    name: 'herokuapp',
    testDir: './herokuapp/tests',
    use: {
      baseURL: 'https://restful-booker.herokuapp.com'
    }
  }
    
  ]

 
})
