const _ = require("lodash");
const path = require("path");
const fs = require("fs");
const request = require("request");
const wget = require("wget");

const icon = [
  {
    // 自动维护图标
    // npm run ico
    aliUrl: "//at.alicdn.com/t/font_1208944_p80om9vnucc.css", // 暂时只支持使用阿里巴巴图标库
    dir: "src/assets/" // 公共图标
  }
];

const postUrl = (_url, fn) => {
  request(_url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      fn(body);
    } else {
      throw new Error("gen Icon error");
    }
  });
};

const downIcon = (iconUrl, dir) => {
  postUrl("https:" + iconUrl, chunk => {
    let form = 0;
    let to = form;
    let urlList = [];
    let count = 0;
    while (form !== -1 && to !== -1) {
      count++;
      if (count > 3000) throw new Error("gen icon failed");
      form = to + 1;
      form = chunk.indexOf("url(", form);
      to = chunk.indexOf(")", form + 1);
      if (form !== -1 && to !== -1) {
        urlList.push(chunk.substr(form + 5, to - form - 6));
      }
    }
    urlList = _.uniq(urlList.map(_url => _url.split("#")[0]));
    count = urlList.length;
    urlList.forEach(_url => {
      let __url = _url.split("?")[0];
      let { ext } = path.parse(__url);
      let fileName = "iconfont" + ext;
      let filePath = path.join(dir, fileName);
      fs.existsSync(filePath) && fs.unlinkSync(filePath);
      if (__url[0] !== "/") return;
      let download = wget.download("https:" + __url, filePath, {});
      chunk.split(_url).join("");
      download.on("error", function (err) {
        throw err;
      });
    });
    urlList.forEach(_url => {
      let strs = _url.split("?")[0].split(".");
      let type = strs[strs.length - 1];
      if (_url[0] !== "/") return;
      chunk = chunk.replace(_url, "./iconfont." + type);
      chunk = chunk.replace(_url, "./iconfont." + type);
    });
    fs.writeFileSync(path.join(dir, "iconfont.css"), chunk);
  });
};
for (let item of icon) {
  downIcon(item.aliUrl, path.resolve(item.dir));
}
