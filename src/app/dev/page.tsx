import Link from "next/link";
import { Icon } from "@/common/components/ui/Icon";
import { TokenSwatches } from "@/features/showcase/components/TokenSwatches";
import { SHOWCASE_SECTIONS } from "@/features/showcase/lib/sections";

const DevIndexPage = () => {
	return (
		<div className="flex flex-col gap-10">
			<header>
				<h1 className="text-2xl font-bold text-navy">
					Componentes de Café Aroma
				</h1>
				<p className="text-sm text-gray-500">
					Qué es y qué hace cada componente, con sus variantes en vivo. Las
					reglas de diseño completas están en <code>DESIGN.md</code>.
				</p>
			</header>

			<section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
				{SHOWCASE_SECTIONS.map((section) => (
					<Link
						key={section.slug}
						href={`/dev/${section.slug}`}
						className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-white p-4 transition-colors hover:border-teal"
					>
						<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy text-teal">
							<Icon name={section.icon} />
						</div>
						<div>
							<p className="font-bold text-navy">{section.label}</p>
							<p className="text-xs text-gray-500">{section.description}</p>
						</div>
					</Link>
				))}
			</section>

			<TokenSwatches />
		</div>
	);
};

export default DevIndexPage;
