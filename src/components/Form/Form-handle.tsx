import {Updater} from 'use-immer'
import {ComponentStatus} from '../Common'
import {FormItem, FormItemProps} from './Form-item'
import {FormCallbacks, FormState, HandleFormCallbacksOptions, HandleFormItemOptions} from './Form.interface'

export const handleFormInit =
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

export const handleFormCallbacks =
        <T,>({onFinish, onFinishFailed, onValuesChange}: HandleFormCallbacksOptions<T>) =>
        (setCallbacks: (callback: FormCallbacks<T>) => void) =>
                setCallbacks({onFinish, onFinishFailed, onValuesChange})

export const handleFormItem =
        ({onLoadEnd, ...options}: HandleFormItemOptions) =>
        (status: ComponentStatus) =>
        (items?: FormItemProps[]) =>
                status === 'succeeded' ?
                        items?.map((item, index) => (
                                <FormItem
                                        {...item}
                                        {...options}
                                        {...(index === items.length - 1 && {onLoadEnd})}
                                        key={item.name ?? index}
                                />
                        ))
                :       <></>
