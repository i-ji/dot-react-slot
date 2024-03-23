type Credit = {
  makingBet: (num: number) => void;
  credit: number;
  bet: number;
};

const Credit: React.FC<Credit> = ({ makingBet, credit, bet }) => {
  return (
    <div className="w-[350px] mx-auto mt-5 bg-gray-100 flex justify-between border-4 border-white rounded-xl p-5 flex-col">
      <div className="w-full text-gray-100 bg-black border-2 border-black rounded-lg px-2 flex justify-between">
        <span>Credit</span>
        <span>${credit}</span>
      </div>
      <div className="w-full text-gray-100 bg-black border-2 border-black rounded-lg px-2 my-4 flex justify-between">
        <span>Bet</span>
        <span>${bet}</span>
      </div>
      <div className="flex flex-wrap justify-between">
        <button
          className={`w-[143px] bg-yellow-500 rounded-xl shadow-[0_3px_0_#b8b12e] mb-4 `}
          onClick={() => makingBet(100)}
        >
          $100
        </button>
        <button
          className={`w-[143px] bg-yellow-500 rounded-xl shadow-[0_3px_0_#b8b12e] mb-4 `}
          onClick={() => makingBet(50)}
        >
          $50
        </button>
        <button
          className={`w-[143px] bg-yellow-500 rounded-xl shadow-[0_3px_0_#b8b12e] $ `}
          onClick={() => makingBet(10)}
        >
          $10
        </button>
        <button
          className={`w-[143px] bg-yellow-500 rounded-xl shadow-[0_3px_0_#b8b12e] `}
          onClick={() => makingBet(5)}
        >
          $5
        </button>
      </div>
    </div>
  );
};
export default Credit;
