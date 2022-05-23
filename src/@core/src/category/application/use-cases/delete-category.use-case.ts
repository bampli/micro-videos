import UseCase from "#seedwork/application/use-case";
import { CategoryRepository } from "#category/domain/repository/category.repository";
import { CategoryOutput, CategoryOutputMapper } from "../dto/category-output";

export default class DeleteCategoryUseCase implements UseCase<Input, Output> {
    constructor(private categoryRepo: CategoryRepository.Repository) { };

    async execute(input: Input): Promise<Output> {
        const entity = await this.categoryRepo.findById(input.id);        
        await this.categoryRepo.delete(input.id);        
        return;
    }
}

export type Input = {
    id: string;
};

export type Output = void;
