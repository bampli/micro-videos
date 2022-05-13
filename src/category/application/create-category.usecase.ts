import { Category } from "../domain/entities/category";

class CreateCategoryUseCase {
    execute(input) {
        const entity = new Category(input);
        // repository - no business rules - domain services
    }
}