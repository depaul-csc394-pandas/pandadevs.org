/**
 * Sleep the the current proccess.
 * @param ms - Milliseconds
 */
export function sleep(ms: number): Promise<{}> {
    return new Promise(resolve => setTimeout(resolve, ms));
}