function $(id) {
  return document.getElementById(id);
}

var EventUtil = function () {};

EventUtil.addEventHandler = function (obj, EventType, Handler) {
  if (obj.addEventListener) {
    obj.addEventListener(EventType, Handler, false);
  } else if (obj.attachEvent) {
    obj.attachEvent("on" + EventType, Handler);
  } else {
    obj["on" + EventType] = Handler;
  }
};

function showit(Word) {
  alert(Word);
}

function CountEnglishWordsAndCharacters() {
  var Words = $("content").value;
  var WordArray = Words.trim().split(/\s+/); // 使用空格进行单词拆分
  var WordCount = Words.trim() === "" ? 0 : WordArray.length;
  var CharacterCount = Words.length;

  $("zishu").innerText = CharacterCount;
  $("zifu").innerText = WordCount;
}

function resetForm() {
  $("content").value = "";  // 清空文本输入框的值
  $("count_paragraphs").innerText = "0";  // 将段落计数设置为0
  $("zishu").innerText = "0";  // 将字符计数设置为0
  $("zifu").innerText = "0";  // 将单词计数设置为0
}

document.addEventListener("DOMContentLoaded", () => {
  (document.querySelectorAll(".notification .delete") || []).forEach(
    ($delete) => {
      $notification = $delete.parentNode;

      $delete.addEventListener("click", () => {
        $notification.parentNode.removeChild($notification);
      });
    }
  );

  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );

  if ($navbarBurgers.length > 0) {
    $navbarBurgers.forEach((el) => {
      el.addEventListener("click", () => {
        const target = el.dataset.target;
        const $target = document.getElementById(target);
        el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  }

  if ($("content")) {
    EventUtil.addEventHandler(
      $("content"),
      "propertychange",
      CountEnglishWordsAndCharacters
    );
    EventUtil.addEventHandler(
      $("content"),
      "input",
      CountEnglishWordsAndCharacters
    );
  }

  // 段落数统计
  function CountParagraphs() {
    var Content = $("content").value;
    var Paragraphs = Content.split(/\n+/); // 使用换行符进行段落拆分
    var ParagraphCount = Content.trim() === "" ? 0 : Paragraphs.length;

    $("count_paragraphs").innerText = ParagraphCount;
  }

  // 在适当的位置调用CountParagraphs函数，以便统计段落数
  EventUtil.addEventHandler($("content"), "input", CountParagraphs);

});
