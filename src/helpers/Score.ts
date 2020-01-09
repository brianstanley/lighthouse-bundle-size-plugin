const OPTIMAL_SCORE = 1;
const BAD_SCORE = 0;
const IDEAL_BUNDLE_SIZE = 1000000; //In bytes.


export function calculateScore(bundleSize: number): number {
    let score = OPTIMAL_SCORE;
    score -= bundleSize / IDEAL_BUNDLE_SIZE;

    // We should return an score between  0 and 1.
    // 1 is good for Lighthouse
    if (score >= 0) {
        return OPTIMAL_SCORE;
    } else if (score < 0 && score > -1) {
        return Math.abs(score);
    }

    return BAD_SCORE;
}
