import loadingAnimation from "@/lib/lottie/pokeball-loading-animation.json";
import Lottie from "lottie-react";

export default function LoadingScreen() {
	return (
		<div className="flex flex-col w-full justify-center items-center h-screen">
			<Lottie animationData={loadingAnimation} className="flex justify-center items-center w-10 h-10" loop={true} />
		</div>
	);
}
