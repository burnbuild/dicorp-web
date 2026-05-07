# Di Corporations 회사 소개 웹사이트 구현 Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Spec(`docs/superpowers/specs/2026-05-07-dicorp-web-design.md`)대로 6개 페이지·KO/EN 회사 소개 사이트를 빌드하고 dicorporations.com에 라이브 → Apple Developer 법인 계정 심사를 위한 회사 웹사이트로 제출 가능 상태로 만든다.

**Architecture:** Next.js 15 App Router static-first 사이트. `/[locale]` 동적 세그먼트 + `next-intl` middleware로 KO/EN 라우팅. 모든 회사 fact는 `lib/company.ts`에 단일 소스로 정의. 폼 백엔드 없음 (mailto). Vercel Hobby에서 dicorporations.com 도메인 연결.

**Tech Stack:** Next.js 15 (App Router) · TypeScript strict · Tailwind CSS v4 · next-intl · Pretendard + Inter · lucide-react · Vercel · Squarespace DNS

**Reference spec:** `docs/superpowers/specs/2026-05-07-dicorp-web-design.md`

---

## File Structure (이 plan으로 만들 파일들)

```
app/
├── [locale]/
│   ├── layout.tsx              # locale provider, html lang, header/footer mount
│   ├── page.tsx                # Home (4 섹션 + footer가 layout에서 옴)
│   ├── about/page.tsx
│   ├── work/page.tsx
│   ├── contact/page.tsx
│   ├── privacy/page.tsx
│   └── terms/page.tsx
├── globals.css                 # tailwind imports, color tokens, type scale, font-face
├── not-found.tsx               # 404 (locale 무관)
├── sitemap.ts                  # 동적 sitemap.xml
├── robots.ts                   # robots.txt
└── opengraph-image.tsx         # OG image (Next.js Image Response)

components/
├── header.tsx                  # sticky, logo + nav + lang toggle
├── footer.tsx                  # 회사 fact + privacy/terms 링크
├── language-toggle.tsx         # KO/EN 토글
├── logo.tsx                    # PNG 로고 + 워드마크 prop
├── section.tsx                 # 공용 섹션 wrapper (vertical rhythm)
├── home/
│   ├── hero.tsx
│   ├── about-summary.tsx
│   ├── work-preview.tsx
│   └── contact-cta.tsx
└── work/
    └── project-card.tsx        # BurnBuild 카드 (재사용 가능)

lib/
└── company.ts                  # 회사 fact 단일 소스

i18n/
├── routing.ts                  # locales, defaultLocale 정의
└── request.ts                  # getRequestConfig

messages/
├── en.json                     # 모든 EN 카피
└── ko.json                     # 모든 KO 카피

public/
├── logo.png                    # 받은 LDI 모노그램 PNG
├── apple-icon.png              # 180x180
├── icon.png                    # 32x32 favicon
└── og.png                      # OG fallback

middleware.ts                   # next-intl middleware
next.config.ts
tsconfig.json
postcss.config.mjs
package.json
.env.local.example              # 비어있음 (현재 환경 변수 없음)
```

---

## Phase 0 — Project scaffolding

### Task 0.1: Next.js 15 + TS + Tailwind 프로젝트 생성

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `app/`, `postcss.config.mjs`, `app/globals.css`, `app/layout.tsx`, `app/page.tsx` (모두 `create-next-app` 산출물)

- [ ] **Step 1: 프로젝트 디렉토리 확인**

```bash
pwd
# 기대: /Users/paigeshin/Desktop/projects/burnbuild/dicorp-web
ls -la
# 기대: docs/, .git/, .gitignore, .superpowers/ 만 존재
```

- [ ] **Step 2: 기존 docs/spec/git 보호 — temp 디렉토리에 scaffold 후 파일만 옮김**

```bash
mkdir -p /tmp/dicorp-scaffold
cd /tmp/dicorp-scaffold
npx create-next-app@latest . --ts --tailwind --eslint --app --src-dir false --import-alias "@/*" --turbopack --use-npm --yes
```

create-next-app은 빈 디렉토리를 요구하므로 `/tmp`에 만든 뒤 필요한 파일만 복사한다.

- [ ] **Step 3: scaffold 산출물을 프로젝트 루트로 복사 (docs, .git, .gitignore, .superpowers는 보존)**

```bash
cd /tmp/dicorp-scaffold
# docs와 git 보존을 위해 선택 복사
rsync -av --exclude=docs --exclude=.git --exclude=.gitignore --exclude=.superpowers ./ /Users/paigeshin/Desktop/projects/burnbuild/dicorp-web/
cd /Users/paigeshin/Desktop/projects/burnbuild/dicorp-web
# scaffold가 만든 .gitignore가 더 나으면 우리 .gitignore에 머지
cat /tmp/dicorp-scaffold/.gitignore >> .gitignore
sort -u .gitignore -o .gitignore
```

- [ ] **Step 4: 빌드 sanity 확인**

```bash
npm run build
```

기대 출력: `✓ Compiled successfully` + 정적 페이지 생성. 에러 시 의존성 문제 — `npm install` 후 재시도.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js 15 app with Tailwind and TypeScript"
```

---

### Task 0.2: TypeScript strict + ESLint 강화

**Files:**
- Modify: `tsconfig.json`
- Modify: `eslint.config.mjs`

- [ ] **Step 1: tsconfig strict 강화**

`tsconfig.json`의 `compilerOptions`에 다음 항목 보장 (이미 있으면 통과):

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true
  }
}
```

- [ ] **Step 2: 빌드 통과 확인**

```bash
npm run build
```

기대: 성공. 새 strict 옵션이 기존 코드를 깨면 그 자리에서 수정 (scaffold는 깨끗해서 깨질 가능성 낮음).

- [ ] **Step 3: Commit**

```bash
git add tsconfig.json eslint.config.mjs
git commit -m "chore: tighten typescript strictness"
```

---

### Task 0.3: 디폴트 scaffold 페이지 정리

scaffold가 만드는 `app/page.tsx`, `app/layout.tsx`, `app/globals.css`는 우리 디자인과 무관. 모두 비우고 다음 단계의 수단으로만 사용.

**Files:**
- Modify: `app/page.tsx` (삭제 예정 — `[locale]/page.tsx`로 이동)
- Modify: `app/layout.tsx` (root layout으로 유지)
- Modify: `app/globals.css`
- Delete: `public/next.svg`, `public/vercel.svg`, `public/file.svg`, `public/globe.svg`, `public/window.svg`

- [ ] **Step 1: scaffold 잡동사니 SVG 제거**

```bash
rm -f public/next.svg public/vercel.svg public/file.svg public/globe.svg public/window.svg
```

- [ ] **Step 2: `app/page.tsx` 삭제 (`[locale]/page.tsx`가 대체)**

```bash
rm -f app/page.tsx
```

- [ ] **Step 3: `app/globals.css`를 우리 톤으로 비움**

`app/globals.css`:

```css
@import "tailwindcss";

@theme {
  --color-bg: #ffffff;
  --color-fg: #111111;
  --color-fg-muted: #6b6b6b;
  --color-border: #e5e5e5;
  --color-accent: #b0d643;
  --color-accent-fg: #111111;
  --color-accent-2: #69a5a4;

  --font-sans: "Inter", "Pretendard Variable", -apple-system,
    BlinkMacSystemFont, system-ui, sans-serif;
}

html {
  background: var(--color-bg);
  color: var(--color-fg);
}

body {
  font-family: var(--font-sans);
  font-feature-settings: "ss01", "ss03";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

::selection {
  background: var(--color-accent);
  color: var(--color-accent-fg);
}
```

- [ ] **Step 4: `app/layout.tsx`를 root passthrough로 유지** (locale layout이 실제 일을 함)

`app/layout.tsx`:

```tsx
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
```

- [ ] **Step 5: 빌드 확인**

```bash
npm run build
```

기대: 빌드 성공 + `app/page.tsx` 없으니 `/` 라우트가 사라짐 (다음 phase에서 middleware가 redirect를 만든다).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: strip scaffold defaults, prep globals for design tokens"
```

---

## Phase 1 — i18n routing

### Task 1.1: next-intl 설치 + routing config

**Files:**
- Modify: `package.json`
- Create: `i18n/routing.ts`
- Create: `i18n/request.ts`
- Create: `middleware.ts`
- Create: `messages/en.json` (빈 객체)
- Create: `messages/ko.json` (빈 객체)
- Modify: `next.config.ts`

- [ ] **Step 1: next-intl 설치**

```bash
npm install next-intl
```

- [ ] **Step 2: `i18n/routing.ts` 작성**

```ts
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ko"],
  defaultLocale: "en",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
```

`localePrefix: "always"` → URL은 항상 `/en/...` 또는 `/ko/...`. `/`로 들어오면 미들웨어가 brower-language로 redirect.

- [ ] **Step 3: `i18n/request.ts` 작성**

```ts
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as never)) {
    locale = routing.defaultLocale;
  }
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

- [ ] **Step 4: `middleware.ts` 작성**

```ts
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
```

