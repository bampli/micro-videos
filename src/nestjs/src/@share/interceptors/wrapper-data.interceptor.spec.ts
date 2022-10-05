import { of } from 'rxjs';
import { WrapperDataInterceptor } from './wrapper-data.interceptor';

describe('WrapperDataInterceptor Unit Tests', () => {
  let interceptor: WrapperDataInterceptor;

  beforeEach(() => {
    interceptor = new WrapperDataInterceptor();
  });
  it('should wrap data key', (done) => {
    expect(interceptor).toBeDefined();
    const obs$ = interceptor.intercept({} as any, {
      handle: () => of({ name: 'test' }),
    });

    obs$
      .subscribe({
        next: (value) => {
          //console.log(value);
          expect(value).toEqual({ data: { name: 'test' } });
        },
      })
      .add(() => {
        done();
      });
  });

  it('should not wrap data with meta key', (done) => {
    expect(interceptor).toBeDefined();
    const result = { data: [{ name: 'test' }], meta: { total: 1 } };
    const obs$ = interceptor.intercept({} as any, {
      handle: () => of(result),
    });

    obs$
      .subscribe({
        next: (value) => {
          //console.log(value);
          expect(value).toEqual(result);
        },
      })
      .add(() => {
        done();
      });
  });
});
