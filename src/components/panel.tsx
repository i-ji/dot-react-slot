import { randomImage } from "./slot";

type Panel = {
  randomImages: randomImage[];
  stopSlot: (index: number) => void;
};

const Panel: React.FC<Panel> = ({ randomImages, stopSlot }) => {
  return (
    <main className="w-[300px] mx-auto mt-5 bg-gray-100 flex justify-between border-4 border-white rounded-xl p-5 box-content">
      {randomImages.map((image, index) => {
        return (
          <section key={index}>
            <img
              src={`img/${image.img}`}
              className={`w-[90px] h-[110px] mb-2 ${
                image.isUnmatched ? "opacity-50" : ""
              }`}
            />
            <button
              className={`cursor-pointer w-[90px] h-8 bg-[#ef454a] shadow-[0_4px_0_#d14831] rounded-2xl text-center leading-8 
                        text-sm select-none text-white ${
                          image.isStop ? "opacity-50" : ""
                        }`}
              onClick={() => stopSlot(index)}
              disabled={image.isStop}
            >
              STOP
            </button>
          </section>
        );
      })}
    </main>
  );
};
export default Panel;
