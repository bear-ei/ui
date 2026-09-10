import {COMPONENT_STATUS, LAYOUT} from '@/constants'
import {classesName} from '@/utils'
import {forwardRef, type FC, type ForwardedRef} from 'react'
import {View} from 'react-native'
import {FormItem} from './Form-item'
import type {FormStore, RenderFormItemsProps, RenderFormProps} from './Form.interface'
import {FormContext} from './use-form-context.hook'

export const RenderFormItems: FC<RenderFormItemsProps> = ({id, items, status, ...options}) =>
	status === COMPONENT_STATUS.SUCCEEDED ?
		<>
			{items?.map((item, index) => (
				<FormItem
					{...item}
					{...options}
					key={item.name ?? index}
					testID={`form__formItem--${id}`}
				/>
			))}
		</>
	:	<></>

const RenderFormInner = <T,>(
	{form, itemElements, testID, id, layoutType, ...containerProps}: RenderFormProps<T>,
	ref: ForwardedRef<View>
) => (
	<FormContext.Provider value={form as FormStore<Record<string, unknown>>}>
		<View
			{...containerProps}
			className={classesName('flex', {
				['flex-row gap-4']: layoutType === LAYOUT.HORIZONTAL,
				['flex-col gap-1']: layoutType === LAYOUT.VERTICAL
			})}
			testID={testID ?? `form--${id}`}
			ref={ref}
		>
			{itemElements}
		</View>
	</FormContext.Provider>
)

export const RenderForm = forwardRef(RenderFormInner) as <T>(
	props: RenderFormProps<T> & {ref?: ForwardedRef<View>}
) => ReturnType<typeof RenderFormInner>
