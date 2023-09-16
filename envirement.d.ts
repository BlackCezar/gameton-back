declare global {
    namespace NodeJS {
      interface ProcessEnv {
        TOKEN: string;
        PORT: number;
      }
    }
  }
  
  export {}
  