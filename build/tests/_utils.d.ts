/// <reference types="jest" />
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ApolloQueryResult } from 'apollo-client';
import { Apollo } from '../src/Apollo';
import { ClientMap } from '../src/types';
export declare function subscribeAndCount<T>(done: jest.DoneCallback, observable: Observable<any>, cb: (handleCount: number, result: ApolloQueryResult<T>) => any): Subscription;
export declare function createApollo(clientMap: ClientMap): Apollo;
