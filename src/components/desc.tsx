const Desc = () => {
  return (
    <div className="w-[500px] mx-auto mt-8 bg-gray-100 flex justify-between border-4 border-white rounded-xl px-5 py-3 flex-col">
      <h1 className="mx-auto mb-3 text-xl">ルール説明</h1>
      <ul className="list-disc px-5">
        <li className="mb-2">
          ベットする金額を選択した後、SPINして下さい。当たった場合、7倍の金額が貰えます。
        </li>
        <li className="mb-2">クレジットが0になっても何度でもRETRYできます。</li>
        <li>クレジット$1000を目指しましょう。</li>
      </ul>
    </div>
  );
};
export default Desc;