- [ ] **Step 5: `next.config.ts` 에 next-intl 플러그인 연결**

```ts
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {};

export default withNextIntl(nextConfig);
```

- [ ] **Step 6: 빈 messages 파일**

`messages/en.json`:

```json
{}
```

`messages/ko.json`:

```json
{}
```

- [ ] **Step 7: 빌드 확인 (페이지가 아직 없으니 미들웨어만 등록되는지)**

```bash
npm run build
```

기대: `/`에 routing 가능한 페이지가 없어 빌드는 통과되지만 콘텐츠 없음. 다음 task에서 layout/page를 추가한다.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat(i18n): set up next-intl routing with en/ko locales"
```

---

### Task 1.2: `[locale]` 세그먼트와 layout 셋업

**Files:**
- Create: `app/[locale]/layout.tsx`
- Create: `app/[locale]/page.tsx` (임시 placeholder, 다음 phase에서 채움)
- Create: `app/not-found.tsx`

- [ ] **Step 1: `app/[locale]/layout.tsx`**

```tsx
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider locale={locale as Locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: 임시 home 페이지**

`app/[locale]/page.tsx`:

```tsx
import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("home");
  return (
    <main>
      <h1>{t("placeholder")}</h1>
    </main>
  );
}
```

- [ ] **Step 3: messages에 placeholder 키 추가**

`messages/en.json`:

```json
{
  "home": {
    "placeholder": "Di Corporations — under construction"
  }
}
```

`messages/ko.json`:

```json
{
  "home": {
    "placeholder": "디아이코퍼레이션 — 빌드 중"
  }
}
```

> ⚠️ "under construction" 카피는 spec hard constraint를 어긴다. 이건 phase 1 검증용 일시 카피 — Phase 3에서 무조건 교체된다. 프로덕션 배포 전(Phase 5 이전)에 사라지는지 검증.

- [ ] **Step 4: not-found 페이지**

`app/not-found.tsx`:

```tsx
export default function NotFound() {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: "system-ui, sans-serif",
          padding: "64px",
          textAlign: "center",
        }}
      >
        <h1>404 — Page not found</h1>
        <p>
          <a href="/">Return home</a>
        </p>
      </body>
    </html>
  );
}
```

- [ ] **Step 5: dev server 띄워 라우팅 확인**

```bash
npm run dev
```

브라우저에서:
- `http://localhost:3000` → `/en`으로 redirect (Accept-Language en이면)
- `http://localhost:3000/en` → "Di Corporations — under construction"
- `http://localhost:3000/ko` → "디아이코퍼레이션 — 빌드 중"
- `http://localhost:3000/fr` → 404

- [ ] **Step 6: dev server 종료 + 빌드 확인**

```bash
npm run build
```

기대: 모든 라우트가 정적으로 prerender. `/en`, `/ko` 둘 다 보여야 함.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat(i18n): add [locale] layout with NextIntlClientProvider"
```

---

### Task 1.3: 빈 페이지 6개 생성 (about, work, contact, privacy, terms)

각각 minimal placeholder. Phase 3에서 콘텐츠 채움.

**Files:**
- Create: `app/[locale]/about/page.tsx`
- Create: `app/[locale]/work/page.tsx`
- Create: `app/[locale]/contact/page.tsx`
- Create: `app/[locale]/privacy/page.tsx`
- Create: `app/[locale]/terms/page.tsx`
- Modify: `messages/en.json`, `messages/ko.json` (각 페이지 placeholder 키)

- [ ] **Step 1: 5개 page.tsx 생성 (모두 동일 구조)**

`app/[locale]/about/page.tsx`:

```tsx
import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("about");
  return (
    <main>
      <h1>{t("title")}</h1>
    </main>
  );
}
```

같은 패턴으로 `work`, `contact`, `privacy`, `terms` 5개 만든다. `useTranslations` namespace만 페이지 이름에 맞춰 변경.

- [ ] **Step 2: messages에 각 페이지 placeholder title 키 추가**

`messages/en.json` (병합):

```json
{
  "home": { "placeholder": "Di Corporations — under construction" },
  "about": { "title": "About" },
  "work": { "title": "Work" },
  "contact": { "title": "Contact" },
  "privacy": { "title": "Privacy Policy" },
  "terms": { "title": "Terms of Service" }
}
```

`messages/ko.json`:

```json
{
  "home": { "placeholder": "디아이코퍼레이션 — 빌드 중" },
  "about": { "title": "소개" },
  "work": { "title": "프로젝트" },
  "contact": { "title": "연락" },
  "privacy": { "title": "개인정보처리방침" },
  "terms": { "title": "이용약관" }
}
```

- [ ] **Step 3: dev server에서 각 라우트 동작 확인**

```bash
npm run dev
```

확인 URL: `/en/about`, `/en/work`, `/en/contact`, `/en/privacy`, `/en/terms`, `/ko/about` ... 등 12개 (6 페이지 × 2 locale).

각 페이지가 자기 title을 보여주는지 시각 확인.

- [ ] **Step 4: 빌드 + commit**

```bash
npm run build
git add -A
git commit -m "feat(routes): add about/work/contact/privacy/terms placeholders"
```

---

## Phase 2 — Visual primitives & layout

### Task 2.1: 회사 fact 단일 소스 (`lib/company.ts`)

**Files:**
- Create: `lib/company.ts`

- [ ] **Step 1: `lib/company.ts` 작성**

```ts
export const COMPANY = {
  name: {
    en: "Di Corporations",
    ko: "주식회사 디아이코퍼레이션",
  },
  acronymMeaning: "Digital Innovation",
  registrationNumber: "268-87-03171",
  foundedAt: "2025-11-09",
  address: {
    en: "B-439, Songdo Centum Hive, 30-6 Songdo-dong, Yeonsu-gu, Incheon 22007, Republic of Korea",
    ko: "(22007) 인천광역시 연수구 송도동 30-6 송도센텀하이브 B동 439호",
  },
  email: "contact@dicorporations.com",
  domain: "dicorporations.com",
  url: "https://dicorporations.com",
} as const;

export type Company = typeof COMPANY;
```

- [ ] **Step 2: 빌드 확인 (사용처는 다음 task부터)**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add lib/company.ts
git commit -m "feat: add company facts single source of truth"
```

---

### Task 2.2: Pretendard + Inter 폰트 셋업

**Files:**
- Modify: `app/[locale]/layout.tsx`
- Modify: `app/globals.css`
- Modify: `package.json`

- [ ] **Step 1: Pretendard 패키지 설치**

```bash
npm install pretendard
```

- [ ] **Step 2: `app/globals.css` 상단에 Pretendard import + Tailwind theme 보강**

`app/globals.css` 맨 위에:

```css
@import "tailwindcss";
@import "pretendard/dist/web/variable/pretendardvariable.css";
```

(이미 있는 `@import "tailwindcss"`는 한 번만 둠.)

- [ ] **Step 3: `app/[locale]/layout.tsx`에 Inter (next/font/google) 추가**

`app/[locale]/layout.tsx` 상단에 import 추가, body에 적용:

```tsx
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
```

`<body>` 태그를:

```tsx
<body className={`${inter.variable}`}>
```

- [ ] **Step 4: globals.css에서 locale별 font stack 우선순위**

`@theme` 블록의 `--font-sans` 갱신 — `:root[lang="ko"]` 셀렉터로 KO일 때 Pretendard 우선:

```css
@theme {
  --font-sans: var(--font-inter), "Pretendard Variable", system-ui, sans-serif;
}

html[lang="ko"] body {
  font-family: "Pretendard Variable", var(--font-inter), system-ui, sans-serif;
}
```

- [ ] **Step 5: 시각 확인**

```bash
npm run dev
```

`/en/about`과 `/ko/about` 비교 — KO는 Pretendard, EN은 Inter로 보여야 함. DevTools → Computed → font-family 확인.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: load Inter and Pretendard fonts per locale"
```

---

### Task 2.3: Logo 컴포넌트 + 로고 PNG 배치

**Files:**
- Create: `components/logo.tsx`
- Create: `public/logo.png` (사용자 제공 파일 복사)
- Create: `public/icon.png` (favicon용 32×32)
- Create: `public/apple-icon.png` (180×180)

- [ ] **Step 1: 로고 PNG 복사**

```bash
cp /Users/paigeshin/Downloads/unnamed.jpg public/logo.png  # 로고 원본 PNG/JPG
# 가능하면 사용자에게 PNG 원본을 직접 받아 public/logo.png로 저장. JPG는 일단 대체.
```

> 이 단계에서 사용자에게 **고해상도 PNG (가능하면 1024×1024 이상, 정사각)** 원본을 받아 두는 게 좋음. favicon, OG image, Apple touch icon 모두 이 한 장에서 파생.

- [ ] **Step 2: favicon, apple-icon 변환**

`sips` (macOS 기본)로 리사이즈:

```bash
sips -Z 32 -s format png public/logo.png --out public/icon.png
sips -Z 180 -s format png public/logo.png --out public/apple-icon.png
```

Next.js 15는 `app/icon.png`, `app/apple-icon.png` 파일이 있으면 자동으로 favicon 메타로 매핑. 위 두 파일을 `app/`로 옮긴다:

```bash
mv public/icon.png app/icon.png
mv public/apple-icon.png app/apple-icon.png
```

- [ ] **Step 3: Logo 컴포넌트 작성**

`components/logo.tsx`:

```tsx
import Image from "next/image";
import { COMPANY } from "@/lib/company";

