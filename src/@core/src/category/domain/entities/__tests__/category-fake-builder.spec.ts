import { CategoryFakeBuilder } from "../category-fake-builder";
import { Chance } from "chance";
import { UniqueEntityId } from "#seedwork/domain";

describe("CategoryFakeBuilder Unit Tests", () => {

  describe("unique_entity_id prop", () => {
    const faker = CategoryFakeBuilder.aCategory();

    it("should be a undefined", () => {
      expect(faker["unique_entity_id"]).toBeUndefined();
    });

    test("withUniqueEntityId", () => {
      const uniqueEntityId = new UniqueEntityId();
      const $this = faker.withUniqueEntityId(uniqueEntityId);
      expect($this).toBeInstanceOf(CategoryFakeBuilder);
      expect(faker["unique_entity_id"]).toBe(uniqueEntityId);

      faker.withUniqueEntityId(() => uniqueEntityId);
      expect(faker["unique_entity_id"]()).toBe(uniqueEntityId);
    });

    it("should pass index to unique_entity_id factory", () => {
      let mockFactory = jest.fn().mockReturnValue(new UniqueEntityId);
      faker.withUniqueEntityId(mockFactory);
      faker.build();
      expect(mockFactory).toHaveBeenCalledWith(0);

      mockFactory = jest.fn().mockReturnValue(new UniqueEntityId);
      const fakerMany = CategoryFakeBuilder.theCategories(2);
      fakerMany.withUniqueEntityId(mockFactory);
      fakerMany.build();

      expect(mockFactory).toHaveBeenCalledWith(0);
      expect(mockFactory).toHaveBeenCalledWith(1);
    });
  });
  
  describe("name prop", () => {
    const faker = CategoryFakeBuilder.aCategory();

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
      expect(faker).toBeInstanceOf(CategoryFakeBuilder);
      expect(faker["name"]).toBe("test name");

      faker.withName(() => "test name");
      //@ts-expect-error name is callable
      expect(faker["name"]()).toBe("test name");
    });

    it("should pass index to name factory", () => {
      faker.withName((index) => `test name ${index}`);
      const category = faker.build();
      expect(category.name).toBe("test name 0");

      const fakerMany = CategoryFakeBuilder.theCategories(2);
      fakerMany.withName((index) => `test name ${index}`);
      const categories = fakerMany.build();

      expect(categories[0].name).toBe("test name 0");
      expect(categories[1].name).toBe("test name 1");
    });

    test("invalid empty", () => {
      faker.withInvalidNameEmpty(undefined);
      expect(faker["name"]).toBeUndefined();

      faker.withInvalidNameEmpty(null);
      expect(faker["name"]).toBeNull();

      faker.withInvalidNameEmpty("");
      expect(faker["name"]).toBe("");
    });

    test("invalid too long", () => {
      faker.withInvalidNameTooLong();
      expect(faker["name"].length).toBe(256);

      const tooLong = "a".repeat(256);
      faker.withInvalidNameTooLong(tooLong);
      expect(faker["name"].length).toBe(256);
      expect(faker["name"]).toBe(tooLong);
    });

    test("invalid not a string", () => {
      faker.withInvalidNameNotString();
      expect(faker["name"]).not.toBeInstanceOf(String);
    });
  });

  describe("description prop", () => {
    const faker = CategoryFakeBuilder.aCategory(); // why is it needed? error at top describe?

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
      expect(faker).toBeInstanceOf(CategoryFakeBuilder);
      expect(faker["description"]).toBe("test description");

      faker.withDescription(() => "test description");
      //@ts-expect-error description is callable
      expect(faker["description"]()).toBe("test description");
    });

    it("should pass index to description factory", () => {
      faker.withDescription((index) => `test description ${index}`);
      const category = faker.build();
      expect(category.description).toBe("test description 0");

      const fakerMany = CategoryFakeBuilder.theCategories(2);
      fakerMany.withDescription((index) => `test description ${index}`);
      const categories = fakerMany.build();

      expect(categories[0].description).toBe("test description 0");
      expect(categories[1].description).toBe("test description 1");
    });

    test("invalid not a string", () => {
      faker.withInvalidDescriptionNotString();
      expect(faker["description"]).not.toBeInstanceOf(String);
    });
  });

  describe("is_active prop", () => {
  const faker = CategoryFakeBuilder.aCategory();

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

    test("invalid empty", () => {
      faker.withInvalidIsActiveEmpty(undefined);
      expect(faker["is_active"]).toBeUndefined();

      faker.withInvalidIsActiveEmpty(null);
      expect(faker["is_active"]).toBeNull();

      faker.withInvalidIsActiveEmpty("");
      expect(faker["is_active"]).toBe("");
    });

    test("invalid not a boolean", () => {
      faker.withInvalidIsActiveNotBoolean();
      expect(faker["is_active"]).not.toBeInstanceOf(Boolean);
    });
  });

  describe("created_at prop", () => {
    const faker = CategoryFakeBuilder.aCategory();

    it("should be a undefined", () => {
      expect(faker["created_at"]).toBeUndefined();
    });

    test("withCreatedAt", () => {
      const date = new Date();
      const $this = faker.withCreatedAt(date);
      expect($this).toBeInstanceOf(CategoryFakeBuilder);
      expect(faker["created_at"]).toBe(date);

      faker.withCreatedAt(() => date);
      expect(faker["created_at"]()).toBe(date);
    });

    it("should pass index to created_at factory", () => {
      const date = new Date();
      faker.withCreatedAt((index) => new Date(date.getTime() + index + 2));
      const category = faker.build();
      expect(category.created_at.getTime()).toBe(date.getTime() + 2);

      const fakerMany = CategoryFakeBuilder.theCategories(2);
      fakerMany.withCreatedAt((index) => new Date(date.getTime() + index + 2));
      const categories = fakerMany.build();

      expect(categories[0].created_at.getTime()).toBe(date.getTime() + 0 + 2);
      expect(categories[1].created_at.getTime()).toBe(date.getTime() + 1 + 2);
    });
  });
});
