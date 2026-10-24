import {type FC} from 'react'
import {View} from 'react-native'

import type {RenderProgressProps} from './Progress.interface'

import {useTheme} from '../../hooks'
import {DENSITY_SIZE, DENSITY_TYPE} from '../../theme'
import {ProgressActiveIndicatorCircular} from './Progress-active-indicator-circular'
import {ProgressActiveIndicatorLinear} from './Progress-active-indicator-linear'
import {PROGRESS_MODE, PROGRESS_TYPE} from './Progress.enum'

export const RenderProgress: FC<RenderProgressProps> = ({
	defaultValue,
	enableLoop,
	id,
	mode,
	overlayContent,
	size = DENSITY_SIZE.MEDIUM,
	strokeWidth,
	testID,
	type = PROGRESS_TYPE.LINEAR,
	value,
	...containerProps
}) => {
	const {token} = useTheme()
	const {classNames, densityClasses} = token.classes
	const densityInlineClasses = densityClasses(DENSITY_TYPE.INLINE)
	const resolvedMode =
		mode ?? (type === PROGRESS_TYPE.LINEAR ? PROGRESS_MODE.DETERMINATE : PROGRESS_MODE.INDETERMINATE)

	return (
		<View
			{...containerProps}
			accessibilityRole='progressbar'
			className={classNames('pointer-events-none flex flex-col', {
				[densityInlineClasses(size)]: type === PROGRESS_TYPE.CIRCULAR,

				['h-[--border-x-large] min-w-[--density-inline-medium] self-stretch']: type === PROGRESS_TYPE.LINEAR
			})}
			testID={testID ?? `progress--${id}`}
		>
			{type === PROGRESS_TYPE.CIRCULAR && (
				<ProgressActiveIndicatorCircular
					enableLoop={enableLoop}
					mode={resolvedMode}
					overlayContent={overlayContent}
					size={size}
					strokeWidth={strokeWidth}
					testID={`progress__progressActiveIndicatorCircular--${id}`}
				/>
			)}

			{type === PROGRESS_TYPE.LINEAR && (
				<ProgressActiveIndicatorLinear
					defaultValue={defaultValue}
					mode={resolvedMode}
					testID={`progress__progressActiveIndicatorLinear--${id}`}
					value={value}
				/>
			)}
		</View>
	)
}
