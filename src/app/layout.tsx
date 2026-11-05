import { Toast } from "@heroui/react";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import type { ReactNode } from "react";
import { locations } from "@/common/locations";
import "./globals.css";

const jakartaSans = Plus_Jakarta_Sans({
	variable: "--font-jakarta",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: locations.brand.name,
	description: locations.brand.metaDescription,
};

type RootLayoutProps = Readonly<{
	children: ReactNode;
}>;

const RootLayout = ({ children }: RootLayoutProps) => {
	return (
		<html lang="es" className="light">
			<body className={`${jakartaSans.variable} font-sans antialiased`}>
				{children}
				<Toast.Provider placement="bottom end" />
			</body>
		</html>
	);
};

export default RootLayout;
