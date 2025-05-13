import {debounce} from './debounce.utils'
import {runAfterInteractions} from './run-afterInteractions.utils'
import type {CreateHandlerOptions} from './utils.interface'

export const createHandler =
	<T extends (...args: any[]) => unknown, S = undefined>(handlerFactory: T | ((setState: S) => T)) =>
	(setState?: S) =>
	(options = {} as CreateHandlerOptions) => {
		const {debounceMillisecond} = options
		const func = runAfterInteractions<T>((setState ? handlerFactory(setState) : handlerFactory) as T)

		return (debounceMillisecond ? debounce(func)(debounceMillisecond) : func) as T
	}

export const createHandlerFinal =
	<T extends (...args: any[]) => unknown>(handlerFactory: T) =>
	(options = {} as CreateHandlerOptions) =>
		createHandler(handlerFactory)()(options) as T
