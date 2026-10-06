import {PLATFORM} from '../theme.enum'
import type {Platform} from '../theme.interface'
import type {Font} from './font.interface'

const PLATFORM_CODE_FONT_FAMILY = {
	[PLATFORM.ANDROID]: 'System',
	[PLATFORM.IOS]: 'System',
	[PLATFORM.MACOS]: 'SF Mono',
	[PLATFORM.WEB]:
		'Source Code Pro, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace',
	[PLATFORM.WINDOWS]: 'System'
}

const PLATFORM_FONT_FAMILY = {
	[PLATFORM.ANDROID]: 'System',
	[PLATFORM.IOS]: 'System',
	[PLATFORM.MACOS]:
		'-apple-system, ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji',
	[PLATFORM.WEB]:
		'-apple-system, ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji',
	[PLATFORM.WINDOWS]: 'System'
}

export const createFont =
	(fontFamily?: string) =>
	(codeFontFamily?: string) =>
	(platform: Platform = PLATFORM.IOS): Font => ({
		family: {
			codeFamily: codeFontFamily ?? PLATFORM_CODE_FONT_FAMILY[platform] ?? 'System',
			family: fontFamily ?? PLATFORM_FONT_FAMILY[platform] ?? 'System'
		},
		letterSpacing: {
			letterSpacing0: -0.5,
			letterSpacing1: -0.25,
			letterSpacing2: 0,
			letterSpacing3: 0.1,
			letterSpacing4: 0.15,
			letterSpacing5: 0.4,
			letterSpacing6: 0.5
		},
		height: {
			height0: 17,
			height1: 18,
			height2: 22,
			height3: 24,
			height4: 26,
			height5: 28,
			height6: 30,
			height7: 32,
			height8: 36,
			height9: 40,
			height10: 44,
			height11: 52,
			height12: 64
		},
		lineHeight: {
			lineHeight0: 1.55,
			lineHeight1: 1.5,
			lineHeight2: 1.57,
			lineHeight3: 1.5,
			lineHeight4: 1.44,
			lineHeight5: 1.4,
			lineHeight6: 1.36,
			lineHeight7: 1.33,
			lineHeight8: 1.29,
			lineHeight9: 1.25,
			lineHeight10: 1.22,
			lineHeight11: 1.16,
			lineHeight12: 1.12
		},
		size: {
			size0: 11,
			size1: 12,
			size2: 14,
			size3: 16,
			size4: 18,
			size5: 20,
			size6: 22,
			size7: 24,
			size8: 28,
			size9: 32,
			size10: 36,
			size11: 45,
			size12: 57
		},
		style: {normal: 'normal'},
		weight: {bold: 700, medium: 500, regular: 400}
	})
