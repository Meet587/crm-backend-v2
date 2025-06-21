import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1750500160987 implements MigrationInterface {
    name = 'AutoMigration1750500160987'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "follow_ups" ALTER COLUMN "purpose" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "follow_ups" ALTER COLUMN "purpose" SET NOT NULL`);
    }

}
