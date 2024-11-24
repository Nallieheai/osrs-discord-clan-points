// const { WOMClient } = require('@wise-old-man/utils');
import { WOMClient } from "@wise-old-man/utils";
import { fetchPointsFromCollectionLog } from "./services/CollectionLog";
import { getEligibleCompetitionParticipants } from "./services/WiseOldMan";


/*
 * WOM Base URL: https://api.wiseoldman.net/v2
 * CollectionLog Base URL: https://api.collectionlog.net/
 * Iron Relax groupId: 5657
 * Competitions: 69862, 70981, 66593 (check team)
 */

// Main function
(async () => {
    const wom = new WOMClient();

    // const totalPoints = await fetchPointsFromCollectionLog("Nallieheai", "Iron Relax", 5657);
    // const eligibleParticipants = await getEligibleCompetitionParticipants(wom, 66593, 100, ["Iron Relax (Europe)"]);
})();

