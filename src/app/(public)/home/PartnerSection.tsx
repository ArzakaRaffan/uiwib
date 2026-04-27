import Image from "next/image";

export default function PartnerSection() {
    return (
        <div className="relative w-full -mt-[30px] z-0">
            <Image
                src="/images/homepage/partner/Background-Medpar.png"
                alt=""
                width={1458}
                height={1130}
                style={{ width: "100%", height: "auto" }}
                className="block"
            />

            <div className="absolute top-[170px] left-0 right-0 flex justify-center px-4">
                <Image
                    src="/images/homepage/partner/Media Partners.png"
                    alt="Grow"
                    width={380}
                    height={64}
                    style={{ width: "20vw", height: "auto", maxWidth: "380px", minWidth: "40px" }}
                />
            </div>

            <div className="absolute bottom-[300px] left-0 right-0 flex justify-center px-4">
                <Image
                    src="/images/homepage/partner/Company Partners.png"
                    alt="Grow"
                    width={450}
                    height={64}
                    style={{ width: "25vw", height: "auto", maxWidth: "450px", minWidth: "40px" }}
                />
            </div>
        </div>

    )
}
