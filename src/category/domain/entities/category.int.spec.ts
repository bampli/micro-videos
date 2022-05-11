import ValidationError from "../../../@seedwork/errors/validation-error";
import { Category } from "./category";

describe('Category Integration Tests', (): void => {

    describe('create method', (): void => {
        it('should check invalid name', () => {
            expect(() => new Category({ name: null })).toThrow(
                new ValidationError("The name is required")
            );

            expect(() => new Category({ name: "" })).toThrow(
                new ValidationError("The name is required")
            );

            expect(() => new Category({ name: 5 as any })).toThrow(
                new ValidationError("The name must be a string")
            );

            expect(() => new Category({ name: "t".repeat(256) })).toThrow(
                new ValidationError("The name must have maximum 255 characters")
            );
        });

        it('should check invalid description', () => {
            expect(() => new Category({ name: "Movie", description: 5 as any })).toThrow(
                new ValidationError("The description must be a string")
            );
        });

        it('should check invalid is_active', () => {
            expect(() => new Category({ name: "Movie", is_active: 5 as any })).toThrow(
                new ValidationError("The is_active must be a boolean")
            );
        });

        it('should accept a valid category', () => {
            expect.assertions(0);
            new Category({ name: "Movie" });
            new Category({ name: "Movie", description: "some description" });
            new Category({ name: "Movie", description: null });
            new Category({
                name: "Movie",
                description: "some description",
                is_active: false
            });
            new Category({
                name: "Movie",
                description: "some description",
                is_active: true
            });
        });
    });

    describe('update method', (): void => {
        it('should check invalid name', () => {
            const category = new Category({ name: "Movie" });
            expect(() => category.update(null, null)).toThrow(
                new ValidationError("The name is required")
            );

            expect(() => category.update("", null)).toThrow(
                new ValidationError("The name is required")
            );

            expect(() => category.update(5 as any, null)).toThrow(
                new ValidationError("The name must be a string")
            );

            expect(() => category.update("t".repeat(256), null)).toThrow(
                new ValidationError("The name must have maximum 255 characters")
            );
        });

        it('should check invalid description', () => {
            const category = new Category({ name: "Movie" });
            expect(() => category.update("Movie", 5 as any)).toThrow(
                new ValidationError("The description must be a string")
            );
        });

        it('should accept a valid category', () => {
            expect.assertions(0);
            const category = new Category({ name: "Movie" });
            category.update('name changed', null);
            category.update('name changed again', 'some description');
        });
    });

});

// CI does 'unit tests' then 'integration tests'

// Added to vscode User
// ~/.config/Code/User/settings.json

// "material-icon-theme.files.associations": {
//     ".env.local.example": "tune",
//     ".env.dev.example": "tune",
//     ".env.ci.example": "tune",
//     ".env.prod.example": "tune",
//     ".env.production.example": "tune",
//     ".env.testing.example": "tune",
//     ".env.example": "tune",
//     ".env.dusk.testing.example": "tune",
//     "*.int-spec.ts": "test-ts",
//     "*.ispec.ts": "test-ts",
// },
//"jestrunner.codeLensSelector": "**/*.{test,spec,int-spec,ispec}.{js,jsx,ts,tsx}"
