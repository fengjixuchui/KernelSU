import{_ as a,o as l,c as i,a as o,b as e,d as t}from"./app.1f00eefa.js";const y=JSON.parse('{"title":"安装","description":"","frontmatter":{},"headers":[{"level":2,"title":"检查您的设备是否被支持","slug":"check-if-supported","link":"#check-if-supported","children":[]},{"level":2,"title":"备份你的 boot.img","slug":"backup-boot-image","link":"#backup-boot-image","children":[]},{"level":2,"title":"必备知识","slug":"acknowage","link":"#acknowage","children":[{"level":3,"title":"ADB 和 fastboot","slug":"adb-and-fastboot","link":"#adb-and-fastboot","children":[]},{"level":3,"title":"KMI","slug":"kmi","link":"#kmi","children":[]},{"level":3,"title":"内核版本与 Android 版本","slug":"kernel-version-vs-android-version","link":"#kernel-version-vs-android-version","children":[]}]},{"level":2,"title":"安装介绍","slug":"installation-introduction","link":"#installation-introduction","children":[]},{"level":2,"title":"使用自定义 Recovery 安装","slug":"install-by-recovery","link":"#install-by-recovery","children":[]},{"level":2,"title":"使用内核刷写 App 安装","slug":"install-by-kernel-flasher","link":"#install-by-kernel-flasher","children":[]},{"level":2,"title":"使用 KernelSU 提供的 boot.img 安装","slug":"install-by-kernelsu-boot-image","link":"#install-by-kernelsu-boot-image","children":[{"level":3,"title":"找到合适的 boot.img","slug":"found-propery-image","link":"#found-propery-image","children":[]},{"level":3,"title":"将 boot.img 刷入设备","slug":"flash-boot-image","link":"#flash-boot-image","children":[]},{"level":3,"title":"重启","slug":"reboot","link":"#reboot","children":[]}]},{"level":2,"title":"手动修补 boot.img","slug":"patch-boot-image","link":"#patch-boot-image","children":[{"level":3,"title":"准备","slug":"patch-preparation","link":"#patch-preparation","children":[]},{"level":3,"title":"使用 Android-Image-Kitchen","slug":"using-android-image-kitchen","link":"#using-android-image-kitchen","children":[]},{"level":3,"title":"使用 magiskboot","slug":"using","link":"#using","children":[]}]},{"level":2,"title":"其他变通方法","slug":"other-methods","link":"#other-methods","children":[]}],"relativePath":"zh_CN/guide/installation.md"}'),n={name:"zh_CN/guide/installation.md"},r=o(`<h1 id="title" tabindex="-1">安装 <a class="header-anchor" href="#title" aria-hidden="true">#</a></h1><h2 id="check-if-supported" tabindex="-1">检查您的设备是否被支持 <a class="header-anchor" href="#check-if-supported" aria-hidden="true">#</a></h2><p>从 <a href="https://github.com/tiann/KernelSU/releases" target="_blank" rel="noreferrer">GitHub Releases</a> 或 <a href="https://www.coolapk.com/apk/me.weishu.kernelsu" target="_blank" rel="noreferrer">酷安</a> 下载 KernelSU 管理器应用，然后将应用程序安装到设备并打开：</p><ul><li>如果应用程序显示 “不支持”，则表示您的设备不支持 KernelSU，你需要自己编译设备的内核才能使用，KernelSU 官方不会也永远不会为你提供一个可以刷写的 boot 镜像。</li><li>如果应用程序显示 “未安装”，那么 KernelSU 支持您的设备；可以进行下一步操作。</li></ul><div class="info custom-block"><p class="custom-block-title">INFO</p><p>对于显示“不支持”的设备，这里有一个<a href="./unofficially-support-devices.html">非官方支持设备列表</a>，你可以用这个列表里面的内核自行编译。</p></div><h2 id="backup-boot-image" tabindex="-1">备份你的 boot.img <a class="header-anchor" href="#backup-boot-image" aria-hidden="true">#</a></h2><p>在进行刷机操作之前，你必须先备份好自己的原厂 boot.img。如果你后续刷机出现了任何问题，你都可以通过使用 fastboot 刷回原厂 boot 来恢复系统。</p><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>任何刷机操作都是有风险的，请务必做好这一步再进行下一步操作！！必要时你还可以备份你手机的所有数据。</p></div><h2 id="acknowage" tabindex="-1">必备知识 <a class="header-anchor" href="#acknowage" aria-hidden="true">#</a></h2><h3 id="adb-and-fastboot" tabindex="-1">ADB 和 fastboot <a class="header-anchor" href="#adb-and-fastboot" aria-hidden="true">#</a></h3><p>此教程默认你会使用 ADB 和 fastboot 工具，如果你没有了解过，建议使用搜索引擎先学习相关知识。</p><h3 id="kmi" tabindex="-1">KMI <a class="header-anchor" href="#kmi" aria-hidden="true">#</a></h3><p>KMI 全称 Kernel Module Interface，相同 KMI 的内核版本是<strong>兼容的</strong> 这也是 GKI 中“通用”的含义所在；反之，如果 KMI 不同，那么这些内核之间无法互相兼容，刷入与你设备 KMI 不同的内核镜像可能会导致死机。</p><p>具体来说，对 GKI 的设备，其内核版本格式应该如下：</p><div class="language-txt"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">KernelRelease :=</span></span>
<span class="line"><span style="color:#A6ACCD;">Version.PatchLevel.SubLevel-AndroidRelease-KmiGeneration-suffix</span></span>
<span class="line"><span style="color:#A6ACCD;">w      .x         .y       -zzz           -k            -something</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>其中，<code>w.x-zzz-k</code> 为 KMI 版本。例如，一个设备内核版本为<code>5.10.101-android12-9-g30979850fc20</code>，那么它的 KMI 为 <code>5.10-android12-9</code>；理论上刷入其他这个 KMI 的内核也能正常开机。</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>请注意，内核版本中的 SubLevel 不属于 KMI 的范畴！也就是说 <code>5.10.101-android12-9-g30979850fc20</code> 与 <code>5.10.137-android12-9-g30979850fc20</code> 的 KMI 相同！</p></div><h3 id="kernel-version-vs-android-version" tabindex="-1">内核版本与 Android 版本 <a class="header-anchor" href="#kernel-version-vs-android-version" aria-hidden="true">#</a></h3><p>请注意：<strong>内核版本与 Android 版本并不一定相同！</strong></p><p>如果您发现您的内核版本是 <code>android12-5.10.101</code>，然而你 Android 系统的版本为 Android 13 或者其他；请不要觉得奇怪，因为 Android 系统的版本与 Linux 内核的版本号不一定是一致的；Linux 内核的版本号一般与<strong>设备出厂的时候自带的 Android 系统的版本一致</strong>，如果后续 Android 系统升级，内核版本一般不会发生变化。如果你需要刷机，<strong>请以内核版本为准！！</strong></p><h2 id="installation-introduction" tabindex="-1">安装介绍 <a class="header-anchor" href="#installation-introduction" aria-hidden="true">#</a></h2><p>KernelSU 的安装方法有如下几种，各自适用于不同的场景，请按需选择：</p><ol><li>使用自定义 Recovery（如 TWRP）安装</li><li>使用内核刷写 App，如 （Franco Kernel Manager）安装</li><li>使用 KernelSU 提供的 boot.img 使用 fastboot 安装</li><li>手动修补 boot.img 然后安装</li></ol><h2 id="install-by-recovery" tabindex="-1">使用自定义 Recovery 安装 <a class="header-anchor" href="#install-by-recovery" aria-hidden="true">#</a></h2><p>前提：你的设备必须有自定义的 Recovery，如 TWRP；如果没有或者只有官方 Recovery，请使用其他方法。</p><p>步骤：</p><ol><li>在 KernelSU 的 <a href="https://github.com/tiann/KernelSU/releases" target="_blank" rel="noreferrer">Release 页面</a> 下载与你手机版本匹配的以 AnyKernel3 开头的 zip 刷机包；例如，手机内核版本为 <code>android12-5.10.66</code>，那么你应该下载 <code>AnyKernel3-android12-5.10.66_yyyy-MM.zip</code> 这个文件（其中 <code>yyyy</code> 为年份，<code>MM</code> 为月份）。</li><li>重启手机进入 TWRP。</li><li>使用 adb 将 AnyKernel3-*.zip 放到手机 /sdcard 然后在 TWRP 图形界面选择安装；或者你也可以直接 <code>adb sideload AnyKernel-*.zip</code> 安装。</li></ol><p>PS. 这种方法适用于任何情况下的安装（不限于初次安装或者后续升级），只要你用 TWRP 就可以操作。</p><h2 id="install-by-kernel-flasher" tabindex="-1">使用内核刷写 App 安装 <a class="header-anchor" href="#install-by-kernel-flasher" aria-hidden="true">#</a></h2><p>前提：你的设备必须已经 root。例如你已经安装了 Magisk 获取了 root，或者你已经安装了旧版本的 KernelSU 需要升级到其他版本的 KernelSU；如果你的设备无 root，请尝试其他方法。</p><p>步骤：</p><ol><li>下载 AnyKernel3 的刷机包；下载方法参考 <em>使用自定义 Recovery 安装</em>那一节的内容。</li><li>打开内核刷写 App 使用提供的 AnyKernel3 刷机包刷入。</li></ol><p>如果你之前没有用过内核刷写 App，那么下面几个是比较流行的：</p><ol><li><a href="https://github.com/capntrips/KernelFlasher/releases" target="_blank" rel="noreferrer">Kernel Flasher</a></li><li><a href="https://play.google.com/store/apps/details?id=com.franco.kernel" target="_blank" rel="noreferrer">Franco Kernel Manager</a></li><li><a href="https://play.google.com/store/apps/details?id=flar2.exkernelmanager" target="_blank" rel="noreferrer">Ex Kernel Manager</a></li></ol><p>PS. 这种方法在升级 KernelSU 的时候较为方便，无需电脑即可完成（注意备份！）。</p><h2 id="install-by-kernelsu-boot-image" tabindex="-1">使用 KernelSU 提供的 boot.img 安装 <a class="header-anchor" href="#install-by-kernelsu-boot-image" aria-hidden="true">#</a></h2><p>这种方法无需你有 TWRP，也不需要你的手机有 root 权限；适用于你初次安装 KernelSU。</p><h3 id="found-propery-image" tabindex="-1">找到合适的 boot.img <a class="header-anchor" href="#found-propery-image" aria-hidden="true">#</a></h3><p>KernelSU 为 GKI 设备提供了通用的 boot.img，您应该将 boot.img 刷写到设备的 boot 分区。</p><p>您可以从 <a href="https://github.com/tiann/KernelSU/releases" target="_blank" rel="noreferrer">GitHub Release</a> 下载 boot.img, 请注意您应该使用正确版本的 boot.img. 例如，如果您的设备显示内核是 <code>android12-5.10.101</code>, 需要下载 <code>android-5.10.101_yyyy-MM.boot-&lt;format&gt;.img</code>.</p><p>其中 <code>&lt;format&gt;</code> 指的是你的官方 boot.img 的内核压缩格式，请检查您原有 boot.img 的内核压缩格式，您应该使用正确的格式，例如 <code>lz4</code>、<code>gz</code>；如果是用不正确的压缩格式，刷入 boot 后可能无法开机。</p><div class="info custom-block"><p class="custom-block-title">INFO</p><ol><li>您可以通过 magiskboot 来获取你原来 boot 的压缩格式；当然您也可以询问与您机型相同的其他更有经验的童鞋。另外，内核的压缩格式通常不会发生变化，如果您使用某个压缩格式成功开机，后续可优先尝试这个格式。</li><li>小米设备通常使用 <code>gz</code> 或者 <strong>不压缩</strong>。</li><li>Pixel 设备有些特殊，请查看下面的教程。</li></ol></div><h3 id="flash-boot-image" tabindex="-1">将 boot.img 刷入设备 <a class="header-anchor" href="#flash-boot-image" aria-hidden="true">#</a></h3><p>使用 <code>adb</code> 连接您的设备，然后执行 <code>adb reboot bootloader</code> 进入 fastboot 模式，然后使用此命令刷入 KernelSU：</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#FFCB6B;">fastboot</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">flash</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">boot</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">boot.img</span></span>
<span class="line"></span></code></pre></div><div class="info custom-block"><p class="custom-block-title">INFO</p><p>如果你的设备支持 <code>fastboot boot</code>，可以先使用 <code>fastboot boot boot.img</code> 来先尝试使用 boot.img 引导系统，如果出现意外，再重启一次即可开机。</p></div><h3 id="reboot" tabindex="-1">重启 <a class="header-anchor" href="#reboot" aria-hidden="true">#</a></h3><p>刷入完成后，您应该重新启动您的设备：</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#FFCB6B;">fastboot</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">reboot</span></span>
<span class="line"></span></code></pre></div><h2 id="patch-boot-image" tabindex="-1">手动修补 boot.img <a class="header-anchor" href="#patch-boot-image" aria-hidden="true">#</a></h2><p>对于某些设备来说，其 boot.img 格式不那么常见，比如不是 <code>lz4</code>, <code>gz</code> 和未压缩；最典型的就是 Pixel，它 boot.img 的格式是 <code>lz4_legacy</code> 压缩，ramdisk 可能是 <code>gz</code> 也可能是 <code>lz4_legacy</code> 压缩；此时如果你直接刷入 KernelSU 提供的 boot.img，手机可能无法开机；这时候，你可以通过手动修补 boot.img 来实现。</p><p>修补方法总体有两种：</p><ol><li><a href="https://forum.xda-developers.com/t/tool-android-image-kitchen-unpack-repack-kernel-ramdisk-win-android-linux-mac.2073775/" target="_blank" rel="noreferrer">Android-Image-Kitchen</a></li><li><a href="https://github.com/topjohnwu/Magisk/releases" target="_blank" rel="noreferrer">magiskboot</a></li></ol><p>其中，Android-Image-Kitchen 适用于 PC 上操作，magiskboot 需要手机配合。</p><h3 id="patch-preparation" tabindex="-1">准备 <a class="header-anchor" href="#patch-preparation" aria-hidden="true">#</a></h3><ol><li>获取你手机的原厂 boot.img；你可以通过你手机的线刷包解压后之间获取，如果你是卡刷包，那你也许需要<a href="https://github.com/ssut/payload-dumper-go" target="_blank" rel="noreferrer">payload-dumper-go</a></li><li>下载 KernelSU 提供的与你设备 KMI 版本一致的 AnyKernel3 刷机包（可以参考 <em>自定义 TWRP 刷入一节</em>)。</li><li>解压缩 AnyKernel3 刷机包，获取其中的 <code>Image</code> 文件，此文件为 KernelSU 的内核文件。</li></ol><h3 id="using-android-image-kitchen" tabindex="-1">使用 Android-Image-Kitchen <a class="header-anchor" href="#using-android-image-kitchen" aria-hidden="true">#</a></h3><ol><li>下载 Android-Image-Kitchen 至你电脑</li><li>将手机原厂 boot.img 放入 Android-Image-Kitchen 根目录</li><li>在 Android-Image-Kitchen 根目录执行 <code>./unpackimg.sh boot.img</code>；此命名会将 boot.img 拆开，你会得到若干文件。</li><li>将<code>split_img</code> 目录中的 <code>boot.img-kernel</code> 替换为你从 AnyKernel3 解压出来的 <code>Image</code>（注意名字改为 boot.img-kernel)。</li><li>在 Android-Image-Kitchecn 根目录执行 <code>./repackimg.sh</code>；此时你会得到一个 <code>image-new.img</code> 的文件；使用此 boot.img 通过 fastboot 刷入即可（刷入方法参考上一节）。</li></ol>`,58),s=e("h3",{id:"using",magiskboot:"",tabindex:"-1"},[t("使用 magiskboot "),e("a",{class:"header-anchor",href:"#using","aria-hidden":"true"},"#")],-1),d=o('<ol><li>在 Magisk 的 <a href="https://github.com/topjohnwu/Magisk/releases" target="_blank" rel="noreferrer">Release 页面</a> 下载最新的 Magisk 安装包。</li><li>将 Magisk-*.apk 重命名为 Magisk-vesion.zip 然后解压缩。</li><li>将解压后的 <code>Magisk-v25.2/lib/arm64-v8a/libmagiskboot.so</code> 文件，使用 adb push 到手机：<code>adb push Magisk-v25.2/lib/arm64-v8a/libmagiskboot.so /data/local/tmp/magiskboot</code></li><li>使用 adb 将原厂 boot.img 和 AnyKernel3 中的 Image 推送到手机</li><li>adb shell 进入 /data/local/tmp/ 目录，然后赋予刚 push 文件的可执行权限 <code>chmod +x magiskboot</code></li><li>adb shell 进入 /data/local/tmp/ 目录，执行 <code>./magiskboot unpack boot.img</code> 此时会解包 <code>boot.img</code> 得到一个叫做 <code>kernel</code> 的文件，这个文件为你原厂的 kernel</li><li>使用 <code>Image</code> 替换 <code>kernel</code>: <code>mv -f Image kernel</code></li><li>执行 <code>./magiskboot repack boot.img</code> 打包 img，此时你会得到一个 <code>new-boot.img</code> 的文件，使用这个文件 fastboot 刷入设备即可。</li></ol><h2 id="other-methods" tabindex="-1">其他变通方法 <a class="header-anchor" href="#other-methods" aria-hidden="true">#</a></h2><p>其实所有这些安装方法的主旨只有一个，那就是<strong>替换原厂的内核为 KernelSU 提供的内核</strong>；只要能实现这个目的，就可以安装；比如以下是其他可行的方法：</p><ol><li>首先安装 Magisk，通过 Magisk 获取 root 权限后使用内核刷写器刷入 KernelSU 的 AnyKernel 包。</li><li>使用某些 PC 上的刷机工具箱刷入 KernelSU 提供的内核。</li></ol>',4),c=[r,s,d];function p(h,g,b,m,u,k){return l(),i("div",null,c)}const v=a(n,[["render",p]]);export{y as __pageData,v as default};
