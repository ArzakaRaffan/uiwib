import Image from "next/image";
export default function GetToKnowSection() {
    return (
        <section
            className="relative min-h-[110vh] overflow-hidden pt-16"
            style={{ backgroundColor: "#f0d060" }}
        >
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/about-us/get-to-know/Background-GTK.png"
                    alt=""
                    fill
                    sizes="100vw"
                    className="object-cover object-center"
                    priority
                />
            </div>
            <div className="absolute inset-0 z-10">
                <Image
                    src="/images/about-us/get-to-know/Texture-GTK.png"
                    alt=""
                    fill
                    sizes="100vw"
                    className="object-cover object-center"
                    priority
                />
            </div>
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

            <div className="absolute z-30 top-[120px] right-[150px] -translate-y-1/2">
                <Image
                    src="/images/about-us/get-to-know/Get-To-Know-UIWIB.png"
                    alt="Get To Know UIWIB"
                    width={532}
                    height={311}
                    style={{ width: "35vw", height: "auto" }}
                />
            </div>

            {/* UIWIB History */}
            <div className="absolute z-30 -bottom-[70px] right-[60px] -translate-y-1/2 mt-8">
                <Image
                    src="/images/about-us/get-to-know/UIWIB History.png"
                    alt="UIWIB History"
                    width={500}
                    height={400}
                    style={{ width: "47vw", height: "auto" }}
                />
            </div>

            <div className="absolute z-30 -bottom-[200px] left-[25px] -translate-y-1/2 mt-8">
                <Image
                    src="/images/about-us/get-to-know/Camera.png"
                    alt="Camera"
                    width={500}
                    height={400}
                    style={{ width: "45vw", height: "auto" }}
                />
            </div>

            <div className="absolute z-20 bottom-[35px] left-[95px] -translate-y-1/2 mt-8 rotate-[5deg]">
                <Image
                    src="/images/about-us/get-to-know/Photo1.png"
                    alt="Camera"
                    width={500}
                    height={400}
                    style={{ width: "27vw", height: "auto" }}
                />
            </div>

            
        </section>
    );
}
