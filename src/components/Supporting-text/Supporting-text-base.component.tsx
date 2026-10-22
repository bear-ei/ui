import {useId, type FC} from 'react'

import type {SupportingTextBaseProps} from './Supporting-text.interface'

import {RenderSupportingText} from './Supporting-text.render'
import {useSupportingTextAnimated} from './use-supporting-text-animated.hook'

export const SupportingTextBase: FC<SupportingTextBaseProps> = ({disabled, error, ...props}) => {
	const id = useId()
	const {textAnimatedStyle} = useSupportingTextAnimated({disabled, error})

	return (
		<RenderSupportingText
			{...props}
			id={id}
			textAnimatedStyle={textAnimatedStyle}
		/>
	)
}

SupportingTextBase.displayName = 'SupportingTextBase'
