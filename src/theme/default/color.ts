// eslint-disable-next-line import/no-anonymous-default-export

export const darkModeColor = {
    background: {
        main: "#24262a",
        light: "#313339",
        dark: "#1b1c1f"
    },
    text: {
        primary: "#ffffff",
        secondary: "#BDBDBD"
    },
}


export const lightModeColor = {
    background: {
        main: "#ffffff",
        light: "#f5f5f5",
        dark: "#e9e9e9",
        text: "#111"
    },
    text: {
        primary: "#111111",
        secondary: "#666666"
    },
}

export const main_pallete = {
    ...lightModeColor,
    primary: {
        light: "#3b82f6",
        dark: "#1d4ed8",
        main: "#2563eb",
        text: '#fff',
    },
    secondary: {
        light: "#14b8a6",
        dark: "#0f766e",
        main: '#0d9488',
        text: '#fff',
    },
    success: {
        light: "#22c55e",
        dark: "#15803d",
        main: "#16a34a",
        text: '#fff',
    },
    error: {
        light: "#ef4444",
        dark: "#b91c1c",
        main: '#dc2626',
        text: '#fff',
    },
    warning: {
        light: "#f59e0b",
        dark: "#b45309",
        main: "#d97706",
        text: '#fff',
    },
    grey: {
        1: "#f9fafb",
        2: "#f3f4f6",
        3: "#e5e7eb",
        4: "#d1d5db",
        5: "#9ca3af",
        6: "#6b7280",
        7: "#4b5563",
        8: "#374151",
        9: "#1f2937",
        10: "#111827",
    }
}


export default main_pallete