import { ApolloClient } from 'apollo-client';
import { mockNetworkInterface } from 'apollo-test-utils';
import { createApollo } from './_utils';
/**
 * @param {...?} args
 * @return {?}
 */
export function mockClient() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var /** @type {?} */ networkInterface = mockNetworkInterface.apply(void 0, args);
    return new ApolloClient({
        networkInterface: networkInterface,
        addTypename: false,
        dataIdFromObject: function (o) { return o['id']; },
    });
}
/**
 * @param {...?} args
 * @return {?}
 */
export function mockApollo() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var /** @type {?} */ client = mockClient.apply(void 0, args);
    return createApollo({ default: client });
}
//# sourceMappingURL=_mocks.js.map