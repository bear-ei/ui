import {Meta} from '@storybook/react'
import {IsDefined, IsNotEmpty, IsNumberString} from 'class-validator'
import {StyleProp, View, ViewStyle} from 'react-native'
import {Button} from '../Button'
import {TextInput} from '../Text-input'
import {FormItemControlProps, FormItemProps} from './Form-item'
import {Form} from './Form.component'

class NameRule {
        @IsDefined()
        @IsNotEmpty()
        @IsNumberString()
        name: string
}

class AgeRule {
        @IsDefined()
        @IsNumberString()
        age: string
}

export const FormA = () => {
        const form = Form.useForm<{name: string; age: number}>()
        const renderControl = ({
                errorMessage,
                id,
                labelText,
                onBlur,
                onLoadEnd,
                onValueChange,
                value
        }: FormItemControlProps) => (
                <TextInput
                        error={!!errorMessage}
                        key={id}
                        labelText={labelText}
                        onBlur={onBlur}
                        onChangeText={onValueChange}
                        supportingText={errorMessage}
                        value={value as string}
                        onLayout={() => onLoadEnd?.()}
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
        } as StyleProp<ViewStyle>

        return (
                <View style={[style]}>
                        <Form
                                form={form}
                                items={items}
                                onFinish={handleFinish}
                                onLoadEnd={() => {
                                        console.info('onLoadEnd')
                                }}
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
