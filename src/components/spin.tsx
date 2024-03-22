type Spin = {
  spinSlot: () => void;
  inactionSpinBtn: boolean;
};

const Spin: React.FC<Spin> = ({ spinSlot, inactionSpinBtn }) => {
  return (
    <button
      className={`block cursor-pointer w-[280px] h-9 bg-[#3498db] shadow-[0_4px_0_#2880b9] rounded-[18px] 
                text-center leading-9 select-none text-white mx-auto mt-4 ${
                  inactionSpinBtn ? "opacity-50" : ""
                }`}
      onClick={spinSlot}
      disabled={inactionSpinBtn}
    >
      SPIN
    </button>
  );
};
export default Spin;
