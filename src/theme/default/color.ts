// eslint-disable-next-line import/no-anonymous-default-export

export const darkModeColor = {
    background: {
        main: "#24262a",
        light: "#313339",
        dark: "#1b1c1f"
    },
    text: {
        primary: "#ffffff",
        secondary: "#BDBDBD",
        disabled: "#dddddd"
    },
}


export const lightModeColor = {
    background: {
        main: "#ffffff",
        light: "#f5f5f5",
        dark: "#e9e9e9"
    },
    text: {
        primary: "#111111",
        secondary: "#666666",
        disabled: "#999999"
    },
}

export const main_pallete = {
    ...lightModeColor,
    primary: {
        light: "#60a5fa",
        dark: "#2563eb",
        main: "#205fff",
        text: '#eff6ff',
    },
    secondary: {
        light: "#2dd4bf",
        dark: "#0d9488",
        main: '#14b8a6',
        text: '#f0fdfa',
    },
    success: {
        light: "#4ade80",
        dark: "#16a34a",
        main: "#22c55e",
        text: '#f0fdf4',
    },
    error: {
        light: "#f87171",
        dark: "#b91c1c",
        main: '#ef4444',
        text: '#fef2f2',
    },
    warning: {
        light: "#ff9800",
        dark: "#e65100",
        main: "#f97316",
        text: '#fff7ed',
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