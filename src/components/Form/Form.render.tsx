import {forwardRef, type ForwardedRef} from 'react'
import type {View} from 'react-native'
import {COMPONENT_STATUS} from '../Common'
import {FormItem} from './Form-item'
import type {FormStore, RenderFormItemsProps, RenderFormProps} from './Form.interface'
import {Container} from './Form.styles'
import {FormContext} from './use-form-context.hook'

export const RenderFormItems = ({id, items, status, ...options}: RenderFormItemsProps) =>
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

const RenderFormInner = <T,>(
	{form, itemElements, testID, id, ...containerProps}: RenderFormProps<T>,
	ref: ForwardedRef<View>
) => (
	<FormContext.Provider value={form as FormStore<Record<string, unknown>>}>
		<Container
			{...containerProps}
			testID={testID ?? `form--${id}`}
			ref={ref}
		>
			{itemElements}
		</Container>
	</FormContext.Provider>
)

export const RenderForm = forwardRef(RenderFormInner) as <T>(
	props: RenderFormProps<T> & {ref?: ForwardedRef<View>}
) => ReturnType<typeof RenderFormInner>
