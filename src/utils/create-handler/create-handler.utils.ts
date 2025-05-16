import {debounce} from '../debounce'
import {runAfterInteractions} from '../run-afterInteractions'
import type {CreateHandlerOptions} from './create-handler.interface'

export const createStableHandlerWithState =
	<T extends (...args: any[]) => unknown, S = undefined>(handlerFactory: T | ((setState: S) => T)) =>
	(setState?: S) =>
	(options = {} as CreateHandlerOptions) => {
		const {debounceMillisecond} = options
		const func = runAfterInteractions<T>((setState ? handlerFactory(setState) : handlerFactory) as T)

		return (debounceMillisecond ? debounce(func)(debounceMillisecond) : func) as T
	}

export const createStableHandler =
	<T extends (...args: any[]) => unknown>(handlerFactory: T) =>
	(options = {} as CreateHandlerOptions) =>
		createStableHandlerWithState(handlerFactory)()(options) as T
