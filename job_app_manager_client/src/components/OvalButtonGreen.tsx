import { Button } from "@mui/material";
import "../styles/OvalButtonGreen.scss";

interface OvalButtonGreenProps {
    onButtonClick: () => void;
    content: string;
    extraClass?:string;
}

export const OvalButtonGreen: React.FC<OvalButtonGreenProps> = ({ onButtonClick, content,extraClass  }) => (
    <Button
        onClick={onButtonClick}
        className={`oval-btn-green ${extraClass?extraClass:""}`}
    >
        {content}
    </Button>
);