import { AppError } from '../../../../shared/errors/AppError';
import { CategoriesRepository } from '../../infra/typeorm/repositories/CategoriesRepository';
import { CategoriesRespositoryInMemory } from '../../repositories/in-memory/CategoriesRepositoryInMemory';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRespositoryInMemory: CategoriesRespositoryInMemory;

describe('Create category', () => {
    beforeEach(() => {
        categoriesRespositoryInMemory = new CategoriesRespositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(
            categoriesRespositoryInMemory,
        );
    });
    it('Should be able to create a new category', async () => {
        const category = {
            name: 'Category test',
            description: 'Category description Test',
        };
        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description,
        });

        const categoryCreated = await categoriesRespositoryInMemory.findByName(
            category.name,
        );

        expect(categoryCreated).toHaveProperty('id');
    });

    it('Should not be able to create a new category with name exists', async () => {
        expect(async () => {
            const category = {
                name: 'Category test',
                description: 'Category description Test',
            };
            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description,
            });

            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description,
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
