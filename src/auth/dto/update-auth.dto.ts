import { PartialType } from '@nestjs/swagger';
import { CheckAuthDto } from './check-auth.dto';

export class UpdateAuthDto extends PartialType(CheckAuthDto) { }
