import { ParticipationWithPlayerAndProgress } from "@wise-old-man/utils";
import { formatNumber } from "../utils/Helpers";

export async function getVariablePointsCompetition(participants: ParticipationWithPlayerAndProgress[],
    eligibleAmount: number, maxPoints: number, bonusAmount: number = 0, bonusCount: number = 0) {
    return participants.map(participant => {
        const points = Math.floor(participant.progress.gained / eligibleAmount);
        return ({
            "user": participant.player.displayName,
            "points": points >= maxPoints ? maxPoints : points,
            "xp": formatNumber(participant.progress.gained)
        });
    });
}