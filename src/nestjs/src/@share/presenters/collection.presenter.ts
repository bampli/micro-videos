import { Exclude, Expose } from 'class-transformer';
import {
  PaginationPresenter,
  PaginationPresenterProps,
} from './pagination.presenter';
//import { ListCategoriesUseCase } from '@fc/micro-videos/category/application';
//import { CategoryPresenter } from '../../categories/presenter/category.presenter';

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
// Its place is not here, moved to categories/presenter/category.presenter.ts
//
// export class CategoryCollectionPresenter extends CollectionPresenter {
//   data: CategoryPresenter[];

//   // constructor(output: CategoryOutput[], paginationProps){} // reuse suggestion

//   constructor(output: ListCategoriesUseCase.Output) {
//     const { items, ...paginationProps } = output;
//     super(paginationProps);
//     this.data = items.map((item) => new CategoryPresenter(item));
//   }
// }
