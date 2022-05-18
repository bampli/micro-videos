import { Category } from "../domain/entities/category";

class CreateCategoryUseCase {
    execute(input: any) {
        const entity = new Category(input);
        // repository - no business rules - domain services
    }
}