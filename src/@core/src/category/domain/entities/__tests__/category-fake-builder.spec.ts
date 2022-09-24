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

  describe("description prop", () => {
    it("should be a function", () => {
      expect(typeof faker["description"] === "function").toBeTruthy();
    });

    it("should call the paragraph method", () => {
      const chance = Chance();
      const spyWordMethod = jest.spyOn(chance, "paragraph");
      faker["chance"] = chance;
      faker.build();

      expect(spyWordMethod).toHaveBeenCalled();
    });

    test("withDescription", () => {
      faker.withDescription("test description");
      expect(faker["description"]).toBe("test description");

      faker.withDescription(() => "test description");
      //@ts-expect-error description is callable
      expect(faker["description"]()).toBe("test description");
    });

    it("should pass index to description", () => {
      faker.withDescription((index) => `test description ${index}`);
      const category = faker.build();
      expect(category.description).toBe("test description 0");

      const fakerMany = CategoryFakeBuilder.theCategories(2);
      fakerMany.withDescription((index) => `test description ${index}`);
      const categories = fakerMany.build();

      expect(categories[0].description).toBe("test description 0");
      expect(categories[1].description).toBe("test description 1");
    });
  });

  describe("is_active prop", () => {
    it("should be a function", () => {
      expect(typeof faker["is_active"] === "function").toBeTruthy();
    });

    test("activate", () => {
      faker.activate();
      expect(faker["is_active"]).toBeTruthy();
    });

    test("deactivate", () => {
      faker.deactivate();
      expect(faker["is_active"]).toBeFalsy();
    });
  });
});
