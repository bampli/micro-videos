import { UniqueEntityId } from "#seedwork/domain";
import { CategoryRepository, Category } from "#category/domain";
import { CategoryModel } from "./category-model";


export class CategorySequelizeRepository
    implements CategoryRepository.Repository {

    sortableFields: string[] = ['name', 'created_at'];

    constructor(private categoryModel: typeof CategoryModel) { }

    async insert(entity: Category): Promise<void> {
        await this.categoryModel.create(entity.toJSON());
    }
    //@ts-expect-error
    async findById(id: string | UniqueEntityId): Promise<Category> { }
    //@ts-expect-error
    async findAll(): Promise<Category[]> { }
    async update(entity: Category): Promise<void> { }
    async delete(id: string | UniqueEntityId): Promise<void> { }
    async search(
        props: CategoryRepository.SearchParams
        //@ts-expect-error
    ): Promise<CategoryRepository.SearchResult> { }
}