import { Icon } from "@/common/components/ui/Icon";
import { LinkButton } from "@/common/components/ui/LinkButton";
import { locations } from "@/common/locations";

/** Invitación "¿Listo para pedir?" que lleva al catálogo. */
export const OrderCtaCard = () => {
	return (
		<div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
			<h2 className="text-lg font-bold text-navy">
				{locations.customerOrders.ctaTitle}
			</h2>
			<p className="mb-5 text-sm text-gray-500">
				{locations.customerOrders.ctaDescription}
			</p>
			<LinkButton href="/solicitar" variant="accent">
				<Icon name="shoppingBag" size={18} />
				{locations.customerOrders.ctaButton}
			</LinkButton>
		</div>
	);
};
