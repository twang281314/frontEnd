let Ut = require("./common");  

function getQueryString(name,url) { 
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
  var r = url.split('?')[1].substr(1).match(reg); 
  if (r != null) return unescape(r[2]); 
  return null; 
} 
  
(async () => {  
  try {  
    let url = "http://i.meizitu.net/thumbs/2018/01/117406_24c17_236.jpg";  
    let opts = {  
      url: url,  
      headers: {  
        'Referer': 'http://www.mzitu.com/',  
      }  
    };  
    let path = "./2.jpg";  
    let r1 = await Ut.downImg(opts, path);  
    console.log(r1);  
  }  
  catch (e) {  
    console.log(e);  
  }  
})()  