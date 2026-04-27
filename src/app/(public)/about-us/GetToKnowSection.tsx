import CyclingPhoto from "@/components/about-us/CyclingPhoto";
import Image from "next/image";

export default function GetToKnowSection() {
    return (
        <>
            {/* ── DESKTOP ── */}
            <section
                className="hidden md:block relative w-full overflow-hidden"
                style={{ backgroundColor: "#f0d060", paddingTop: "8vw", minHeight: "110vh" }}
            >
                {/* Background */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/about-us/get-to-know/Background-GTK.png"
                        alt="" fill sizes="100vw"
                        className="object-cover object-center"
                        priority
                    />
                </div>
                {/* Texture */}
                <div className="absolute inset-0 z-10">
                    <Image
                        src="/images/about-us/get-to-know/Texture-GTK.png"
                        alt="" fill sizes="100vw"
                        className="object-cover object-center"
                        priority
                    />
                </div>
                {/* Elements */}
                <div className="absolute top-0 left-0 z-20 w-full overflow-hidden">
                    <Image
                        src="/images/about-us/get-to-know/Elements-GTK.png"
                        alt=""
                        width={1440}
                        height={800}
                        style={{ minWidth: "103%", height: "auto", transform: "translateX(-5%) translateY(-5%)" }}
                        priority
                    />
                </div>
                {/* Get To Know title */}
                <div className="absolute z-30" style={{ top: "1vw", right: "10vw" }}>
                    <Image
                        src="/images/about-us/get-to-know/Get-to-know-UIWIB.png"
                        alt="Get To Know UIWIB"
                        width={532}
                        height={311}
                        style={{ width: "35vw", height: "auto" }}
                    />
                </div>
                {/* UIWIB History */}
                <div className="absolute z-30" style={{ bottom: "8vw", right: "4vw" }}>
                    <Image
                        src="/images/about-us/get-to-know/UIWIB History.png"
                        alt="UIWIB History"
                        width={500}
                        height={400}
                        style={{ width: "47vw", height: "auto" }}
                    />
                </div>
                {/* Camera */}
                <div className="absolute z-30" style={{ bottom: "4vw", left: "1.5vw" }}>
                    <Image
                        src="/images/about-us/get-to-know/Camera.png"
                        alt="Camera"
                        width={500}
                        height={400}
                        style={{ width: "45vw", height: "auto" }}
                    />
                </div>
                <CyclingPhoto/>
            </section>

            {/* ── MOBILE ── */}
            <section
                className="block md:hidden relative w-full overflow-hidden"
                style={{ backgroundColor: "#f0d060", minHeight: "100svh", paddingTop: "15vw" }}
            >
                {/* Background */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/about-us/get-to-know/Background-GTK.png"
                        alt="" fill sizes="100vw"
                        className="object-cover object-center"
                        priority
                    />
                </div>
                {/* Texture */}
                <div className="absolute inset-0 z-10">
                    <Image
                        src="/images/about-us/get-to-know/Texture-GTK.png"
                        alt="" fill sizes="100vw"
                        className="object-cover object-center"
                        priority
                    />
                </div>
                {/* Elements */}
                <div className="absolute top-0 left-0 z-20 w-full overflow-hidden">
                    <Image
                        src="/images/about-us/get-to-know/Elements-GTK.png"
                        alt=""
                        width={1440}
                        height={800}
                        style={{ minWidth: "150%", height: "auto", transform: "translateX(-10%) translateY(-5%)" }}
                        priority
                    />
                </div>
                {/* Get To Know title */}
                <div className="absolute z-30" style={{ top: "12vw", right: "4vw" }}>
                    <Image
                        src="/images/about-us/get-to-know/Get-to-know-UIWIB.png"
                        alt="Get To Know UIWIB"
                        width={532}
                        height={311}
                        style={{ width: "60vw", height: "auto" }}
                    />
                </div>
                {/* UIWIB History */}
                <div className="absolute z-30" style={{ bottom: "18vw", right: "2vw" }}>
                    <Image
                        src="/images/about-us/get-to-know/UIWIB History.png"
                        alt="UIWIB History"
                        width={500}
                        height={400}
                        style={{ width: "80vw", height: "auto" }}
                    />
                </div>
                {/* Camera */}
                <div className="absolute z-30" style={{ bottom: "6vw", left: "0vw" }}>
                    <Image
                        src="/images/about-us/get-to-know/Camera.png"
                        alt="Camera"
                        width={500}
                        height={400}
                        style={{ width: "75vw", height: "auto" }}
                    />
                </div>
                {/* Photo1 */}
                <div className="absolute z-20 rotate-[5deg]" style={{ bottom: "10vw", left: "8vw" }}>
                    <Image
                        src="/images/about-us/get-to-know/Photo1.png"
                        alt="Photo"
                        width={500}
                        height={400}
                        style={{ width: "50vw", height: "auto" }}
                    />
                </div>
            </section>
        </>
    );
}