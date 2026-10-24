import type {FormStore} from './Form.interface'

import {useLazyRef} from '../../hooks'
import {createFormStore} from './form.store'

export const useForm = <T>(form?: FormStore<T>) => {
	const formRef = useLazyRef(() => form ?? createFormStore())

	return formRef.current as FormStore<T>
}
