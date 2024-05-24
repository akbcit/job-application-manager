import { Button } from "@mui/material";
import "../styles/OvalButtonGreen.scss";

interface OvalButtonGreenProps {
    onButtonClick: () => void;
    content: string;
    extraClass?:string;
    isDisabled?:boolean;
    defaultValue?:boolean;
}

export const OvalButtonGreen: React.FC<OvalButtonGreenProps> = ({ onButtonClick, content,extraClass,isDisabled,defaultValue  }) => (
    <Button
        onClick={onButtonClick}
        className={`oval-btn-green ${extraClass?extraClass:""}`}
        disabled={isDisabled}
    >
        {content}
    </Button>
);