import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuilderContactEntity } from '../db/entities/builder-contact.entity';
import { BuilderEntity } from '../db/entities/builder.entity';
import { BuilderContactRepository } from '../db/repositories/builder-contact.repository';
import { BuilderRepository } from '../db/repositories/builder.repository';
import { BuilderController } from './builder.controller';
import { BuilderService } from './builder.service';

@Module({
  imports: [TypeOrmModule.forFeature([BuilderEntity, BuilderContactEntity])],
  controllers: [BuilderController],
  providers: [
    BuilderService,
    {
      provide: 'builderRepositoryInterface',
      useClass: BuilderRepository,
    },
    {
      provide: 'builderContactRepositoryInterface',
      useClass: BuilderContactRepository,
    },
  ],
})
export class BuilderModule {}
