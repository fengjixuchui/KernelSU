import{_ as e,o as r,c as n,a as l}from"./app.0da74883.js";const p=JSON.parse('{"title":"常见问题","description":"","frontmatter":{},"headers":[{"level":2,"title":"KernelSU 是否支持我的设备 ？","slug":"kernelsu-是否支持我的设备","link":"#kernelsu-是否支持我的设备","children":[]},{"level":2,"title":"KernelSU 是否需要解锁 Bootloader ？","slug":"kernelsu-是否需要解锁-bootloader","link":"#kernelsu-是否需要解锁-bootloader","children":[]},{"level":2,"title":"KernelSU 是否支持模块 ？","slug":"kernelsu-是否支持模块","link":"#kernelsu-是否支持模块","children":[]},{"level":2,"title":"KernelSU 是否支持 Xposed ？","slug":"kernelsu-是否支持-xposed","link":"#kernelsu-是否支持-xposed","children":[]},{"level":2,"title":"KernelSU 支持 Zygisk 吗?","slug":"kernelsu-支持-zygisk-吗","link":"#kernelsu-支持-zygisk-吗","children":[]},{"level":2,"title":"KernelSU 与 Magisk 兼容吗 ？","slug":"kernelsu-与-magisk-兼容吗","link":"#kernelsu-与-magisk-兼容吗","children":[]},{"level":2,"title":"KernelSU 会替代 Magisk 吗？","slug":"kernelsu-会替代-magisk-吗","link":"#kernelsu-会替代-magisk-吗","children":[]},{"level":2,"title":"KernelSU 可以支持非 GKI 设备吗？","slug":"kernelsu-可以支持非-gki-设备吗","link":"#kernelsu-可以支持非-gki-设备吗","children":[]},{"level":2,"title":"KernelSU 支持 Android 12 以下的设备吗？","slug":"kernelsu-支持-android-12-以下的设备吗","link":"#kernelsu-支持-android-12-以下的设备吗","children":[]},{"level":2,"title":"KernelSU 可以支持旧内核吗？","slug":"kernelsu-可以支持旧内核吗","link":"#kernelsu-可以支持旧内核吗","children":[]},{"level":2,"title":"如何为旧内核集成 KernelSU？","slug":"如何为旧内核集成-kernelsu","link":"#如何为旧内核集成-kernelsu","children":[]},{"level":2,"title":"为什么我手机系统是 Android 13，但内核版本却是 \\"android12-5.10\\"?","slug":"为什么我手机系统是-android-13-但内核版本却是-android12-5-10","link":"#为什么我手机系统是-android-13-但内核版本却是-android12-5-10","children":[]},{"level":2,"title":"KernelSU 支持 --mount-master/全局挂载命名空间吗？","slug":"kernelsu-支持-mount-master-全局挂载命名空间吗","link":"#kernelsu-支持-mount-master-全局挂载命名空间吗","children":[]},{"level":2,"title":"我是 GKI1.0, 能用 KernelSU 吗?","slug":"我是-gki1-0-能用-kernelsu-吗","link":"#我是-gki1-0-能用-kernelsu-吗","children":[]}],"relativePath":"zh_CN/guide/faq.md"}'),a={name:"zh_CN/guide/faq.md"},i=l('<h1 id="常见问题" tabindex="-1">常见问题 <a class="header-anchor" href="#常见问题" aria-hidden="true">#</a></h1><h2 id="kernelsu-是否支持我的设备" tabindex="-1">KernelSU 是否支持我的设备 ？ <a class="header-anchor" href="#kernelsu-是否支持我的设备" aria-hidden="true">#</a></h2><p>首先，您的设备应该能够解锁 bootloader。 如果不能，则不支持。</p><p>然后在你的设备上安装 KernelSU 管理器并打开它，如果它显示 <code>不支持</code> ，那么你的设备没有官方支持的开箱即用的 boot image；但你可以自己编译内核集成 KernelSU 进而使用它。</p><h2 id="kernelsu-是否需要解锁-bootloader" tabindex="-1">KernelSU 是否需要解锁 Bootloader ？ <a class="header-anchor" href="#kernelsu-是否需要解锁-bootloader" aria-hidden="true">#</a></h2><p>当然需要。</p><h2 id="kernelsu-是否支持模块" tabindex="-1">KernelSU 是否支持模块 ？ <a class="header-anchor" href="#kernelsu-是否支持模块" aria-hidden="true">#</a></h2><p>支持，但它是早期版本，可能有问题。请等待它稳定 😃</p><h2 id="kernelsu-是否支持-xposed" tabindex="-1">KernelSU 是否支持 Xposed ？ <a class="header-anchor" href="#kernelsu-是否支持-xposed" aria-hidden="true">#</a></h2><p>支持。<a href="https://github.com/canyie/Dreamland" target="_blank" rel="noreferrer">Dreamland</a> 和 <a href="https::/taichi.cool" target="_blank" rel="noreferrer">TaiChi</a> 可以正常运行。LSPosed 可以在 <a href="https://github.com/Dr-TSNG/ZygiskOnKernelSU" target="_blank" rel="noreferrer">Zygisk on KernelSU</a> 的支持下正常运行。</p><h2 id="kernelsu-支持-zygisk-吗" tabindex="-1">KernelSU 支持 Zygisk 吗? <a class="header-anchor" href="#kernelsu-支持-zygisk-吗" aria-hidden="true">#</a></h2><p>KernelSU 本体不支持 Zygisk，但是你可以用 <a href="https://github.com/Dr-TSNG/ZygiskOnKernelSU" target="_blank" rel="noreferrer">Zygisk on KernelSU</a> 来使用 Zygisk 模块。</p><h2 id="kernelsu-与-magisk-兼容吗" tabindex="-1">KernelSU 与 Magisk 兼容吗 ？ <a class="header-anchor" href="#kernelsu-与-magisk-兼容吗" aria-hidden="true">#</a></h2><p>KernelSU 的模块系统与 Magisk 的 magic mount 有冲突，如果 KernelSU 中启用了任何模块，那么整个 Magisk 将无法工作。</p><p>但是如果你只使用 KernelSU 的 <code>su</code>，那么它会和 Magisk 一起工作：KernelSU 修改 <code>kernel</code> 、 Magisk 修改 <code>ramdisk</code>，它们可以一起工作。</p><h2 id="kernelsu-会替代-magisk-吗" tabindex="-1">KernelSU 会替代 Magisk 吗？ <a class="header-anchor" href="#kernelsu-会替代-magisk-吗" aria-hidden="true">#</a></h2><p>我们不这么认为，这也不是我们的目标。Magisk 对于用户空间 root 解决方案来说已经足够好了，它会存活很久。KernelSU 的目标是为用户提供内核接口，而不是替代 Magisk。</p><h2 id="kernelsu-可以支持非-gki-设备吗" tabindex="-1">KernelSU 可以支持非 GKI 设备吗？ <a class="header-anchor" href="#kernelsu-可以支持非-gki-设备吗" aria-hidden="true">#</a></h2><p>可以。但是你应该下载内核源代码并将 KernelSU 集成到源代码树中并自己编译内核。</p><h2 id="kernelsu-支持-android-12-以下的设备吗" tabindex="-1">KernelSU 支持 Android 12 以下的设备吗？ <a class="header-anchor" href="#kernelsu-支持-android-12-以下的设备吗" aria-hidden="true">#</a></h2><p>影响 KernelSU 兼容性的是设备内核的版本，它与设备的 Android 版本没有直接的关系。唯一有关联的是：<strong>出厂</strong> Android 12 的设备，一定是 5.10 或更高的内核（GKI设备）；因此结论如下：</p><ol><li>出厂 Android 12 的设备必定是支持的（GKI 设备）</li><li>旧版本内核的设备（即使是 Android 12，也可能是旧内核）是兼容的（你需要自己编译内核）</li></ol><h2 id="kernelsu-可以支持旧内核吗" tabindex="-1">KernelSU 可以支持旧内核吗？ <a class="header-anchor" href="#kernelsu-可以支持旧内核吗" aria-hidden="true">#</a></h2><p>可以，目前最低支持到 4.14；更低的版本你需要手动移植它，欢迎 PR ！</p><h2 id="如何为旧内核集成-kernelsu" tabindex="-1">如何为旧内核集成 KernelSU？ <a class="header-anchor" href="#如何为旧内核集成-kernelsu" aria-hidden="true">#</a></h2><p>参考<a href="./how-to-integrate-for-non-gki.html">教程</a></p><h2 id="为什么我手机系统是-android-13-但内核版本却是-android12-5-10" tabindex="-1">为什么我手机系统是 Android 13，但内核版本却是 &quot;android12-5.10&quot;? <a class="header-anchor" href="#为什么我手机系统是-android-13-但内核版本却是-android12-5-10" aria-hidden="true">#</a></h2><p>内核版本与 Android 版本无关，如果你需要刷入 KernelSU，请永远使用<strong>内核版本</strong>而非 Android 版本，如果你为 &quot;android12-5.10&quot; 的设备刷入 Android 13 的内核，等待你的将是 bootloop.</p><h2 id="kernelsu-支持-mount-master-全局挂载命名空间吗" tabindex="-1">KernelSU 支持 --mount-master/全局挂载命名空间吗？ <a class="header-anchor" href="#kernelsu-支持-mount-master-全局挂载命名空间吗" aria-hidden="true">#</a></h2><p>目前没有（未来可能会支持），但实际上有很多种办法手动进入全局命名空间，无需 su 内置支持，比如：</p><ol><li><code>nsenter -t 1 -m sh</code> 可以获得一个全局 mount namespace 的 shell.</li><li>在你要执行的命令之前添加 <code>nsenter --mount=/proc/1/ns/mnt</code> 就可以让此命令在全局 mount namespace 下执行。 KernelSU 本身也使用了 <a href="https://github.com/tiann/KernelSU/blob/77056a710073d7a5f7ee38f9e77c9fd0b3256576/manager/app/src/main/java/me/weishu/kernelsu/ui/util/KsuCli.kt#L115" target="_blank" rel="noreferrer">这种方法</a></li></ol><h2 id="我是-gki1-0-能用-kernelsu-吗" tabindex="-1">我是 GKI1.0, 能用 KernelSU 吗? <a class="header-anchor" href="#我是-gki1-0-能用-kernelsu-吗" aria-hidden="true">#</a></h2><p>GKI1 跟 GKI2 完全是两个东西，所以你需要自行编译内核。</p>',33),d=[i];function s(t,o,h,k,u,c){return r(),n("div",null,d)}const K=e(a,[["render",s]]);export{p as __pageData,K as default};
