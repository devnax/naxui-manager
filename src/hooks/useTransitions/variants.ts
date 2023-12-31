interface VariantArgs {
    boxHeight: number;
    boxWidth: number;
}
export const fade = (_arg: VariantArgs) => {
    return {
        in: {
            from: {
                opacity: 0
            },
            to: {
                opacity: 1
            }
        },
        out: {
            from: {
                opacity: 1
            },
            to: {
                opacity: 0
            }
        }
    }
}

export const fadeDown = (_arg: VariantArgs) => {
    return {
        in: {
            from: {
                transform: `translateY(-150px)`,
                opacity: 0
            },
            to: {
                transform: `translateY(0)`,
                opacity: 1
            }
        },
        out: {
            from: {
                transform: `translateY(0)`,
                opacity: 1
            },
            to: {
                transform: `translateY(-150px)`,
                opacity: 0
            }
        }
    }
}

export const fadeUp = (_arg: VariantArgs) => {
    return {
        in: {
            from: {
                transform: `translateY(150px)`,
                opacity: 0
            },
            to: {
                transform: `translateY(0)`,
                opacity: 1
            }
        },
        out: {
            from: {
                transform: `translateY(0)`,
                opacity: 1
            },
            to: {
                transform: `translateY(150px)`,
                opacity: 0
            }
        }
    }
}

export const fadeRight = (_arg: VariantArgs) => {
    return {
        in: {
            from: {
                transform: `translateX(-150px)`,
                opacity: 0
            },
            to: {
                transform: `translateX(0)`,
                opacity: 1
            }
        },
        out: {
            from: {
                transform: `translateX(0)`,
                opacity: 1
            },
            to: {
                transform: `translateX(-150px)`,
                opacity: 0
            }
        }
    }
}

export const fadeLeft = (_arg: VariantArgs) => {
    return {
        in: {
            from: {
                transform: `translateX(150px)`,
                opacity: 0
            },
            to: {
                transform: `translateX(0)`,
                opacity: 1
            }
        },
        out: {
            from: {
                transform: `translateX(0)`,
                opacity: 1
            },
            to: {
                transform: `translateX(150px)`,
                opacity: 0
            }
        }
    }
}

export const grow = (_arg: VariantArgs) => {
    return {
        in: {
            from: {
                transform: "scale(.8, .6)",
                opacity: 0
            },
            to: {
                transform: "scale(1)",
                opacity: 1
            }
        },
        out: {
            from: {
                transform: "scale(1)",
                opacity: 1
            },
            to: {
                transform: "scale(.8, .6)",
                opacity: 0
            }
        }
    }
}


export const zoom = (_arg: VariantArgs) => {
    return {
        in: {
            from: {
                transform: "scale(.8)",
                opacity: 0
            },
            to: {
                transform: "scale(1)",
                opacity: 1
            }
        },
        out: {
            from: {
                transform: "scale(1)",
                opacity: 1
            },
            to: {
                transform: "scale(.8)",
                opacity: 0
            }
        }
    }
}

export const zoomOver = (_arg: VariantArgs) => {
    return {
        in: {
            from: {
                transform: "scale(1.2)",
                opacity: 0
            },
            to: {
                transform: "scale(1)",
                opacity: 1
            }
        },
        out: {
            from: {
                transform: "scale(1)",
                opacity: 1
            },
            to: {
                transform: "scale(1.2)",
                opacity: 0
            }
        }
    }
}


export const collapsVerticle = (_arg: VariantArgs) => {
    return {
        in: {
            from: {
                height: 0 + "px",
                overflow: "hidden"
            },
            to: {
                height: _arg.boxHeight + "px",
                overflow: "hidden"
            }
        },
        out: {
            from: {
                height: _arg.boxHeight + "px",
                overflow: "hidden"
            },
            to: {
                height: 0 + "px",
                overflow: "hidden"
            }
        }
    }
}


export const collapsHorizental = (_arg: VariantArgs) => {
    return {
        in: {
            from: {
                width: 0 + "px",
                overflow: "hidden"
            },
            to: {
                width: _arg.boxWidth + "px",
                overflow: "hidden"
            }
        },
        out: {
            from: {
                width: _arg.boxWidth + "px",
                overflow: "hidden"
            },
            to: {
                width: 0 + "px",
                overflow: "hidden"
            }
        }
    }
}




