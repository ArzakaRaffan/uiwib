import Image from "next/image";

export default function HeroSectionHome() {
  return (
    <>
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

    {/* MOBILE */}
    <section className="block md:hidden relative w-full overflow-hidden" style={{ marginTop: "-1.5rem" }}>
      <div className="relative w-full" style={{ aspectRatio: "9/10" }}>
        <Image src="/images/wce/job-expo/BG-Blue-JE.png" alt="" fill
          className="object-cover object-center" priority />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
        <p style={{
          fontFamily: "TimesNewRoman, serif",
          fontWeight: 500,
          fontSize: "clamp(2.5rem, 13vw, 5rem)",
          color: "#FFDBEE",
          lineHeight: 1.1,
          letterSpacing: "-0.05em",
          textAlign: "center",
          margin: 0,
        }}>
          <span style={{ fontFamily: "Amoresa, serif" }}>J</span>{"ob Expo"}
        </p>
        <p style={{
          fontFamily: "TimesNewRoman, serif",
          fontWeight: 500,
          fontSize: "clamp(1.5rem, 8vw, 3rem)",
          color: "#FFDBEE",
          lineHeight: 1.5,
          letterSpacing: "-0.05em",
          margin: "6% 0",
        }}>
          {"is"}
        </p>
        <p style={{
          fontFamily: "TimesNewRoman, serif",
          fontWeight: 500,
          fontSize: "clamp(2rem, 11vw, 4rem)",
          color: "#FFDBEE",
          lineHeight: 1.1,
          letterSpacing: "-0.05em",
          textAlign: "center",
          margin: 0,
        }}>
          <span style={{ fontFamily: "Amoresa, serif" }}>C</span>{"oming Soon!"}
        </p>
      </div>
    </section>
    </>
  )
}
