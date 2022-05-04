import InvalidUuidError from "../errors/invalid-uuid.error";
import UniqueEntityId from "./unique-entity-id.vo";
import {validate as uuidValidate} from "uuid";

describe('UniqueEntityId Unit Tests', () => {
    it('should throw error when uuid is invalid', () => {
        const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, 'validate');
        expect(() => new UniqueEntityId('fake id')).toThrow(new InvalidUuidError());
        expect(validateSpy).toHaveBeenCalled();
    });
    it('should accept an uuid parameter in constructor', () => {
        const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, 'validate');
        const uuid = '957334c5-91b9-4986-9b43-0d42f2edfbe9';
        const vo = new UniqueEntityId(uuid);
        expect(vo.id).toBe(uuid);
        expect(validateSpy).toHaveBeenCalled();
    });
    it('should accept no uuid parameter in constructor', () => {
        const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, 'validate');
        const vo = new UniqueEntityId();
        expect(uuidValidate(vo.id)).toBeTruthy();
        expect(validateSpy).toHaveBeenCalled();
    });
});