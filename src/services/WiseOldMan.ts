import { WOMClient } from "@wise-old-man/utils";
import { formatNumber } from "../utils/Helpers";

export async function getEligibleCompetitionParticipants(wom: WOMClient, id: number, pointEligible: number) {
    const details = await wom.competitions.getCompetitionDetails(id);
    const eligibleParticipants = details.participations.filter(participant => participant.progress.gained >= pointEligible);
    eligibleParticipants.forEach(participant => console.log(`${participant.player.displayName} is eligible for clan points! (${formatNumber(participant.progress.gained)} kc/xp)`));
    
    return eligibleParticipants;
}

