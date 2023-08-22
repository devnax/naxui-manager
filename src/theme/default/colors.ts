// eslint-disable-next-line import/no-anonymous-default-export

export const darkModeColor = {
    background: {
        default: "#24262a",
        paper: "#313339",
    },
    text: {
        primary: "#ffffff",
        secondary: "#BDBDBD"
    },
}


export const lightModeColor = {
    background: {
        default: "#ffffff",
        paper: "#f5f5f5"
    },
    text: {
        primary: "#111111",
        secondary: "#666666"
    },
}

export const main_pallete = {
    ...lightModeColor,
    primary: {
        color: "#2563eb",
        text: '#ffffff',
    },
    secondary: {
        color: '#0d9488',
        text: '#ffffff',
    },
    success: {
        color: "#16a34a",
        text: '#ffffff',
    },
    error: {
        color: '#dc2626',
        text: '#ffffff',
    },
    warning: {
        color: "#d97706",
        text: '#ffffff',
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