import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import dataSource from '../../../ormconfig';
import { categorys } from '../seader/categorys';
import { Category } from '../../categories/entities/category.entity';

export class PopulateCategorys1706402087610 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.commitTransaction();
    await queryRunner.startTransaction();

    for (const category of categorys) {
      const newCategory = new Category();
      newCategory.uuid = uuidv4();
      newCategory.name = category.name;
      await dataSource.getRepository(Category).save(newCategory);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
