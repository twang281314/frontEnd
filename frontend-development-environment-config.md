> 新机器开发环境配置


# git 配置

## 首先安装git https://git-scm.com/

## 配置邮箱和用户名

```
git config --global user.name "你的用户名"
git config --global user.email "你的邮箱"
git config --list  # 查看git配置信息

```

## 生成ssh

```
ssh-keygen -t rsa -C "你的邮箱地址"

```
生成后在下面目录
C:\Users\你的用户名\.ssh\id_rsa.pub
将 id_rsa.pub 里面的内容复制下 放到github、bitbucket等git代码管理后台的ssh keys 列表中

# node环境配置

## 下载安装node https://nodejs.org/en/

## 配置npm数据源

```
npm config set registry https://registry.npm.taobao.org 

```

## 安装cnpm(达到的效果和上面一样)

```
npm install -g cnpm --registry=https://registry.npm.taobao.org

```

## 安装常用构建工具

```
cnpm  install  gulp -g //gulp
cnpm  install  http-server -g //node web 服务
cnpm  install  browser-sync -g  
cnpm  install  typings -g     //自动补全

```

# visul studio code 编辑器

##  安装visual studio  code https://code.visualstudio.com/

## 安装常用的插件

1、 代码格式化 [beautify](https://marketplace.visualstudio.com/items?itemName=HookyQR.beautify)  
2、 html-snippets [html-snippets](https://marketplace.visualstudio.com/items?itemName=abusaidm.html-snippets)  
3、 Git History [ Git History](https://marketplace.visualstudio.com/items?itemName=donjayamanne.githistory)  
4、 html-css-class-completion [ html-css-class-completion](https://marketplace.visualstudio.com/items?itemName=Zignd.html-css-class-completion)  
5、 html-snippets [html-snippets](https://marketplace.visualstudio.com/items?itemName=abusaidm.html-snippets)  
6、 JavaScript (ES6) snippets [JavaScript (ES6) snippets](https://marketplace.visualstudio.com/items?itemName=abusaidm.html-snippets)  
7、 文件图标 [vscode-icons](https://marketplace.visualstudio.com/items?itemName=robertohuertasm.vscode-icons)  

需要其他插件可以去插件市场寻找 https://marketplace.visualstudio.com/