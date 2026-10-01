import type {SIZE} from '../token'
import type {Font, FontHeight, FontLetterSpacing, FontSize} from '../font'
import type {TYPOGRAPHY} from './typography.enum'

export type TypographyType = (typeof TYPOGRAPHY)[keyof typeof TYPOGRAPHY]
export interface CreateBuildStyleOptions {
	size: FontSize
	height: FontHeight
	letterSpacing: FontLetterSpacing
	weight: keyof Font['weight']
	prominent?: keyof Font['weight']
}

export interface GetStyleOptions {
	type: keyof typeof TYPOGRAPHY
	size: keyof typeof SIZE
}

export interface FontStyle {
	height: number
	letterSpacing: number
	lineHeight: number
	prominentWeight?: number
	size: number
	style: string
	weight: number
}

export interface TypographyStyle {
	[SIZE.LARGE]: FontStyle
	[SIZE.MEDIUM]: FontStyle
	[SIZE.SMALL]: FontStyle
}

export interface Typography {
	/**
	 * Display
	 *
	 * There are three display styles in the default type scale: Large, medium, and small.
	 * As the largest text on the screen,display styles are reserved for short, important text
	 * or numerals. They work best on large screens.
	 *
	 * For display type, consider choosing a more expressive font, such as a handwritten or
	 * script font.
	 *
	 * If available, set the appropriate optical size to your usage.
	 */
	[TYPOGRAPHY.DISPLAY]: TypographyStyle

	/**
	 * Headline
	 *
	 * Headlines are best-suited for short, high-emphasis text on smaller screens.
	 * These styles can be good for marking primary passages of text or important regions
	 * of content.
	 *
	 * Headlines can also make use of expressive typefaces, provided that appropriate line height
	 * and letter spacing is also integrated to maintain readability.
	 */
	[TYPOGRAPHY.HEADLINE]: TypographyStyle

	/**
	 * Title
	 *
	 * Titles are smaller than headline styles, and should be used for medium-emphasis text that
	 * remains relatively short. For example, consider using title styles to divide secondary
	 * passages of text or secondary regions of content.
	 *
	 * For titles, use caution when using expressive fonts, including display, handwritten, and
	 * script styles.
	 */
	[TYPOGRAPHY.TITLE]: TypographyStyle

	/**
	 * Body
	 *
	 * Body styles are used for longer passages of text in your app.
	 *
	 * Use typefaces intended for body styles, which are readable at smaller sizes and can be
	 * comfortably read in longer passages.
	 *
	 * Avoid expressive or decorative fonts for body text because these can be harder to read at
	 * small sizes.
	 */
	[TYPOGRAPHY.BODY]: TypographyStyle

	/**
	 * Label
	 *
	 * Label styles are smaller, utilitarian styles, used for things like the text inside
	 * components or for very small text in the content body, such as captions.
	 *
	 * Buttons, for example, use the label large font.
	 */
	[TYPOGRAPHY.LABEL]: TypographyStyle
}
