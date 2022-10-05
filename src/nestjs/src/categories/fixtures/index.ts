// fixture for categories

import { Category } from '@fc/micro-videos/category/domain';

export class CategoryFixture {
  static keysInResponse() {
    return ['id', 'name', 'description', 'is_active', 'created_at'];
  }

  static arrangeForSave() {
    const faker = Category.fake().aCategory().withName('Movie');
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

  static arrangeInvalidRequest() {
    const faker = Category.fake().aCategory();
    const defaultExpected = {
      statusCode: 422,
      error: 'Unprocessable Entity',
    };

    return {
      EMPTY: {
        send_data: {},
        expected: {
          message: ['name should not be empty', 'name must be a string'],
          ...defaultExpected,
        },
      },
      NAME_UNDEFINED: {
        send_data: {
          name: faker.withInvalidNameEmpty(undefined).name,
        },
        expected: {
          message: ['name should not be empty', 'name must be a string'],
          ...defaultExpected,
        },
      },
    };
  }
}
