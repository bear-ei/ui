import {Meta} from '@storybook/react'
import {IsDefined, IsNotEmpty, IsNumberString} from 'class-validator'
import {useEffect} from 'react'
import {View, ViewStyle} from 'react-native'
import {Button} from '../Button'
import {TextInput} from '../Text-input'
import {FormItemControlProps, FormItemProps} from './Form-item'
import {Form} from './Form.component'

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

export const FormA = () => {
        const renderControl = ({errorMessage, id, labelText, onBlur, onValueChange, value}: FormItemControlProps) => (
                <TextInput
                        error={!!errorMessage}
                        key={id}
                        labelText={labelText}
                        onBlur={onBlur}
                        onChangeText={onValueChange}
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
                        name: 'age',
                        renderControl,
                        labelText: 'age',
                        rule: AgeRule
                }
        ]

        const form = Form.useForm<{name: string; age: string}>()
        const handleFinish = (value: unknown) => {
                console.info(value)
        }

        const handleSubmit = () => {
                form.submit()
        }

        const handleReset = () => {
                form.resetField()
        }

        const style = {
                display: 'flex',
                flexDirection: 'column'
        } as ViewStyle

        useEffect(() => {
                setTimeout(() => {
                        form.setFieldValue()({name: '333', age: '999'})
                }, 1000)
        }, [form])

        return (
                <View style={[style]}>
                        <Form
                                form={form}
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
                                type='outlined'
                        />
                </View>
        )
}

export default {
        title: 'components/Form',
        component: Form
} as Meta<typeof Form>
