import { useGmailAlertsEditorState } from "../localStates/gmailAlertsEditorState";
import "../styles/EmailFromInput.scss";

export const EmailFromInput = () => {

    const { gmailAlertsEditorState, setGmailAlertsEditorState } = useGmailAlertsEditorState();

    const handleEmailFromChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGmailAlertsEditorState((prevState) => ({
            ...prevState,
            emailFrom: event.target.value,
        }))
    }

    return (
        <div className="email-from-input-container">
            <label htmlFor="email-from-input">Email From</label>
            <input
                placeholder="Email from..."
                value={gmailAlertsEditorState.emailFrom || ""}
                id="email-from-input"
                name="email-from"
                type="text"
                onChange={handleEmailFromChange}
            />
        </div>
    );
}