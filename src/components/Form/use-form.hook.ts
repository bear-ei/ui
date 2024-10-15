import {useLazyRef} from '../../hooks'
import {FormStore} from './Form.interface'
import {formStore} from './form-store'

export const useForm = <T>(form?: FormStore<T>) => {
    const formRef = useLazyRef(() => form ?? (formStore() as FormStore<T>))

    return formRef.current as FormStore<T>
}
