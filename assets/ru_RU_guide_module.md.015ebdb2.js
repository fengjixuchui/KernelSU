import{_ as s,o as e,c as a,O as n}from"./chunks/framework.43781440.js";const C=JSON.parse('{"title":"Руководство по разработке модулей","description":"","frontmatter":{},"headers":[],"relativePath":"ru_RU/guide/module.md","filePath":"ru_RU/guide/module.md"}'),l={name:"ru_RU/guide/module.md"},o=n(`<h1 id="introduction" tabindex="-1">Руководство по разработке модулей <a class="header-anchor" href="#introduction" aria-label="Permalink to &quot;Руководство по разработке модулей {#introduction}&quot;">​</a></h1><p>KernelSU предоставляет механизм модулей, позволяющий добиться эффекта модификации системного каталога при сохранении целостности системного раздела. Этот механизм принято называть &quot;бессистемным&quot;.</p><p>Модульный механизм KernelSU практически аналогичен механизму Magisk. Если вы знакомы с разработкой модулей Magisk, то разработка модулей KernelSU очень похожа. Представление модулей ниже можно пропустить, достаточно прочитать [различия-с-magisk] (difference-with-magisk.md).</p><h2 id="busybox" tabindex="-1">Busybox <a class="header-anchor" href="#busybox" aria-label="Permalink to &quot;Busybox&quot;">​</a></h2><p>В комплект поставки KernelSU входит полнофункциональный бинарный файл BusyBox (включая полную поддержку SELinux). Исполняемый файл находится по адресу <code>/data/adb/ksu/bin/busybox</code>. BusyBox от KernelSU поддерживает переключаемый во время работы &quot;ASH Standalone Shell Mode&quot;. Этот автономный режим означает, что при запуске в оболочке <code>ash</code> BusyBox каждая команда будет напрямую использовать апплет внутри BusyBox, независимо от того, что задано в качестве <code>PATH</code>. Например, такие команды, как <code>ls</code>, <code>rm</code>, <code>chmod</code> будут <strong>НЕ</strong> использовать то, что находится в <code>PATH</code> (в случае Android по умолчанию это будут <code>/system/bin/ls</code>, <code>/system/bin/rm</code> и <code>/system/bin/chmod</code> соответственно), а вместо этого будут напрямую вызывать внутренние апплеты BusyBox. Это гарантирует, что скрипты всегда будут выполняться в предсказуемом окружении и всегда будут иметь полный набор команд, независимо от того, на какой версии Android они выполняются. Чтобы заставить команду <em>не</em> использовать BusyBox, необходимо вызвать исполняемый файл с полными путями.</p><p>Каждый сценарий оболочки, запущенный в контексте KernelSU, будет выполняться в оболочке BusyBox <code>ash</code> с включенным автономным режимом. Для сторонних разработчиков это касается всех загрузочных скриптов и скриптов установки модулей.</p><p>Для тех, кто хочет использовать эту возможность &quot;Автономного режима&quot; вне KernelSU, есть два способа включить ее:</p><ol><li>Установите переменной окружения <code>ASH_STANDALONE</code> значение <code>1</code><br>Пример: <code>ASH_STANDALONE=1 /data/adb/ksu/bin/busybox sh &lt;script&gt;</code></li><li>Переключитесь с помощью параметров командной строки:<br><code>/data/adb/ksu/bin/busybox sh -o standalone &lt;script&gt;</code></li></ol><p>Чтобы убедиться, что все последующие запуски оболочки <code>sh</code> также выполняются в автономном режиме, предпочтительным методом является вариант 1 (и это то, что KernelSU и менеджер KernelSU используют внутри), поскольку переменные окружения наследуются вплоть до дочерних процессов.</p><div class="tip custom-block"><p class="custom-block-title">отличие от Magisk</p><p>BusyBox в KernelSU теперь использует бинарный файл, скомпилированный непосредственно из проекта Magisk. **Поэтому вам не нужно беспокоиться о проблемах совместимости между скриптами BusyBox в Magisk и KernelSU, поскольку они абсолютно одинаковы!</p></div><h2 id="kernelsu-modules" tabindex="-1">Модули KernelSU <a class="header-anchor" href="#kernelsu-modules" aria-label="Permalink to &quot;Модули KernelSU {#kernelsu-modules}&quot;">​</a></h2><p>Модуль KernelSU - это папка, размещенная в каталоге <code>/data/adb/modules</code> и имеющая следующую структуру:</p><div class="language-txt"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">/data/adb/modules</span></span>
<span class="line"><span style="color:#A6ACCD;">├── .</span></span>
<span class="line"><span style="color:#A6ACCD;">├── .</span></span>
<span class="line"><span style="color:#A6ACCD;">|</span></span>
<span class="line"><span style="color:#A6ACCD;">├── $MODID                  &lt;--- Папка имеет имя с идентификатором модуля</span></span>
<span class="line"><span style="color:#A6ACCD;">│   │</span></span>
<span class="line"><span style="color:#A6ACCD;">│   │      *** Идентификация модуля ***</span></span>
<span class="line"><span style="color:#A6ACCD;">│   │</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── module.prop         &lt;--- В этом файле хранятся метаданные модуля</span></span>
<span class="line"><span style="color:#A6ACCD;">│   │</span></span>
<span class="line"><span style="color:#A6ACCD;">│   │      *** Основное содержимое ***</span></span>
<span class="line"><span style="color:#A6ACCD;">│   │</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── system              &lt;--- Эта папка будет смонтирована, если skip_mount не существует</span></span>
<span class="line"><span style="color:#A6ACCD;">│   │   ├── ...</span></span>
<span class="line"><span style="color:#A6ACCD;">│   │   ├── ...</span></span>
<span class="line"><span style="color:#A6ACCD;">│   │   └── ...</span></span>
<span class="line"><span style="color:#A6ACCD;">│   │</span></span>
<span class="line"><span style="color:#A6ACCD;">│   │      *** Флаги состояния ***</span></span>
<span class="line"><span style="color:#A6ACCD;">│   │</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── skip_mount          &lt;--- Если он существует, то KernelSU НЕ будет монтировать вашу системную папку</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── disable             &lt;--- Если модуль существует, то он будет отключен</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── remove              &lt;--- Если модуль существует, то при следующей перезагрузке он будет удален</span></span>
<span class="line"><span style="color:#A6ACCD;">│   │</span></span>
<span class="line"><span style="color:#A6ACCD;">│   │      *** Необязательные файлы ***</span></span>
<span class="line"><span style="color:#A6ACCD;">│   │</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── post-fs-data.sh     &lt;--- Этот скрипт будет выполняться в post-fs-data</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── service.sh          &lt;--- Этот скрипт будет выполняться в сервисе late_start</span></span>
<span class="line"><span style="color:#A6ACCD;">|   ├── uninstall.sh        &lt;--- Этот скрипт будет выполнен, когда KernelSU удалит ваш модуль</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── system.prop         &lt;--- Свойства из этого файла будут загружены в качестве системных свойств программой resetprop</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── sepolicy.rule       &lt;--- Дополнительные пользовательские правила sepolicy</span></span>
<span class="line"><span style="color:#A6ACCD;">│   │</span></span>
<span class="line"><span style="color:#A6ACCD;">│   │      *** Автоматически генерируется, НЕЛЬЗЯ создавать или изменять вручную ***</span></span>
<span class="line"><span style="color:#A6ACCD;">│   │</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── vendor              &lt;--- Символьная ссылка на $MODID/system/vendor</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── product             &lt;--- Символьная ссылка на $MODID/system/product</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── system_ext          &lt;--- Симлинк на $MODID/system/system_ext</span></span>
<span class="line"><span style="color:#A6ACCD;">│   │</span></span>
<span class="line"><span style="color:#A6ACCD;">│   │      *** Допускается использование любых дополнительных файлов/папок ***</span></span>
<span class="line"><span style="color:#A6ACCD;">│   │</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── ...</span></span>
<span class="line"><span style="color:#A6ACCD;">│   └── ...</span></span>
<span class="line"><span style="color:#A6ACCD;">|</span></span>
<span class="line"><span style="color:#A6ACCD;">├── another_module</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── .</span></span>
<span class="line"><span style="color:#A6ACCD;">│   └── .</span></span>
<span class="line"><span style="color:#A6ACCD;">├── .</span></span>
<span class="line"><span style="color:#A6ACCD;">├── .</span></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">различия с Magisk</p><p>KernelSU не имеет встроенной поддержки Zygisk, поэтому в модуле нет содержимого, связанного с Zygisk. Однако для поддержки модулей Zygisk можно использовать <a href="https://github.com/Dr-TSNG/ZygiskOnKernelSU" target="_blank" rel="noreferrer">ZygiskOnKernelSU</a>. В этом случае содержимое модуля Zygisk идентично содержимому, поддерживаемому Magisk.</p></div><h3 id="module-prop" tabindex="-1">module.prop <a class="header-anchor" href="#module-prop" aria-label="Permalink to &quot;module.prop&quot;">​</a></h3><p>module.prop - это конфигурационный файл модуля. В KernelSU, если модуль не содержит этого файла, он не будет распознан как модуль. Формат этого файла следующий:</p><div class="language-txt"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">id=&lt;string&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">name=&lt;string&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">version=&lt;string&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">versionCode=&lt;int&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">author=&lt;string&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">description=&lt;string&gt;</span></span></code></pre></div><ul><li><code>id</code> должно соответствовать данному регулярному выражению: <code>^[a-zA-Z][a-zA-Z0-9._-]+$</code><br> экс: ✓ <code>a_module</code>, ✓ <code>a.module</code>, ✓ <code>module-101</code>, ✗ <code>a module</code>, ✗ <code>1_module</code>, ✗ <code>-a-module</code><br> Это <strong>уникальный идентификатор</strong> вашего модуля. Не следует изменять его после публикации.</li><li><code>versionCode</code> должен быть <strong>целым</strong>. Это используется для сравнения версий</li><li>Другими, не упомянутыми выше, могут быть любые <strong>однострочные</strong> строки.</li><li>Обязательно используйте тип перевода строки <code>UNIX (LF)</code>, а не <code>Windows (CR+LF)</code> или <code>Macintosh (CR)</code>.</li></ul><h3 id="shell-scripts" tabindex="-1">Сценарии командной оболочки <a class="header-anchor" href="#shell-scripts" aria-label="Permalink to &quot;Сценарии командной оболочки {#shell-scripts}&quot;">​</a></h3><p>Чтобы понять разницу между <code>post-fs-data.sh</code> и <code>Service.sh</code>, прочитайте раздел <a href="#boot-scripts">Boot Scripts</a>. Для большинства разработчиков модулей <code>service.sh</code> должно быть достаточно, если вам нужно просто запустить загрузочный скрипт.</p><p>Во всех скриптах вашего модуля используйте <code>MODDIR=\${0%/*}</code> для получения пути к базовому каталогу вашего модуля; <strong>НЕ</strong> кодируйте жестко путь к вашему модулю в скриптах.</p><div class="tip custom-block"><p class="custom-block-title">различия с Magisk</p><p>С помощью переменной окружения KSU можно определить, выполняется ли сценарий в KernelSU или в Magisk. Если скрипт выполняется в KernelSU, то это значение будет равно true.</p></div><h3 id="system-directories" tabindex="-1">каталог <code>system</code> <a class="header-anchor" href="#system-directories" aria-label="Permalink to &quot;каталог \`system\` {#system-directories}&quot;">​</a></h3><p>После загрузки системы содержимое этого каталога будет наложено поверх раздела /system с помощью overlayfs. Это означает, что:</p><ol><li>Файлы с теми же именами, что и в соответствующем каталоге в системе, будут перезаписаны файлами в этом каталоге.</li><li>Папки с теми же именами, что и в соответствующем каталоге в системе, будут объединены с папками в этом каталоге.</li></ol><p>Если вы хотите удалить файл или папку в исходном каталоге системы, необходимо создать файл с тем же именем, что и файл/папка, в каталоге модуля с помощью команды <code>mknod filename c 0 0</code>. Таким образом, система overlayfs автоматически &quot;забелит&quot; этот файл, как если бы он был удален (раздел /system при этом фактически не изменится).</p><p>Вы также можете объявить в <code>customize.sh</code> переменную с именем <code>REMOVE</code>, содержащую список каталогов для выполнения операций удаления, и KernelSU автоматически выполнит команду <code>mknod &lt;TARGET&gt; c 0 0</code> в соответствующих каталогах модуля. Например:</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">REMOVE</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#C3E88D;">/system/app/YouTube</span></span>
<span class="line"><span style="color:#C3E88D;">/system/app/Bloatware</span></span>
<span class="line"><span style="color:#89DDFF;">&quot;</span></span></code></pre></div><p>В приведенном выше списке будут выполнены команды <code>mknod $MODPATH/system/app/YouTuBe c 0 0</code> и <code>mknod $MODPATH/system/app/Bloatware c 0 0</code>; при этом <code>/system/app/YouTube</code> и <code>/system/app/Bloatware</code> будут удалены после вступления модуля в силу.</p><p>Если вы хотите заменить каталог в системе, то необходимо создать каталог с тем же путем в каталоге модуля, а затем установить для этого каталога атрибут <code>setfattr -n trusted.overlay.opaque -v y &lt;TARGET&gt;</code>. Таким образом, система overlayfs автоматически заменит соответствующий каталог в системе (без изменения раздела /system).</p><p>Вы можете объявить в файле <code>customize.sh</code> переменную с именем <code>REPLACE</code>, содержащую список заменяемых каталогов, и KernelSU автоматически выполнит соответствующие операции в каталоге вашего модуля. Например:</p><p>REPLACE=&quot; /system/app/YouTube /system/app/Bloatware &quot;</p><p>В этом списке будут автоматически созданы каталоги <code>$MODPATH/system/app/YouTube</code> и <code>$MODPATH/system/app/Bloatware</code>, а затем выполнены команды <code>setfattr -n trusted.overlay.opaque -v y $MODPATH/system/app/YouTube</code> и <code>setfattr -n trusted.overlay.opaque -v y $MODPATH/system/app/Bloatware</code>. После вступления модуля в силу каталоги <code>/system/app/YouTube</code> и <code>/system/app/Bloatware</code> будут заменены на пустые.</p><div class="tip custom-block"><p class="custom-block-title">различия с Magisk</p><p>В KernelSU бессистемный механизм реализован через overlayfs ядра, а в Magisk в настоящее время используется магическое монтирование (bind mount). Эти два метода реализации имеют существенные различия, но конечная цель у них одна: модификация файлов /system без физического изменения раздела /system.</p></div><p>Если вы заинтересованы в использовании overlayfs, рекомендуется прочитать <a href="https://docs.kernel.org/filesystems/overlayfs.html" target="_blank" rel="noreferrer">документацию по overlayfs</a> ядра Linux.</p><h3 id="system-prop" tabindex="-1">system.prop <a class="header-anchor" href="#system-prop" aria-label="Permalink to &quot;system.prop&quot;">​</a></h3><p>Этот файл имеет тот же формат, что и <code>build.prop</code>. Каждая строка состоит из <code>[key]=[value]</code>.</p><h3 id="sepolicy-rule" tabindex="-1">sepolicy.rule <a class="header-anchor" href="#sepolicy-rule" aria-label="Permalink to &quot;sepolicy.rule&quot;">​</a></h3><p>Если для вашего модуля требуются дополнительные патчи sepolicy, добавьте эти правила в данный файл. Каждая строка в этом файле будет рассматриваться как утверждение политики.</p><h2 id="module-installer" tabindex="-1">Установщик модулей <a class="header-anchor" href="#module-installer" aria-label="Permalink to &quot;Установщик модулей {#module-installer}&quot;">​</a></h2><p>Инсталлятор модуля KernelSU - это модуль KernelSU, упакованный в zip-файл, который может быть прошит в APP-менеджере KernelSU. Простейший установщик модуля KernelSU - это просто модуль KernelSU, упакованный в zip-файл.</p><div class="language-txt"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">module.zip</span></span>
<span class="line"><span style="color:#A6ACCD;">│</span></span>
<span class="line"><span style="color:#A6ACCD;">├── customize.sh                       &lt;--- (Необязательно, более подробно позже)</span></span>
<span class="line"><span style="color:#A6ACCD;">│                                           Этот скрипт будет использоваться в update-binary</span></span>
<span class="line"><span style="color:#A6ACCD;">├── ...</span></span>
<span class="line"><span style="color:#A6ACCD;">├── ...  /* Остальные файлы модуля */</span></span>
<span class="line"><span style="color:#A6ACCD;">│</span></span></code></pre></div><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>Модуль KernelSU НЕ поддерживается для установки в пользовательское Recovery!!!</p></div><h3 id="customizing-installation" tabindex="-1">Персонализация <a class="header-anchor" href="#customizing-installation" aria-label="Permalink to &quot;Персонализация {#customizing-installation}&quot;">​</a></h3><p>Если вам необходимо настроить процесс установки модуля, то в качестве опции вы можете создать в программе установки скрипт с именем <code>customize.sh</code>. Этот скрипт будет <em>источником</em> (не исполняться!) сценария установщика модуля после извлечения всех файлов и применения стандартных разрешений и secontext. Это очень удобно, если ваш модуль требует дополнительной настройки в зависимости от ABI устройства, или вам необходимо установить специальные разрешения/секонтекст для некоторых файлов модуля.</p><p>Если вы хотите полностью контролировать и настраивать процесс установки, объявите <code>SKIPUNZIP=1</code> в файле <code>customize.sh</code>, чтобы пропустить все шаги установки по умолчанию. При этом ваш <code>customize.sh</code> будет сам отвечать за установку.</p><p>Сценарий <code>customize.sh</code> запускается в оболочке BusyBox <code>ash</code> KernelSU с включенным &quot;Автономным режимом&quot;. Доступны следующие переменные и функции:</p><h4 id="переменные" tabindex="-1">Переменные <a class="header-anchor" href="#переменные" aria-label="Permalink to &quot;Переменные&quot;">​</a></h4><ul><li><code>KSU</code> (bool): переменная, отмечающая, что скрипт выполняется в окружении KernelSU, причем значение этой переменной всегда будет true. Ее можно использовать для различения KernelSU и Magisk.</li><li><code>KSU_VER</code> (string): строка версии текущего установленного KernelSU (например, <code>v0.4.0</code>)</li><li><code>KSU_VER_CODE</code> (int): код версии текущего установленного KernelSU в пользовательском пространстве (например, <code>10672</code>)</li><li><code>KSU_KERNEL_VER_CODE</code> (int): код версии текущей установленной KernelSU в пространстве ядра (например, <code>10672</code>)</li><li><code>BOOTMODE</code> (bool): в KernelSU всегда должно быть <code>true</code>.</li><li><code>MODPATH</code> (path): путь, по которому должны быть установлены файлы ваших модулей</li><li><code>TMPDIR</code> (path): место, где вы можете временно хранить файлы</li><li><code>ZIPFILE</code> (path): установочный zip-архив вашего модуля</li><li><code>ARCH</code> (string): архитектура процессора устройства. Значение: <code>arm</code>, <code>arm64</code>, <code>x86</code> или <code>x64</code>.</li><li><code>IS64BIT</code> (bool): <code>true</code>, если <code>$ARCH</code> имеет значение <code>arm64</code> или <code>x64</code>.</li><li><code>API</code> (int): уровень API (версия Android) устройства (например, <code>23</code> для Android 6.0)</li></ul><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>В KernelSU MAGISK_VER_CODE всегда равен 25200, а MAGISK_VER всегда равен v25.2. Пожалуйста, не используйте эти две переменные для определения того, запущен ли он на KernelSU или нет.</p></div><h4 id="functions" tabindex="-1">Функции <a class="header-anchor" href="#functions" aria-label="Permalink to &quot;Функции {#functions}&quot;">​</a></h4><div class="language-txt"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">ui_print &lt;msg&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    вывести &lt;msg&gt; на консоль</span></span>
<span class="line"><span style="color:#A6ACCD;">    Избегайте использования &#39;echo&#39;, так как он не будет отображаться в консоли пользовательского recovery</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">abort &lt;msg&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    вывести сообщение об ошибке &lt;msg&gt; на консоль и завершить установку</span></span>
<span class="line"><span style="color:#A6ACCD;">    Избегайте использования команды &#39;exit&#39;, так как в этом случае будут пропущены шаги очистки завершения установки</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">set_perm &lt;target&gt; &lt;owner&gt; &lt;group&gt; &lt;permission&gt; [context]</span></span>
<span class="line"><span style="color:#A6ACCD;">    если [context] не задан, то по умолчанию используется &quot;u:object_r:system_file:s0&quot;.</span></span>
<span class="line"><span style="color:#A6ACCD;">    Эта функция является сокращением для следующих команд:</span></span>
<span class="line"><span style="color:#A6ACCD;">       chown owner.group target</span></span>
<span class="line"><span style="color:#A6ACCD;">       chmod permission target</span></span>
<span class="line"><span style="color:#A6ACCD;">       chcon context target</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">set_perm_recursive &lt;directory&gt; &lt;owner&gt; &lt;group&gt; &lt;dirpermission&gt; &lt;filepermission&gt; [context]</span></span>
<span class="line"><span style="color:#A6ACCD;">    если [context] не задан, то по умолчанию используется &quot;u:object_r:system_file:s0&quot;.</span></span>
<span class="line"><span style="color:#A6ACCD;">    для всех файлов в &lt;directory&gt; будет вызвана команда:</span></span>
<span class="line"><span style="color:#A6ACCD;">       set_perm file owner group filepermission context</span></span>
<span class="line"><span style="color:#A6ACCD;">    для всех каталогов в &lt;directory&gt; (включая себя самого), он вызовет:</span></span>
<span class="line"><span style="color:#A6ACCD;">       set_perm dir owner group dirpermission context</span></span></code></pre></div><h2 id="boot-scripts" tabindex="-1">Загрузочные сценарии <a class="header-anchor" href="#boot-scripts" aria-label="Permalink to &quot;Загрузочные сценарии {#boot-scripts}&quot;">​</a></h2><p>В KernelSU скрипты делятся на два типа в зависимости от режима их работы: режим post-fs-data и режим late_start service:</p><ul><li>режим post-fs-data <ul><li>Эта стадия является БЛОКИРУЮЩЕЙ. Процесс загрузки приостанавливается до завершения выполнения или по истечении 10 секунд.</li><li>Сценарии запускаются до того, как будут смонтированы какие-либо модули. Это позволяет разработчику модулей динамически настраивать свои модули до того, как они будут смонтированы.</li><li>Этот этап происходит до запуска Zygote, что практически означает, что все в Android</li><li><strong>ПРЕДУПРЕЖДЕНИЕ:</strong> использование <code>setprop</code> приведет к блокировке процесса загрузки! Вместо этого используйте <code>resetprop -n &lt;prop_name&gt; &lt;prop_value&gt;</code>.</li><li>Запускайте скрипты в этом режиме только в случае необходимости.</li></ul></li><li>режим обслуживания late_start <ul><li>Эта стадия является НЕБЛОКИРУЮЩЕЙ. Ваш скрипт выполняется параллельно с остальным процессом загрузки.</li><li><strong>Это рекомендуемый этап для запуска большинства скриптов.</strong></li></ul></li></ul><p>В KernelSU скрипты запуска делятся на два типа по месту их хранения: общие скрипты и скрипты модулей:</p><ul><li>Общие скрипты <ul><li>Размещаются в файлах <code>/data/adb/post-fs-data.d</code> или <code>/data/adb/service.d</code>.</li><li>Выполняется только в том случае, если скрипт установлен как исполняемый (<code>chmod +x script.sh</code>)</li><li>Скрипты в <code>post-fs-data.d</code> выполняются в режиме post-fs-data, а скрипты в <code>service.d</code> - в режиме late_start service.</li><li>Модули не должны <strong>НЕ</strong> добавлять общие скрипты при установке</li></ul></li><li>Скрипты модуля <ul><li>Размещаются в отдельной папке модуля</li><li>Выполняются только в том случае, если модуль включен</li><li><code>post-fs-data.sh</code> запускается в режиме post-fs-data, а <code>service.sh</code> - в режиме late_start service.</li></ul></li></ul><p>Все загрузочные скрипты будут выполняться в оболочке BusyBox <code>ash</code> от KernelSU с включенным &quot;Автономным режимом&quot;.</p>`,58),t=[o];function p(c,i,r,d,u,A){return e(),a("div",null,t)}const m=s(l,[["render",p]]);export{C as __pageData,m as default};
