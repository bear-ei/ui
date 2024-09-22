import {Meta} from '@storybook/react'
import {IsDefined, IsString} from 'class-validator'
import React from 'react'
import {StyleProp, View, ViewStyle} from 'react-native'
import {Button} from '../Button'
import {TextField} from '../Text-field'
import {FormItemControlProps, FormItemProps} from './Form-item'
import {Form} from './Form.component'

class NameRule {
    @IsDefined()
    @IsString()
    name: string

    @IsString()
    age: string
}

export const FormA = () => {
    const form = Form.useForm<{name: string; age: number}>()
    const renderControl = ({value, onValueChange, errorMessage, id, labelText}: FormItemControlProps) => (
        <TextField
            key={id}
            value={value as string}
            onChangeText={onValueChange}
            supportingText={errorMessage}
            error={!!errorMessage}
            labelText={labelText}
        />
    )

    const items = [
        {
            name: 'name',
            renderControl,
            labelText: 'name'
        },
        {
            name: 'age',
            renderControl,
            labelText: 'age'
        }
    ] as FormItemProps[]

    const processFinish = (value: any) => {
        console.info(value)
    }

    const processSubmit = () => {
        form.submit()
    }

    const processReset = () => {
        form.resetField()
    }

    const style = {display: 'flex', flexDirection: 'column'} as StyleProp<ViewStyle>

    return (
        <View style={[style]}>
            <Form
                form={form}
                items={items}
                onFinish={processFinish}
                validationRule={NameRule}
            />

            <Button
                labelText='submit'
                onPress={processSubmit}
                horizontalStretch={true}
            />

            <Button
                labelText='reset'
                onPress={processReset}
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
