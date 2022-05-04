import InvalidUuidError from "../errors/invalid-uuid.error";
import UniqueEntityId from "./unique-entity-id.vo";
import { validate as uuidValidate } from "uuid";

describe('UniqueEntityId Unit Tests', () => {

    const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, 'validate');

    // Setup at /jest.config.ts:
    // Automatically clear mock calls, instances, contexts and results before every test
    // clearMocks: true,
    // To clear manually, set clearMocks false and uncomment following line:
    // beforeEach(() => validateSpy.mockClear());

    it('should throw error when uuid is invalid', () => {
        expect(() => new UniqueEntityId('fake id')).toThrow(new InvalidUuidError());
        expect(validateSpy).toHaveBeenCalled();
    });
    it('should accept an uuid parameter in constructor', () => {
        const uuid = '957334c5-91b9-4986-9b43-0d42f2edfbe9';
        const vo = new UniqueEntityId(uuid);
        expect(vo.id).toBe(uuid);
        expect(validateSpy).toHaveBeenCalled();
    });
    it('should accept no uuid parameter in constructor', () => {
        const vo = new UniqueEntityId();
        expect(uuidValidate(vo.id)).toBeTruthy();
        expect(validateSpy).toHaveBeenCalled();
    });
});