// import { PartialType } from '@nestjs/mapped-types';
// import { CreateCategoryDto } from './create-category.dto';

import { UpdateCategoryUseCase } from '@fc/micro-videos/category/application';

// export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}

export class UpdateCategoryDto implements UpdateCategoryUseCase.Input {
  id: string;
  name: string;
  description?: string;
  is_actve?: boolean;
}
