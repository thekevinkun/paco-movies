import Image from "next/image";

export default function Spinner() {
  return (
    <div className="h-full mx-auto max-lg:min-h-[94vh] flex flex-col items-center justify-center">
      <Image
        src="/icons/spinner.svg"
        alt="Loading Spinner"
        width={75}
        height={75}
        className="object-contain"
      />
    </div>
  );
}
