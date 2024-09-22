import {ForwardedRef, forwardRef, useCallback, useEffect, useId, useMemo} from 'react'
import {View} from 'react-native'
import {Updater, useImmer} from 'use-immer'
import {ValidationRule} from '../../util'
import {ComponentStatus} from '../Common'
import {FormItem, FormItemProps} from './Form-item'
import {
    FormBaseProps,
    FormCallback,
    InitialFormState,
    ProcessFormCallbackOptions,
    RenderFormItemOptions
} from './Form.interface'
import {useForm} from './use-form.hook'

const processFormInit =
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

const processValidationRule = (setValidationRule: (value: ValidationRule) => void) => (value?: ValidationRule) =>
    value && setValidationRule(value)

const processFormCallback =
    <T,>({onFinish, onFinishFailed, onValueChange}: ProcessFormCallbackOptions<T>) =>
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
        validationRule,
        ...renderProps
    }: FormBaseProps<T>,
    ref: ForwardedRef<View>
) => {
    const [{status}, setState] = useImmer<InitialFormState>({status: 'idle'})
    const formStore = useForm(form)
    const {setCallback, setInitialValue, setValidationRule} = formStore
    const id = useId()
    const onFormInit = useMemo(() => processFormInit<T>(setState)(setInitialValue), [setInitialValue, setState])
    const onValidationRule = useMemo(() => processValidationRule(setValidationRule), [setValidationRule])
    const onFormCallback = useCallback(
        () => processFormCallback<T>({onFinish, onFinishFailed, onValueChange})(setCallback),
        [onFinish, onFinishFailed, onValueChange, setCallback]
    )

    const formItemElements = renderFormItem({skeletonElement, minSkeletonDuration})(status)(items)

    useEffect(() => {
        onFormCallback()
    }, [onFormCallback])

    useEffect(() => {
        onFormInit(initialValue)
    }, [initialValue, onFormInit])

    useEffect(() => {
        onValidationRule(validationRule)
    }, [onValidationRule, validationRule])

    if (status === 'idle') {
        return <></>
    }

    return render({...renderProps, form: formStore, id, ref, itemElements: formItemElements})
}

export const FormBase = forwardRef(FormBaseInner) as typeof FormBaseInner
