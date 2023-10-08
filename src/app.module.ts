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
    host: 'localhost',
    port: 5432,
    password: 'spidy@2211',
    username: 'spidy',
    entities: [User],
    database: 'notesdbdesignway',
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
