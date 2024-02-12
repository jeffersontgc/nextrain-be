import { MigrationInterface, QueryRunner } from "typeorm";

export class AddImageToProducts1707776612559 implements MigrationInterface {
    name = 'AddImageToProducts1707776612559'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "image" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "image"`);
    }

}
