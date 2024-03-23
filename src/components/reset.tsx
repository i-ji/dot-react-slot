type Retry = {
  actionRetry: () => void;
  retry: boolean;
};

const Retry: React.FC<Retry> = ({ actionRetry, retry }) => {
  return (
    <button
      className={`block w-[280px] h-9 bg-[#7c9d2f] shadow-[0_4px_0_#549f4c] rounded-[18px] 
          text-center leading-9 select-none text-white mx-auto mt-4 ${
            retry ? "opacity-50 cursor-default" : ""
          }`}
      onClick={actionRetry}
      disabled={retry}
    >
      RETRY
    </button>
  );
};
export default Retry;
