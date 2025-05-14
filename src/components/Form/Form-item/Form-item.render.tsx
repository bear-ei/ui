import type {RenderFormItemProps} from './Form-item.interface'
import {Container} from './Form-item.styles'

export const renderFormItem = ({controlElement, testID, id, ...containerProps}: RenderFormItemProps) => (
	<Container
		{...containerProps}
		testID={testID ?? `formItem--${id}`}
	>
		{controlElement}
	</Container>
)
