
function update_captions(){
  if(window.innerWidth < 520){
    captions = [
      "<span style='display:inline-block;line-height:25px;font-size:smaller;vertical-align:middle'>Milky<br>Nia</span>",
    "<span style='display:inline-block;line-height:25px;font-size:smaller;vertical-align:middle'>Simple<br>Nia</span>",
    "<span style='display:inline-block;line-height:25px;font-size:16px;vertical-align:middle'>Blueberry<br>Nia</span>",
      "<span style='font-size:smaller;display:inline-block;line-height:25px;vertical-align:middle'>Mochi<br>Nia</span>",
      "<span style='font-size:smaller'>Nia<br>Temple</span>",  
      "<span style='font-size:smaller'>Princess<br>Nia</span>", 
      "<span style='font-size:smaller'>Elegant<br>Nia</span>",
      "<span style='font-size:smaller'>Energetic<br>Nia</span>",  
      "<span style='font-size:smaller'>Clever<br>Nia</span>", 
      "<span style='font-size:smaller'>Sweetie<br>Nia</span>",
      "<span style='font-size:smaller'>Sweetheart<br>Nia</span>",
      "<span style='display:inline-block;line-height:25px;font-size:smaller;vertical-align:middle'>Foodi<br>Nia</span>",
"<span style='font-size:smaller'>Hepburn<br>Nia</span>", "<span style='font-size:smaller'>Funny<br>Nia</span>",
"<span style='font-size:smaller'>Lovely<br>Nia</span>",

      ];
      captions_rel = ["<span style='font-size:9px;'>Love</span>",
        "<span style='font-size:25px;'>Criticize</span>"];
  }
  else{
    captions = [
      "<span style='display:inline-block;line-height:25px;font-size:smaller;vertical-align:middle'>Milky<br>Nia</span>",
    "<span style='display:inline-block;line-height:25px;font-size:smaller;vertical-align:middle'>Simple<br>Nia</span>",
    "<span style='display:inline-block;line-height:25px;font-size:16px;vertical-align:middle'>Blueberry<br>Nia</span>",
      "<span style='font-size:smaller;display:inline-block;line-height:25px;vertical-align:middle'>Mochi<br>Nia</span>",
      "<span style='font-size:smaller'>Nia<br>Temple</span>",   
      "<span style='font-size:smaller'>Princess<br>Nia</span>", 
      "<span style='font-size:smaller'>Elegant<br>Nia</span>",
      "<span style='font-size:smaller'>Energetic<br>Nia</span>",  
      "<span style='font-size:smaller'>Clever<br>Nia</span>", 
      "<span style='font-size:smaller'>Sweetie<br>Nia</span>",
      "<span style='font-size:smaller'>Sweetheart<br>Nia</span>",
      "<span style='display:inline-block;line-height:25px;font-size:smaller;vertical-align:middle'>Foodi<br>Nia</span>",
"<span style='font-size:smaller'>Hepburn<br>Nia</span>", "<span style='font-size:smaller'>Funny<br>Nia</span>",
"<span style='font-size:smaller'>Lovely<br>Nia</span>",

      ];
      captions_rel = ["<span style='font-size:9px;'>Love</span>",
        "<span style='font-size:25px;'>Criticize</span>"];
  }
}


var span_en;

function create_switch_en(){
  span_en = document.createElement('div');
  span_en.style.position = "absolute";
  span_en.style.top = "0";
  if(window.innerWidth < 520)
    span_en.style.fontSize = "10px";
  else
    span_en.style.fontSize = "small";
  span_en.style.backgroundColor = "#8f7a66";
  span_en.style.borderRadius = "0 0 3px 3px";
  span_en.style.padding = "3px 10px";
  span_en.style.color = "white";
  span_en.style.cursor = "pointer";
  span_en.onclick = play_in_english;
  span_en.textContent = "🇬🇧 Switch to English";
  var container = document.querySelector('.container');
  container.insertBefore(span_en, container.firstChild);
}

var span_zh;

function create_switch_zh(){
  span_zh = document.createElement('div');
  span_zh.style.position = "absolute";
  span_zh.style.top = "0";
  if(window.innerWidth < 520)
    span_zh.style.fontSize = "10px";
  else
    span_zh.style.fontSize = "small";
  span_zh.style.backgroundColor = "#8f7a66";
  span_zh.style.borderRadius = "0 0 3px 3px";
  span_zh.style.padding = "3px 10px";
  span_zh.style.color = "white";
  span_zh.style.cursor = "pointer";
  span_zh.onclick = play_in_chinese;
  span_zh.textContent = "中文版";
  var container = document.querySelector('.container');
  container.insertBefore(span_zh, container.firstChild);
}

