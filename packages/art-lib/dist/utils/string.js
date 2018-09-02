export const trim = (value) => {
    return value && value.replace(/^\s+|\s+$/g, '') || '';
};
