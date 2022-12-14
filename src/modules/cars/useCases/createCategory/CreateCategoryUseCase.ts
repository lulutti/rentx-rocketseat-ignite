import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';

import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface IRequest {
    name: string;
    description: string;
}

class CreateCategoryUseCase {
    constructor(
        @inject('CategoriesRepository')
        private categoriesRepository: ICategoriesRepository,
    ) {}

    async execute({ description, name }: IRequest) {
        const categoryAlreadyExists =
            await this.categoriesRepository.findByName(name);

        if (categoryAlreadyExists) {
            throw new AppError('Category already exists!');
        }

        this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase };
