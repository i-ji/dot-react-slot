import { useState } from "react";
import Panel from "./panel";
import Spin from "./spin";

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

  // spinボタン
  const [inactionSpinBtn, setInactionSpinBtn] = useState(false);

  const [randomImages, setRandomImages] = useState<randomImage[]>([
    { img: getRandomImage(), isUnmatched: false, isStop: true },
    { img: getRandomImage(), isUnmatched: false, isStop: true },
    { img: getRandomImage(), isUnmatched: false, isStop: true },
  ]);

  // スロットを回す
  const spinSlot = () => {
    // スロット0を回す
    const spin0 = () => {
      const updatedRandomImages = [...randomImages];
      updatedRandomImages[0].img = getRandomImage();
      updatedRandomImages[0].isStop = false;
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
      updatedRandomImages[1].isStop = false;
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
      updatedRandomImages[2].isStop = false;
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
      return image;
    });
    setPanelsLeft(2);
    setRandomImages(updatedRandomImages);
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
      checkPanels();
      setInactionSpinBtn(false);
    }
  };

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
  };

  return (
    <>
      <Panel randomImages={randomImages} stopSlot={stopSlot} />
      <Spin spinSlot={spinSlot} inactionSpinBtn={inactionSpinBtn} />
    </>
  );
};
export default Slot;
