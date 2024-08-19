import {useLazyRef} from '../../hook'
import {FormStorage} from './Form.interface'
import {formStorage} from './form-storage'

export const useForm = <T>(form?: FormStorage<T>) => {
    const formRef = useLazyRef(() => form ?? (formStorage() as FormStorage<T>))

    return formRef.current as FormStorage<T>
}
