import { Button } from "@mui/material";
import "../styles/OvalButtonGreen.scss";

interface OvalButtonGreenProps {
    onButtonClick: () => void;
    content: string;
    extraClass?:string;
    isDisabled?:boolean;
}

export const OvalButtonGreen: React.FC<OvalButtonGreenProps> = ({ onButtonClick, content,extraClass,isDisabled  }) => (
    <Button
        onClick={onButtonClick}
        className={`oval-btn-green ${extraClass?extraClass:""}`}
        disabled={isDisabled}
    >
        {content}
    </Button>
);