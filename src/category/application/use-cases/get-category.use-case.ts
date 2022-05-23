import UseCase from "#seedwork/application/use-case";
//import { Category } from "#category/domain/entities/category";
import CategoryRepository from "#category/domain/repository/category.repository";
import { CategoryOutput, CategoryOutputMapper } from "../dto/category-output";

export default class GetCategoryUseCase implements UseCase<Input, Output>{
    constructor(private categoryRepo: CategoryRepository.Repository) { };

    async execute(input: Input): Promise<Output> {
        const entity = await this.categoryRepo.findById(input.id);
        return CategoryOutputMapper.toOutput(entity);
    }
}

// DTO: data transfer objects
// Input/Output ~ Request/Response

export type Input = {
    id: string;
};

export type Output = CategoryOutput;