function play_in_english(){
  update_captions();
  window.addEventListener('resize', update_captions, true);

  caption_garbage = "<span style='font-size:smaller'>Air</span>";
  window.game.actuate();

  game_title = "寻找心头肉";
  game_alt_title = "Nia";
  result_msg = "You got a ";
  var titleElem = document.getElementById('title');
  if(titleElem.textContent != "Love") titleElem.textContent = game_title;
  document.querySelector('.restart-button').textContent = "退出";
  document.querySelector('.retry-button').textContent = "再试一次吧~";
  document.querySelector('.game-explanation').innerHTML = "<strong class='important'>How to play:</strong> 合并小肉团，获得心头肉~";

  if(span_en) span_en.parentNode.removeChild(span_en);
  create_switch_zh();
  window.game.storageManager.storage.setItem('lang', 'en');
}

var zh_var = null;

function determine_zh_var(){
  if(zh_var) return zh_var;
  var hant_locales = ['zh-hant', 'zh-tw', 'zh-hk', 'zh-mo'];
  var nav_langs = navigator.languages;
  var hant_fallback = false;
  if(nav_langs){
    for(var i=0; i<nav_langs.length; i++){
      var nav_lang = nav_langs[i].toLowerCase();
      if(nav_lang.startsWith('zh-')){
        zh_var = hant_locales.indexOf(nav_lang) >= 0 ? "hant" : "hans";
        break;
      }
      else if(nav_lang.startsWith('ja-') || nav_lang.startsWith('ko-')) hant_fallback = true;
    }
  }
  else{
    var nav_lang = navigator.language || navigator.userLanguage;
    if(nav_lang){
      nav_lang = nav_lang.toLowerCase();
      if(nav_lang.startsWith('zh-'))
        zh_var = hant_locales.indexOf(nav_lang) >= 0 ? "hant" : "hans";
      else if(nav_lang.startsWith('ja-') || nav_lang.startsWith('ko-')) hant_fallback = true;
    }
  }
  if(!zh_var) zh_var = hant_fallback ? "hant" : "hans";
  return zh_var;
}


function use_simplified(){
  captions = ["奶香肉", "憨憨肉", 
  "蓝莓肉", 
  "<span style='display:inline-block;line-height:25px;vertical-align:middle'>糯米团子肉</span>",
  "<span style='display:inline-block;line-height:25px;vertical-align:middle'>秀兰肉波尔</span>", 
  "公主肉","高贵肉",
  "活力肉", "乖乖肉", 
   "甜甜肉",  "心头肉",

   "<span style='display:inline-block;line-height:25px;vertical-align:middle'>小吃货肉</span>",
    "赫本肉","搞怪肉","<span style='display:inline-block;line-height:25px;vertical-align:middle'>我见犹怜肉</span>", 
    ];
  captions_rel = ["宠爱", "批评"];
  caption_garbage = "空气";
  game_alt_title = "Love Rush";
  window.game.actuate();

  document.querySelector('.restart-button').textContent = "重新找肉肉";
  document.querySelector('.retry-button').textContent = "再试一次";
  document.querySelector('.game-explanation').innerHTML = "<strong class='important'>玩法:</strong> 滑动屏幕来合成心头肉. 当两块相同的肉宝方块碰在一起时, <strong>它们会组成一块更加“成长”的肉宝方块 </strong>! <br>但是, 你的行动也可能只是产生<strong>空气</strong>. 空气会阻碍方块的移动, 直到被别的空气击中而消失. <br><strong>宠爱</strong>砖触碰任何砖都能使其升级, 但一块砖只可享受一次. 宠爱砖上会显示你使用它的次数; 10 次或者 10 秒后它会消失, 之后它可能会变成批评砖，触碰任何肉肉砖都能使其降级, 以此来偿还之前使用的次数.";
}

function play_in_chinese(){
  window.removeEventListener('resize', update_captions, true);
  game_title = "寻找心头肉";
  result_msg = "你得到了！ ";
  var titleElem = document.getElementById('title');
  if(titleElem.textContent != "Love") titleElem.textContent = game_title;

  if(determine_zh_var() == 'hant') use_traditional();
  else use_simplified();

  if(span_zh) span_zh.parentNode.removeChild(span_zh);
  create_switch_en();
  window.game.storageManager.storage.setItem('lang', 'zh');
}
