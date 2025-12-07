import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
	title: "Feature Flags Demo",
	description: "Full-stack app with server-side feature flags",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (

		<html lang="en">
			<body>
				<header className="bg-white shadow-sm border-b">
					<div className="container mx-auto px-4 py-4 flex justify-between items-center">
						Potential header
					</div>
				</header>
				<main><Providers>{children}</Providers></main>
			</body>
		</html>

	);
}
