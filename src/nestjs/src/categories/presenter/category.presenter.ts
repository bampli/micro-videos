import {
  CategoryOutput,
  ListCategoriesUseCase,
} from '@fc/micro-videos/category/application';
import { Transform, Exclude, Expose } from 'class-transformer';

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
  @Transform(({ value }) => parseInt(value)) // assures 'int'
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

export abstract class CollectionPresenter {
  @Exclude() // assures that it will not be serialized
  protected paginationPresenter: PaginationPresenter;

  constructor(props: PaginationPresenterProps) {
    this.paginationPresenter = new PaginationPresenter(props);
  }

  @Expose({ name: 'meta' })
  get meta() {
    return this.paginationPresenter; // ok to have cascade presenters
  }
}

export class CategoryCollectionPresenter extends CollectionPresenter {
  //@Exclude()
  //protected _data: CategoryPresenter[];
  data: CategoryPresenter[];

  // reuse suggestion
  // constructor(output: CategoryOutput[], paginationProps){}

  constructor(output: ListCategoriesUseCase.Output) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    //this._data = items.map((item) => new CategoryPresenter(item));
    this.data = items.map((item) => new CategoryPresenter(item));
  }

  // @Expose({ name: 'data' })
  // get data() {
  //   return this._data;
  // }
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
