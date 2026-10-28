# Moski.net — Arabic glossary and tone (المسرد العربي)

The single source of truth for every Arabic string in Moski.net (CLI/bots `locales/ar*.yaml`,
web `web/src/i18n/ar.ts`, desktop `apps/desktop/src/i18n/ar*.ts`, installer).

## Tone

- **Light Modern Standard Arabic** (فصحى خفيفة), close to a modern news/tech site. Short, plain,
  friendly. No archaic or heavy formal words (avoid: يُرجى التكرّم، حيثُ، إنّ ... قد).
- **A few common Egyptian words, only in friendly/conversational lines** (welcome, tips, spinner,
  empty states, success messages): e.g. «تمام»، «دلوقتي»، «يلا»، «خلّينا»، «ولا يهمك».
  Never in buttons, menu items, settings labels, errors, warnings, legal or billing text.
- Address the user in the **neutral masculine imperative** (اختر، اكتب، افتح) — standard UI convention.
- Buttons/menu items: imperative or verbal noun, 1–3 words (حفظ، إلغاء، إعادة المحاولة، فتح الإعدادات).
- Progress: «جارٍ …» + verbal noun (جارٍ التحميل…، جارٍ الحفظ…). Use the ellipsis character «…».
- Errors: say what happened, then what to do («تعذّر حفظ الملف. تحقّق من الصلاحيات ثم حاول مرة أخرى.»).
- Use Arabic punctuation: «،» «؛» «؟». Keep Western digits (0-9). Quotes: «…».
- Keep it about as long as the English; never add explanations that are not in the source.

## Never translate / never change

- Keys, object structure, file layout, imports/exports, TypeScript code, function signatures.
- Placeholders exactly as written: `{name}`, `{0}`, `${name}`, `%s`, `{count}` — same set, same
  spelling (you may reorder them in the sentence).
- Rich/ANSI/markup: `[bold]…[/]`, `[#C58B3B]`, `**…**`, `` `code` ``, `<kbd>`, `\n`, emoji, icons.
- Commands, flags, paths, env vars, config keys, file names, URLs: `/help`, `hermes setup`,
  `--yes`, `~/.hermes`, `HERMES_HOME`, `display.language`, `config.yaml`.
- Product and provider names: Moski.net, Hermes, Hermes Agent, Nous Research, Nous Portal,
  OpenRouter, Anthropic, OpenAI, Claude, GPT, Telegram, Discord, Slack, WhatsApp, Signal, GitHub,
  MCP, API, CLI, TUI, JSON, YAML, URL, SSH, Docker, Python, Node.js, uv, Git.
- Keyboard keys: Enter, Esc, Tab, Ctrl+C, ↑/↓.
- User-typed command words that the code matches (e.g. `approval.inputs` lists): keep every English
  token and add Arabic synonyms after them.

## Terms

| English | العربية |
|---|---|
| agent | الوكيل |
| assistant | المساعد |
| session | جلسة |
| conversation / chat | محادثة |
| message | رسالة |
| prompt (input) | الطلب / سطر الإدخال |
| system prompt | تعليمات النظام |
| model | النموذج |
| provider | المزوّد |
| token (LLM) | توكن |
| context (window) | السياق (نافذة السياق) |
| tool | أداة |
| toolset | مجموعة أدوات |
| skill | مهارة |
| plugin | إضافة |
| extension | امتداد |
| memory | الذاكرة |
| profile | ملف التعريف |
| persona | الشخصية |
| skin / theme | المظهر / السمة |
| settings | الإعدادات |
| config / configuration | التهيئة / الإعدادات |
| gateway | البوابة |
| platform (Telegram…) | المنصة |
| channel | القناة |
| bot | البوت |
| webhook | Webhook |
| cron job / scheduled task | مهمة مجدولة |
| schedule | جدول / جدولة |
| subagent | وكيل فرعي |
| delegation | التفويض |
| approval | الموافقة |
| approve / deny | موافقة / رفض |
| allow once / for session / always | مرة واحدة / لهذه الجلسة / دائمًا |
| sandbox | بيئة معزولة |
| terminal | الطرفية |
| shell | الصدفة (Shell) |
| command | أمر |
| slash command | أمر مائل (/) |
| workspace | مساحة العمل |
| project | مشروع |
| repository / repo | المستودع |
| branch / commit | فرع / Commit |
| worktree | شجرة عمل (worktree) |
| file / folder | ملف / مجلد |
| upload / download | رفع / تنزيل |
| install / uninstall | تثبيت / إزالة |
| update / upgrade | تحديث / ترقية |
| restart | إعادة التشغيل |
| log / logs | السجل / السجلات |
| error / warning | خطأ / تحذير |
| retry | إعادة المحاولة |
| cancel / close | إلغاء / إغلاق |
| save / saved | حفظ / تم الحفظ |
| delete / remove | حذف / إزالة |
| enable / disable | تفعيل / تعطيل |
| connected / disconnected | متصل / غير متصل |
| sign in / sign out | تسجيل الدخول / تسجيل الخروج |
| account | الحساب |
| API key | مفتاح API |
| credentials | بيانات الاعتماد |
| permission | صلاحية |
| billing / subscription | الفوترة / الاشتراك |
| credits / balance | الرصيد |
| usage / quota / limit | الاستخدام / الحصة / الحد |
| dashboard | لوحة التحكم |
| sidebar | الشريط الجانبي |
| status bar | شريط الحالة |
| preview | معاينة |
| artifact | مُخرَج |
| voice / transcription | الصوت / التفريغ النصي |
| search / web search | بحث / البحث على الويب |
| browser | المتصفح |
| diff | الفروقات |
| trade / order / position | صفقة / أمر / مركز |
| market / price / spread | السوق / السعر / الفارق |
| portfolio | المحفظة |

## Brand lines (fixed)

- Welcome: «أهلاً بك في Moski.net! اكتب رسالتك أو /help لعرض الأوامر.»
- Goodbye: «بالتوفيق في تداولاتك! ◆»
- Tagline: «وكيلك للتداول والتجارة»
