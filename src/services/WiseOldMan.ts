import { WOMClient, SKILLS, BOSSES, COMPUTED_METRICS } from "@wise-old-man/utils";
import { formatNumber } from "../utils/Helpers";

function getCompetitionMetric(metric: string) {
    if (SKILLS.some(skill => skill === metric)) {
        return "XP";
    } else if (BOSSES.some(boss => boss === metric)) {
        return "kc";
    } else if (COMPUTED_METRICS.some(cmetric => cmetric === metric)) {
        return metric;
    }
}

export async function getEligibleCompetitionParticipants(wom: WOMClient, id: number, pointEligible: number, teams: string[] = []) {
    const details = await wom.competitions.getCompetitionDetails(id);
    const gainedType = getCompetitionMetric(details.metric);

    const eligibleParticipants = details.participations.filter(participant => {
        if (participant.teamName !== null && !teams.includes(participant.teamName)) return false;
        return participant.progress.gained >= pointEligible;
    });

    eligibleParticipants.forEach(participant => 
        console.log(`${participant.player.displayName + (details.type === "team" ? ` of ${participant.teamName}` : "")}` 
            + ` is eligible for clan points! (${formatNumber(participant.progress.gained)} ${details.metric} ${gainedType})`));
    console.log("==============================================="); // Splitter for debugging

    return eligibleParticipants;
}