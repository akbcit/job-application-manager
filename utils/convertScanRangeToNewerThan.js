export const convertScanRangeToNewerThan = (scanRange) => {
    switch(scanRange) {
        case "today":
            return "1d";
        case "last-three-days":
            return "3d";
        case "last-week":
            return "7d";
        default:
            return null;
    }
};