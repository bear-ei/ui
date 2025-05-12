import {COMPONENT_STATUS, type ComponentStatus} from '../Common'
import {FormItem, type FormItemProps} from './Form-item'
import type {FormStore, RenderFormItemsOptions, RenderFormProps} from './Form.interface'
import {Container} from './Form.styles'
import {FormContext} from './use-form-context.hook'

export const renderFormItems =
	({id, ...options}: RenderFormItemsOptions) =>
	(status: ComponentStatus) =>
	(items?: FormItemProps[]) =>
		status === COMPONENT_STATUS.SUCCEEDED ?
			items?.map((item, index) => (
				<FormItem
					{...item}
					{...options}
					key={item.name ?? index}
					testID={`form__formItem--${id}`}
				/>
			))
		:	<></>

export const renderForm = <T,>({form, itemElements, testID, id, ...containerProps}: RenderFormProps<T>) => (
	<FormContext.Provider value={form as FormStore<Record<string, unknown>>}>
		<Container
			{...containerProps}
			testID={testID ?? `form--${id}`}
		>
			{itemElements}
		</Container>
	</FormContext.Provider>
)
