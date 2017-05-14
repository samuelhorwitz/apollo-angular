import { ReflectiveInjector } from '@angular/core';
import { Apollo, provideClientMap } from '../src/Apollo';
import { APOLLO_PROVIDERS } from '../src/ApolloModule';
/**
 * @template T
 * @param {?} done
 * @param {?} observable
 * @param {?} cb
 * @return {?}
 */
export function subscribeAndCount(done, observable, cb) {
    var /** @type {?} */ handleCount = 0;
    var /** @type {?} */ subscription = observable.subscribe({
        next: function (result) {
            try {
                handleCount++;
                cb(handleCount, result);
            }
            catch (e) {
                // Wrap in a `setImmediate` so that we will unsubscribe on the next
                // tick so that we can make sure that the `subscription` has a chance
                // to be defined.
                setImmediate(function () {
                    subscription.unsubscribe();
                    done.fail(e.message);
                });
            }
        },
        error: function (e) { return done.fail(e.message); },
    });
    return subscription;
}
;
/**
 * @param {?} clientMap
 * @return {?}
 */
export function createApollo(clientMap) {
    var /** @type {?} */ injector = ReflectiveInjector.resolveAndCreate([provideClientMap(function () { return clientMap; }), APOLLO_PROVIDERS]);
    return injector.get(Apollo);
}
//# sourceMappingURL=_utils.js.map