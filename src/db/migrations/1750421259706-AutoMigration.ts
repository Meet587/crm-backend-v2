import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1750421259706 implements MigrationInterface {
    name = 'AutoMigration1750421259706'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."site_visits_status_enum" AS ENUM('scheduled', 'completed', 'cancelled', 'no_show')`);
        await queryRunner.query(`CREATE TYPE "public"."site_visits_interest_level_enum" AS ENUM('high', 'medium', 'low', 'not_interested')`);
        await queryRunner.query(`CREATE TABLE "site_visits" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "lead_id" uuid, "client_id" uuid, "property_id" uuid NOT NULL, "agent_id" uuid NOT NULL, "visit_date" TIMESTAMP NOT NULL, "status" "public"."site_visits_status_enum" NOT NULL DEFAULT 'scheduled', "feedback" character varying, "interest_level" "public"."site_visits_interest_level_enum", "notes" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_33b7e3823d02ff3218134f0a277" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."follow_ups_type_enum" AS ENUM('phone_call', 'email', 'sms', 'in_person', 'whatsapp')`);
        await queryRunner.query(`CREATE TYPE "public"."follow_ups_status_enum" AS ENUM('pending', 'completed', 'cancelled', 'no_response')`);
        await queryRunner.query(`CREATE TABLE "follow_ups" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "lead_id" uuid, "client_id" uuid, "agent_id" uuid NOT NULL, "type" "public"."follow_ups_type_enum" NOT NULL, "follow_up_date" TIMESTAMP NOT NULL, "status" "public"."follow_ups_status_enum" NOT NULL DEFAULT 'pending', "purpose" character varying NOT NULL, "outcome" character varying, "next_follow_up_date" TIMESTAMP, "notes" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d510aabdff2ec7fdc67a1092157" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."commissions_status_enum" AS ENUM('pending', 'paid', 'overdue', 'disputed')`);
        await queryRunner.query(`CREATE TABLE "commissions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "deal_id" uuid NOT NULL, "builder_id" uuid NOT NULL, "amount" numeric(10,2) NOT NULL, "rate" numeric(5,2) NOT NULL, "status" "public"."commissions_status_enum" NOT NULL DEFAULT 'pending', "due_date" date, "paid_date" date, "invoice_number" character varying, "notes" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2701379966e2e670bb5ff0ae78e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "pincode"`);
        await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "area"`);
        await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "amenities"`);
        await queryRunner.query(`ALTER TABLE "properties" ADD "zip_code" character varying`);
        await queryRunner.query(`ALTER TABLE "properties" ADD "square_footage" integer`);
        await queryRunner.query(`ALTER TABLE "properties" ADD "lot_size" integer`);
        await queryRunner.query(`ALTER TABLE "properties" ADD "year_built" integer`);
        await queryRunner.query(`ALTER TABLE "properties" ADD "image_url" character varying`);
        await queryRunner.query(`ALTER TABLE "properties" DROP CONSTRAINT "FK_349ddd886ec4ff72535a9eb2379"`);
        await queryRunner.query(`ALTER TABLE "properties" ALTER COLUMN "address" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "properties" ALTER COLUMN "city" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "properties" ALTER COLUMN "state" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "properties" ALTER COLUMN "price" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "properties" ALTER COLUMN "builder_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "properties" ADD CONSTRAINT "FK_349ddd886ec4ff72535a9eb2379" FOREIGN KEY ("builder_id") REFERENCES "builders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "site_visits" ADD CONSTRAINT "FK_328de8153ac54248fcb12dcb172" FOREIGN KEY ("lead_id") REFERENCES "leads"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "site_visits" ADD CONSTRAINT "FK_ffb539b53fc84cebe4da39e2f95" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "site_visits" ADD CONSTRAINT "FK_ddc22e0cceef2fa4805e01f3888" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "site_visits" ADD CONSTRAINT "FK_fa9a9c746e4338cf9f29a3a0471" FOREIGN KEY ("agent_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follow_ups" ADD CONSTRAINT "FK_2dde8f78f85193994c0f3f6ce68" FOREIGN KEY ("lead_id") REFERENCES "leads"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follow_ups" ADD CONSTRAINT "FK_e1d92c1d9dcbcdbed8d32934ae0" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follow_ups" ADD CONSTRAINT "FK_f6e0c8c79bc9372a29d59bf045b" FOREIGN KEY ("agent_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "commissions" ADD CONSTRAINT "FK_c6663df7eac05ce24c617aa69dd" FOREIGN KEY ("deal_id") REFERENCES "deals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "commissions" ADD CONSTRAINT "FK_0eb08a014e4cb9558cccd3272d6" FOREIGN KEY ("builder_id") REFERENCES "builders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "commissions" DROP CONSTRAINT "FK_0eb08a014e4cb9558cccd3272d6"`);
        await queryRunner.query(`ALTER TABLE "commissions" DROP CONSTRAINT "FK_c6663df7eac05ce24c617aa69dd"`);
        await queryRunner.query(`ALTER TABLE "follow_ups" DROP CONSTRAINT "FK_f6e0c8c79bc9372a29d59bf045b"`);
        await queryRunner.query(`ALTER TABLE "follow_ups" DROP CONSTRAINT "FK_e1d92c1d9dcbcdbed8d32934ae0"`);
        await queryRunner.query(`ALTER TABLE "follow_ups" DROP CONSTRAINT "FK_2dde8f78f85193994c0f3f6ce68"`);
        await queryRunner.query(`ALTER TABLE "site_visits" DROP CONSTRAINT "FK_fa9a9c746e4338cf9f29a3a0471"`);
        await queryRunner.query(`ALTER TABLE "site_visits" DROP CONSTRAINT "FK_ddc22e0cceef2fa4805e01f3888"`);
        await queryRunner.query(`ALTER TABLE "site_visits" DROP CONSTRAINT "FK_ffb539b53fc84cebe4da39e2f95"`);
        await queryRunner.query(`ALTER TABLE "site_visits" DROP CONSTRAINT "FK_328de8153ac54248fcb12dcb172"`);
        await queryRunner.query(`ALTER TABLE "properties" DROP CONSTRAINT "FK_349ddd886ec4ff72535a9eb2379"`);
        await queryRunner.query(`ALTER TABLE "properties" ALTER COLUMN "builder_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "properties" ALTER COLUMN "price" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "properties" ALTER COLUMN "state" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "properties" ALTER COLUMN "city" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "properties" ALTER COLUMN "address" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "properties" ADD CONSTRAINT "FK_349ddd886ec4ff72535a9eb2379" FOREIGN KEY ("builder_id") REFERENCES "builders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "image_url"`);
        await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "year_built"`);
        await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "lot_size"`);
        await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "square_footage"`);
        await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "zip_code"`);
        await queryRunner.query(`ALTER TABLE "properties" ADD "amenities" text`);
        await queryRunner.query(`ALTER TABLE "properties" ADD "area" numeric(8,2)`);
        await queryRunner.query(`ALTER TABLE "properties" ADD "pincode" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "commissions"`);
        await queryRunner.query(`DROP TYPE "public"."commissions_status_enum"`);
        await queryRunner.query(`DROP TABLE "follow_ups"`);
        await queryRunner.query(`DROP TYPE "public"."follow_ups_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."follow_ups_type_enum"`);
        await queryRunner.query(`DROP TABLE "site_visits"`);
        await queryRunner.query(`DROP TYPE "public"."site_visits_interest_level_enum"`);
        await queryRunner.query(`DROP TYPE "public"."site_visits_status_enum"`);
    }

}
