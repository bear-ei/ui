import type {FC} from 'react'

import {Text, View} from 'react-native'

import type {RenderDividerProps} from './Divider.interface'

import {LAYOUT} from '../../constants'
import {useTheme} from '../../hooks'
import {DENSITY_SIZE, DENSITY_TYPE, TYPOGRAPHY, TYPOGRAPHY_SIZE} from '../../theme'

export const RenderDivider: FC<RenderDividerProps> = ({
	id,
	layoutType: rawLayoutType = LAYOUT.HORIZONTAL,
	size = DENSITY_SIZE.MEDIUM,
	style,
	subheader,
	testID,
	...containerProps
}) => {
	const {token} = useTheme()
	const {classesName, densityClasses, typographyClasses} = token.classes
	const densityInlineClasses = densityClasses(DENSITY_TYPE.INLINE)
	const densityVerticalInsetClasses = densityClasses(DENSITY_TYPE.INSET, LAYOUT.VERTICAL)
	const densityHorizontalInsetClasses = densityClasses(DENSITY_TYPE.INSET, LAYOUT.HORIZONTAL)
	const resolvedHorizontalInsetSize = size === DENSITY_SIZE.LARGE ? DENSITY_SIZE.NONE : size

	// Subheader only works with horizontal layout — override if set.
	const layoutType = subheader ? LAYOUT.HORIZONTAL : rawLayoutType

	return (
		<View
			{...containerProps}
			className={classesName({
				[`${densityHorizontalInsetClasses(resolvedHorizontalInsetSize)} ${densityInlineClasses(DENSITY_SIZE.SMALL)} flex w-full flex-col justify-between`]:
					subheader && layoutType === LAYOUT.HORIZONTAL,

				// LARGE inset would be too wide for a horizontal rule; fall back to NONE.
				[`h-[--border-small] ${densityHorizontalInsetClasses(resolvedHorizontalInsetSize)} w-full`]:
					!subheader && layoutType === LAYOUT.HORIZONTAL,

				[`h-full w-[--border-small] ${densityVerticalInsetClasses(size)}`]: layoutType === LAYOUT.VERTICAL
			})}
			testID={testID ?? `divider--${id}`}
		>
			<View
				className={classesName('flex-1 self-stretch bg-[--color-outline-variant]', {
					['max-h-[--border-small]']: subheader
				})}
				style={style}
				testID={`divider__content--${id}`}
			/>

			{subheader && (
				<Text
					className={typographyClasses(TYPOGRAPHY.TITLE, {
						colorClasses: 'text-[--color-on-surface-variant]'
					})(TYPOGRAPHY_SIZE.SMALL)}
					testID={`divider__subheader--${id}`}
				>
					{subheader}
				</Text>
			)}
		</View>
	)
}

RenderDivider.displayName = 'RenderDivider'
