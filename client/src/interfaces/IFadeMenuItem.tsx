import React from "react";

export default interface IFadeMenuItem {
    to: string;
    text: string;
    onClick?: (e: React.MouseEvent) => void;
}