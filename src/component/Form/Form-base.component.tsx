import {ForwardedRef, forwardRef, useCallback, useEffect, useId, useMemo} from 'react'
import {View} from 'react-native'
import {Updater, useImmer} from 'use-immer'
import {ComponentStatus} from '../Common'
import {FormItem, FormItemProps} from './Form-item'
import {
    FormBaseProps,
    FormCallback,
    HandleFormCallbackOptions,
    InitialFormState,
    RenderFormItemOptions
} from './Form.interface'
import {useForm} from './use-form.hook'

const handleFormInit =
    <T,>(setState: Updater<InitialFormState>) =>
    (setInitialValue: (initialized?: boolean) => (value?: T) => void) =>
    (value?: T) =>
        setState(draft => {
            if (draft.status !== 'idle') {
                return
            }

            value && setInitialValue()(value)
            draft.status = 'succeeded'
        })

const handleFormCallback =
    <T,>({onFinish, onFinishFailed, onValueChange}: HandleFormCallbackOptions<T>) =>
    (setCallback: (callback: FormCallback<T>) => void) =>
        setCallback({onFinish, onFinishFailed, onValueChange})

const renderFormItem = (options: RenderFormItemOptions) => (status: ComponentStatus) => (items?: FormItemProps[]) =>
    status === 'succeeded' ?
        items?.map((item, index) => (
            <FormItem
                {...item}
                {...options}
                key={item.name ?? index}
            />
        ))
    :   <></>

const FormBaseInner = <T,>(
    {
        form,
        initialValue,
        items,
        minSkeletonDuration,
        onFinish,
        onFinishFailed,
        onValueChange,
        render,
        skeletonElement,
        validatorOptions,
        validationDelay,
        ...renderProps
    }: FormBaseProps<T>,
    ref: ForwardedRef<View>
) => {
    const [{status}, setState] = useImmer<InitialFormState>({status: 'idle'})
    const formStore = useForm(form)
    const {setCallback, setInitialValue} = formStore
    const id = useId()
    const onFormInit = useMemo(() => handleFormInit<T>(setState)(setInitialValue), [setInitialValue, setState])
    const onFormCallback = useCallback(
        () => handleFormCallback<T>({onFinish, onFinishFailed, onValueChange})(setCallback),
        [onFinish, onFinishFailed, onValueChange, setCallback]
    )

    const formItemElements = renderFormItem({skeletonElement, minSkeletonDuration, validatorOptions, validationDelay})(
        status
    )(items)

    useEffect(() => {
        onFormCallback()
    }, [onFormCallback])

    useEffect(() => {
        onFormInit(initialValue)
    }, [initialValue, onFormInit])

    if (status === 'idle') {
        return <></>
    }

    return render({...renderProps, form: formStore, id, ref, itemElements: formItemElements})
}

export const FormBase = forwardRef(FormBaseInner) as typeof FormBaseInner
