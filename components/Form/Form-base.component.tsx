import {COMPONENT_STATUS} from '@/constants'
import type {ForwardedRef} from 'react'
import {forwardRef, useEffect, useId, useMemo} from 'react'
import type {View} from 'react-native'
import {useImmer} from 'use-immer'
import {extractAndSetFormFieldKeys, initializeFormStateWithValues, registerFormCallbacks} from './Form.handler'
import type {FormBaseProps, FormState} from './Form.interface'
import {RenderForm, RenderFormItems} from './Form.render'
import {useForm} from './use-form.hook'

const FormBaseInner = <T,>(
        {
                form,
                initialValues,
                items,
                onFinish,
                onFinishFailed,
                onValuesChange,
                validatorOptions,
                ...renderFormProps
        }: FormBaseProps<T>,
        ref: ForwardedRef<View>
) => {
        const [{status}, setState] = useImmer<FormState>({status: COMPONENT_STATUS.IDLE})
        const id = useId()
        const formStore = useForm(form)
        const {setCallbacks, setInitialValues, setFieldKeys} = formStore
        const runInitializeStateWithValues = useMemo(
                () => initializeFormStateWithValues<T>(setInitialValues)({setState, status}),
                [setInitialValues, setState, status]
        )

        const runRegisterCallbacks = useMemo(() => registerFormCallbacks<T>(setCallbacks), [setCallbacks])
        const runExtractAndSetFieldKeys = useMemo(() => extractAndSetFormFieldKeys<T>(setFieldKeys), [setFieldKeys])
        const itemElements = (
                <RenderFormItems
                        id={id}
                        items={items}
                        status={status}
                        validatorOptions={validatorOptions}
                />
        )

        useEffect(() => {
                runRegisterCallbacks({onFinish, onFinishFailed, onValuesChange})
        }, [runRegisterCallbacks, onFinish, onFinishFailed, onValuesChange])

        useEffect(() => {
                runExtractAndSetFieldKeys(items)
        }, [runExtractAndSetFieldKeys, items])

        useEffect(() => {
                runInitializeStateWithValues(initialValues)
        }, [runInitializeStateWithValues, initialValues])

        if (status === COMPONENT_STATUS.IDLE) {
                return <></>
        }

        return (
                <RenderForm
                        {...renderFormProps}
                        form={formStore}
                        id={id}
                        itemElements={itemElements}
                        ref={ref}
                />
        )
}

export const FormBase = forwardRef(FormBaseInner) as <T>(
        props: FormBaseProps<T> & {ref?: ForwardedRef<View>}
) => ReturnType<typeof FormBaseInner>
