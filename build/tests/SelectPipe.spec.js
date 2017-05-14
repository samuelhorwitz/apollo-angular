import './_common';
import { SelectPipe } from '../src';
describe('SelectPipe', function () {
    var /** @type {?} */ pipe;
    var /** @type {?} */ pipeMetadata = Reflect.getMetadata('annotations', SelectPipe)[0];
    beforeEach(function () {
        pipe = new SelectPipe();
    });
    test('should return nothing if name is empty', function () {
        expect(pipe.transform({ foo: 'bar' }, '')).toBe(undefined);
    });
    test('should return nothing if object is empty', function () {
        expect(pipe.transform({}, 'foo')).toBe(undefined);
    });
    test('should return nothing if object is missing', function () {
        expect(pipe.transform(undefined, 'foo')).toBe(undefined);
    });
    test('should return nothing if nothing has been found', function () {
        expect(pipe.transform({ foo: 'bar' }, 'baz')).toBe(undefined);
    });
    test('should be looking directly on object if the result comes from Apollo decorator', function () {
        var /** @type {?} */ result = { foo: 'bar' };
        expect(pipe.transform(result, 'foo')).toEqual(result.foo);
    });
    test('should be looking inside data property iif the result comes fromf Angular2Apollo', function () {
        var /** @type {?} */ result = {
            data: { foo: 'bar' },
        };
        expect(pipe.transform(result, 'foo')).toEqual(result.data.foo);
    });
    test('should be named select', function () {
        expect(pipeMetadata.name).toBe('select');
    });
    test('should be pure', function () {
        expect(pipeMetadata.pure).toBe(true);
    });
});
//# sourceMappingURL=SelectPipe.spec.js.map