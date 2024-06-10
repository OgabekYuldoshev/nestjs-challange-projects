import { JwtModuleOptions } from "@nestjs/jwt"

const ENV = process.env

export const configuration = () => ({
  dbUrl: ENV.MONGODB_URL,
  jwtConfig: {
    secret: ENV.JWT_SECRET,
    signOptions: {
      expiresIn: '1h'
    }
  } as JwtModuleOptions
})