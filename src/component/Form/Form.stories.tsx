import {Meta} from '@storybook/react'
import {IsNotEmpty} from 'class-validator'
import React from 'react'
import {StyleProp, View, ViewStyle} from 'react-native'
import {Button} from '../Button'
import {TextField} from '../Text-field'
import {FormItemControlProps, FormItemProps} from './Form-item'
import {Form} from './Form.component'

const {IsDefined, IsString} = Form.validator

class NameRule {
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    name: string
}

class AgeRule {
    @IsString()
    age: string
}

export const FormA = () => {
    const form = Form.useForm<{name: string; age: number}>()
    const renderControl = ({value, onValueChange, errorMessage, id, labelText, onBlur}: FormItemControlProps) => (
        <TextField
            error={!!errorMessage}
            key={id}
            labelText={labelText}
            onBlur={onBlur}
            onChangeText={onValueChange}
            supportingText={errorMessage}
            value={value as string}
        />
    )

    const items = [
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
    ] as FormItemProps[]

    const handleFinish = (value: any) => {
        console.info(value)
    }

    const handleSubmit = () => {
        form.submit()
    }

    const handleReset = () => {
        form.resetField()
    }

    const style = {display: 'flex', flexDirection: 'column'} as StyleProp<ViewStyle>

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
                horizontalStretch={true}
            />

            <Button
                labelText='reset'
                onPress={handleReset}
                type='outlined'
                horizontalStretch={true}
            />
        </View>
    )
}

export default {
    title: 'components/Form',
    component: Form
} as Meta<typeof Form>
