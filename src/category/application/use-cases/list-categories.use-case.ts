import UseCase from "../../../@seedwork/application/use-case";
import CategoryRepository from "../../domain/repository/category.repository";
import { CategoryOutput } from "../dto/category-output.dto";
import { SearchInputDto } from "../dto/search-input.dto";

export default class ListCategoriesUseCase implements UseCase<Input, Output>{
    constructor(private categoryRepo: CategoryRepository.Repository) { };

    async execute(input: Input): Promise<Output> {
        const params = new CategoryRepository.SearchParams(input);
        const entities = await this.categoryRepo.search(params);
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

// params copied from type SearchProps<Filter = string>
// it's acceptable, but SearchProps would need to be added to namespace
// export type Input = SearchInputDto<CategoryRepository.SearchProps['filter']>;

export type Input = SearchInputDto;

export type Output = CategoryOutput;