import React from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Country from "@/components/Country";
import ChartComponent from "@/components/ChartComponent";

interface CountryInfoProps {
  name?: string;
  code: string;
  flagUrl: string;
  borders: any[];
  population: any[];
}

const CountryInfo = () => {
  const router = useRouter();
  const code = router.query.code;
  const [country, setCountry] = useState<CountryInfoProps | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`http://localhost:3000/countries/${code}`);
      setCountry(result.data);
    };
    fetchData();
  }, [code]);
  return (
    <div className="min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
      {country ? (
        <>
          <div className="flex items-center justify-start gap-4 mb-8">
            <h1 className="text-4xl font-bold">{country.name}</h1>
            <Image
              src={country.flagUrl}
              alt={`${country.name} flag`}
              width={50}
              height={50}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2 w-[40%]">
              <h1 className="text-2xl font-bold">Borders</h1>
              <div className="flex flex-wrap gap-2 flex-col">
                {country.borders?.map((border: any) => (
                  <Country
                    key={border.countryCode}
                    code={border.countryCode}
                    name={border.commonName}
                  />
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Population</h2>
              {/* create a chart with the population data, where the x-axis is the year and the y-axis is the population */}
              <div className="bg-white w-full">
                {country.population ? (
                  <ChartComponent data={country.population} />
                ) : (
                  "No population data available"
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default CountryInfo;
