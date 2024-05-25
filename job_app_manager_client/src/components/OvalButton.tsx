import { Button } from "@mui/material";
import "../styles/OvalButton.scss";

interface OvalButtonProps {
    onButtonClick: () => void;
    content: string;
    extraClass?: string;
    isDisabled?: boolean;
    defaultValue?: boolean;
    primaryColor?: string;
    backgroundColor?: string;
}

export const OvalButton: React.FC<OvalButtonProps> = ({ onButtonClick, content, extraClass, isDisabled, primaryColor, backgroundColor }) => {
    const style = {
        '--primary-color': primaryColor || '#15d196',
        '--background-color': backgroundColor || 'transparent',
        '--hover-background-color': primaryColor ? `${primaryColor}6b` : '#15d1966b'
    } as React.CSSProperties;

    return (
        <Button
            onClick={onButtonClick}
            className={`oval-btn ${extraClass ? extraClass : ""}`}
            disabled={isDisabled}
            style={style}
        >
            {content}
        </Button>
    );
};
