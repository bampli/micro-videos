import { CategoryFakeBuilder } from "../category-fake-builder";
import { Chance } from "chance";

describe("CategoryFakeBuilder Unit Tests", () => {
  const faker = CategoryFakeBuilder.aCategory();

  describe("name prop", () => {
    it("should be a function", () => {
      expect(typeof faker["name"] === "function").toBeTruthy();
    });

    it("should call the word method", () => {
      const chance = Chance();
      const spyWordMethod = jest.spyOn(chance, "word");
      faker["chance"] = chance;
      faker.build();

      expect(spyWordMethod).toHaveBeenCalled();
    });
  });

  test("withName", () => {
    faker.withName("test name");
    expect(faker["name"]).toBe("test name");

    faker.withName(() => "test name");
    //@ts-expect-error name is callable
    expect(faker["name"]()).toBe("test name");
  });

  it("should pass index to name", () => {
    faker.withName((index) => `test name ${index}`);
    const category = faker.build();
    expect(category.name).toBe("test name 0");

    const fakerMany = CategoryFakeBuilder.theCategories(2);
    fakerMany.withName((index) => `test name ${index}`);
    const categories = fakerMany.build();
    expect(categories[0].name).toBe("test name 0");
    expect(categories[1].name).toBe("test name 1");
  });
});
