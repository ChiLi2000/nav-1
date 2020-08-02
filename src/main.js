const $siteList = $(".siteList");
const $lilast = $(".last");

const favDialog = document.getElementById("favDialog");
const inputText = $(".input-text");

const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
const hashMap = xObject || [
  { logo: "b", url: "https://bilibili.com" },
  { logo: "i", url: "https://www.iconfont.cn" },
  { logo: "j", url: "https://juejin.im" },
  { logo: "z", url: "https://www.zhihu.com" },
  { logo: "y", url: "https://www.yuque.com" },
  { logo: "c", url: "https://css-tricks.com" },
];

const simplifyUrl = (url) => {
  return url
    .replace("http://", "")
    .replace("https://", "")
    .replace("www.", "")
    .replace(/\/.*/, "");
};
const render = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node, index) => {
    const $li = $(`
            <li>
              <div class="site">
                <div class="logo">${simplifyUrl(node.url)[0]}</div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="close"><svg class="icon" ><use xlink:href="#icon-close"></use></svg></class></div>
                <div class="more"title="修改网址"><svg class="icon" ><use xlink:href="#icon-gengduo"></use></svg></class></div>
              </div>
            </li>
    `).insertBefore($lilast);
    $li.on("click", () => {
      window.open(node.url, "_self");
    });
    $li.on("click", ".close", (e) => {
      e.stopPropagation();
      hashMap.splice(index, 1);
      render();
    });
    $li.on("click", ".more", (e) => {
      e.stopPropagation();
      favDialog.showModal();
      // 获取焦点？this.
      inputText
        .attr("value", hashMap[index].url)
        .attr("onfocus", inputText.select());
      $(".cancelUrl").on("click", () => {
        window.location.reload();
      });

      $(".deleteUrl").on("click", () => {
        // $(".deleteUrl").unbind("click");
        hashMap.splice(index, 1);
        render();
        window.location.reload();
      });
      $(".confirmUrl").on("click", () => {
        let newUrl = inputText.val();
        hashMap[index].url = newUrl;
        render();
        window.location.reload();
      });
    });
  });
};
render();

$(".addSite").on("click", () => {
  let url = window.prompt("请输入想要添加的网址");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  hashMap.push({
    logo: simplifyUrl(url)[0],
    url: url,
  });
  render();
});
window.onbeforeunload = () => {
  const str = JSON.stringify(hashMap);
  localStorage.setItem("x", str);
};
$(document).on("keypress", (e) => {
  const { keyCode } = e;
  console.log(keyCode);
  if (keyCode === 13) {
    console.log(true);
    confirmUrl();
  }
});
