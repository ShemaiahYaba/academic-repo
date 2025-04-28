import Card from "@/components/Card";
import Hero from "@/components/Hero";
import Paragraph from "@/components/Paragraph";
import { info } from "@/constants/dataItems";

const Home = () => {
  return (
    <>
      <Hero />

      <div className=" relative pt-10 flex">
        <ul className="flex flex-row justify-between gap-3.5 content-between">
          {info.map((data) => (
            <li key={data.id} className="p-3">
              <img src={data.icon} className="h-20 w-20 object-contain p-2" />
              <h1 className="font-bold">{data.label}</h1>
              <p className="font-light">{data.paragraph}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="pt-6">
        <Card />

        <Paragraph />

        <div className="flex justify-center pt-16 pb-16">
          <h1 className=" text-slate-950 font-bold text-4xl text-centet">
            New Released Books{" "}
          </h1>
        </div>
      </div>
    </>
  );
};

export default Home;
