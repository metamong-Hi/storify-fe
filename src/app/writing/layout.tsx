import SpeechBubble from "@/components/speechBubble/speechBubble";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <SpeechBubble
                imageSrc="/images/furnitures/speechBubble.png"
                alt="Descriptive Alt Text"
                overlayText="Your Overlay Text Here"
                />
            {children}
        </div>

    );
}
