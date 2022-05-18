import { Category } from "../../domain/entities/category";

export class CreateCategoryUseCase {
    execute(input: Input): Promise<Output> {
        // repository - no business rules - domain services
    }
}

// DTO: data transfer objects

export type Input = {
    name: string;
    description?: string;
    is_active?: boolean;
};

export type Output = {
    id: string;
    name: string;
    description: string | null;
    is_active: boolean;
    created_at: Date
}