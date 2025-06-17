import {forwardRef} from 'react'
import type {View} from 'react-native'
import type {RenderFormItemProps} from './Form-item.interface'
import {Container} from './Form-item.styles'

export const RenderFormItem = forwardRef<View, RenderFormItemProps>(
	({controlElement, testID, id, ...containerProps}, ref) => (
		<Container
			{...containerProps}
			ref={ref}
			testID={testID ?? `formItem--${id}`}
		>
			{controlElement}
		</Container>
	)
)