type Props = {
  size?: number;
  withWordmark?: boolean;
  locale?: "en" | "ko";
};

export function Logo({ size = 32, withWordmark = true, locale = "en" }: Props) {
  return (
    <span className="inline-flex items-center gap-3">
      <Image
        src="/logo.png"
        alt={`${COMPANY.name.en} logo`}
        width={size}
        height={size}
        priority
        className="rounded-md"
      />
      {withWordmark ? (
        <span className="text-base font-semibold tracking-tight">
          {locale === "ko" ? COMPANY.name.ko : COMPANY.name.en}
        </span>
      ) : null}
    </span>
  );
}
```

- [ ] **Step 4: dev server에서 logo가 layout 어딘가에 잘 뜨는지 (다음 task에서 header에 박음). 일단 home 페이지에 임시 import해서 확인**

`app/[locale]/page.tsx` 임시:

```tsx
import { Logo } from "@/components/logo";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <main className="p-8">
      <Logo locale={locale === "ko" ? "ko" : "en"} />
    </main>
  );
}
```

```bash
npm run dev
```

`/en` 접속 → 로고 + "Di Corporations" 워드마크. `/ko` → 로고 + "주식회사 디아이코퍼레이션".

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add Logo component with favicons"
```

---

### Task 2.4: Header 컴포넌트

**Files:**
- Create: `components/header.tsx`
- Create: `components/language-toggle.tsx`
- Modify: `app/[locale]/layout.tsx` (Header mount)
- Modify: `messages/en.json`, `messages/ko.json` (nav 키 추가)

- [ ] **Step 1: nav 메시지 추가**

`messages/en.json` 병합:

```json
{
  "nav": {
    "about": "About",
    "work": "Work",
    "contact": "Contact"
  }
}
```

`messages/ko.json` 병합:

```json
{
  "nav": {
    "about": "소개",
    "work": "프로젝트",
    "contact": "연락"
  }
}
```

- [ ] **Step 2: Language toggle**

`components/language-toggle.tsx`:

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { routing } from "@/i18n/routing";

export function LanguageToggle({ currentLocale }: { currentLocale: string }) {
  const pathname = usePathname();
  const stripped = pathname.replace(/^\/(en|ko)/, "") || "/";

  return (
    <span className="inline-flex items-center gap-2 text-xs uppercase tracking-wider">
      {routing.locales.map((l, i) => (
        <span key={l} className="inline-flex items-center gap-2">
          {i > 0 ? <span className="text-[var(--color-border)]">/</span> : null}
          {l === currentLocale ? (
            <span className="font-semibold">{l}</span>
          ) : (
            <Link href={`/${l}${stripped}`} className="text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]">
              {l}
            </Link>
          )}
        </span>
      ))}
    </span>
  );
}
```

- [ ] **Step 3: Header 컴포넌트**

`components/header.tsx`:

```tsx
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Logo } from "./logo";
import { LanguageToggle } from "./language-toggle";

export function Header({ locale }: { locale: "en" | "ko" }) {
  const t = useTranslations("nav");

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-[var(--color-border)] bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-full max-w-[1080px] items-center justify-between px-6 md:px-8">
        <Link href={`/${locale}`} aria-label="Home" className="inline-flex items-center">
          <Logo size={32} withWordmark locale={locale} />
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href={`/${locale}/about`} className="hover:text-[var(--color-accent-2)]">
            {t("about")}
          </Link>
          <Link href={`/${locale}/work`} className="hover:text-[var(--color-accent-2)]">
            {t("work")}
          </Link>
          <Link href={`/${locale}/contact`} className="hover:text-[var(--color-accent-2)]">
            {t("contact")}
          </Link>
          <span className="ml-2 border-l border-[var(--color-border)] pl-4">
            <LanguageToggle currentLocale={locale} />
          </span>
        </nav>
      </div>
    </header>
  );
}
```

- [ ] **Step 4: Layout에 Header mount**

`app/[locale]/layout.tsx`의 body 안에:

```tsx
import { Header } from "@/components/header";

// ... LocaleLayout 안의 NextIntlClientProvider 자식:
<NextIntlClientProvider locale={locale as Locale} messages={messages}>
  <Header locale={locale as Locale} />
  {children}
</NextIntlClientProvider>
```

- [ ] **Step 5: dev로 헤더 확인**

```bash
npm run dev
```

모든 페이지에 sticky header가 보이고, About/Work/Contact 링크 작동, KO/EN 토글이 양방향 가능한지 클릭 테스트.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add sticky header with nav and locale toggle"
```

---

### Task 2.5: Footer 컴포넌트 (회사 fact 노출)

**Files:**
- Create: `components/footer.tsx`
- Modify: `app/[locale]/layout.tsx`
- Modify: `messages/*.json` (footer 키)

- [ ] **Step 1: footer 메시지**

`messages/en.json`:

```json
{
  "footer": {
    "businessNumberLabel": "Business Reg. No.",
    "addressLabel": "Address",
    "emailLabel": "Email",
    "foundedLabel": "Founded",
    "copyright": "© {year} Di Corporations. All rights reserved.",
    "privacy": "Privacy",
    "terms": "Terms"
  }
}
```

`messages/ko.json`:

```json
{
  "footer": {
    "businessNumberLabel": "사업자등록번호",
    "addressLabel": "주소",
    "emailLabel": "이메일",
    "foundedLabel": "설립",
    "copyright": "© {year} 주식회사 디아이코퍼레이션. All rights reserved.",
    "privacy": "개인정보처리방침",
    "terms": "이용약관"
  }
}
```

- [ ] **Step 2: Footer 컴포넌트**

`components/footer.tsx`:

```tsx
import Link from "next/link";
import { useTranslations } from "next-intl";
import { COMPANY } from "@/lib/company";

export function Footer({ locale }: { locale: "en" | "ko" }) {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border)] mt-24">
      <div className="mx-auto max-w-[1080px] px-6 md:px-8 py-12 grid gap-8 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <p className="font-semibold">
            {locale === "ko" ? COMPANY.name.ko : COMPANY.name.en}
          </p>
          <dl className="mt-3 space-y-1 text-xs text-[var(--color-fg-muted)]">
            <div className="flex gap-2">
              <dt className="min-w-[6rem]">{t("businessNumberLabel")}</dt>
              <dd>{COMPANY.registrationNumber}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="min-w-[6rem]">{t("foundedLabel")}</dt>
              <dd>{COMPANY.foundedAt}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="min-w-[6rem]">{t("addressLabel")}</dt>
              <dd>{locale === "ko" ? COMPANY.address.ko : COMPANY.address.en}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="min-w-[6rem]">{t("emailLabel")}</dt>
              <dd>
                <a href={`mailto:${COMPANY.email}`} className="hover:text-[var(--color-fg)]">
                  {COMPANY.email}
                </a>
              </dd>
            </div>
          </dl>
        </div>
        <nav className="text-sm">
          <Link href={`/${locale}/privacy`} className="block py-1 text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]">
            {t("privacy")}
          </Link>
          <Link href={`/${locale}/terms`} className="block py-1 text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]">
            {t("terms")}
          </Link>
        </nav>
        <p className="text-xs text-[var(--color-fg-muted)] md:text-right">
          {t("copyright", { year })}
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Layout에 Footer mount**

`app/[locale]/layout.tsx` 의 NextIntlClientProvider 안에 Header 다음, children 뒤에 Footer:

```tsx
<NextIntlClientProvider locale={locale as Locale} messages={messages}>
  <Header locale={locale as Locale} />
  {children}
  <Footer locale={locale as Locale} />
</NextIntlClientProvider>
```

- [ ] **Step 4: 시각 확인**

```bash
npm run dev
```

모든 페이지 하단에 푸터. 사업자번호, 주소, 이메일이 정확히 보이는지. KO/EN 토글로 주소가 한국어/영어 양쪽 다 표기되는지.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add footer with company facts"
```

---

### Task 2.6: 공용 Section wrapper

**Files:**
- Create: `components/section.tsx`

- [ ] **Step 1: Section 컴포넌트**

```tsx
type Props = {
  children: React.ReactNode;
  className?: string;
  as?: "section" | "div";
};

export function Section({ children, className = "", as: Tag = "section" }: Props) {
  return (
    <Tag
      className={`mx-auto max-w-[1080px] px-6 py-16 md:px-8 md:py-24 ${className}`}
    >
      {children}
    </Tag>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/section.tsx
git commit -m "feat: add Section wrapper for vertical rhythm"
```

---

## Phase 3 — Content (KO/EN)

### Task 3.1: Home 페이지 — Hero / About summary / Work preview / Contact CTA

