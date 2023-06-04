export function wait(ms: number): Promise<void> {
    return new Promise((s) => {
        setTimeout(s, ms);
    });
}
