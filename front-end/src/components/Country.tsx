import React from "react";
import { useRouter } from "next/navigation";

interface CountryProps {
  name?: string;
  code: string;
}

const Country = ({ name, code }: CountryProps) => {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.push(`/countries/${code}`);
      }}
      className="p-4 bg-slate-700 rounded-md shadow-md"
    >
      <h2 className="text-lg font-bold">{name}</h2>
    </button>
  );
};

export default Country;
