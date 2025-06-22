import {debounce} from '../debounce'
import {runAfterInteractions} from '../run-afterInteractions'
import {throttle} from '../throttle'
import type {CreateHandlerOptions} from './create-handler.interface'

export const createDeferredHandlerWithState =
	<T extends (...args: any[]) => unknown, S = undefined>(handlerFactory: T | ((setState: S) => T)) =>
	(setState?: S) =>
	(options = {} as CreateHandlerOptions) => {
		const {
			debounceMillisecond,
			enableInteractionManager: isEnableInteractionManager = true,
			throttleMillisecond
		} = options
		const handler = setState ? handlerFactory(setState) : handlerFactory
		const func = isEnableInteractionManager ? runAfterInteractions<T>(handler as T) : (handler as T)

		if (debounceMillisecond) {
			return debounce(func)(debounceMillisecond) as T
		}

		if (throttleMillisecond) {
			return throttle(func)(throttleMillisecond) as T
		}

		return func as T
	}

export const createDeferredHandler =
	<T extends (...args: any[]) => unknown>(handlerFactory: T) =>
	(options = {} as CreateHandlerOptions) =>
		createDeferredHandlerWithState(handlerFactory)()(options) as T
