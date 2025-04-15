import {NamePath} from './utils.interface'

export const namePath = <T = Record<string, unknown>>(name?: NamePath<T>) => {
	const formatName = Array.isArray(name) ? name : name && [name]

	return name ? formatName : undefined
}
