export const TITLE_PREFIX = process.env.PROJECT_TITLE_PREFIX || 'وب سایت |';

export const makeTitle = (title: string): string => `${TITLE_PREFIX} ${title}`;
export const makeTitleCompany = (title: string): string => `${TITLE_PREFIX} ${title}`;
