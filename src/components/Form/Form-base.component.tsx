import {ForwardedRef, forwardRef, useCallback, useEffect, useId, useMemo} from 'react'
import {View} from 'react-native'
import {useImmer} from 'use-immer'
import {handleFormCallbacks, handleFormItem, handleFormStatus} from './Form-handle'
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
                onValuesChange,
                render,
                skeletonElement,
                skeletonDuration,
                validatorOptions,
                ...renderProps
        }: FormBaseProps<T>,
        ref: ForwardedRef<View>
) => {
        const [{status}, setState] = useImmer<FormState>({status: 'idle'})
        const formStore = useForm(form)
        const {setCallbacks, setInitialValues} = formStore
        const id = useId()
        const onFormStatus = useMemo(
                () => handleFormStatus<T>(setState)(setInitialValues),
                [setInitialValues, setState]
        )
        const onFormCallbacks = useCallback(
                () => handleFormCallbacks<T>({onFinish, onFinishFailed, onValuesChange})(setCallbacks),
                [onFinish, onFinishFailed, onValuesChange, setCallbacks]
        )

        const formItemElements = handleFormItem({onLoadEnd, skeletonElement, skeletonDuration, validatorOptions})(
                status
        )(items)

        useEffect(() => {
                onFormCallbacks()
        }, [onFormCallbacks])

        useEffect(() => {
                onFormStatus(initialValues)
        }, [initialValues, onFormStatus])

        if (status === 'idle') {
                return <></>
        }

        return render({
                ...renderProps,
                form: formStore,
                id,
                ref,
                itemElements: formItemElements
        })
}

export const FormBase = forwardRef(FormBaseInner) as typeof FormBaseInner
