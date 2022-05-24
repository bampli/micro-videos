import {default as DefaultUseCase} from "../../../@seedwork/application/use-case";
import { CategoryRepository } from "../../domain/repository/category.repository";
import { CategoryOutput } from "../dto/category-output";
import { SearchInputDto } from "../dto/search-input";
import { PaginationOutputDto, PaginationOutputMapper } from "../dto/pagination-output";
import { CategoryOutputMapper } from "../dto/category-output";

export namespace ListCategoriesUseCase{

    export class UseCase implements DefaultUseCase<Input, Output>{
        constructor(private categoryRepo: CategoryRepository.Repository) { };
    
        async execute(input: Input): Promise<Output> {
            const params = new CategoryRepository.SearchParams(input);
            const searchResult = await this.categoryRepo.search(params);
            return this.toOutput(searchResult);
        }
    
        private toOutput(searchResult: CategoryRepository.SearchResult): Output {
            const items = searchResult.items.map((i) => {
                return CategoryOutputMapper.toOutput(i)
            });
            const pagination = PaginationOutputMapper.toOutput(searchResult);
    
            return {
                items,
                ...pagination
            }
        }
    }
    
    export type Input = SearchInputDto;
    
    export type Output = PaginationOutputDto<CategoryOutput>;
}

export default ListCategoriesUseCase;

// DTO: data transfer objects ~ Input/Output ~ similar to Request/Response

// Input params were copied from type SearchProps<Filter = string>

// Input acceptable, but SearchProps would need to be added to namespace
// export type Input = SearchInputDto<CategoryRepository.SearchProps['filter']>;

// PaginationOutputDto also copied and adapted from SearchResult
// export type Output = {
//     items: CategoryOutput[];
//     total: number;
//     current_page: number;
//     per_page: number;
//     last_page: number;
//     // sort: string | null;
//     // sort_dir: string | null;
//     // filter: Filter;
// };
