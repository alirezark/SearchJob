export const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

export const matchUrl = (value: string) => urlRegex.test(value?.toLowerCase());

export const persianCharsRegex = /^[\u0600-\u06EF\s]+$/;

export const matchPersianChars = (value: string) => persianCharsRegex.test(value);

export const numberChars = /^[\u06F0-\u06FF\s0-9]+$/;

export const matchNumber = (value: string) => numberChars.test(value);

export const passwordRegex = /^(?=.*?[A-Za-z])(?=.*?[0-9])[!@#$%^&*A-Za-z0-9]{8,32}$/;
