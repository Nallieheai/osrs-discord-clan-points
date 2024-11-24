import { WOMClient, SKILLS, BOSSES, COMPUTED_METRICS } from "@wise-old-man/utils";
import { formatNumber } from "../utils/Helpers";

export async function getEligibleCompetitionParticipants(wom: WOMClient, id: number, pointEligible: number, teams: string[] = []) {
    const details = await wom.competitions.getCompetitionDetails(id);
    const metric = details.metric;

    let gainedType = "";
    if (SKILLS.some(skill => skill === metric)) {
        gainedType = "XP";
    } else if (BOSSES.some(boss => boss === metric)) {
        gainedType = "kc";
    } else if (COMPUTED_METRICS.some(cmetric => cmetric === metric)) {
        gainedType = metric;
    }

    const eligibleParticipants = details.participations.filter(participant => {
        if (participant.teamName !== null && !teams.includes(participant.teamName)) return false;
        return participant.progress.gained >= pointEligible;
    });

    eligibleParticipants.forEach(participant => 
        console.log(`${participant.player.displayName + (details.type === "team" ? ` of ${participant.teamName}` : "")}` 
            + ` is eligible for clan points! (${formatNumber(participant.progress.gained)} ${metric} ${gainedType})`));
    
    return eligibleParticipants;
}

