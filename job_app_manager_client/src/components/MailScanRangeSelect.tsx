import "../styles/MailScanRangeSelect.scss";
import { useGmailAlertsEditorState } from "../localStates/gmailAlertsEditorState";
import { GmailAlertsEditorState } from "../localStates/gmailAlertsEditorState";

export const MailScanRangeSelect = () => {
    const { gmailAlertsEditorState, setGmailAlertsEditorState } = useGmailAlertsEditorState();

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = event.target.value;
        setGmailAlertsEditorState((prevState: GmailAlertsEditorState) => (
            {
                ...prevState,
                emailScanRange: newValue
            }
        ));
    }

    return (
        <div className="mail-scan-range-select-container">
            <label htmlFor="mail-scan-range-select">Select Range</label>
            <select
                id="mail-scan-range-select"
                name="mail-scan-range"
                value={gmailAlertsEditorState.emailScanRange}
                onChange={handleChange}
            >
                <option value="" disabled>Select scan range</option>
                <option value="today">Today</option>
                <option value="last-three-days">Last three days</option>
                <option value="last-week">Last week</option>
            </select>
        </div>
    );
}
