import { Category } from "./category";
import { Chance } from "chance";

type PropOrFactory<T> = T | ((_index) => T);

export class CategoryFakeBuilder<TBuild = any> {
  private chance: Chance.Chance;

  private name: PropOrFactory<string> = (_index) => this.chance.word();
  private description: PropOrFactory<string | null> = (_index) =>
    this.chance.paragraph();
  private is_active: PropOrFactory<boolean> = (_index) => true;

  private countObjs;

  static aCategory() {
    return new CategoryFakeBuilder<Category>();
  }

  static theCategories(countObjs: number) {
    return new CategoryFakeBuilder<Category[]>(countObjs);
  }

  constructor(countObjs: number = 1) {
    this.countObjs = countObjs;
    this.chance = Chance();
  }

  withName(name: PropOrFactory<string>) {
    this.name = name;
    return this; // fluent pattern
  }

  withInvalidNameEmpty(value: "" | null | undefined) {
    this.name = value;
    return this;
  }

  withInvalidNameNotString(value?: any) {
    this.name = value ?? 5;
    return this;
  }

  withInvalidNameTooLong(value?: string) {
    this.name = value ?? this.chance.word({ length: 256 });
    return this;
  }

  withDescription(description: PropOrFactory<string>) {
    this.description = description;
    return this; // fluent pattern
  }

  withInvalidDescriptionNotString(value?: any) {
    this.description = value ?? 5;
    return this;
  }

  activate() {
    this.is_active = true;
    return this;
  }

  deactivate() {
    this.is_active = false;
    return this;
  }

  withInvalidIsActiveEmpty(value: "" | null | undefined) {
    this.is_active = value as any;
    return this;
  }

  withInvalidIsActiveNotBoolean(value?: any) {
    this.is_active = value ?? 'fake boolean';
    return this;
  }

  build(): TBuild {
    const categories = new Array(this.countObjs).fill(undefined).map(
      (_, index) =>
        new Category({
          name: this.callFactory(this.name, index),
          description: this.callFactory(this.description, index),
          is_active: this.callFactory(this.is_active, index),
        })
    );
    return this.countObjs === 1 ? (categories[0] as any) : categories;
  }

  private callFactory(factoryOrValue: PropOrFactory<any>, index: number) {
    return typeof factoryOrValue === "function"
      ? factoryOrValue(index)
      : factoryOrValue;
  }
}

// const category = CategoryFakeBuilder.aCategory().build();

// const faker = CategoryFakeBuilder.aCategory();
// faker.withName("Movie").build;
// faker.build();
// faker.build();
// faker.build();

// const faker2 = CategoryFakeBuilder.theCategories();
// faker2.withName((index) => `category ${index}`).build;

// more expressive
// CategoryFakeBuilder.aCategory().withInvalidNameTooLong().build();
