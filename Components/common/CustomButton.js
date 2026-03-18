"use client";
import { Button } from "react-bootstrap";
export default function CustomButton({ children, variant = "success", size, onClick, type = "button", className = "",...props}) 
{
    return (
        <Button
            variant={variant}
            size={size}
            onClick={onClick}
            type={type}
            className={`d-flex align-items-center justify-content-center ${className}`}
            {...props}//this will add all other props that added by user or classes 
        >
            {children}
        </Button>
    );
}
