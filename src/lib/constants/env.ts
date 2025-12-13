export const config = {
	BASE_URL: process.env.BASE_URL,
};

export const getBaseURL = () => {
	if (!config.BASE_URL) {
		throw new Error("BASE_URL is not set");
	}
	return config.BASE_URL;
};
