import {forwardRef, useId} from 'react'
import {View} from 'react-native'
import {AvatarBaseProps} from './Avatar.interface'

export const AvatarBase = forwardRef<View, AvatarBaseProps>(({labelText = 'A', render, ...renderProps}, ref) => {
    const id = useId()

    return render({...renderProps, id, labelText: labelText[0], ref})
})
