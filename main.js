'use strict';

// 結果の種類
const resultArray = ['あいしてる', 'きらい', 'すき', 'ともだち', 'ぜっこう', 'ねつあい', 'こい人'];

// ひらがなを数値に変える用の表
const strArr = [
  'ぁあかがさざただなはばぱまゃやらわん',
  'ぃいきぎしじちぢにひびぴみゐり',
  'ぅうくぐすずっつづぬふぶぷむゅゆる',
  'ぇえけげせぜてでねへべぺめゑれ',
  'ぉおこごそぞとどのほぼぽもょよろを'
]


// id 簡単指定
function id(id){ return document.getElementById(id)};


// ひらがなを数字に変換
function strToNum(str) {
  let result = '';
  for (const char of [...str]) {
    for (let i = 0; i < strArr.length; i++) {
      if (strArr[i].indexOf(char) > -1) {
        result = result + (i + 1);
      } 
    }
    if (char == "ー") {
      result = result + result.slice(-1);
    }
  }
  return result;
}

// 両者に存在する数字を消す（すべて消えたら運命の人）
function numOf(str1, str2) {
  let result1 = str1;
  let result2 = str2;
  for (let i = 1; i <= 5; i++) {
    if (result1.indexOf(i) > -1 && result2.indexOf(i) > -1) {
      result1 = result1.replaceAll(i, '');
      result2 = result2.replaceAll(i, '');
    }
  }
  return {
    'me': result1,
    'you': result2
  }
}

// 足し合わせる

function sum(str){
if (str === ''){
  return 0;
} else {
  console.log(str + ' -> ' + [...str].reduce((sum, element) => sum + parseInt(element) , 0))
  return [...str].reduce((sum, element) => sum + parseInt(element) , 0);
}
}

// 結果を表示

function resultString(num){
  if (num === 0){
    return 'うんめいのひと';
  } else {
    return resultArray[(num - 1) % 7];
  }
}

// メインの処理
function main(){
  const me = id('my-name').value;
  const your = id('your-name').value;
  if(me && your){
    // 名前を数字に
    id('my-num').innerText = strToNum(me);
    id('your-num').innerText = strToNum(your);
    // 共通の番号を消す
    const del = numOf(strToNum(me), strToNum(your)); 
    id('my-del').innerText = del.me;
    id('your-del').innerText = del.you;
    const result = numOf(strToNum(me), strToNum(your));
    // 残った数字の合計を出す
    id('my-sum').innerText = sum(result.me);
    id('your-sum').innerText = sum(result.you);
    // 結果はっぴょー
  id('my-result').innerText = resultString(sum(result.me));
  id('your-result').innerText = resultString(sum(result.you));
  }
}

// なまえに変更があればメイン関数を実行
id('my-name').addEventListener('change', main);
id('your-name').addEventListener('change', main);