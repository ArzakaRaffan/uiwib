import Image from "next/image";

export default function HeroSectionHome() {
  return (
    <section className="hidden md:block relative w-full overflow-hidden">
      <div className="relative w-full" style={{ aspectRatio: "1443/600", containerType: "inline-size" }}>
        <div className="absolute inset-0">
          <Image src="/images/wce/job-expo/BG-Blue-JE.png" alt="" fill sizes="100vw"
            className="object-cover object-center" priority />
        </div>
      </div>

      <div className="absolute top-[15%] w-full text-center">
        <p style={{
          fontFamily: "TimesNewRoman, serif",
          fontWeight: 500,
          fontSize: "7.5cqw",
          color: "#FFDBEE",
          lineHeight: 1.4,
          letterSpacing: "-0.05em",
        }}>
          <span style={{ fontFamily: "Amoresa, serif" }}>J</span>
          {"ob Expo"}
        </p>
      </div>

      <div className="absolute top-[40%] w-full text-center">
        <p style={{
          fontFamily: "TimesNewRoman, serif",
          fontWeight: 500,
          fontSize: "5cqw",
          color: "#FFDBEE",
          lineHeight: 1.4,
          letterSpacing: "-0.05em",
        }}>
          {"is"}
        </p>
      </div>

      <div className="absolute top-[55%] w-full text-center">
        <p style={{
          fontFamily: "TimesNewRoman, serif",
          fontWeight: 500,
          fontSize: "7.5cqw",
          color: "#FFDBEE",
          lineHeight: 1.4,
          letterSpacing: "-0.05em",
        }}>
          <span style={{ fontFamily: "Amoresa, serif" }}>C</span>
          {"oming Soon!"}
        </p>
      </div>
    </section>
  )
}
