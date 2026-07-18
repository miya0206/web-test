const minInput = document.getElementById("min");
const maxInput = document.getElementById("max");

const drawBtn = document.getElementById("drawBtn");
const resetBtn = document.getElementById("resetBtn");

const result = document.getElementById("result");
const remain = document.getElementById("remain");
const historyList = document.getElementById("historyList");

// 抽選済みの数字
let drawnNumbers = [];

// 残り件数を更新
function updateRemain() {

    const min = Number(minInput.value);
    const max = Number(maxInput.value);

    const total = max - min + 1;

    remain.textContent = total - drawnNumbers.length;
}

// 履歴表示
function updateHistory() {

    historyList.innerHTML = "";

    drawnNumbers.forEach(number => {

        const li = document.createElement("li");
        li.textContent = number;

        historyList.appendChild(li);

    });

}

// 抽選
function drawNumber() {

    const min = Number(minInput.value);
    const max = Number(maxInput.value);

    // 入力チェック
    if (isNaN(min) || isNaN(max)) {

        alert("数字を入力してください。");
        return;

    }

    if (max < min) {

        alert("最大値は最小値以上にしてください。");
        return;

    }

    const total = max - min + 1;

    // 全部出た
    if (drawnNumbers.length >= total) {

        result.textContent = "終了";
        alert("すべての数字を抽選しました！");
        return;

    }

    let random;

    do{

        random = Math.floor(Math.random() * total) + min;

    }while(drawnNumbers.includes(random));

    drawnNumbers.push(random);

    result.textContent = random;

    updateHistory();
    updateRemain();

}

// リセット
function resetLottery() {

    drawnNumbers = [];

    result.textContent = "-";

    historyList.innerHTML = "";

    updateRemain();

}

// ボタン
drawBtn.addEventListener("click", drawNumber);
resetBtn.addEventListener("click", resetLottery);

// 数字変更時もリセット
minInput.addEventListener("change", resetLottery);
maxInput.addEventListener("change", resetLottery);

// 初期表示
updateRemain();
