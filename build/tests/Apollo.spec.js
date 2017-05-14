import './_common';
import { ReflectiveInjector } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { RxObservableQuery } from 'apollo-client-rxjs';
import { ApolloClient } from 'apollo-client';
import { mockClient, mockApollo } from './_mocks';
import { subscribeAndCount, createApollo } from './_utils';
import { defaultApolloClient, provideClientMap } from '../src/index';
import { ApolloBase } from '../src/Apollo';
import { CLIENT_MAP, CLIENT_MAP_WRAPPER } from '../src/tokens';
import gql from 'graphql-tag';
import 'rxjs/add/operator/map';
describe('Apollo', function () {
    describe('service', function () {
        describe('default()', function () {
            test('should return the default client', function () {
                var /** @type {?} */ client = new ApolloClient();
                var /** @type {?} */ apollo = createApollo({ default: client });
                expect(apollo.default() instanceof ApolloBase).toBe(true);
                expect(apollo.default().getClient()).toBe(client);
            });
        });
        describe('use()', function () {
            test('should use a named client', function () {
                var /** @type {?} */ defaultClient = new ApolloClient();
                var /** @type {?} */ extraClient = new ApolloClient();
                var /** @type {?} */ apollo = createApollo({ default: defaultClient, extra: extraClient });
                expect(apollo.use('extra') instanceof ApolloBase).toBe(true);
                expect(apollo.use('extra').getClient()).toBe(extraClient);
            });
        });
        describe('getClient()', function () {
            test('should return an instance of ApolloClient', function () {
                var /** @type {?} */ client = new ApolloClient();
                var /** @type {?} */ apollo = createApollo({ default: client });
                expect(apollo.getClient()).toBe(client);
            });
        });
        describe('watchQuery()', function () {
            test('should be called with the same options', function () {
                var /** @type {?} */ client = new ApolloClient();
                var /** @type {?} */ apollo = createApollo({ default: client });
                var /** @type {?} */ options = ({ query: 'gql' });
                client.watchQuery = jest.fn();
                apollo.watchQuery(options);
                expect(client.watchQuery).toBeCalledWith(options);
            });
            test('should be able to use obserable variable', function (done) {
                var /** @type {?} */ query = (_a = ["query heroes($first: Int) {\n          allHeroes(first: $first) { name }\n        }"], _a.raw = ["query heroes($first: Int) {\n          allHeroes(first: $first) { name }\n        }"], gql(_a));
                var /** @type {?} */ data1 = { allHeroes: [{ name: 'Foo' }] };
                var /** @type {?} */ variables1 = { first: 0 };
                var /** @type {?} */ data2 = { allHeroes: [{ name: 'Bar' }] };
                var /** @type {?} */ variables2 = { first: 1 };
                var /** @type {?} */ apollo = mockApollo({
                    request: { query: query, variables: variables1 },
                    result: { data: data1 },
                }, {
                    request: { query: query, variables: variables2 },
                    result: { data: data2 },
                });
                var /** @type {?} */ first = new Subject();
                var /** @type {?} */ options = { query: query, variables: { first: first } };
                var /** @type {?} */ obs = apollo.watchQuery(/** @type {?} */ (options));
                subscribeAndCount(done, obs, function (handleCount, result) {
                    if (handleCount === 1) {
                        expect(result.data).toEqual(data1);
                    }
                    else if (handleCount === 2) {
                        expect(result.data).toEqual(data2);
                        done();
                    }
                });
                first.next(0);
                setTimeout(function () {
                    first.next(1);
                }, 200);
                var _a;
            });
            test('should be able to use obserable variables', function (done) {
                var /** @type {?} */ query = (_a = ["query heroes($first: Int, $order: String) {\n          allHeroes(first: $first, order: $order) { name }\n        }"], _a.raw = ["query heroes($first: Int, $order: String) {\n          allHeroes(first: $first, order: $order) { name }\n        }"], gql(_a));
                var /** @type {?} */ data1 = { allHeroes: [{ name: 'Foo' }] };
                var /** @type {?} */ variables1 = { first: 0, order: 'ASC' };
                var /** @type {?} */ data2 = { allHeroes: [{ name: 'Bar' }] };
                var /** @type {?} */ variables2 = { first: 1, order: 'ASC' };
                var /** @type {?} */ apollo = mockApollo({
                    request: { query: query, variables: variables1 },
                    result: { data: data1 },
                }, {
                    request: { query: query, variables: variables2 },
                    result: { data: data2 },
                });
                var /** @type {?} */ first = new Subject();
                var /** @type {?} */ order = new Subject();
                var /** @type {?} */ options = { query: query, variables: { first: first, order: order } };
                var /** @type {?} */ obs = apollo.watchQuery(/** @type {?} */ (options));
                subscribeAndCount(done, obs, function (handleCount, result) {
                    if (handleCount === 1) {
                        expect(result.data).toEqual(data1);
                    }
                    else if (handleCount === 2) {
                        expect(result.data).toEqual(data2);
                        done();
                    }
                });
                first.next(0);
                order.next('ASC');
                setTimeout(function () {
                    first.next(1);
                }, 200);
                var _a;
            });
            test('should be able to refetch', function (done) {
                var /** @type {?} */ query = (_a = ["query heroes($first: Int) {\n          allHeroes(first: $first) { name }\n        }"], _a.raw = ["query heroes($first: Int) {\n          allHeroes(first: $first) { name }\n        }"], gql(_a));
                var /** @type {?} */ data1 = { allHeroes: [{ name: 'Foo' }] };
                var /** @type {?} */ variables1 = { first: 0 };
                var /** @type {?} */ data2 = { allHeroes: [{ name: 'Bar' }] };
                var /** @type {?} */ variables2 = { first: 1 };
                var /** @type {?} */ apollo = mockApollo({
                    request: { query: query, variables: variables1 },
                    result: { data: data1 },
                }, {
                    request: { query: query, variables: variables2 },
                    result: { data: data2 },
                });
                var /** @type {?} */ options = { query: query, variables: variables1 };
                var /** @type {?} */ obs = apollo.watchQuery(options);
                obs.subscribe(function (_a) {
                    var data = _a.data;
                    expect(data).toEqual(data1);
                });
                obs.refetch(variables2).then(function (_a) {
                    var data = _a.data;
                    expect(data).toEqual(data2);
                    done();
                });
                var _a;
            });
            test('should receive a new result on refetch', function (done) {
                var /** @type {?} */ query = (_a = ["query heroes($first: Int) {\n          allHeroes(first: $first) { name }\n        }"], _a.raw = ["query heroes($first: Int) {\n          allHeroes(first: $first) { name }\n        }"], gql(_a));
                var /** @type {?} */ data1 = { allHeroes: [{ name: 'Foo' }] };
                var /** @type {?} */ variables1 = { first: 0 };
                var /** @type {?} */ data2 = { allHeroes: [{ name: 'Bar' }] };
                var /** @type {?} */ variables2 = { first: 1 };
                var /** @type {?} */ apollo = mockApollo({
                    request: { query: query, variables: variables1 },
                    result: { data: data1 },
                }, {
                    request: { query: query, variables: variables2 },
                    result: { data: data2 },
                });
                var /** @type {?} */ obs = apollo.watchQuery({ query: query, variables: variables1 });
                subscribeAndCount(done, obs, function (handleCount, result) {
                    if (handleCount === 1) {
                        expect(result.data).toEqual(data1);
                        obs.refetch(variables2);
                    }
                    else if (handleCount === 3) {
                        expect(result.data).toEqual(data2);
                        done();
                    }
                });
                var _a;
            });
            describe('result', function () {
                test('should return the ApolloQueryObserable when no variables', function () {
                    var /** @type {?} */ apollo = mockApollo();
                    var /** @type {?} */ query = (_a = ["query heroes {\n            allHeroes { name }\n          }"], _a.raw = ["query heroes {\n            allHeroes { name }\n          }"], gql(_a));
                    var /** @type {?} */ obs = apollo.watchQuery({ query: query });
                    expect(obs instanceof RxObservableQuery).toEqual(true);
                    var _a;
                });
                test('should return the ApolloQueryObserable when variables', function () {
                    var /** @type {?} */ apollo = mockApollo();
                    var /** @type {?} */ query = (_a = ["query heroes {\n            allHeroes { name }\n          }"], _a.raw = ["query heroes {\n            allHeroes { name }\n          }"], gql(_a));
                    var /** @type {?} */ variables = {
                        foo: new Subject(),
                    };
                    var /** @type {?} */ obs = apollo.watchQuery({ query: query, variables: variables });
                    expect(obs instanceof RxObservableQuery).toEqual(true);
                    var _a;
                });
            });
        });
        describe('query()', function () {
            test('should be called with the same options', function (done) {
                var /** @type {?} */ client = ({});
                var /** @type {?} */ apollo = createApollo({ default: client });
                var /** @type {?} */ options = ({ query: 'gql' });
                client.query = jest.fn().mockReturnValue(Promise.resolve('query'));
                var /** @type {?} */ obs = apollo.query(options);
                obs.subscribe({
                    /**
                     * @param {?} r
                     * @return {?}
                     */
                    next: function (r) {
                        expect(r).toEqual('query');
                        expect(client.query).toBeCalledWith(options);
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
            test('should not be called without subscribing to it', function (done) {
                var /** @type {?} */ client = ({});
                var /** @type {?} */ apollo = createApollo({ default: client });
                client.query = jest.fn().mockReturnValue(Promise.resolve('query'));
                var /** @type {?} */ obs = apollo.query(/** @type {?} */ ({}));
                expect(client.query).not.toBeCalled();
                obs.subscribe({
                    complete: function () {
                        expect(client.query).toBeCalled();
                        done();
                    },
                });
            });
        });
        describe('mutate()', function () {
            test('should be called with the same options', function (done) {
                var /** @type {?} */ client = ({});
                var /** @type {?} */ apollo = createApollo({ default: client });
                var /** @type {?} */ options = ({ mutation: 'gql' });
                client.mutate = jest.fn().mockReturnValue(Promise.resolve('mutation'));
                var /** @type {?} */ obs = apollo.mutate(options);
                obs.subscribe({
                    /**
                     * @param {?} r
                     * @return {?}
                     */
                    next: function (r) {
                        expect(r).toEqual('mutation');
                        expect(client.mutate).toBeCalledWith(options);
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
            test('should not be called without subscribing to it', function (done) {
                var /** @type {?} */ client = ({});
                var /** @type {?} */ apollo = createApollo({ default: client });
                client.mutate = jest.fn().mockReturnValue(Promise.resolve('mutation'));
                var /** @type {?} */ obs = apollo.mutate(/** @type {?} */ ({}));
                expect(client.mutate).not.toBeCalled();
                obs.subscribe({
                    complete: function () {
                        expect(client.mutate).toBeCalled();
                        done();
                    },
                });
            });
        });
        describe('subscribe', function () {
            test('should be called with the same options and return Observable', function (done) {
                var /** @type {?} */ client = ({});
                var /** @type {?} */ apollo = createApollo({ default: client });
                client.subscribe = jest.fn().mockReturnValue(['subscription']);
                var /** @type {?} */ options = ({ query: 'gql' });
                var /** @type {?} */ obs = apollo.subscribe(options);
                expect(client.subscribe).toBeCalledWith(options);
                obs.subscribe({
                    /**
                     * @param {?} result
                     * @return {?}
                     */
                    next: function (result) {
                        expect(result).toBe('subscription');
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
        });
        describe('query updates', function () {
            test('should update a query after mutation', function (done) {
                var /** @type {?} */ query = (_a = ["query heroes {\n          allHeroes { name }\n        }"], _a.raw = ["query heroes {\n          allHeroes { name }\n        }"], gql(_a));
                var /** @type {?} */ mutation = (_b = ["mutation addHero($name: String!) {\n          addHero(name: $name) {\n            name\n          }\n        }"], _b.raw = ["mutation addHero($name: String!) {\n          addHero(name: $name) {\n            name\n          }\n        }"], gql(_b));
                var /** @type {?} */ variables = { name: 'Bar' };
                var /** @type {?} */ data1 = { allHeroes: [{ name: 'Foo' }] };
                var /** @type {?} */ dataMutation = { addHero: { name: 'Bar' } };
                var /** @type {?} */ data2 = { allHeroes: [{ name: 'Foo' }, { name: 'Bar' }] };
                var /** @type {?} */ apollo = mockApollo({
                    request: { query: query },
                    result: { data: data1 },
                }, {
                    request: { query: mutation, variables: variables },
                    result: { data: dataMutation },
                });
                var /** @type {?} */ obs = apollo.watchQuery({ query: query });
                subscribeAndCount(done, obs, function (handleCount, _a) {
                    var data = _a.data;
                    if (handleCount === 1) {
                        expect(data).toEqual(data1);
                        apollo.mutate({
                            mutation: mutation,
                            variables: variables,
                            updateQueries: {
                                heroes: function (prev, _a) {
                                    var mutationResult = _a.mutationResult;
                                    return {
                                        allHeroes: prev.allHeroes.concat([mutationResult.data.addHero]),
                                    };
                                },
                            },
                        }).subscribe({
                            /**
                             * @param {?} error
                             * @return {?}
                             */
                            error: function (error) {
                                done.fail(error.message);
                            },
                        });
                    }
                    else if (handleCount === 2) {
                        expect(data).toEqual(data2);
                        done();
                    }
                });
                var _a, _b;
            });
            test('should update a query with Optimistic Response after mutation', function (done) {
                var /** @type {?} */ query = (_a = ["query heroes {\n          allHeroes {\n            id\n            name\n          }\n        }"], _a.raw = ["query heroes {\n          allHeroes {\n            id\n            name\n          }\n        }"], gql(_a));
                var /** @type {?} */ mutation = (_b = ["mutation addHero($name: String!) {\n          addHero(name: $name) {\n            id\n            name\n          }\n        }"], _b.raw = ["mutation addHero($name: String!) {\n          addHero(name: $name) {\n            id\n            name\n          }\n        }"], gql(_b));
                var /** @type {?} */ variables = { name: 'Bar' };
                var /** @type {?} */ data1 = { allHeroes: [{ id: 1, name: 'Foo' }] };
                var /** @type {?} */ dataMutation = { addHero: { id: 2, name: 'Bar' } };
                var /** @type {?} */ data2 = { allHeroes: [{ id: 1, name: 'Foo' }, { id: null, name: 'Temp' }] };
                var /** @type {?} */ data3 = { allHeroes: [{ id: 1, name: 'Foo' }, { id: 2, name: 'Bar' }] };
                var /** @type {?} */ apollo = mockApollo({
                    request: { query: query },
                    result: { data: data1 },
                }, {
                    request: { query: mutation, variables: variables },
                    result: { data: dataMutation },
                });
                var /** @type {?} */ obs = apollo.watchQuery({ query: query });
                subscribeAndCount(done, obs, function (handleCount, _a) {
                    var data = _a.data;
                    if (handleCount === 1) {
                        expect(data).toEqual(data1);
                        apollo.mutate({
                            mutation: mutation,
                            variables: variables,
                            optimisticResponse: {
                                addHero: {
                                    id: null,
                                    name: 'Temp',
                                },
                            },
                            updateQueries: {
                                heroes: function (prev, _a) {
                                    var mutationResult = _a.mutationResult;
                                    return {
                                        allHeroes: prev.allHeroes.concat([mutationResult.data.addHero]),
                                    };
                                },
                            },
                        }).subscribe({
                            /**
                             * @param {?} error
                             * @return {?}
                             */
                            error: function (error) {
                                done.fail(error.message);
                            },
                        });
                    }
                    else if (handleCount === 2) {
                        expect(data).toEqual(data2);
                    }
                    else if (handleCount === 3) {
                        expect(data).toEqual(data3);
                        done();
                    }
                });
                var _a, _b;
            });
        });
    });
    describe('defaultApolloClient', function () {
        test('should set a CLIENT_MAP_WRAPPER', function () {
            var /** @type {?} */ client = mockClient();
            var /** @type {?} */ injector = ReflectiveInjector.resolveAndCreate([defaultApolloClient(getClient)]);
            expect(injector.get(CLIENT_MAP_WRAPPER)).toBe(getClient);
            /**
             * @return {?}
             */
            function getClient() {
                return client;
            }
        });
        test('should set a CLIENT_MAP', function () {
            var /** @type {?} */ client = mockClient();
            var /** @type {?} */ injector = ReflectiveInjector.resolveAndCreate([defaultApolloClient(getClient)]);
            expect(injector.get(CLIENT_MAP)).toEqual({ default: client });
            /**
             * @return {?}
             */
            function getClient() {
                return client;
            }
        });
    });
    describe('provideClientMap', function () {
        test('should set a CLIENT_MAP_WRAPPER', function () {
            var /** @type {?} */ defaultClient = mockClient();
            var /** @type {?} */ extraClient = mockClient();
            var /** @type {?} */ injector = ReflectiveInjector.resolveAndCreate([provideClientMap(getClients)]);
            var /** @type {?} */ clientMapWrapper = injector.get(CLIENT_MAP_WRAPPER);
            expect(clientMapWrapper).toBe(getClients);
            /**
             * @return {?}
             */
            function getClients() {
                return {
                    default: defaultClient,
                    extra: extraClient,
                };
            }
        });
        test('should set a CLIENT_MAP', function () {
            var /** @type {?} */ defaultClient = mockClient();
            var /** @type {?} */ extraClient = mockClient();
            var /** @type {?} */ injector = ReflectiveInjector.resolveAndCreate([provideClientMap(getClients)]);
            var /** @type {?} */ clientMap = injector.get(CLIENT_MAP);
            expect(clientMap).toEqual({
                default: defaultClient,
                extra: extraClient,
            });
            /**
             * @return {?}
             */
            function getClients() {
                return {
                    default: defaultClient,
                    extra: extraClient,
                };
            }
        });
    });
});
//# sourceMappingURL=Apollo.spec.js.map