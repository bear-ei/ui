import {ForwardedRef, forwardRef, useCallback, useEffect, useMemo} from 'react'
import {View} from 'react-native'
import {useImmer} from 'use-immer'
import {handleFormCallback, handleFormItem, handleFormStatus} from './Form-handle'
import {FormBaseProps, FormState} from './Form.interface'
import {useForm} from './use-form.hook'

const FormBaseInner = <T,>(
        {
                form,
                initialValues,
                items,
                onFinish,
                onFinishFailed,
                onLoadEnd,
                onValueChange,
                render,
                validatorOptions,
                ...renderProps
        }: FormBaseProps<T>,
        ref: ForwardedRef<View>
) => {
        const [{status}, setState] = useImmer<FormState>({status: 'idle'})
        const formStore = useForm(form)
        const {setCallback, setInitialValue} = formStore
        const onFormStatus = useMemo(() => handleFormStatus<T>(setState)(setInitialValue), [setInitialValue, setState])
        const onFormCallback = useCallback(
                () => handleFormCallback<T>({onFinish, onFinishFailed, onValueChange})(setCallback),
                [onFinish, onFinishFailed, onValueChange, setCallback]
        )

        const formItemElements = handleFormItem({onLoadEnd, validatorOptions})(status)(items)

        useEffect(() => {
                onFormCallback()
        }, [onFormCallback])

        useEffect(() => {
                onFormStatus(initialValues)
        }, [initialValues, onFormStatus])

        if (status === 'idle') {
                return <></>
        }

        return render({...renderProps, form: formStore, ref, itemElements: formItemElements})
}

export const FormBase = forwardRef(FormBaseInner) as typeof FormBaseInner
