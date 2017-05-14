import { fromPromise } from '../src/utils';
describe('fromPromise', function () {
    test('should emit a value when resolved', function (done) {
        fromPromise(function () { return Promise.resolve('resolved'); })
            .subscribe({
            /**
             * @param {?} r
             * @return {?}
             */
            next: function (r) {
                expect(r).toBe('resolved');
                done();
            },
            /**
             * @return {?}
             */
            error: function () {
                done.fail('should not be called');
            },
        });
    });
    test('should complete when resolved', function (done) {
        fromPromise(function () { return Promise.resolve('resolved'); })
            .subscribe({
            /**
             * @return {?}
             */
            error: function () {
                done.fail('should not be called');
            },
            /**
             * @return {?}
             */
            complete: function () {
                done();
            },
        });
    });
    test('should emit an error when rejected', function (done) {
        fromPromise(function () { return Promise.reject('rejected'); })
            .subscribe({
            /**
             * @return {?}
             */
            next: function () {
                done.fail('should not be called');
            },
            /**
             * @param {?} e
             * @return {?}
             */
            error: function (e) {
                expect(e).toBe('rejected');
                done();
            },
        });
    });
});
//# sourceMappingURL=utils.spec.js.map