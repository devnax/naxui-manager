
// Function to get the contrast color (black or white) based on background color
function getContrastColor(hexColor: any) {
    const rgbColor: any = hexToRgb(hexColor);
    const brightness = (rgbColor.r * 299 + rgbColor.g * 587 + rgbColor.b * 114) / 1000;
    return brightness >= 128 ? "#000000" : "#FFFFFF";
}

// Function to generate lighter and darker color variants
function colorGenerate(baseColor: string, lightnessSteps: any) {

    if (baseColor.startsWith("rgb")) {
        baseColor = rgbToHex(baseColor) as any
    }

    const rgbColor: any = hexToRgb(baseColor);
    const lightColor = `rgb(${Math.min(rgbColor.r + lightnessSteps, 255)}, ${Math.min(rgbColor.g + lightnessSteps, 255)}, ${Math.min(rgbColor.b + lightnessSteps, 255)})`;
    const darkColor = `rgb(${Math.max(rgbColor.r - lightnessSteps, 0)}, ${Math.max(rgbColor.g - lightnessSteps, 0)}, ${Math.max(rgbColor.b - lightnessSteps, 0)})`;
    const textColor = getContrastColor(baseColor);

    return { lightColor, darkColor, textColor };
}


function rgbToHex(rgbaString: string) {
    // Extract the individual RGBA values from the string
    const match = rgbaString.match(/rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
    if (!match) {
        return null; // Invalid RGBA string format
    }

    let r = parseInt(match[1]);
    let g = parseInt(match[2]);
    let b = parseInt(match[3]);

    // Convert the RGB values to hex format
    r = Math.min(255, Math.max(0, r));
    g = Math.min(255, Math.max(0, g));
    b = Math.min(255, Math.max(0, b));

    // Convert each value to its hex representation
    const rHex = r.toString(16).padStart(2, '0');
    const gHex = g.toString(16).padStart(2, '0');
    const bHex = b.toString(16).padStart(2, '0');

    // Combine the hex values to form the final hex color code
    const hexColor = `#${rHex}${gHex}${bHex}`;
    return hexColor.toUpperCase(); // Convert to uppercase for consistency
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