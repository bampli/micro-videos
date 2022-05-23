import UseCase from "#seedwork/application/use-case";
import { Category } from "#category/domain/entities/category";
import { CategoryRepository } from "#category/domain/repository/category.repository";
import { CategoryOutput, CategoryOutputMapper } from "../dto/category-output";

export default class CreateCategoryUseCase implements UseCase<Input, Output> {
    constructor(private categoryRepo: CategoryRepository.Repository) { };

    async execute(input: Input): Promise<Output> {
        const entity = new Category(input);
        await this.categoryRepo.insert(entity);
        return CategoryOutputMapper.toOutput(entity);
    }
}

// DTO: data transfer objects

export type Input = {
    name: string;
    description?: string;
    is_active?: boolean;
};

export type Output = CategoryOutput;

// Common DTO created at "../dto/category-output.dto"
// export type Output = {
//     id: string;
//     name: string;
//     description: string | null;
//     is_active: boolean;
//     created_at: Date
// }