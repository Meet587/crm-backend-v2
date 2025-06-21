import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1750432863458 implements MigrationInterface {
    name = 'AutoMigration1750432863458'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deals" DROP COLUMN "commission"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deals" ADD "commission" numeric(8,2)`);
    }

}
