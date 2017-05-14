import './_common';
import { NgModule, Component, destroyPlatform, getPlatform, ApplicationRef, CompilerFactory, } from '@angular/core';
import { ServerModule, renderModule, renderModuleFactory, INITIAL_CONFIG, PlatformState, platformDynamicServer, } from '@angular/platform-server';
import { async } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { filter } from 'rxjs/operator/filter';
import { first } from 'rxjs/operator/first';
import { toPromise } from 'rxjs/operator/toPromise';
import gql from 'graphql-tag';
import 'rxjs/add/operator/take';
import { ApolloModule, Apollo } from '../src';
import { mockClient } from './_mocks';
// Mock GraphQL endpoint
var /** @type {?} */ query = (_a = ["\n  query websiteInfo {\n    website {\n      status\n    }\n  }\n"], _a.raw = ["\n  query websiteInfo {\n    website {\n      status\n    }\n  }\n"], gql(_a));
var /** @type {?} */ data = {
    website: {
        status: 'online',
    },
};
var /** @type {?} */ client = mockClient({
    request: { query: query },
    result: { data: data },
    delay: 500,
});
/**
 * @return {?}
 */
function provideClient() {
    return client;
}
var AsyncServerApp = (function () {
    /**
     * @param {?} apollo
     */
    function AsyncServerApp(apollo) {
        this.apollo = apollo;
        this.text = '';
    }
    /**
     * @return {?}
     */
    AsyncServerApp.prototype.ngOnInit = function () {
        var _this = this;
        this.apollo.query({ query: query })
            .take(1)
            .subscribe(function (result) {
            _this.text = result.data.website.status;
        });
    };
    return AsyncServerApp;
}());
AsyncServerApp.decorators = [
    { type: Component, args: [{
                selector: 'app',
                template: 'Website: {{text}}',
            },] },
];
/**
 * @nocollapse
 */
AsyncServerApp.ctorParameters = function () { return [
    { type: Apollo, },
]; };
function AsyncServerApp_tsickle_Closure_declarations() {
    /** @type {?} */
    AsyncServerApp.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    AsyncServerApp.ctorParameters;
    /** @type {?} */
    AsyncServerApp.prototype.text;
    /** @type {?} */
    AsyncServerApp.prototype.apollo;
}
var AsyncServerModule = (function () {
    function AsyncServerModule() {
    }
    return AsyncServerModule;
}());
AsyncServerModule.decorators = [
    { type: NgModule, args: [{
                declarations: [AsyncServerApp],
                imports: [
                    BrowserModule.withServerTransition({ appId: 'async-server' }),
                    ServerModule,
                    ApolloModule.withClient(provideClient),
                ],
                bootstrap: [AsyncServerApp],
            },] },
];
/**
 * @nocollapse
 */
AsyncServerModule.ctorParameters = function () { return []; };
function AsyncServerModule_tsickle_Closure_declarations() {
    /** @type {?} */
    AsyncServerModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    AsyncServerModule.ctorParameters;
}
describe('integration', function () {
    beforeEach(function () {
        if (getPlatform()) {
            destroyPlatform();
        }
    });
    describe('render', function () {
        var /** @type {?} */ doc;
        var /** @type {?} */ called;
        beforeEach(function () {
            doc = '<html><head></head><body><app></app></body></html>';
            called = false;
        });
        afterEach(function () { expect(called).toBe(true); });
        test('using long form should work', async(function () {
            var /** @type {?} */ platform = platformDynamicServer([{ provide: INITIAL_CONFIG, useValue: { document: doc } }]);
            platform.bootstrapModule(AsyncServerModule)
                .then(function (moduleRef) {
                var /** @type {?} */ applicationRef = moduleRef.injector.get(ApplicationRef);
                return toPromise.call(first.call(filter.call(applicationRef.isStable, function (isStable) { return isStable; })));
            })
                .then(function () {
                var /** @type {?} */ str = platform.injector.get(PlatformState).renderToString();
                expect(clearNgVersion(str)).toMatchSnapshot();
                platform.destroy();
                called = true;
            });
        }));
        test('using renderModule should work', async(function () {
            renderModule(AsyncServerModule, { document: doc }).then(function (output) {
                expect(clearNgVersion(output)).toMatchSnapshot();
                called = true;
            });
        }));
        test('using renderModuleFactory should work', async(function () {
            var /** @type {?} */ platform = platformDynamicServer([{ provide: INITIAL_CONFIG, useValue: { document: doc } }]);
            var /** @type {?} */ compilerFactory = platform.injector.get(CompilerFactory, null);
            var /** @type {?} */ moduleFactory = compilerFactory
                .createCompiler()
                .compileModuleSync(AsyncServerModule);
            renderModuleFactory(moduleFactory, { document: doc }).then(function (output) {
                expect(clearNgVersion(output)).toMatchSnapshot();
                called = true;
            });
        }));
    });
});
/**
 * @param {?} html
 * @return {?}
 */
function clearNgVersion(html) {
    return html.replace(/ng-version=\"[^"]+\"/, '');
}
var _a;
//# sourceMappingURL=integration.spec.js.map