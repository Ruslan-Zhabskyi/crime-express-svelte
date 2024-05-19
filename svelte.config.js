import vercel from '@sveltejs/adapter-vercel';
const config = {
	kit: {
		adapter: vercel(),
		// rest of the config
	},
};
export default config;