import localFont from "next/font/local";
import { useEffect, useState } from "react";
import axios from "axios";
import Country from "@/components/Country";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

interface CountryProps {
  countryCode: string;
  name: string;
}

export default function Home() {
  const [countries, setCountries] = useState<CountryProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        "http://localhost:3000/countries/available"
      );
      setCountries(result.data);
    };
    fetchData();
  }, []);
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <div className="row-span-1">
        <h1 className="text-4xl font-bold">Countries</h1>
        <h2 className="text-lg text-center text-slate-500">
          Select a country to view more information
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {countries.map((country) => (
          <Country
            key={country.countryCode}
            name={country.name}
            code={country.countryCode}
          />
        ))}
      </div>
    </div>
  );
}
