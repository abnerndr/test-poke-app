export const dynamic = "force-dynamic";

export default function LoadingFallback() {
	return (
		<div className="p-4 max-w-6xl mx-auto">
			<div className="text-center py-8">
				<p className="text-gray-600">Carregando...</p>
			</div>
		</div>
	);
}
