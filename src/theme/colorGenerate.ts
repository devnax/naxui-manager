
// Function to get the contrast color (black or white) based on background color
function getContrastColor(hexColor: any) {
    const rgbColor: any = hexToRgb(hexColor);
    const brightness = (rgbColor.r * 299 + rgbColor.g * 587 + rgbColor.b * 114) / 1000;

    return brightness >= 128 ? "#000000" : "#FFFFFF";
}

// Function to generate lighter and darker color variants
function colorGenerate(baseColor: any, lightnessSteps: any) {
    const rgbColor: any = hexToRgb(baseColor);
    const lightColor = `rgb(${Math.min(rgbColor.r + lightnessSteps, 255)}, ${Math.min(rgbColor.g + lightnessSteps, 255)}, ${Math.min(rgbColor.b + lightnessSteps, 255)})`;
    const darkColor = `rgb(${Math.max(rgbColor.r - lightnessSteps, 0)}, ${Math.max(rgbColor.g - lightnessSteps, 0)}, ${Math.max(rgbColor.b - lightnessSteps, 0)})`;
    const textColor = getContrastColor(baseColor);

    return { lightColor, darkColor, textColor };
}

// Function to convert hex to RGB
function hexToRgb(hex: any) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        }
        : null;
}


export default colorGenerate