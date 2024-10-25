import {ForwardedRef, forwardRef, useCallback, useEffect, useId, useMemo} from 'react'
import {View} from 'react-native'
import {Updater, useImmer} from 'use-immer'
import {ComponentStatus} from '../Common'
import {FormItem, FormItemProps} from './Form-item'
import {
        FormBaseProps,
        FormCallbacks,
        FormState,
        HandleFormCallbacksOptions,
        RenderFormItemOptions
} from './Form.interface'
import {useForm} from './use-form.hook'

const handleFormInit =
        <T,>(setState: Updater<FormState>) =>
        (setInitialValues: (initialized?: boolean) => (value?: T) => void) =>
        (value?: T) =>
                setState(draft => {
                        if (draft.status !== 'idle') {
                                return
                        }

                        if (value) {
                                setInitialValues()(value)
                        }

                        draft.status = 'succeeded'
                })

const handleFormCallbacks =
        <T,>({onFinish, onFinishFailed, onValuesChange}: HandleFormCallbacksOptions<T>) =>
        (setCallbacks: (callback: FormCallbacks<T>) => void) =>
                setCallbacks({onFinish, onFinishFailed, onValuesChange})

const renderFormItem = (options: RenderFormItemOptions) => (status: ComponentStatus) => (items?: FormItemProps[]) =>
        status === 'succeeded' ?
                items?.map((item, index) => (
                        <FormItem
                                {...item}
                                {...options}
                                key={item.name ?? index}
                        />
                ))
        :       <></>

const FormBaseInner = <T,>(
        {
                form,
                initialValues,
                items,
                onFinish,
                onFinishFailed,
                onValuesChange,
                render,
                skeletonElement,
                skeletonMinDuration,
                validatorOptions,
                ...renderProps
        }: FormBaseProps<T>,
        ref: ForwardedRef<View>
) => {
        const [{status}, setState] = useImmer<FormState>({status: 'idle'})
        const formStore = useForm(form)
        const {setCallbacks, setInitialValues} = formStore
        const id = useId()
        const onFormInit = useMemo(() => handleFormInit<T>(setState)(setInitialValues), [setInitialValues, setState])
        const onFormCallbacks = useCallback(
                () => handleFormCallbacks<T>({onFinish, onFinishFailed, onValuesChange})(setCallbacks),
                [onFinish, onFinishFailed, onValuesChange, setCallbacks]
        )

        const formItemElements = renderFormItem({
                skeletonElement,
                skeletonMinDuration,
                validatorOptions
        })(status)(items)

        useEffect(() => {
                onFormCallbacks()
        }, [onFormCallbacks])

        useEffect(() => {
                onFormInit(initialValues)
        }, [initialValues, onFormInit])

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
