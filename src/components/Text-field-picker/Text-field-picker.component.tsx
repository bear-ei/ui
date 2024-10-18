import {FC, forwardRef} from 'react'
import {TextInput} from 'react-native'
import {Menu} from '../Menu'
import {TextField} from '../Text-field'
import {TextFieldPickerBase} from './Text-field-picker-base.component'
import {RenderTextFieldPickerProps, TextFieldPickerProps} from './Text-field-picker.interface'
import {Container} from './Text-field-picker.styles'

const render = ({
    contentElement,
    data,
    eventName,
    id,
    menuVisible,
    multiple,
    onActive,
    onActives,
    onMenuVisible,
    onStateEvent,
    ...textFieldProps
}: RenderTextFieldPickerProps) => (
    <Container testID={`textFieldPicker--${id}`}>
        <Menu
            data={data}
            eventName={eventName}
            multiple={multiple}
            onActive={onActive}
            onActives={onActives}
            onVisible={onMenuVisible}
            triggerEvent='focus'
        >
            <TextField
                {...onStateEvent}
                {...textFieldProps}
                content={contentElement}
                disabledBlur={menuVisible}
            />
        </Menu>
    </Container>
)

const ForwardRefTextFieldPicker = forwardRef<TextInput, TextFieldPickerProps>((props, ref) => (
    <TextFieldPickerBase
        {...props}
        ref={ref}
        render={render}
    />
))

export const TextFieldPicker: FC<TextFieldPickerProps> = ForwardRefTextFieldPicker
