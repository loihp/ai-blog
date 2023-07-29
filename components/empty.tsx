import Image from "next/image";


interface EmptyProps {
  label: string;
}

const Empty = ({
  label,
}: EmptyProps ) => {
  return (
    <div className="h-full p-20 flex flex-col items-center justify-center">
      <div className="relative h-72 w-72">
        <Image
          alt="Empty"
          fill
          src="/empty.png"
        />
      </div>
      <div className="text-2xl font-bold mt-5">{label}</div>
    </div>
   );
}

export default Empty;