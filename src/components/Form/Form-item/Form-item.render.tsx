import {type FC} from 'react'
import {View} from 'react-native'

import type {RenderFormItemProps} from './Form-item.interface'

import {useTheme} from '../../../hooks'

export const RenderFormItem: FC<RenderFormItemProps> = ({className, controlElement, id, testID, ...containerProps}) => {
	const {token} = useTheme()
	const {classesName} = token.classes

	return (
		<View
			{...containerProps}
			className={classesName('min-h-[--density-control-medium] flex-1 self-stretch', className)}
			testID={testID ?? `formItem--${id}`}
		>
			{controlElement}
		</View>
	)
}

RenderFormItem.displayName = 'RenderFormItem'
