import {type FC} from 'react'
import {View} from 'react-native'

import type {RenderFormItemsProps, RenderFormProps} from './Form.interface'

import {COMPONENT_STATUS, LAYOUT} from '../../constants'
import {useTheme} from '../../hooks'
import {FormItem} from './Form-item'
import {FormContext} from './use-form-context.hook'

export const RenderFormItems: FC<RenderFormItemsProps> = ({id, items, status, ...options}) =>
	status === COMPONENT_STATUS.SUCCEEDED ?
		<>
			{items?.map(item => (
				<FormItem
					{...item}
					{...options}
					key={item.name}
					testID={`form__formItem--${id}`}
				/>
			))}
		</>
	:	<></>

export const RenderForm = ({
	className,
	form,
	id,
	itemElements,
	layoutType,
	status,
	testID,
	...containerProps
}: RenderFormProps) => {
	const {token} = useTheme()
	const {classesName} = token.classes

	return (
		<>
			{status === COMPONENT_STATUS.SUCCEEDED && (
				<FormContext.Provider value={form}>
					<View
						{...containerProps}
						className={classesName(
							'flex',
							{
								['flex-col gap-[--density-spacing-xx-small]']: layoutType === LAYOUT.VERTICAL,
								['flex-row gap-[--density-spacing-medium]']: layoutType === LAYOUT.HORIZONTAL
							},
							className
						)}
						testID={testID ?? `form--${id}`}
					>
						{itemElements}
					</View>
				</FormContext.Provider>
			)}
		</>
	)
}
