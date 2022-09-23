import { Category } from "./category";
import { Chance } from "chance";

type PropOrFactory<T> = T | ((_index) => T);

class CategoryFakeBuilder<TBuild> {
  private chance: Chance.Chance;

  private name: PropOrFactory<string> = (_index) => this.chance.word();
  private description: PropOrFactory<string | null> = (_index) =>
    this.chance.paragraph();
  private is_active: PropOrFactory<boolean> = (_index) => true;

  private countObjs;

  static aCategory() {
    return new CategoryFakeBuilder<Category>();
  }

  static theCategories() {
    return new CategoryFakeBuilder<Category[]>();
  }

  constructor(countObjs: number = 1) {
    this.countObjs = countObjs;
    this.chance = Chance();
  }

  withName(name: PropOrFactory<string>) {
    this.name = name;
    return this; // fluent pattern
  }

  withDescription(description: PropOrFactory<string>) {
    this.description = description;
    return this; // fluent pattern
  }

  activate() {
    this.is_active = true;
    return this;
  }

  deactivate() {
    this.is_active = false;
    return this;
  }

  build() {
    return new Category({
      name: typeof this.name === "function" ? this.name() : this.name,
      description:
        typeof this.description === "function"
          ? this.description()
          : this.description,
      is_active:
        typeof this.is_active === "function"
          ? this.is_active()
          : this.is_active,
    });
  }
}

const category = CategoryFakeBuilder.aCategory().build();

const faker = CategoryFakeBuilder.aCategory();
faker.withName("Movie").build;
faker.build();
faker.build();
faker.build();

const faker2 = CategoryFakeBuilder.theCategories();
faker2.withName((index) => `category ${index}`).build;