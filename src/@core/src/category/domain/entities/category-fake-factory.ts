import { Category } from "./category";

class CategoryFakeFactory {
  private name: string = "default";

  static aCategory() {
    return new CategoryFakeFactory();
  }

  static aMovie() {
    return new CategoryFakeFactory().withName('Movie');
  }

  withName(name: string) {
    this.name = name;
    return this;    // fluent pattern
  }

  build() {
    return new Category({
      name: this.name,
    });
  }
}

const categoryCateg = CategoryFakeFactory.aCategory().build();
const categoryMovie = CategoryFakeFactory.aMovie().build();
