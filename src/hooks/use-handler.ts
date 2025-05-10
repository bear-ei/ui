import {debounce, runAfterInteractions} from '../utils'

type HandlerOptions = {debounceMillisecond?: number}
export function createHandler<T extends (...args: any[]) => unknown>(
	handler: T,
	setState?: undefined,
	options?: HandlerOptions
): T

export function createHandler<T extends (...args: any[]) => unknown, S>(
	handlerFactory: (setState: S) => T,
	setState: S,
	options?: HandlerOptions
): T

export function createHandler<T extends (...args: any[]) => unknown, S>(
	handlerFactory: T | ((setState: S) => T),
	setState?: S,
	options: HandlerOptions = {}
): T {
	const {debounceMillisecond} = options
	const func = runAfterInteractions<T>((setState ? handlerFactory(setState) : handlerFactory) as T)

	return (debounceMillisecond ? debounce(func)(debounceMillisecond) : func) as T
}