**Files:**
- Create: `components/home/hero.tsx`
- Create: `components/home/about-summary.tsx`
- Create: `components/home/work-preview.tsx`
- Create: `components/home/contact-cta.tsx`
- Modify: `app/[locale]/page.tsx`
- Modify: `messages/en.json`, `messages/ko.json`

- [ ] **Step 1: messages 추가**

`messages/en.json` (병합):

```json
{
  "home": {
    "hero": {
      "tagline": "Healthier days. Goals that stick.",
      "subline": "An independent digital studio.",
      "cta": "See our work"
    },
    "aboutSummary": {
      "body": "Di Corporations builds digital products that help people focus on their health and reach the goals that matter to them.",
      "cta": "Read more"
    },
    "workPreview": {
      "label": "Currently building",
      "title": "BurnBuild",
      "description": "A fitness companion app. In development for iOS, Android, and the web.",
      "status": "In development",
      "cta": "View work"
    },
    "contactCta": {
      "title": "Working on something?",
      "subline": "Reach out — we read every email.",
      "button": "Email us"
    }
  }
}
```

(이전 `home.placeholder` 키는 제거. spec hard constraint상 "under construction" 사라져야 함.)

`messages/ko.json` (병합):

```json
{
  "home": {
    "hero": {
      "tagline": "건강하게, 원하는 곳까지.",
      "subline": "1인이 만드는 디지털 스튜디오.",
      "cta": "프로젝트 보기"
    },
    "aboutSummary": {
      "body": "디아이코퍼레이션은 사람들이 건강한 일상에 집중하고, 원하는 목표를 이룰 수 있도록 돕는 디지털 프로덕트를 만듭니다.",
      "cta": "더 알아보기"
    },
    "workPreview": {
      "label": "현재 작업 중",
      "title": "BurnBuild",
      "description": "피트니스 동반 앱. iOS, Android, Web으로 개발 중입니다.",
      "status": "개발 중",
      "cta": "프로젝트 보기"
    },
    "contactCta": {
      "title": "함께할 일이 있나요?",
      "subline": "메일로 연락주세요. 모두 직접 읽습니다.",
      "button": "메일 보내기"
    }
  }
}
```

- [ ] **Step 2: Hero 컴포넌트**

`components/home/hero.tsx`:

```tsx
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Section } from "@/components/section";

export function Hero({ locale }: { locale: "en" | "ko" }) {
  const t = useTranslations("home.hero");
  return (
    <Section className="!py-24 md:!py-32">
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-fg-muted)]">
        Di Corporations
      </p>
      <h1 className="mt-6 max-w-[18ch] text-[clamp(2.25rem,5vw,3.5rem)] font-bold leading-[1.05] tracking-tight">
        {t("tagline")}
      </h1>
      <p className="mt-6 max-w-[40ch] text-base text-[var(--color-fg-muted)] md:text-lg">
        {t("subline")}
      </p>
      <Link
        href={`/${locale}/work`}
        className="mt-10 inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-5 py-2.5 text-sm font-semibold text-[var(--color-accent-fg)] transition hover:opacity-90"
      >
        {t("cta")} <span aria-hidden>→</span>
      </Link>
    </Section>
  );
}
```

- [ ] **Step 3: AboutSummary 컴포넌트**

`components/home/about-summary.tsx`:

```tsx
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Section } from "@/components/section";

export function AboutSummary({ locale }: { locale: "en" | "ko" }) {
  const t = useTranslations("home.aboutSummary");
  return (
    <Section className="border-t border-[var(--color-border)]">
      <p className="max-w-[60ch] text-2xl font-medium leading-snug tracking-tight md:text-3xl">
        {t("body")}
      </p>
      <Link
        href={`/${locale}/about`}
        className="mt-8 inline-block border-b border-[var(--color-fg)] pb-0.5 text-sm font-medium hover:text-[var(--color-accent-2)] hover:border-[var(--color-accent-2)]"
      >
        {t("cta")} →
      </Link>
    </Section>
  );
}
```

- [ ] **Step 4: WorkPreview 컴포넌트**

`components/home/work-preview.tsx`:

```tsx
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Section } from "@/components/section";

export function WorkPreview({ locale }: { locale: "en" | "ko" }) {
  const t = useTranslations("home.workPreview");
  return (
    <Section className="border-t border-[var(--color-border)]">
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-fg-muted)]">
        {t("label")}
      </p>
      <article className="mt-8 grid gap-6 md:grid-cols-[2fr_3fr] md:gap-12">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{t("title")}</h2>
          <span className="mt-3 inline-flex items-center gap-2 rounded-full border border-[var(--color-accent-2)] px-3 py-1 text-xs text-[var(--color-accent-2)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent-2)]" />
            {t("status")}
          </span>
        </div>
        <p className="text-lg leading-relaxed text-[var(--color-fg-muted)]">{t("description")}</p>
      </article>
      <Link
        href={`/${locale}/work`}
        className="mt-10 inline-block text-sm font-medium hover:text-[var(--color-accent-2)]"
      >
        {t("cta")} →
      </Link>
    </Section>
  );
}
```

- [ ] **Step 5: ContactCta 컴포넌트**

`components/home/contact-cta.tsx`:

```tsx
import { useTranslations } from "next-intl";
import { Section } from "@/components/section";
import { COMPANY } from "@/lib/company";

export function ContactCta() {
  const t = useTranslations("home.contactCta");
  return (
    <Section className="border-t border-[var(--color-border)] text-center md:text-left">
      <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{t("title")}</h2>
      <p className="mt-4 text-lg text-[var(--color-fg-muted)]">{t("subline")}</p>
      <a
        href={`mailto:${COMPANY.email}`}
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--color-fg)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--color-accent-2)]"
      >
        {t("button")} <span aria-hidden>→</span>
      </a>
    </Section>
  );
}
```

- [ ] **Step 6: Home page 본체**

`app/[locale]/page.tsx`:

```tsx
import { Hero } from "@/components/home/hero";
import { AboutSummary } from "@/components/home/about-summary";
import { WorkPreview } from "@/components/home/work-preview";
import { ContactCta } from "@/components/home/contact-cta";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale = locale === "ko" ? "ko" : "en";
  return (
    <main>
      <Hero locale={safeLocale} />
      <AboutSummary locale={safeLocale} />
      <WorkPreview locale={safeLocale} />
      <ContactCta />
    </main>
  );
}
```

- [ ] **Step 7: 시각 확인**

```bash
npm run dev
```

`/en`, `/ko` 둘 다에서 4개 섹션 + 푸터 정상 표시. 모바일/데스크톱 둘 다 (DevTools 반응형).

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat(home): hero, about summary, work preview, contact cta"
```

---

### Task 3.2: About 페이지

**Files:**
- Modify: `app/[locale]/about/page.tsx`
- Modify: `messages/en.json`, `messages/ko.json`

- [ ] **Step 1: messages 추가**

`messages/en.json` 병합:

```json
{
  "about": {
    "title": "About",
    "lede": "Di Corporations is an independent digital studio building thoughtful apps for everyday life.",
    "missionHeading": "What we believe",
    "missionBody": "We believe small, careful software can change the texture of someone's day. Our work focuses on health and the goals people set for themselves — the kind of goals that, kept day after day, change a life.",
    "factsHeading": "The studio",
    "facts": {
      "founded": "Founded",
      "team": "Team",
      "teamValue": "1 (founder-only)",
      "based": "Based in",
      "basedValue": "Songdo, Incheon, South Korea",
      "registration": "Business Reg.",
      "currentlyBuilding": "Currently building",
      "currentlyBuildingValue": "BurnBuild — a fitness companion app"
    }
  }
}
```

`messages/ko.json` 병합:

```json
{
  "about": {
    "title": "소개",
    "lede": "디아이코퍼레이션은 일상에 도움이 되는 앱을 신중히 만드는 1인 디지털 스튜디오입니다.",
    "missionHeading": "우리가 믿는 것",
    "missionBody": "작고 정성스러운 소프트웨어가 누군가의 하루를 바꿀 수 있다고 믿습니다. 건강한 일상과, 매일 지킬 때 인생을 바꾸는 목표 — 그 두 가지에 집중해 프로덕트를 만듭니다.",
    "factsHeading": "스튜디오",
    "facts": {
      "founded": "설립",
      "team": "구성",
      "teamValue": "1인 (창업자 1인 운영)",
      "based": "위치",
      "basedValue": "대한민국 인천 송도",
      "registration": "사업자등록번호",
      "currentlyBuilding": "현재 작업 중",
      "currentlyBuildingValue": "BurnBuild — 피트니스 동반 앱"
    }
  }
}
```

- [ ] **Step 2: About 페이지 본체**

`app/[locale]/about/page.tsx`:

```tsx
import { useTranslations } from "next-intl";
import { Section } from "@/components/section";
import { COMPANY } from "@/lib/company";

