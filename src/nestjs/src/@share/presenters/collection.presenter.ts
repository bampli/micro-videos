import { ListCategoriesUseCase } from '@fc/micro-videos/category/application';
import { Exclude, Expose } from 'class-transformer';
import { CategoryPresenter } from '../../categories/presenter/category.presenter';
import {
  PaginationPresenter,
  PaginationPresenterProps,
} from './pagination.presenter';

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
  data: CategoryPresenter[];

  // constructor(output: CategoryOutput[], paginationProps){} // reuse suggestion

  constructor(output: ListCategoriesUseCase.Output) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items.map((item) => new CategoryPresenter(item));
  }
}
