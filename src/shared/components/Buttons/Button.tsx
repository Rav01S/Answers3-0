'use client';

import { ReactNode } from "react";
import { motion } from "framer-motion";


interface ButtonProps {
    variant?: "primary" | "secondary" | "destructive";
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    className?: string;
    children: ReactNode;
    onClick?: () => void;
}

export default function Button({
    variant,
    children,
    className = "",
    ...props
}: ButtonProps) {
    const newClassName = `btn border-2 px-4 py-2 rounded cursor-pointer ${
        variant === "primary"
            ? "bg-primary text-white"
            : variant === "destructive"
            ? "bg-red-500 text-white"
            : "bg-secondary text-white"
    } ${className}`;

    return (
        <motion.button
            className={newClassName}
            whileHover={{ scale: 1.045 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 350, damping: 22 }}
            {...props}
        >
            {children}
        </motion.button>
    );
}