import { SearchableRepositoryInterface } from "../../../@seedwork/domain/repository/repository-contracts";
import { Category } from "../entities/category";

// this contract includes custom properties/methods for CategoryRepository
export default interface CategoryRepository
    extends SearchableRepositoryInterface<Category, any, any> {

}