import { LoaderCircle } from "lucide-react";

interface LoadingScreenProps {
    loadingFor: "system" | "component";
}

function LoadingScreen({ loadingFor }: LoadingScreenProps) {

    const systemStyle = "fixed inset-0 z-50 flex items-center justify-center bg-white/50";

    const componentStyle = "absolute inset-0 z-50 flex items-center justify-center";

    return (
        <div
            className={
                loadingFor === "system"
                    ? systemStyle
                    : componentStyle
            }
        >
            <div className="absolute inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center">
                <LoaderCircle
                    className="animate-spin text-blue-500"
                    size={70}
                />
            </div>
        </div>
    );
}

export default LoadingScreen;