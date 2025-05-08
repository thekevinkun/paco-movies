import Image from "next/image";

export default function Spinner() {
  return (
    <div className="h-[92vh] flex flex-col items-center justify-center">
      <Image 
        src="/icons/paco-movies-icon.png"
        alt="PacoMovies icon"
        width={32}
        height={32}
        sizes="32px"
        className="aspect-square object-cover rounded-full"
      />
      <h2 className="pt-4 font-medium text-xl text-main">Loading PacoMovies...</h2>
    </div>
  );
}
