import {forwardRef} from 'react'
import {View} from 'react-native'
import {AvatarBaseProps} from './Avatar.interface'

export const AvatarBase = forwardRef<View, AvatarBaseProps>(({labelText = 'A', render, ...renderProps}, ref) =>
        render({...renderProps, labelText: labelText[0], ref})
)
