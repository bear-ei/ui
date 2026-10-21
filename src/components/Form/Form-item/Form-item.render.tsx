import {forwardRef} from 'react'
import {View} from 'react-native'

import {useTheme} from '../../../hooks'

import type {RenderFormItemProps} from './Form-item.interface'

export const RenderFormItem = forwardRef<View, RenderFormItemProps>(
	({controlElement, testID, id, className, ...containerProps}, ref) => {
		const {token} = useTheme()
		const {classesName} = token.classes

		return (
			<View
				{...containerProps}
				className={classesName('min-h-[--density-control-medium] flex-1 self-stretch', className)}
				ref={ref}
				testID={testID ?? `formItem--${id}`}
			>
				{controlElement}
			</View>
		)
	}
)

RenderFormItem.displayName = 'RenderFormItem'
