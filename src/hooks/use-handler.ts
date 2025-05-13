import {debounce, runAfterInteractions} from '../utils'
import type {CreateHandlerOptions} from './hooks.interface'

export function createHandler<T extends (...args: any[]) => unknown>(
	handler: T,
	setState?: undefined,
	options?: CreateHandlerOptions
): T

export function createHandler<T extends (...args: any[]) => unknown, S>(
	handlerFactory: (setState: S) => T,
	setState: S,
	options?: CreateHandlerOptions
): T

export function createHandler<T extends (...args: any[]) => unknown, S>(
	handlerFactory: T | ((setState: S) => T),
	setState?: S,
	options: CreateHandlerOptions = {}
): T {
	const {debounceMillisecond} = options
	const func = runAfterInteractions<T>((setState ? handlerFactory(setState) : handlerFactory) as T)

	return (debounceMillisecond ? debounce(func)(debounceMillisecond) : func) as T
}
