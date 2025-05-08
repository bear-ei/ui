import type {RenderFormItemProps} from './Form-item.interface'
import {Container} from './Form-item.styles'

export const renderFormItem = ({control, testID, id, ...containerProps}: RenderFormItemProps) => (
	<Container
		{...containerProps}
		testID={testID ?? `formItem--${id}`}
	>
		{control}
	</Container>
)
