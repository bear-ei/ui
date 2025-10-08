import {LAYOUT} from '@/constants'
import type {Meta} from '@storybook/react'
import {View} from 'react-native'
import {BUTTON_TYPE, Button} from '../Button'
import type {FormItemControlProps, FormItemProps} from './Form-item'
import {Form} from './Form.component'
import type {FormProps} from './Form.interface'

// class NameRule {
// 	@IsNumberString()
// 	@IsNotEmpty()
// 	@IsDefined()
// 	name: string
// }

// class AgeRule {
// 	@IsNumberString()
// 	@IsDefined()
// 	age: string
// }

const RenderForm = (props: FormProps<Record<string, unknown>>) => {
        const renderControl = ({errorMessage, id, labelText, onBlur, onValueChange, value}: FormItemControlProps) => (
                // <TextInput
                // 	error={!!errorMessage}
                // 	key={id}
                // 	labelText={labelText}
                // 	onBlur={onBlur}
                // 	onChangeText={onValueChange}
                // 	supportingText={errorMessage}
                // 	value={value as string}
                // />

                <></>
        )

        const items: FormItemProps[] = [
                {
                        labelText: 'name',
                        name: 'name',
                        renderControl
                        // rule: NameRule
                },
                {
                        name: 'age',
                        renderControl,
                        labelText: 'age'
                        // rule: AgeRule
                }
        ]

        const form = Form.useForm<Record<string, unknown>>()

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
                                items={items}
                                onFinish={handleFinish}
                                initialValues={{name: '233', age: 'CCCC'}}
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
        title: 'components/Form',
        component: Form
} as Meta<typeof Form>
