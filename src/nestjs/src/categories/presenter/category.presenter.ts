import {
  CategoryOutput,
  ListCategoriesUseCase,
} from '@fc/micro-videos/category/application';
import { Transform } from 'class-transformer';

export class CategoryPresenter {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  @Transform(({ value }) => value.toISOString())
  created_at: Date;

  constructor(output: CategoryOutput) {
    this.id = output.id;
    this.name = output.name;
    this.description = output.description;
    this.is_active = output.is_active;
    this.created_at = output.created_at;
  }
}

// it will be moved to @fc/micro-videos later
export type PaginationPresenterProps = {
  current_page: number;
  per_page: number;
  last_page: number;
  total: number;
};

export class PaginationPresenter {
  @Transform(({ value }) => parseInt(value))
  current_page: number;
  @Transform(({ value }) => parseInt(value))
  per_page: number;
  @Transform(({ value }) => parseInt(value))
  last_page: number;
  @Transform(({ value }) => parseInt(value))
  total: number;

  constructor(props: PaginationPresenterProps) {
    this.current_page = props.current_page;
    this.per_page = props.per_page;
    this.last_page = props.current_page;
    this.total = props.total;
  }
}

export class CategoryCollectionPresenter {
  // sugestão reuso
  // constructor(output: CategoryOutput[], paginationProps){}

  constructor(output: ListCategoriesUseCase.Output) {}
}

// API spec:
// {
//   data: [{}, {}, {}],
//   meta: {
//     total,
//     current_page,
//     per_page,
//     last_page
//   }
// }
