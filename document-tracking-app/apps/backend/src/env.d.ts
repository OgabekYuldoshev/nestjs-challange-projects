declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URL: string;
      JWT_SECRET: string
    }
  }
}

export { }