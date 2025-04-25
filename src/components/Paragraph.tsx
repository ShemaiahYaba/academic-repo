import { paragraphBanner } from "../constants/images"


const Paragraph = () => {
  return (
    <>
      <div className="relative w-full">

        <img src={paragraphBanner} alt="paragraph" />
               {/* Gradient Overlay */}
         <div className="absolute w-full inset-0 bg-gradient-to-b from-black/70 to-black/60"></div>


         <div className="absolute inset-0 flex flex-col  gap-y-1.5 p-10 md:p-5 justify-center justify-items-center">
        <h1 className="text-white text-xl md:text-6xl lg:text-3xl font-bold  text-center">
          “The more that you Read, the more things you will know”<br/>
          “The more that you learn, the more places you wil go”

        </h1>
        </div>
      </div>
    </>
  )
}

export default Paragraph
