import { Category } from "../../domain/entities/category";
import CategoryRepository from "../../domain/repository/category.repository";
import { CategoryOutput } from "../dto/category-output.dto";

export default class GetCategoryUseCase {

    constructor(private categoryRepo: CategoryRepository.Repository) { };

    async execute(input: Input): Promise<Output> {
        const entity = await this.categoryRepo.findById(input.id);
        return {
            id: entity.id,
            name: entity.name,
            description: entity.description,
            is_active: entity.is_active,
            created_at: entity.created_at
        };
    }
}

// DTO: data transfer objects
// Input/Output ~ Request/Response

export type Input = {
    id: string;
};

export type Output = CategoryOutput;