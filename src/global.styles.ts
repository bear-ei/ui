import {createGlobalStyle} from 'styled-components'

export const GlobalStyle = createGlobalStyle`
	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}

	html,
	body,
	#root {
		-moz-osx-font-smoothing: grayscale;
		-webkit-font-smoothing: antialiased;
		display: flex;
		flex-direction: column;
		height: 100%;
		margin: 0;
		overscroll-behavior: none;
		padding: 0;
		text-rendering: optimizeLegibility;
		width: 100%;
	}

	body {
		background-color: #ffffff;
		color: #1a1a1a;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
		font-size: 16px;
		line-height: 1.5;
	}

	input,
	button,
	textarea,
	select {
		background: none;
		border: none;
		color: inherit;
		font: inherit;
		margin: 0;
		outline: none;
		padding: 0;
	}

	button {
		cursor: pointer;
	}

	a {
		color: inherit;
		text-decoration: none;
	}

	img {
		display: block;
		height: auto;
		max-width: 100%;
	}

	::-webkit-scrollbar {
		height: 8px;
		width: 8px;
	}

	::-webkit-scrollbar-track {
		background: transparent;
	}

	::-webkit-scrollbar-thumb {
		background-color: rgba(0, 0, 0, 0.2);
		border-radius: 4px;
	}

	@media (prefers-color-scheme: dark) {
		body {
			background-color: #121212;
			color: #f0f0f0;
		}

		::-webkit-scrollbar-thumb {
			background-color: rgba(255, 255, 255, 0.3);
		}
	}
`
