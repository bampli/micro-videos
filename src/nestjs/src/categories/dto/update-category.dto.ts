// import { PartialType } from '@nestjs/mapped-types';
// import { CreateCategoryDto } from './create-category.dto';

import { UpdateCategoryUseCase } from '@fc/micro-videos/category/application';
import { CreateCategoryDto } from './create-category.dto';

// export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}

export class UpdateCategoryDto
  extends CreateCategoryDto
  implements Omit<UpdateCategoryUseCase.Input, 'id'> {}
