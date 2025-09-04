"use client"

import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import logoHorizontalTransparent from "@/images/logos/logo_horizontal_transparent.svg";
import darkLogoHorizontalTransparent from "@/images/logos/dark_logo_horizontal_transparent.svg";
import logoTransparent from "@/images/logos/logo_transparent.svg"
import darkLogoTransparent from "@/images/logos/dark_logo_transparent.svg"

type LogoProps = {
    height?: number; // اختیاری
};

export function LogoHorizontalTransparent({height = 42}: LogoProps) {
    const theme = useTheme();

    return (
        <Image
            src={
                theme.palette.mode === "dark"
                    ? darkLogoHorizontalTransparent
                    : logoHorizontalTransparent
            }
            alt="logo"
            height={ height }
        />
    );
}

export function LogoTransparent({height = 42}: LogoProps) {
    const theme = useTheme();

    return (
        <Image
            src={
                theme.palette.mode === "dark"
                    ? darkLogoTransparent
                    : logoTransparent
            }
            alt="logo"
            height={ height }
        />
    );
}

