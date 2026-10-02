import {forwardRef} from 'react'
import {Text, View} from 'react-native'
import {LAYOUT} from '../../constants'
import {useTheme} from '../../hooks'
import {DENSITY_TYPE, SIZE, TYPOGRAPHY} from '../../theme'
import type {RenderDividerProps} from './Divider.interface'

export const RenderDivider = forwardRef<View, RenderDividerProps>(
	(
		{
			id,
			layoutType: rawLayoutType = LAYOUT.HORIZONTAL,
			size,
			style,
			subheader,
			testID,
			...containerProps
		}: RenderDividerProps,
		ref
	) => {
		const {token} = useTheme()
		const {classesName, typographyClasses, densityClasses} = token.classes
		const densityInlineClasses = densityClasses()(DENSITY_TYPE.INLINE)
		const densityVerticalInsetClasses = densityClasses(LAYOUT.VERTICAL)(DENSITY_TYPE.INSET)
		const densityHorizontalInsetClasses = densityClasses(LAYOUT.HORIZONTAL)(DENSITY_TYPE.INSET)
		const layoutType = subheader ? LAYOUT.HORIZONTAL : rawLayoutType

		return (
			<View
				{...containerProps}
				className={classesName('gap-[--density-spacing-extra-small]', {
					[`h-full w-[--border-small] ${densityVerticalInsetClasses(size)}`]: layoutType === LAYOUT.VERTICAL,
					[`h-[--border-small] ${densityHorizontalInsetClasses(size)} w-full`]:
						!subheader && layoutType === LAYOUT.HORIZONTAL,

					[`h-[--border-small] ${densityHorizontalInsetClasses(size)} ${densityInlineClasses(SIZE.EXTRA_SMALL)} w-full`]:
						subheader && layoutType === LAYOUT.HORIZONTAL
				})}
				ref={ref}
				testID={testID ?? `divider--${id}`}
			>
				<View
					className='flex-1 self-stretch bg-[--color-outline-variant]'
					style={[style]}
					testID={`divider__content--${id}`}
				/>

				{subheader && (
					<Text
						className={typographyClasses(TYPOGRAPHY.TITLE)(SIZE.SMALL)({
							colorClasses: 'color-[--color-on-surface-variant]'
						})}
						testID={`divider__subheader--${id}`}
					>
						{subheader}
					</Text>
				)}
			</View>
		)
	}
)

RenderDivider.displayName = 'RenderDivider'
