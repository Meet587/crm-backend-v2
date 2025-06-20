import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1750403533797 implements MigrationInterface {
    name = 'AutoMigration1750403533797'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'agent')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "email" character varying NOT NULL, "password_hash" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'agent', "first_name" character varying, "last_name" character varying, "phone" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."leads_source_enum" AS ENUM('website', 'referral', 'social_media', 'cold_call', 'walk_in')`);
        await queryRunner.query(`CREATE TYPE "public"."leads_status_enum" AS ENUM('new', 'contacted', 'qualified', 'converted', 'lost')`);
        await queryRunner.query(`CREATE TABLE "leads" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "source" "public"."leads_source_enum" NOT NULL DEFAULT 'website', "status" "public"."leads_status_enum" NOT NULL DEFAULT 'new', "notes" character varying, "assigned_agent_id" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_b3eea7add0e16594dba102716c5" UNIQUE ("email"), CONSTRAINT "PK_cd102ed7a9a4ca7d4d8bfeba406" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."clients_status_enum" AS ENUM('active', 'inactive', 'converted')`);
        await queryRunner.query(`CREATE TABLE "clients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "address" character varying, "occupation" character varying, "budget_min" numeric(10,2), "budget_max" numeric(10,2), "preferred_location" character varying, "status" "public"."clients_status_enum" NOT NULL DEFAULT 'active', "notes" character varying, "original_lead_id" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_b48860677afe62cd96e12659482" UNIQUE ("email"), CONSTRAINT "REL_d441116e564ce2ab1440fd33ec" UNIQUE ("original_lead_id"), CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."deals_stage_enum" AS ENUM('initial_contact', 'needs_analysis', 'proposal', 'negotiation', 'contract', 'closed_won', 'closed_lost')`);
        await queryRunner.query(`CREATE TABLE "deals" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "value" numeric(12,2) NOT NULL, "stage" "public"."deals_stage_enum" NOT NULL DEFAULT 'initial_contact', "probability" integer NOT NULL DEFAULT '0', "commission" numeric(8,2), "expected_close_date" date, "notes" character varying, "lead_id" uuid, "client_id" uuid, "property_id" uuid NOT NULL, "agent_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8c66f03b250f613ff8615940b4b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."properties_type_enum" AS ENUM('apartment', 'villa', 'plot', 'commercial')`);
        await queryRunner.query(`CREATE TYPE "public"."properties_status_enum" AS ENUM('available', 'sold', 'reserved', 'under_construction')`);
        await queryRunner.query(`CREATE TABLE "properties" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "address" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "pincode" character varying NOT NULL, "type" "public"."properties_type_enum" NOT NULL, "status" "public"."properties_status_enum" NOT NULL DEFAULT 'available', "price" numeric(12,2) NOT NULL, "bedrooms" integer, "bathrooms" integer, "area" numeric(8,2), "description" character varying, "amenities" text, "builder_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2d83bfa0b9fcd45dee1785af44d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."builders_status_enum" AS ENUM('active', 'inactive')`);
        await queryRunner.query(`CREATE TABLE "builders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "contact_person" character varying, "email" character varying, "phone" character varying, "address" character varying, "website" character varying, "status" "public"."builders_status_enum" NOT NULL DEFAULT 'active', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2dcfc79bccef3a91425b6cbb8b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "leads" ADD CONSTRAINT "FK_0fc7d6f9f2dbb677aeebb974b04" FOREIGN KEY ("assigned_agent_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "FK_d441116e564ce2ab1440fd33ec6" FOREIGN KEY ("original_lead_id") REFERENCES "leads"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "deals" ADD CONSTRAINT "FK_96b51475f76f01c135ecdc968dc" FOREIGN KEY ("lead_id") REFERENCES "leads"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "deals" ADD CONSTRAINT "FK_7a1770366da1de36b1efc628073" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "deals" ADD CONSTRAINT "FK_3d8e60b142c2fe2ba49ca718da7" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "deals" ADD CONSTRAINT "FK_cc6923c3fccb34093e035695d3f" FOREIGN KEY ("agent_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "properties" ADD CONSTRAINT "FK_349ddd886ec4ff72535a9eb2379" FOREIGN KEY ("builder_id") REFERENCES "builders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "properties" DROP CONSTRAINT "FK_349ddd886ec4ff72535a9eb2379"`);
        await queryRunner.query(`ALTER TABLE "deals" DROP CONSTRAINT "FK_cc6923c3fccb34093e035695d3f"`);
        await queryRunner.query(`ALTER TABLE "deals" DROP CONSTRAINT "FK_3d8e60b142c2fe2ba49ca718da7"`);
        await queryRunner.query(`ALTER TABLE "deals" DROP CONSTRAINT "FK_7a1770366da1de36b1efc628073"`);
        await queryRunner.query(`ALTER TABLE "deals" DROP CONSTRAINT "FK_96b51475f76f01c135ecdc968dc"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "FK_d441116e564ce2ab1440fd33ec6"`);
        await queryRunner.query(`ALTER TABLE "leads" DROP CONSTRAINT "FK_0fc7d6f9f2dbb677aeebb974b04"`);
        await queryRunner.query(`DROP TABLE "builders"`);
        await queryRunner.query(`DROP TYPE "public"."builders_status_enum"`);
        await queryRunner.query(`DROP TABLE "properties"`);
        await queryRunner.query(`DROP TYPE "public"."properties_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."properties_type_enum"`);
        await queryRunner.query(`DROP TABLE "deals"`);
        await queryRunner.query(`DROP TYPE "public"."deals_stage_enum"`);
        await queryRunner.query(`DROP TABLE "clients"`);
        await queryRunner.query(`DROP TYPE "public"."clients_status_enum"`);
        await queryRunner.query(`DROP TABLE "leads"`);
        await queryRunner.query(`DROP TYPE "public"."leads_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."leads_source_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    }

}