export default function AboutPage() {
  const t = useTranslations("about");
  return (
    <main>
      <Section>
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-fg-muted)]">
          {t("title")}
        </p>
        <h1 className="mt-6 max-w-[28ch] text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.1] tracking-tight">
          {t("lede")}
        </h1>
      </Section>

      <Section className="border-t border-[var(--color-border)]">
        <h2 className="text-xs uppercase tracking-[0.2em] text-[var(--color-fg-muted)]">
          {t("missionHeading")}
        </h2>
        <p className="mt-6 max-w-[60ch] text-xl leading-relaxed text-[var(--color-fg)] md:text-2xl">
          {t("missionBody")}
        </p>
      </Section>

      <Section className="border-t border-[var(--color-border)]">
        <h2 className="text-xs uppercase tracking-[0.2em] text-[var(--color-fg-muted)]">
          {t("factsHeading")}
        </h2>
        <dl className="mt-6 grid gap-x-12 gap-y-4 md:grid-cols-2">
          <Fact label={t("facts.founded")} value={COMPANY.foundedAt} />
          <Fact label={t("facts.team")} value={t("facts.teamValue")} />
          <Fact label={t("facts.based")} value={t("facts.basedValue")} />
          <Fact label={t("facts.registration")} value={COMPANY.registrationNumber} />
          <Fact
            label={t("facts.currentlyBuilding")}
            value={t("facts.currentlyBuildingValue")}
          />
        </dl>
      </Section>
    </main>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-t border-[var(--color-border)] pt-3">
      <dt className="text-xs uppercase tracking-wider text-[var(--color-fg-muted)]">
        {label}
      </dt>
      <dd className="text-base font-medium">{value}</dd>
    </div>
  );
}
```

- [ ] **Step 3: 시각 확인 + commit**

```bash
npm run dev
```

`/en/about`, `/ko/about` 둘 다 — lede / mission / facts 세 섹션 정상.

```bash
git add -A
git commit -m "feat(about): mission and studio facts"
```

---

### Task 3.3: Work 페이지 (BurnBuild card)

**Files:**
- Create: `components/work/project-card.tsx`
- Modify: `app/[locale]/work/page.tsx`
- Modify: `messages/*.json`

- [ ] **Step 1: messages 추가**

`messages/en.json` 병합:

```json
{
  "work": {
    "title": "Work",
    "lede": "What we are building, in the open.",
    "burnbuild": {
      "name": "BurnBuild",
      "tagline": "A fitness companion app.",
      "description": "BurnBuild is being built for people who want to make exercise a daily habit — not a once-in-a-while sprint. Cross-platform: iOS, Android, and the web. Currently in active development.",
      "status": "In development",
      "platforms": "iOS · Android · Web"
    },
    "futureSlot": {
      "label": "More projects in time.",
      "body": "We move slowly on purpose. New work shows up here when it is ready."
    }
  }
}
```

`messages/ko.json` 병합:

```json
{
  "work": {
    "title": "프로젝트",
    "lede": "지금 만들고 있는 것들.",
    "burnbuild": {
      "name": "BurnBuild",
      "tagline": "피트니스 동반 앱.",
      "description": "BurnBuild는 운동을 가끔이 아닌 일상으로 만들고 싶은 사람을 위한 앱입니다. iOS, Android, Web 멀티 플랫폼으로 활발히 개발 중입니다.",
      "status": "개발 중",
      "platforms": "iOS · Android · Web"
    },
    "futureSlot": {
      "label": "더 많은 프로젝트는 시간이 지나며.",
      "body": "우리는 일부러 천천히 갑니다. 새 작업은 준비됐을 때 여기에 올라옵니다."
    }
  }
}
```

- [ ] **Step 2: ProjectCard 컴포넌트**

`components/work/project-card.tsx`:

```tsx
type Props = {
  name: string;
  tagline: string;
  description: string;
  status: string;
  platforms: string;
};

export function ProjectCard({ name, tagline, description, status, platforms }: Props) {
  return (
    <article className="grid gap-6 rounded-2xl border border-[var(--color-border)] bg-white p-8 md:grid-cols-[2fr_3fr] md:gap-12 md:p-12">
      <header>
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{name}</h2>
        <p className="mt-3 text-base text-[var(--color-fg-muted)]">{tagline}</p>
        <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-accent-2)] px-3 py-1 text-xs text-[var(--color-accent-2)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent-2)]" />
          {status}
        </span>
        <p className="mt-3 text-xs uppercase tracking-wider text-[var(--color-fg-muted)]">
          {platforms}
        </p>
      </header>
      <p className="text-lg leading-relaxed">{description}</p>
    </article>
  );
}
```

- [ ] **Step 3: Work 페이지**

`app/[locale]/work/page.tsx`:

```tsx
import { useTranslations } from "next-intl";
import { Section } from "@/components/section";
import { ProjectCard } from "@/components/work/project-card";

export default function WorkPage() {
  const t = useTranslations("work");
  return (
    <main>
      <Section>
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-fg-muted)]">
          {t("title")}
        </p>
        <h1 className="mt-6 max-w-[28ch] text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.1] tracking-tight">
          {t("lede")}
        </h1>
      </Section>

      <Section className="border-t border-[var(--color-border)]">
        <ProjectCard
          name={t("burnbuild.name")}
          tagline={t("burnbuild.tagline")}
          description={t("burnbuild.description")}
          status={t("burnbuild.status")}
          platforms={t("burnbuild.platforms")}
        />
      </Section>

      <Section className="border-t border-[var(--color-border)]">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-fg-muted)]">
          {t("futureSlot.label")}
        </p>
        <p className="mt-6 max-w-[60ch] text-lg text-[var(--color-fg-muted)]">
          {t("futureSlot.body")}
        </p>
      </Section>
    </main>
  );
}
```

- [ ] **Step 4: 시각 확인 + commit**

```bash
npm run dev
git add -A
git commit -m "feat(work): BurnBuild card and future slot"
```

---

### Task 3.4: Contact 페이지

**Files:**
- Modify: `app/[locale]/contact/page.tsx`
- Modify: `messages/*.json`

- [ ] **Step 1: messages 추가**

`messages/en.json` 병합:

```json
{
  "contact": {
    "title": "Contact",
    "lede": "We read every email.",
    "body": "For project inquiries, partnerships, or anything else — please get in touch.",
    "emailButton": "Email contact@dicorporations.com",
    "studioHeading": "Studio",
    "registrationLabel": "Business Reg.",
    "addressLabel": "Address"
  }
}
```

`messages/ko.json` 병합:

```json
{
  "contact": {
    "title": "연락",
    "lede": "메일은 직접 읽습니다.",
    "body": "프로젝트 문의, 파트너십, 그 외 어떤 이야기든 좋습니다. 메일로 연락주세요.",
    "emailButton": "contact@dicorporations.com 으로 메일",
    "studioHeading": "스튜디오",
    "registrationLabel": "사업자등록번호",
    "addressLabel": "주소"
  }
}
```

- [ ] **Step 2: Contact 페이지**

`app/[locale]/contact/page.tsx`:

```tsx
import { useTranslations } from "next-intl";
import { Section } from "@/components/section";
import { COMPANY } from "@/lib/company";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = useTranslations("contact");
  return (
    <main>
      <Section>
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-fg-muted)]">
          {t("title")}
        </p>
        <h1 className="mt-6 max-w-[28ch] text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.1] tracking-tight">
          {t("lede")}
        </h1>
        <p className="mt-6 max-w-[50ch] text-lg text-[var(--color-fg-muted)]">{t("body")}</p>
        <a
          href={`mailto:${COMPANY.email}`}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--color-fg)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-accent-2)]"
        >
          {t("emailButton")} <span aria-hidden>→</span>
        </a>
      </Section>

      <Section className="border-t border-[var(--color-border)]">
        <h2 className="text-xs uppercase tracking-[0.2em] text-[var(--color-fg-muted)]">
          {t("studioHeading")}
        </h2>
        <dl className="mt-6 grid gap-x-12 gap-y-4 md:grid-cols-2">
          <div className="flex flex-col gap-1 border-t border-[var(--color-border)] pt-3">
            <dt className="text-xs uppercase tracking-wider text-[var(--color-fg-muted)]">
              {t("registrationLabel")}
            </dt>
            <dd className="text-base font-medium">{COMPANY.registrationNumber}</dd>
          </div>
          <div className="flex flex-col gap-1 border-t border-[var(--color-border)] pt-3">
            <dt className="text-xs uppercase tracking-wider text-[var(--color-fg-muted)]">
              {t("addressLabel")}
            </dt>
            <dd className="text-base font-medium">
              {locale === "ko" ? COMPANY.address.ko : COMPANY.address.en}
            </dd>
          </div>
        </dl>
      </Section>
    </main>
  );
}
```

- [ ] **Step 3: 시각 확인 + commit**

```bash
npm run dev
git add -A
git commit -m "feat(contact): email CTA and studio facts"
```

---

### Task 3.5: Privacy Policy

> **법적 텍스트 — 자동 번역 금지.** 한국 표준 개인정보처리방침 + 미니멀 GDPR 카피 직접 작성. 폼 백엔드가 없어 수집 정보 자체가 거의 없으므로 짧게 가능.

**Files:**
- Modify: `app/[locale]/privacy/page.tsx`
- Modify: `messages/*.json`

- [ ] **Step 1: messages 추가** (긴 본문 — 단순한 1인 정적 사이트 기준)

`messages/en.json` 병합:

```json
{
  "privacy": {
    "title": "Privacy Policy",
    "lastUpdated": "Last updated: 2026-05-07",
    "intro": "Di Corporations (\"the Studio\", \"we\", \"us\") respects your privacy. This page describes what data this website collects and how it is handled.",
    "sections": [
      {
        "heading": "1. Data we do not collect",
        "body": "This website does not require an account, does not host a contact form, and does not run third-party advertising or marketing trackers. We do not sell or share user data."
      },
      {
        "heading": "2. Data we may collect",
        "body": "(a) Anonymized analytics through Vercel Analytics — page paths, country, device type, no personal identifiers. (b) Email correspondence you send to contact@dicorporations.com — used only to reply to you."
      },
      {
        "heading": "3. Cookies",
        "body": "This website does not set tracking cookies. The hosting provider may use technically necessary cookies for security."
      },
      {
        "heading": "4. Your rights",
        "body": "Under applicable laws (including the Personal Information Protection Act of South Korea and GDPR where applicable), you may request access, correction, or deletion of any personal data we hold about you. Contact contact@dicorporations.com to exercise these rights."
      },
      {
        "heading": "5. Data controller",
        "body": "Di Corporations · Business Reg. No. 268-87-03171 · B-439, Songdo Centum Hive, 30-6 Songdo-dong, Yeonsu-gu, Incheon 22007, Republic of Korea · contact@dicorporations.com"
      }
    ]
  }
}
```

`messages/ko.json` 병합:

```json
{
  "privacy": {
    "title": "개인정보처리방침",
    "lastUpdated": "최종 업데이트: 2026-05-07",
    "intro": "주식회사 디아이코퍼레이션(이하 \"회사\")은 이용자의 개인정보를 중요하게 생각합니다. 본 페이지는 본 웹사이트가 수집하는 정보와 처리 방식을 안내합니다.",
    "sections": [
      {
        "heading": "1. 수집하지 않는 정보",
        "body": "본 웹사이트는 계정 가입을 요구하지 않으며, 문의 폼을 운영하지 않습니다. 제3자 광고·마케팅 트래커도 사용하지 않습니다. 회사는 이용자 정보를 판매하거나 외부와 공유하지 않습니다."
      },
      {
        "heading": "2. 수집할 수 있는 정보",
        "body": "(가) Vercel Analytics를 통한 익명 통계 — 방문 경로, 접속 국가, 기기 유형 등이며, 개인을 식별할 수 있는 정보는 포함되지 않습니다. (나) contact@dicorporations.com 으로 보내주신 이메일 — 회신 목적으로만 사용됩니다."
      },
      {
        "heading": "3. 쿠키",
        "body": "본 웹사이트는 트래킹 쿠키를 사용하지 않습니다. 호스팅 제공자가 보안 목적의 기술적 필수 쿠키를 사용할 수 있습니다."
      },
      {
        "heading": "4. 이용자의 권리",
        "body": "「개인정보 보호법」 및 관련 법령에 따라 이용자는 회사가 보유한 개인정보의 열람·정정·삭제를 요청할 수 있습니다. 권리 행사는 contact@dicorporations.com 으로 연락주시기 바랍니다."
      },
      {
        "heading": "5. 개인정보처리자",
        "body": "주식회사 디아이코퍼레이션 · 사업자등록번호 268-87-03171 · (22007) 인천광역시 연수구 송도동 30-6 송도센텀하이브 B동 439호 · contact@dicorporations.com"
      }
    ]
  }
}
```

- [ ] **Step 2: Privacy 페이지**

`app/[locale]/privacy/page.tsx`:

```tsx
import { useTranslations, useMessages } from "next-intl";
import { Section } from "@/components/section";

type Sec = { heading: string; body: string };

export default function PrivacyPage() {
  const t = useTranslations("privacy");
  const messages = useMessages() as { privacy: { sections: Sec[] } };
  const sections = messages.privacy.sections;

  return (
    <main>
      <Section>
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-fg-muted)]">
          {t("title")}
        </p>
        <h1 className="mt-6 text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.1] tracking-tight">
          {t("title")}
        </h1>
        <p className="mt-3 text-xs text-[var(--color-fg-muted)]">{t("lastUpdated")}</p>
        <p className="mt-8 max-w-[65ch] text-lg leading-relaxed">{t("intro")}</p>

        <div className="mt-12 space-y-10">
          {sections.map((s) => (
            <section key={s.heading} className="max-w-[65ch]">
              <h2 className="text-xl font-semibold tracking-tight">{s.heading}</h2>
              <p className="mt-3 text-base leading-relaxed text-[var(--color-fg-muted)]">
                {s.body}
              </p>
            </section>
          ))}
        </div>
      </Section>
    </main>
  );
}
```

- [ ] **Step 3: 시각 확인 + commit**

```bash
npm run dev
git add -A
git commit -m "feat(privacy): policy text in en/ko"
```

---

### Task 3.6: Terms of Service

**Files:**
- Modify: `app/[locale]/terms/page.tsx`
- Modify: `messages/*.json`

- [ ] **Step 1: messages 추가**

`messages/en.json` 병합:

```json
{
  "terms": {
    "title": "Terms of Service",
    "lastUpdated": "Last updated: 2026-05-07",
    "intro": "These Terms govern your use of dicorporations.com. By visiting this website, you agree to the terms below.",
    "sections": [
      {
        "heading": "1. The website",
        "body": "dicorporations.com is the corporate website of Di Corporations. It is provided for informational purposes only and does not constitute an offer of any product or service unless explicitly stated."
      },
      {
        "heading": "2. Intellectual property",
        "body": "All text, graphics, logos, and code on this website are owned by Di Corporations unless otherwise noted. You may not copy, redistribute, or create derivative works without prior written permission."
      },
      {
        "heading": "3. Third-party links",
        "body": "This website may link to external sites. We are not responsible for the content or practices of those sites."
      },
      {
        "heading": "4. Disclaimer",
        "body": "The website is provided \"as is\" without warranties of any kind. To the maximum extent permitted by law, Di Corporations is not liable for any damages arising from your use of the website."
      },
      {
        "heading": "5. Governing law",
        "body": "These Terms are governed by the laws of the Republic of Korea, without regard to conflict-of-law principles."
      },
      {
        "heading": "6. Contact",
        "body": "Questions about these Terms: contact@dicorporations.com."
      }
    ]
  }
}
```

`messages/ko.json` 병합:

```json
{
  "terms": {
    "title": "이용약관",
    "lastUpdated": "최종 업데이트: 2026-05-07",
    "intro": "본 약관은 dicorporations.com 웹사이트의 이용 조건을 규정합니다. 본 웹사이트를 방문함으로써 아래 약관에 동의하는 것으로 봅니다.",
    "sections": [
      {
        "heading": "1. 웹사이트의 성격",
        "body": "dicorporations.com 은 주식회사 디아이코퍼레이션의 회사 소개 웹사이트로, 정보 제공만을 목적으로 합니다. 본 웹사이트의 콘텐츠는 명시되지 않은 한 어떠한 상품·서비스의 청약으로 간주되지 않습니다."
      },
      {
        "heading": "2. 지식재산권",
        "body": "본 웹사이트의 텍스트, 그래픽, 로고, 코드 등 모든 콘텐츠의 권리는 별도 표기가 없는 한 주식회사 디아이코퍼레이션에 있습니다. 사전 서면 동의 없이 복제·배포·2차 저작물 제작을 금합니다."
      },
      {
        "heading": "3. 외부 링크",
        "body": "본 웹사이트는 외부 사이트로 연결되는 링크를 포함할 수 있습니다. 외부 사이트의 콘텐츠 및 정책에 대해 회사는 책임지지 않습니다."
      },
      {
        "heading": "4. 면책",
        "body": "본 웹사이트는 \"있는 그대로\" 제공되며, 회사는 명시적·묵시적 보증을 하지 않습니다. 관련 법이 허용하는 최대 범위에서, 회사는 본 웹사이트 이용으로 발생하는 손해에 대해 책임지지 않습니다."
      },
      {
        "heading": "5. 준거법",
        "body": "본 약관은 대한민국 법에 따라 해석되며, 국제사법 원칙은 적용되지 않습니다."
      },
      {
        "heading": "6. 문의",
        "body": "본 약관에 대한 문의: contact@dicorporations.com."
      }
    ]
  }
}
```

- [ ] **Step 2: Terms 페이지** — Privacy와 구조 동일, namespace만 `terms`로 교체

`app/[locale]/terms/page.tsx`:

```tsx
import { useTranslations, useMessages } from "next-intl";
import { Section } from "@/components/section";

type Sec = { heading: string; body: string };

export default function TermsPage() {
  const t = useTranslations("terms");
  const messages = useMessages() as { terms: { sections: Sec[] } };
  const sections = messages.terms.sections;

  return (
    <main>
      <Section>
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-fg-muted)]">
          {t("title")}
        </p>
        <h1 className="mt-6 text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.1] tracking-tight">
          {t("title")}
        </h1>
        <p className="mt-3 text-xs text-[var(--color-fg-muted)]">{t("lastUpdated")}</p>
        <p className="mt-8 max-w-[65ch] text-lg leading-relaxed">{t("intro")}</p>

        <div className="mt-12 space-y-10">
          {sections.map((s) => (
            <section key={s.heading} className="max-w-[65ch]">
              <h2 className="text-xl font-semibold tracking-tight">{s.heading}</h2>
              <p className="mt-3 text-base leading-relaxed text-[var(--color-fg-muted)]">
                {s.body}
              </p>
            </section>
          ))}
        </div>
      </Section>
    </main>
  );
}
```

- [ ] **Step 3: 시각 확인 + commit**

```bash
npm run dev
git add -A
git commit -m "feat(terms): terms of service text in en/ko"
```

---

### Task 3.7: 임시 placeholder 카피 청소 (hard constraint 검증)

- [ ] **Step 1: 모든 파일에서 placeholder 잔여물 검색**

```bash
grep -rni "under construction\|coming soon\|placeholder\|lorem\|TBD" app messages components lib 2>/dev/null || true
```

기대: hits 없음 (또는 `messages/en.json` `home.placeholder` 같은 이전 키가 살아있다면 제거).

- [ ] **Step 2: messages에 남은 사용 안 하는 placeholder 키 제거**

`home.placeholder` 키가 양쪽 messages에 있다면 삭제. `JSON` 직접 편집.

- [ ] **Step 3: 빌드 + commit**

```bash
npm run build
git add -A
git commit -m "chore: remove placeholder copy strings"
```

---

## Phase 4 — Metadata, SEO, Polish

### Task 4.1: 페이지별 metadata API

**Files:**
- Modify: 6개 page (`app/[locale]/page.tsx`, `about/page.tsx`, `work/page.tsx`, `contact/page.tsx`, `privacy/page.tsx`, `terms/page.tsx`)
- Modify: `messages/*.json` (meta 키)

- [ ] **Step 1: messages에 meta titles/descriptions 추가** (각 페이지마다)

`messages/en.json` 병합:

```json
{
  "meta": {
    "siteName": "Di Corporations",
    "home": {
      "title": "Di Corporations — Independent Digital Studio",
      "description": "Di Corporations is an independent digital studio building thoughtful apps for everyday life."
    },
    "about": {
      "title": "About — Di Corporations",
      "description": "An independent digital studio based in Songdo, Incheon, building small, careful software focused on health and goals."
    },
    "work": {
      "title": "Work — Di Corporations",
      "description": "Currently building BurnBuild — a fitness companion app for iOS, Android, and web."
    },
    "contact": {
      "title": "Contact — Di Corporations",
      "description": "Get in touch by email at contact@dicorporations.com."
    },
    "privacy": {
      "title": "Privacy Policy — Di Corporations",
      "description": "How dicorporations.com handles data and respects your privacy."
    },
    "terms": {
      "title": "Terms of Service — Di Corporations",
      "description": "Terms governing use of dicorporations.com."
    }
  }
}
```

`messages/ko.json` 병합 (동일 구조, 한국어):

```json
{
  "meta": {
    "siteName": "디아이코퍼레이션",
    "home": {
      "title": "디아이코퍼레이션 — 1인 디지털 스튜디오",
      "description": "디아이코퍼레이션은 일상에 도움이 되는 앱을 신중히 만드는 1인 디지털 스튜디오입니다."
    },
    "about": {
      "title": "소개 — 디아이코퍼레이션",
      "description": "인천 송도에 위치한 1인 디지털 스튜디오. 건강과 목표에 집중한 작고 정성스러운 소프트웨어를 만듭니다."
    },
    "work": {
      "title": "프로젝트 — 디아이코퍼레이션",
      "description": "현재 작업 중: BurnBuild — iOS, Android, Web 멀티 플랫폼 피트니스 동반 앱."
    },
    "contact": {
      "title": "연락 — 디아이코퍼레이션",
      "description": "contact@dicorporations.com 으로 메일 보내주세요."
    },
    "privacy": {
      "title": "개인정보처리방침 — 디아이코퍼레이션",
      "description": "dicorporations.com 의 개인정보 처리 방침."
    },
    "terms": {
      "title": "이용약관 — 디아이코퍼레이션",
      "description": "dicorporations.com 이용약관."
    }
  }
}
```

- [ ] **Step 2: 각 페이지에 `generateMetadata` 추가**

각 페이지 상단에 다음 패턴 추가 (page key는 페이지에 맞게 변경):

```tsx
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { COMPANY } from "@/lib/company";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("home.title"),
    description: t("home.description"),
    metadataBase: new URL(COMPANY.url),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        ko: "/ko",
      },
    },
    openGraph: {
      title: t("home.title"),
      description: t("home.description"),
      url: `${COMPANY.url}/${locale}`,
      siteName: t("siteName"),
      locale: locale === "ko" ? "ko_KR" : "en_US",
      type: "website",
    },
  };
}
```

(home 페이지 예시. 다른 페이지는 path와 namespace key만 교체.)

- [ ] **Step 3: 빌드 후 메타 확인**

```bash
npm run build
npm run start
```

브라우저에서 `view-source:http://localhost:3000/en` → `<title>` 와 `<meta name="description">`, `og:` 태그가 정확히 보이는지.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(seo): per-page metadata and OpenGraph"
```

---

### Task 4.2: Sitemap & robots

**Files:**
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`

- [ ] **Step 1: `app/sitemap.ts`**

```ts
import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { COMPANY } from "@/lib/company";

const PAGES = ["", "/about", "/work", "/contact", "/privacy", "/terms"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routing.locales.flatMap((locale) =>
    PAGES.map((path) => ({
      url: `${COMPANY.url}/${locale}${path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
  );
}
```

- [ ] **Step 2: `app/robots.ts`**

```ts
import type { MetadataRoute } from "next";
import { COMPANY } from "@/lib/company";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${COMPANY.url}/sitemap.xml`,
  };
}
```

- [ ] **Step 3: 빌드 + 확인**

```bash
npm run build
npm run start
```

`http://localhost:3000/sitemap.xml`, `http://localhost:3000/robots.txt` 둘 다 200 OK + 컨텐츠 정상.

- [ ] **Step 4: Commit**

```bash
git add app/sitemap.ts app/robots.ts
git commit -m "feat(seo): sitemap and robots"
```

---

### Task 4.3: OG image (정적)

**Files:**
- Create: `app/opengraph-image.tsx`

- [ ] **Step 1: Next.js Image Response로 OG image 생성**

`app/opengraph-image.tsx`:

```tsx
import { ImageResponse } from "next/og";
import { COMPANY } from "@/lib/company";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${COMPANY.name.en} — Independent digital studio`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#ffffff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 18,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#6b6b6b",
          }}
        >
          {COMPANY.name.en}
        </div>
        <div
          style={{
            fontSize: 84,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: -2,
            color: "#111111",
            maxWidth: 920,
          }}
        >
          Healthier days. Goals that stick.
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span
            style={{
              width: 16,
              height: 16,
              background: "#b0d643",
              borderRadius: 999,
            }}
          />
          <span style={{ fontSize: 22, color: "#111111" }}>
            An independent digital studio
          </span>
        </div>
      </div>
    ),
    size,
  );
}
```

- [ ] **Step 2: 빌드 + OG 확인**

```bash
npm run build
npm run start
```

`http://localhost:3000/opengraph-image` 접근 → 1200×630 PNG 응답. 메타 검증은 `https://www.opengraph.xyz/url/...` 등에서 배포 후 확인.

- [ ] **Step 3: Commit**

```bash
git add app/opengraph-image.tsx
git commit -m "feat(seo): dynamic OpenGraph image"
```

---

### Task 4.4: Vercel Analytics

**Files:**
- Modify: `package.json`, `app/[locale]/layout.tsx`

- [ ] **Step 1: 설치**

```bash
npm install @vercel/analytics
```

- [ ] **Step 2: `app/[locale]/layout.tsx`에 Analytics mount**

```tsx
import { Analytics } from "@vercel/analytics/next";

// LocaleLayout body 안에 마지막 자식으로
<Analytics />
```

- [ ] **Step 3: 빌드 + commit**

```bash
npm run build
git add -A
git commit -m "feat: enable Vercel Analytics"
```

---

### Task 4.5: Lighthouse pass

- [ ] **Step 1: prod 빌드 + 로컬 서비스**

```bash
npm run build
npm run start
```

- [ ] **Step 2: Chrome DevTools Lighthouse 실행** — `/en` 과 `/ko` 둘 다.

기대 점수:
- Performance ≥ 90
- Accessibility ≥ 95
- Best Practices ≥ 90
- SEO = 100

- [ ] **Step 3: 점수 미달 시 픽스 (흔한 케이스)**

- 이미지 alt: 모든 `<Image>`에 alt prop.
- contrast: lime 액센트는 `#111` 텍스트와 충분히 contrast — 흰 텍스트로 lime 위에 쓰지 말 것 (이 plan에선 lime은 배경, fg는 #111로 박혀있음).
- meta description: 모든 페이지 metadata 등록 확인.
- favicon: `app/icon.png`, `app/apple-icon.png` 존재 확인.

- [ ] **Step 4: Commit (있다면)**

수정사항 발생 시 commit:

```bash
git add -A
git commit -m "perf/a11y: lighthouse fixes"
```

---

## Phase 5 — Deploy to dicorporations.com

### Task 5.1: GitHub repo + push

- [ ] **Step 1: GitHub repo 생성 (private 권장)**

GitHub UI 또는 `gh`:

```bash
gh repo create dicorp-web --private --source . --remote origin --push
```

`gh`가 없다면 GitHub UI에서 빈 repo 만들고:

```bash
git remote add origin git@github.com:<owner>/dicorp-web.git
git push -u origin main
```

- [ ] **Step 2: README 추가**

`README.md`:

```md
# dicorp-web

Di Corporations 회사 소개 사이트. Next.js 15 + Tailwind v4 + next-intl.

## Develop
\`\`\`
npm install
npm run dev
\`\`\`

## Build
\`\`\`
npm run build
npm run start
\`\`\`

자세한 spec: `docs/superpowers/specs/2026-05-07-dicorp-web-design.md`
```

- [ ] **Step 3: Commit + push**

```bash
git add README.md
git commit -m "docs: add README"
git push
```

---

### Task 5.2: Vercel 프로젝트 연결

- [ ] **Step 1: vercel.com에서 "Add New Project" → GitHub repo 선택**
- [ ] **Step 2: Framework `Next.js` 자동 감지 확인. 다른 모든 옵션 default.**
- [ ] **Step 3: Deploy 클릭**
- [ ] **Step 4: Build 통과 확인** — 빌드 로그 + `*.vercel.app` URL에서 사이트 동작 확인.
- [ ] **Step 5: 도메인 추가** — Vercel project Settings → Domains → `dicorporations.com`, `www.dicorporations.com` 추가.

---

### Task 5.3: Squarespace DNS 설정

Vercel UI에 안내된 DNS record를 Squarespace Domains 관리 패널에 등록.

- [ ] **Step 1: Squarespace Domains 로그인 → `dicorporations.com` → DNS settings**

- [ ] **Step 2: 기본 Squarespace 사이트 redirect 해제** (자동 forwarding이 활성화되어 있다면 끔).

- [ ] **Step 3: Vercel 안내 record 추가**

일반적으로:

| Type  | Host  | Value                    |
| ----- | ----- | ------------------------ |
| A     | @     | 76.76.21.21              |
| CNAME | www   | cname.vercel-dns.com     |

(Vercel UI가 정확한 값을 보여줌 — 그대로 따름.)

- [ ] **Step 4: DNS propagation 대기 (최대 24h, 보통 5~15분)**. Vercel이 SSL 자동 발급 후 도메인이 ✓ 상태가 되는지 확인.

- [ ] **Step 5: HTTPS 동작 확인** — `https://dicorporations.com`, `https://www.dicorporations.com`, `http://...`(HTTPS로 redirect) 셋 다 정상.

---

### Task 5.4: Production smoke test

- [ ] **Step 1: 12개 라우트 점검**

`https://dicorporations.com/` (root → `/en`로 redirect 또는 `/ko`)
`https://dicorporations.com/en` (Home)
`https://dicorporations.com/en/about`
`https://dicorporations.com/en/work`
`https://dicorporations.com/en/contact`
`https://dicorporations.com/en/privacy`
`https://dicorporations.com/en/terms`
`https://dicorporations.com/ko` 외 5개 동일.

각 페이지 200 OK + 콘텐츠 표시.

- [ ] **Step 2: Apple 심사관 시뮬레이션**

체크리스트:
- 푸터에 회사명, 사업자번호, 주소, 이메일 보이는가?
- 모든 페이지에 진짜 콘텐츠 있는가? "Coming soon" 0건?
- mailto 링크가 mail 앱을 띄우는가?
- HTTPS인가?
- favicon이 보이는가?
- og:image가 social preview tool에서 보이는가? (`https://www.opengraph.xyz/url/dicorporations.com`)

- [ ] **Step 3: Lighthouse 한 번 더 (production)**

prod URL 기준 Lighthouse 점수가 spec DoD 기준선 통과하는지.

---

## Phase 6 — Email infra (병행, 사이트 빌드와 별개 트랙)

### Task 6.1: contact@dicorporations.com 셋업

추천: Cloudflare Email Routing(무료 forwarding) 또는 Google Workspace($6/월).

**Cloudflare Email Routing 옵션 (무료):**
- [ ] **Step 1: Cloudflare 계정 가입 → 도메인 추가** — Squarespace에서 산 `dicorporations.com`을 Cloudflare에 등록 (Site 추가).
- [ ] **Step 2: Squarespace Domains의 nameserver를 Cloudflare nameserver로 변경.** (이렇게 하면 DNS 관리가 Cloudflare로 옮겨감 — Vercel record는 Cloudflare에서 다시 추가해야 함.)
- [ ] **Step 3: Cloudflare Email Routing 활성화 → MX/TXT record 자동 추가.**
- [ ] **Step 4: `contact@dicorporations.com` → 본인 개인 이메일로 forwarding.**
- [ ] **Step 5: 테스트 메일 송수신.**

**Google Workspace 옵션 (보내기까지):**
- [ ] **Step 1: Google Workspace 가입 ($6/월).**
- [ ] **Step 2: Squarespace DNS에 Google MX record 추가.**
- [ ] **Step 3: contact@dicorporations.com 메일박스 생성.**
- [ ] **Step 4: 테스트 송수신.**

**둘 중 하나 끝낸 뒤 사이트 푸터 mailto에서 메일이 실제 도달하는지 검증.**

---

## Phase 7 — Apple Developer 법인 심사 제출 (out of build, in scope of DoD)

- [ ] **Step 1: Apple Developer Program 법인 가입 신청 시 회사 웹사이트 필드에 `https://dicorporations.com` 입력.**
- [ ] **Step 2: 심사 통과.** 거부 시 Apple 피드백 확인 후 사이트 보강 (보강 사항은 별도 plan으로 다룸).

---

## Self-review

스펙 모든 섹션이 plan에 있는지 점검:

| Spec 섹션 | 매핑되는 task |
| --- | --- |
| 1 — Why | Phase 1~5 전체 (Apple 심사 통과가 모든 결정의 기준) |
| 2 — Hard constraints (custom 도메인, 풋터 fact, no coming soon, 6 페이지, 회사 이메일) | 5.3 (도메인), 2.5 (footer fact), 3.7 (placeholder 청소), 1.3 (페이지 6개), 6.1 (이메일) |
| 3 — Company facts | 2.1 (`lib/company.ts`) |
| 4 — Mission copy | 3.1 (Home), 3.2 (About) |
| 5.1 — Home | 3.1 |
| 5.2 — About | 3.2 |
| 5.3 — Work | 3.3 |
| 5.4 — Contact | 3.4 |
| 5.5 — Privacy & Terms | 3.5, 3.6 |
| 6 — Visual design (tokens, type, logo, layout) | 0.3 (tokens), 2.2 (font), 2.3 (logo), 2.4/2.5/2.6 (layout) |
| 7 — Tech stack | Phase 0/1 전체 |
| 7.1 — 디렉토리 | File Structure 섹션 |
| 7.2 — i18n | 1.1, 1.2 |
| 7.3 — SEO/metadata | 4.1, 4.2, 4.3 |
| 8 — Out of scope | (no task — 의식적 제외) |
| 9 — Testing | 빌드/Lighthouse 단계가 1.x ~ 4.5에 분포 |
| 10 — Phased build | Phase 0~6 |
| 11 — Open decisions | 6.1 (email), 2.3 step 1 (logo SVG 보강), 3.2 (founder voice 카피 — generic 톤으로 작성됨) |
| 12 — DoD | 5.4 (smoke test가 DoD 항목 검증) |

**Placeholder scan:** plan 본문에서 "TBD"/"TODO"/"임시" 검색 — 일시 placeholder 카피 (Task 1.2 step 3) 외에는 없으며, 그 placeholder는 Task 3.7에서 명시적으로 제거된다.

**Type consistency:** `Locale` 타입은 `i18n/routing.ts`에서 export, 각 컴포넌트에서 일관 사용 (`"en" | "ko"`). `COMPANY` 객체 키 (name.en/ko, address.en/ko, registrationNumber, foundedAt, email, url)는 모든 사용처에서 동일.

**Spec gap 발견:** spec Section 7.1 디렉토리에 `next.config.ts`, `tailwind.config.ts`이 있지만 Tailwind v4는 `tailwind.config.ts`가 필요 없음 (`@theme` directive가 globals.css에 있음). Plan은 v4에 맞춰 작성됨 — spec과 약간 어긋나지만 implementation이 더 정확. 향후 spec 갱신 시 이 부분 수정 권장.
