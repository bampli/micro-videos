import { UniqueEntityId } from "#seedwork/domain";
import { CategoryRepository, Category } from "#category/domain";


export class CategorySequelizeRepository implements CategoryRepository.Repository {
    sortableFields: string[];
    async insert(entity: Category): Promise<void> { }
    async findById(id: string | UniqueEntityId): Promise<Category> { }
    async findAll(): Promise<Category[]> { }
    async update(entity: Category): Promise<void> { }
    async delete(id: string | UniqueEntityId): Promise<void> { }
    async search(
        props: CategoryRepository.SearchParams
    ): Promise<CategoryRepository.SearchResult> { }
}