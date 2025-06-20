import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from 'src/user/user.module';
import { AuthResolver } from './auth.resolver';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule,
    ConfigModule, // aunque es global, lo incluimos por claridad
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN') || '12h',
        },
      }),
    }),
    UserModule,
  ],
  providers: [AuthService, JwtStrategy, AuthResolver],
  exports: [JwtModule],
})
export class AuthModule {}
