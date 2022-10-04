// fixture for categories

import { Category } from "@fc/micro-videos/category/domain";

class CategoryFixture {
  static arrangeForSave() {
    const faker = Category.fake().aCategory();
    return [
      {
        send_data: {
          name: faker.name,
        },
        expected: {
          description: null,
          is_active: true,
        },
      },
      {
        send_data: {
          name: faker.name,
          description: null,
        },
        expected: {
          is_active: true,
        },
      },
      {
        send_data: {
          name: faker.name,
          is_active: true,
        },
        expected: {
          description: null,
        },
      },
      {
        send_data: {
          name: faker.name,
          description: 'some text',
          is_active: false,
        },
        expected: {
          description: 'some text',
          is_active: false,
        },
      },
    ];
  }
}
