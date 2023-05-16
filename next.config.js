/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
	images: {
		domains: [
			"avatars.githubusercontent.com",
			"res.cloudinary.com",
			"lh3.googleusercontent.com",
		],
	},
}

module.exports = nextConfig
