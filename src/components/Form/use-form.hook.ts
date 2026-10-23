import type {FormStore} from './Form.interface'

import {useLazyRef} from '../../hooks'
import {formStore} from './form.store'

export const useForm = <T>(form?: FormStore<T>) => {
	const formRef = useLazyRef(() => form ?? formStore())

	return formRef.current as FormStore<T>
}
