import { useEffect, useState } from "react";
import Panel from "./panel";
import Spin from "./spin";
import Credit from "./credit";
import Retry from "./reset";
import Desc from "./desc";

export type randomImage = {
  img: string;
  isUnmatched: boolean;
  isStop: boolean;
};

type timeoutIds = {
  id: number | undefined;
};

const Slot = () => {
  const images = ["seven.png", "cherry.png", "bell.png"];
  //   "seven.png", "cherry.png", "bell.png"

  // タイムアウトIDの管理
  const [timeoutIds, setTimeoutIds] = useState<timeoutIds[]>([
    { id: undefined },
    { id: undefined },
    { id: undefined },
  ]);

  // ランダムな画像の選択
  const getRandomImage = () => {
    return images[Math.floor(Math.random() * images.length)];
  };

  // 動いているパネルの数
  const [panelsLeft, setPanelsLeft] = useState(2);

  const [randomImages, setRandomImages] = useState<randomImage[]>([
    { img: getRandomImage(), isUnmatched: false, isStop: true },
    { img: getRandomImage(), isUnmatched: false, isStop: true },
    { img: getRandomImage(), isUnmatched: false, isStop: true },
  ]);

  // クレジット
  const [credit, setCredit] = useState(50);

  // ベッド
  const [bet, setBet] = useState(0);

  // spinボタン
  const [inactionSpinBtn, setInactionSpinBtn] = useState(true);

  // 再チャレンジ
  const [retry, setRetry] = useState(true);

  // スロットを回す
  const spinSlot = () => {
    // スロット0を回す
    const spin0 = () => {
      const updatedRandomImages = [...randomImages];
      updatedRandomImages[0].img = getRandomImage();
      timeoutIds[0].id = setTimeout(() => {
        spin0();
      }, 50);
      setRandomImages(updatedRandomImages);
      setTimeoutIds(timeoutIds);
    };
    spin0();

    // スロット1を回す
    const spin1 = () => {
      const updatedRandomImages = [...randomImages];
      updatedRandomImages[1].img = getRandomImage();
      timeoutIds[1].id = setTimeout(() => {
        spin1();
      }, 50);
      setRandomImages(updatedRandomImages);
      setTimeoutIds(timeoutIds);
    };
    spin1();

    // スロット2を回す
    const spin2 = () => {
      const updatedRandomImages = [...randomImages];
      updatedRandomImages[2].img = getRandomImage();
      timeoutIds[2].id = setTimeout(() => {
        spin2();
      }, 50);
      setRandomImages(updatedRandomImages);
      setTimeoutIds(timeoutIds);
    };
    spin2();

    // スピンボタン
    setInactionSpinBtn(true);

    const updatedRandomImages = randomImages.map((image) => {
      image.isUnmatched = false;
      image.isStop = false;
      return image;
    });
    setRandomImages(updatedRandomImages);

    // 動いているパネル
    setPanelsLeft(2);
  };

  // スロットを止める
  const stopSlot = (index: number) => {
    const updatedRandomImages = [...randomImages];
    updatedRandomImages[index].isStop = true;
    const updatedTimeoutIds = [...timeoutIds];
    clearTimeout(updatedTimeoutIds[index].id);
    setRandomImages(updatedRandomImages);
    setTimeoutIds(updatedTimeoutIds);
    setPanelsLeft((prev) => prev - 1);

    // 全てのパネルが止まった時の処理
    if (panelsLeft === 0) {
      // パネルの結果判定
      checkPanels();
      setBet(0);

      // クレジットが0になった場合
      if (credit === 0) {
        // パネルをtrueにする
        setInactionSpinBtn(true);
        // retryボタンの表示
        setRetry(false);
      }
    }
  };

  // オールベットした時のエラー修正
  useEffect(() => {
    if (credit > 0 && bet === 0) {
      setRetry(true);
    }
  }, [credit, bet]);

  // 結果判定
  const checkPanels = () => {
    const updatedRandomImages = [...randomImages];
    // スロット0のパネル
    if (
      randomImages[0].img !== randomImages[1].img &&
      randomImages[0].img !== randomImages[2].img
    ) {
      updatedRandomImages[0].isUnmatched = true;
      setRandomImages(updatedRandomImages);
    }
    // スロット1のパネル
    if (
      randomImages[1].img !== randomImages[0].img &&
      randomImages[1].img !== randomImages[2].img
    ) {
      updatedRandomImages[1].isUnmatched = true;
      setRandomImages(updatedRandomImages);
    }
    // スロット2のパネル
    if (
      randomImages[2].img !== randomImages[1].img &&
      randomImages[2].img !== randomImages[0].img
    ) {
      updatedRandomImages[2].isUnmatched = true;
      setRandomImages(updatedRandomImages);
    }

    // 当たった場合の処理
    if (
      randomImages[0].img === randomImages[1].img &&
      randomImages[0].img === randomImages[2].img
    ) {
      setCredit((prev) => prev + bet * 7);
    }
  };

  // retryボタン
  const actionRetry = () => {
    setRetry(true);
    setCredit(50);
  };

  // betする
  const makingBet = (num: number) => {
    if (credit < num) return;
    if (
      !randomImages[0].isStop ||
      !randomImages[1].isStop ||
      !randomImages[2].isStop
    )
      return;
    setInactionSpinBtn(false);
    setBet((prev) => prev + num);
    setCredit((prev) => prev - num);
  };

  return (
    <>
      <Panel randomImages={randomImages} stopSlot={stopSlot} />
      <Spin spinSlot={spinSlot} inactionSpinBtn={inactionSpinBtn} />
      <Credit makingBet={makingBet} credit={credit} bet={bet} />
      <Retry actionRetry={actionRetry} retry={retry} />
      <Desc />
    </>
  );
};
export default Slot;
