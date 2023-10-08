import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { NotesModule } from './notes/notes.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'dpg-ckh62t212bvs73au8d5g-a',
    port: 5432,
    password: 'nrAVT8mFUVXZbdpP05Qn7bVgw5B4UJez',
    username: 'notesapi_user',
    entities: [User],
    database: 'notesapi',
    synchronize: true,
    logging: true,
    autoLoadEntities: true,
  }),
    UsersModule,
    NotesModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
