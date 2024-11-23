import { WOMClient } from "@wise-old-man/utils";

export async function getEligibleCompetitionParticipants(wom: WOMClient, id: number, pointEligible: number) {
    const details = await wom.competitions.getCompetitionDetails(id);
    
    const eligibleParticipants = details.participations.filter(participant => participant.progress.gained >= pointEligible);
    eligibleParticipants.forEach(participant => console.log(`${participant.player.displayName} is eligible for clan points! (${participant.progress.gained}kc)`));
    
    return eligibleParticipants;
}

