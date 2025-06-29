"use client";

import { PropsWithChildren } from "react";
import { ThemeProvider } from "next-themes";

export default function ThemeProviderWrapper(props: PropsWithChildren) {
    return (
        <ThemeProvider defaultTheme="system" enableSystem>
            {props.children}
        </ThemeProvider>
    );
}