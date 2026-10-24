import {type FC} from 'react'
import {View} from 'react-native'

import type {RenderFormFieldsProps, RenderFormProps} from './Form.interface'

import {COMPONENT_STATUS, ORIENTATION} from '../../constants'
import {useTheme} from '../../hooks'
import {FormItem} from './Form-item'
import {FormContext} from './use-form-context.hook'

export const RenderFormFields: FC<RenderFormFieldsProps> = ({fields, id, status, ...options}) =>
	status === COMPONENT_STATUS.SUCCEEDED ?
		<>
			{fields?.map(item => (
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
	fieldElements,
	form,
	id,
	orientation,
	status,
	testID,
	...containerProps
}: RenderFormProps) => {
	const {token} = useTheme()
	const {classNames} = token.classes

	return (
		<>
			{status === COMPONENT_STATUS.SUCCEEDED && (
				<FormContext.Provider value={form}>
					<View
						{...containerProps}
						className={classNames(
							'flex',
							{
								['flex-col gap-[--density-spacing-xx-small]']: orientation === ORIENTATION.VERTICAL,
								['flex-row gap-[--density-spacing-medium]']: orientation === ORIENTATION.HORIZONTAL
							},
							className
						)}
						testID={testID ?? `form--${id}`}
					>
						{fieldElements}
					</View>
				</FormContext.Provider>
			)}
		</>
	)
}
