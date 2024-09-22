import {Meta} from '@storybook/react'
import React from 'react'
import {StyleProp, View, ViewStyle} from 'react-native'
import {Button} from '../Button'
import {TextField} from '../Text-field'
import {FormItemControlProps, FormItemProps} from './Form-item'
import {Form} from './Form.component'

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
            rules: [{type: 'string'}],
            labelText: 'name'
        },
        {
            name: 'age',
            renderControl,
            rules: [{type: 'number'}],
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
                onFinish={processFinish}
                items={items}
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
