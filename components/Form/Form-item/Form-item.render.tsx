import {forwardRef} from 'react'
import {View} from 'react-native'
import type {RenderFormItemProps} from './Form-item.interface'

export const RenderFormItem = forwardRef<View, RenderFormItemProps>(
        ({controlElement, testID, id, ...containerProps}, ref) => (
                <View
                        {...containerProps}
                        className='min-h-10 self-stretch'
                        ref={ref}
                        testID={testID ?? `formItem--${id}`}
                >
                        {controlElement}
                </View>
        )
)

RenderFormItem.displayName = 'RenderFormItem'
