import { ForbiddenWordController } from './../forbiddenWord/forbidden.word.controller';
import { ForbiddenWordModule } from './../forbiddenWord/forbidden.word.module';
import { LikeModule } from './../like/like.module';
import { LikeController } from './../like/like.controller';
import { CommentController } from './../comment/comment.controller';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from './../config';
import { UserModule } from './../user';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { CommentModule } from 'modules/comment';

@Module({
  imports: [
    UserModule,
    CommentModule,
    LikeModule,
    ForbiddenWordModule,
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET_KEY'),
          signOptions: {
            ...(configService.get('JWT_EXPIRATION_TIME')
              ? {
                  expiresIn: Number(configService.get('JWT_EXPIRATION_TIME')),
                }
              : {}),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController,CommentController,LikeController,ForbiddenWordController],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule.register({ defaultStrategy: 'jwt' })],
})
export class AuthModule {}
