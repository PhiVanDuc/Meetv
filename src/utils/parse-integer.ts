export default (digit?: string) => {
    const parsed = parseInt(digit || "", 10);
    return isNaN(parsed) ? 1 : parsed;
}