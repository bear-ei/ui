import {Updater} from 'use-immer'
import {ComponentStatus} from '../Common'
import {FormItem, FormItemProps} from './Form-item'
import {FormCallbacks, FormState, HandleFormCallbackOptions, RenderFormItemsOptions} from './Form.interface'

export const handleFormStatus =
        <T,>(setState: Updater<FormState>) =>
        (setInitialValue: (initialized?: boolean) => (value?: T) => void) =>
        (value?: T) =>
                setState(draft => {
                        if (draft.status !== 'idle') {
                                return
                        }

                        if (value) {
                                setInitialValue()(value)
                        }

                        draft.status = 'succeeded'
                })

export const handleFormCallback =
        <T,>({onFinish, onFinishFailed, onValueChange}: HandleFormCallbackOptions<T>) =>
        (setCallback: (callback: FormCallbacks<T>) => void) =>
                setCallback({onFinish, onFinishFailed, onValueChange})

export const renderFormItems =
        ({onLoadEnd, id, ...options}: RenderFormItemsOptions) =>
        (status: ComponentStatus) =>
        (items?: FormItemProps[]) =>
                status === 'succeeded' ?
                        items?.map((item, index) => (
                                <FormItem
                                        {...item}
                                        {...options}
                                        {...(index === items.length - 1 && {onLoadEnd})}
                                        key={item.name ?? index}
                                        testID={`form__formItem--${id}`}
                                />
                        ))
                :       <></>
