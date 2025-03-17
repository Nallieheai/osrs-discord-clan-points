// const { WOMClient } = require('@wise-old-man/utils');
import mysql from "mysql2";
import { WOMClient } from "@wise-old-man/utils";
import { fetchPointsFromCollectionLog } from "./services/CollectionLog";
import { getEligibleCompetitionParticipants } from "./services/WiseOldMan";
import { getVariablePointsCompetition } from "./services/IronRelax";


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
    // const eligibleParticipants = await getEligibleCompetitionParticipants(wom, 66593, 500 * 10 ** 3, ["Iron Relax (Europe)"]);
    const eligibleParticipants = await getEligibleCompetitionParticipants(wom, 75234, 1 * 10 ** 5);
    const userPoints = await getVariablePointsCompetition(eligibleParticipants, 1 * 10 ** 5, 10);

    userPoints.forEach(data => console.log(`${data.user} gets ${data.points} points! (${data.xp})`));
})();