import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreateStudentMigration1651239804453 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'student',
      columns:[
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()',
        },
        {
          name: 'name',
          type: 'varchar'
        },
        {
          name: 'email',
          type: 'varchar',
          isUnique: true,
        },
        {
          name: 'telephone',
          type: 'varchar',
        },
        {
          name: 'cpf',
          type: 'varchar',
          isUnique: true,
        },
        {
          name: 'username',
          type: 'varchar',
          isUnique: true,
        },
        {
          name: 'password',
          type: 'varchar'
        },
        {
          name: 'avatar',
          type: 'varchar',
          isNullable: true,
        }
      ]
    }));

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('student');
  }

}
