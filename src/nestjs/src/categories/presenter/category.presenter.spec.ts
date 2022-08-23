import { CategoryPresenter } from './category.presenter';
import { instanceToPlain } from 'class-transformer';

describe('CategoryPresenter Unit Tests', () => {
  describe('constructor', () => {
    it('should set values', () => {
      const created_at = new Date();
      const presenter = new CategoryPresenter({
        id: '61ba6882-2097-4fd5-8a35-0771bec620e8',
        name: 'movie',
        description: 'some description',
        is_active: true,
        created_at,
      });

      expect(presenter.id).toBe('61ba6882-2097-4fd5-8a35-0771bec620e8');
      expect(presenter.name).toBe('movie');
      expect(presenter.description).toBe('some description');
      expect(presenter.is_active).toBeTruthy();
      expect(presenter.created_at).toBe(created_at);
    });

    it('should set presenter', () => {
      const created_at = new Date();
      const presenter = new CategoryPresenter({
        id: '61ba6882-2097-4fd5-8a35-0771bec620e8',
        name: 'movie',
        description: 'some description',
        is_active: true,
        created_at,
      });

      const data = instanceToPlain(presenter);
      expect(data).toStrictEqual({
        id: '61ba6882-2097-4fd5-8a35-0771bec620e8',
        name: 'movie',
        description: 'some description',
        is_active: true,
        created_at: created_at.toISOString(),
      });
    });
  });
});
