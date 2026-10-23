import type {Meta} from '@storybook/react-native-web-vite'

import {IsDefined, IsNotEmpty, IsNumberString} from 'class-validator'
import {View} from 'react-native'

import type {FormItemControlProps, FormItemProps} from './Form-item'
import type {FormProps} from './Form.interface'

import {LAYOUT} from '../../constants'
import {BUTTON_TYPE, Button} from '../Button'
import {TextInput} from '../Text-input'
import {Form} from './Form.component'
import {useForm} from './use-form.hook'

class NameRule {
	@IsNumberString()
	@IsNotEmpty()
	@IsDefined()
	name: string
}

class AgeRule {
	@IsNumberString()
	@IsDefined()
	age: string
}

const RenderForm = (props: FormProps) => {
	const renderControl = ({errorMessage, id, labelText, onBlur, onValueChange, value}: FormItemControlProps) => (
		<TextInput
			error={!!errorMessage}
			key={id}
			labelText={labelText}
			onBlur={onBlur}
			onChangeText={onValueChange}
			placeholder='Placeholder'
			supportingText={errorMessage}
			value={value as string}
		/>
	)

	const items: FormItemProps[] = [
		{
			labelText: 'name',
			name: 'name',
			renderControl,
			rule: NameRule
		},
		{
			labelText: 'age',
			name: 'age',
			renderControl,
			rule: AgeRule
		}
	]

	const form = useForm<{age: string; name: string}>()
	const handleFinish = (value: unknown) => {
		console.info(value)
	}

	const handleSubmit = () => {
		form.submit()
	}

	const handleReset = () => {
		form.resetFields()
	}

	return (
		<View className='flex flex-col'>
			<Form
				{...props}
				form={form}
				initialValues={{age: 'CCCC', name: '233'}}
				items={items}
				onFinish={handleFinish}
			/>

			<Button
				labelText='submit'
				onPress={handleSubmit}
			/>

			<Button
				labelText='reset'
				onPress={handleReset}
				type={BUTTON_TYPE.OUTLINED}
			/>
		</View>
	)
}

export const Horizontal = () => <RenderForm layoutType={LAYOUT.HORIZONTAL} />
export const Vertical = () => <RenderForm layoutType={LAYOUT.VERTICAL} />

export default {
	component: Form,
	title: 'components/Form'
} as Meta<typeof Form>
