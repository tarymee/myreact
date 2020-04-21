# K100-WebApp


## Commit message 提交规范
目前业界比较流行的是 Angular 规范，包括三个部分：Header，Body 和 Footer，格式如下
```
<type>(<scope>): <subject>
// 空一行
<body>
// 空一行
<footer>
```
具体含义请阅读阮一峰博客：http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html


#### 提交规范模版
基于我们部门人员的提交习惯和效率考虑，我们规定只提交 Header 部分，对 Body 和 Footer 部分不做要求。

提交规范模版如下：
```
feat: 新功能说明
fix(自测|旗舰版|企业版): 【TD号】修补bug说明
docs: 文档变动说明(更新releasenote.md README.md)
style: 代码格式修改(不影响代码运行的变动)
refactor: 代码重构与优化
revert: 代码还原
test: 测试代码(单元测试 json测试文件等)
chore: 构建工程或辅助工具的变动
```
**注意：**
+ \<type\>后面跟着的是英文冒号，还必须加一个空格！！
+ \<scope\>用于说明 commit 影响的范围，如果\<type\>为fix，\<scope\>为必填，填的内容为(自测|旗舰版|企业版)三选一，如果\<type\>为其他类型，\<scope\>为空。


#### 提交规范检测
##### 1、命令行
如果是用命令行方式提交信息，我们采用 husky + commitlint 进行提交前检测。
部署方式可参考: https://www.jianshu.com/p/8efa36c5dfd4

我已在 WebApp容器包 和 5个引擎包 的每个分支都部署了，直接安装即可使用。

**注意：**
+ husky 要求 Node >= 10 and Git >= 2.13.0，使用前请确认本机版本号。

```sh
# 安装
npm i

# 文件变动 提交信息
git add .

git commit -am '11'
husky > commit-msg (node v12.14.0)
⧗   input: 11
✖   subject may not be empty [subject-empty]
✖   type may not be empty [type-empty]
✖   found 2 problems, 0 warnings

git commit -am 'fix(旗舰版): 【832】修复了xxx的bug'
husky > commit-msg (node v12.14.0)
```


##### 2、Sourcetree TortoiseGit 等工具提交
如果是用 Sourcetree TortoiseGit 等工具提交，husky 是没法捕获到Git钩子的，所以也就无法使用 husky + commitlint 校验。

这种提交方式推荐使用预定义模版，通过在commit时自动带出模版，然后编辑模版提交。以下三种方案可任选。

注意：以下只是自动带出模版，方便编辑提交，本质上还是无法做到真正校验，只有靠大家编辑信息时自觉。

1、使用git模版
```sh
# 进入用户文件夹
# Mac位置：/Users/tarymee
# Window位置：C:/Users/Administrator
cd /Users/tarymee

# 新建git模版文件
touch .gittemplate

# 用编辑器打开git模版文件 把上面的 提交规范模版 copy进去 保存

# 输入命令 全局采用git模版
git config --global commit.template ~/.gittemplate

# 如果不想全局使用 只想单个项目 则进入项目文件夹 输入命令
cd WebApp
git config commit.template ~/.gittemplate

# 使用 Sourcetree 或 TortoiseGit 工具进行一次 commit
# 看看是否会自动带出git模版 如果有表示成功
```

2、使用输入法的自定义短语功能，自定义快捷键，把上面的git模版copy进去，使用时键入快捷键自动带出模版。

3、使用 VScode 的 Snippets 代码片段功能，自定义快捷键，把上面的git模版copy进去，使用时键入快捷键自动带出模版，编辑好之后再粘贴到 Sourcetree 或 TortoiseGit 的 commit 编辑框。
