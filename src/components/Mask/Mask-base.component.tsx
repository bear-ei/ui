import {FC, useId} from 'react'
import {MaskBaseProps} from './Mask.interface'

export const MaskBase: FC<MaskBaseProps> = ({render, ...renderProps}) => {
        const id = useId()

        return render({...renderProps, id})
}
