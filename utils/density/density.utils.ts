export const getScaledSpacing =
        (density = 0) =>
        (theme: DefaultTheme) =>
                density * theme.token.spacing.extraSmall
