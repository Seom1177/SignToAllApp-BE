import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controller/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
              secret: configService.get('JWT_SECRET'),
                signOptions: {
                    expiresIn: 3600,
                },
            }),
            inject: [ConfigService],
    }),
  ],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
