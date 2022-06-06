import { UniqueEntityId, NotFoundError } from "#seedwork/domain";
import { CategoryRepository, Category } from "#category/domain";
import { CategoryModel } from "./category-model";
import { CategoryModelMapper } from "./category-mapper";

export class CategorySequelizeRepository
    implements CategoryRepository.Repository {

    sortableFields: string[] = ['name', 'created_at'];

    constructor(private categoryModel: typeof CategoryModel) { }

    async insert(entity: Category): Promise<void> {
        await this.categoryModel.create(entity.toJSON());
    }

    async findById(id: string | UniqueEntityId): Promise<Category> {
        const _id = `${id}`;
        const model = await this._get(_id);
        return CategoryModelMapper.toEntity(model);
    }

    async findAll(): Promise<Category[]> {
        const models = await this.categoryModel.findAll();
        return models.map((m) => CategoryModelMapper.toEntity(m));
    }


    async update(entity: Category): Promise<void> { }
    async delete(id: string | UniqueEntityId): Promise<void> { }

    private async _get(id: string): Promise<CategoryModel> {
        return this.categoryModel.findByPk(id, {
            rejectOnEmpty: new NotFoundError(`Entity not found with ID ${id}`)
        });

    }

    async search(
        props: CategoryRepository.SearchParams
        //@ts-expect-error
    ): Promise<CategoryRepository.SearchResult> { }
}