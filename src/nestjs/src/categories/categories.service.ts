import {
  CreateCategoryUseCase,
  ListCategoriesUseCase,
} from '@fc/micro-videos/category/application';
import { Inject, Injectable } from '@nestjs/common';
//import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  // @Inject(CreateCategoryUseCase.UseCase)
  // private createUseCase: CreateCategoryUseCase.UseCase;

  // @Inject(ListCategoriesUseCase.UseCase)
  // private listUseCase: ListCategoriesUseCase.UseCase;

  // constructor(
  //   private readonly categoriesService: CategoriesService,
  //   private createUseCase: CreateCategoryUseCase.UseCase,
  //   private listUseCase: ListCategoriesUseCase.UseCase,
  // ) {}

  create(createCategoryDto: CreateCategoryUseCase.Input) {
    return `This action creates a category`;
    //return this.createUseCase.execute(createCategoryDto);
  }

  search(input: ListCategoriesUseCase.Input) {
    return `This action list categories`;
    //return this.listUseCase.execute(input);
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
