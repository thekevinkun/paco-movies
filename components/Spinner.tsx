import Image from "next/image";

export default function Spinner() {
  return (
    <div className="h-full mx-auto max-lg:min-h-[94vh] flex flex-col gap-3 items-center justify-center">
      <Image 
        src="/icons/paco-movies-icon.png"
        alt="PacoMovies icon"
        width={90}
        height={90}
        className="object-contain"
      />
      <div className="text-2xl text-light animate-pulse">Just wait...</div>
    </div>
  );
}
