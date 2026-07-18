const minInput = document.getElementById("min");
const maxInput = document.getElementById("max");

const drawBtn = document.getElementById("drawBtn");
const resetBtn = document.getElementById("resetBtn");

const result = document.getElementById("result");
const remain = document.getElementById("remain");
const historyList = document.getElementById("historyList");

// 抽選済みの数字
let drawnNumbers = [];

// ----------------------------
// データ保存
// ----------------------------
function saveData() {

    const data = {
        min: minInput.value,
        max: maxInput.value,
        drawnNumbers: drawnNumbers
    };

    localStorage.setItem("lotteryData", JSON.stringify(data));

}

// ----------------------------
// データ読み込み
// ----------------------------
function loadData() {

    const saved = localStorage.getItem("lotteryData");

    if (!saved) {
        updateRemain();
        return;
    }

    const data = JSON.parse(saved);

    minInput.value = data.min;
    maxInput.value = data.max;

    drawnNumbers = data.drawnNumbers || [];

    if (drawnNumbers.length > 0) {
        result.textContent = drawnNumbers[drawnNumbers.length - 1];
    } else {
        result.textContent = "-";
    }

    updateHistory();
    updateRemain();

}

// ----------------------------
// 残り件数更新
// ----------------------------
function updateRemain() {

    const min = Number(minInput.value);
    const max = Number(maxInput.value);

    const total = max - min + 1;

    remain.textContent = total - drawnNumbers.length;

}

// ----------------------------
// 履歴更新
// ----------------------------
function updateHistory() {

    historyList.innerHTML = "";

    drawnNumbers.forEach(number => {

        const li = document.createElement("li");
        li.textContent = number;

        historyList.appendChild(li);

    });

}

// ----------------------------
// 抽選
// ----------------------------
function drawNumber() {

    const min = Number(minInput.value);
    const max = Number(maxInput.value);

    if (isNaN(min) || isNaN(max)) {

        alert("数字を入力してください。");
        return;

    }

    if (max < min) {

        alert("最大値は最小値以上にしてください。");
        return;

    }

    const total = max - min + 1;

    if (drawnNumbers.length >= total) {

        result.textContent = "終了";
        alert("すべての数字を抽選しました！");
        return;

    }

    let random;

    do {

        random = Math.floor(Math.random() * total) + min;

    } while (drawnNumbers.includes(random));

    drawnNumbers.push(random);

    result.textContent = random;

    updateHistory();
    updateRemain();
    saveData();

}

// ----------------------------
// リセット
// ----------------------------
function resetLottery() {

    drawnNumbers = [];

    result.textContent = "-";

    historyList.innerHTML = "";

    updateRemain();

    saveData();

}

// ----------------------------
// イベント
// ----------------------------
drawBtn.addEventListener("click", drawNumber);
resetBtn.addEventListener("click", resetLottery);

minInput.addEventListener("change", resetLottery);
maxInput.addEventListener("change", resetLottery);

// ----------------------------
// 起動時
// ----------------------------
loadData();
