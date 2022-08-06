import { DataSource } from 'typeorm';

import { User } from '../../../modules/accounts/infra/typeorm/entities/User';
import { Category } from '../../../modules/cars/infra/typeorm/entities/Category';
import { Specification } from '../../../modules/cars/infra/typeorm/entities/Specification';

const dataSource = new DataSource({
    type: 'postgres',
    host: 'database_rentx',
    port: 5432,
    username: 'luiza',
    password: '123456',
    database: 'rentx',
    migrations: ['./src/database/migrations/*.ts'],
    entities: [Category, Specification, User],
});

dataSource.initialize();

export { dataSource };
