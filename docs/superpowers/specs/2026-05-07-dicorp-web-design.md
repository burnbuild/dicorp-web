# Di Corporations 회사 소개 웹사이트 — Design Spec

**Date:** 2026-05-07
**Status:** Draft (pending user review)
**Owner:** paigeshin

## 1. Why this site exists

이 사이트의 1순위 목적은 **Apple Developer 법인 계정 심사 통과**다. 자체 앱 홍보·외주 수주 같은 마케팅 목적은 부차적이다. 따라서 모든 결정은 "Apple 심사관이 보고 정상 운영되는 회사로 인정할지"라는 기준으로 내린다.

부차 목적은 두 가지:
- 회사명 노출 (Di Corporations / 디아이코퍼레이션 인지)
- 진행 중인 첫 프로덕트 BurnBuild의 가벼운 티저

## 2. Hard constraints (Apple 심사 통과 조건)

- Custom 도메인 사용 (`dicorporations.com`). `*.vercel.app` 등 서브도메인 금지.
- 회사명·사업자등록번호·주소·연락처를 푸터·Contact 페이지에 명시.
- "Coming soon" / "Under construction" 페이지 금지. 모든 페이지에 실제 콘텐츠.
- 일반적인 회사 사이트 구조 (Home / About / Work / Contact / Privacy / Terms).
- 회사 도메인 이메일 (`contact@dicorporations.com`) — 개인 Gmail 금지.

## 3. Company facts (사이트에 박힐 fact)

| Key | Value |
| --- | --- |
| 정식 한글명 | 주식회사 디아이코퍼레이션 |
| 정식 영문명 | Di Corporations |
| 약자 의미 | Digital Innovation |
| 사업자등록번호 | 268-87-03171 |
| 창업일 | 2025-11-09 |
| 규모 | 1인 (founder-only) |
| 주소 | (22007) 인천광역시 연수구 송도동 30-6 송도센텀하이브 B동 439호 |
| 도메인 | dicorporations.com (Squarespace Domains 등록) |
| 회사 이메일 | contact@dicorporations.com (셋업 예정) |

## 4. Mission copy

| | KO | EN |
| --- | --- | --- |
| Tagline (Hero) | 건강하게, 원하는 곳까지. | Healthier days. Goals that stick. |
| About 1~2문장 | 디아이코퍼레이션은 사람들이 건강한 일상에 집중하고, 원하는 목표를 이룰 수 있도록 돕는 디지털 프로덕트를 만듭니다. | Di Corporations builds digital products that help people focus on their health and reach the goals that matter to them. |

## 5. Site structure (Hybrid: 홈은 길게, 나머지는 별도 페이지)

```
/                      Home — 랜딩형 (Hero / About 요약 / Work preview / Contact CTA)
/about                 About — 회사 소개, 미션, 1인 창업 스토리
/work                  Work — BurnBuild 카드 1장 (개발 중 명시) + 향후 작품 슬롯
/contact               Contact — 회사 정보 fact 박스 + mailto 버튼
/privacy               Privacy Policy (generic 템플릿 기반)
/terms                 Terms of Service (generic 템플릿 기반)
```

언어별 라우팅: `/en/...`, `/ko/...`. 루트 `/` 접속 시 브라우저 `Accept-Language` 기반으로 redirect (next-intl 표준 미들웨어).

### 5.1 Home (`/[locale]/page.tsx`) 섹션 구성

1. **Hero** — 워드마크 (`Di Corporations`) + tagline (Section 4의 짧은 카피, 예: "Healthier days. Goals that stick.") + 회사 한 줄 묘사 ("An independent digital studio.") + scroll cue.
2. **About summary** — Section 4의 About 1~2문장 + "Read more →" `/about` 링크.
3. **Work preview** — BurnBuild 카드 한 장. "View work →" `/work` 링크.
4. **Contact CTA** — "Working on something? Reach out." + `mailto:` 버튼.
5. **Footer** — 회사 fact (회사명, 사업자번호, 주소, 이메일) + 링크 (Privacy, Terms).

### 5.2 About (`/[locale]/about/page.tsx`)

- 미션 (4번 카피 그대로).
- 회사 사실 박스 (창업일, 위치, founder = 1인).
- 짧은 founder voice 문단 (generic, 인디 메이커 톤). 카피 초안 doc 작업 단계에서 작성.

### 5.3 Work (`/[locale]/work/page.tsx`)

- 카드 1장: BurnBuild — 피트니스 동반 앱, In development, iOS/Android/Web 멀티 플랫폼 예정.
- 카드 디자인은 향후 확장 가능 (slot 비워두기).
- "Coming soon"이라는 표현 대신 "In development" / "currently building" 같은 진행형 문구 사용.

### 5.4 Contact (`/[locale]/contact/page.tsx`)

- Fact 박스: 회사명·사업자번호·주소·이메일.
- 주 CTA: `mailto:contact@dicorporations.com` 버튼.
- 폼 백엔드 없음. 1인 회사 + Apple 심사 목적에 mailto가 가장 단순하고 충분.

### 5.5 Privacy & Terms

- Generic 템플릿 기반 (한국 개인정보보호법 + GDPR 기본 조항). 1인 디지털 프로덕트 회사 기준.
- 언어별 별도 카피 (자동 번역 금지 — 법적 텍스트라 손으로 작성).
- 작성 단계에서 한국 표준 템플릿 (개인정보처리방침) + EN GDPR 템플릿 결합.

## 6. Visual design

### 6.1 톤

- **Minimal Light** (Apple / Linear / Vercel 톤). 흰 배경, 검정 텍스트, 산세리프, 여백 넉넉.
- 액센트 컬러 1개: **라임 그린 #B0D643** (로고에서 추출). hover, 링크 underline, primary CTA에만 사용.
- 보조 컬러: 청록 #69A5A4 (로고에서 추출, 매우 절제하여 사용 — 예: 작은 badge).

### 6.2 Color tokens

```css
--color-bg: #ffffff;
--color-fg: #111111;
--color-fg-muted: #6b6b6b;
--color-border: #e5e5e5;
--color-accent: #B0D643;       /* lime — primary accent */
--color-accent-fg: #111111;    /* on lime */
--color-accent-2: #69A5A4;     /* teal — secondary, sparing */
```

### 6.3 Typography

- **Pretendard** (한글) — `Pretendard Variable` self-host via npm `pretendard`.
- **Inter** (영문) — `next/font/google` 로드.
- Font stack: locale별로 우선순위 다르게 (`ko` → Pretendard 우선, `en` → Inter 우선).
- Type scale (mobile-first):
  - `h1` 36px / 700 / -0.02em
  - `h2` 24px / 600 / -0.015em
  - `h3` 18px / 600
  - `body` 16px / 400 / line-height 1.6
  - `small` 13px / muted

### 6.4 Logo

- 받은 LDI 모노그램 PNG (검정 둥근 사각 배경 포함).
- 헤더 좌상단 32px(모바일) / 40px(데스크톱) 사이즈로 그대로 박음.
- Favicon, Apple touch icon, OG image 모두 이 로고에서 파생.
- 향후 SVG / 투명배경 버전이 생기면 교체 (decision doc 업데이트).

### 6.5 Layout

- Container max-width 1080px, gutter 24px(모바일) / 32px(데스크톱).
- 모든 섹션은 vertical rhythm 96px(데스크톱) / 64px(모바일) 간격.
- Header: sticky, 64px 높이, 좌측 로고 + 우측 nav (About / Work / Contact) + 언어 토글 (KO / EN).
- Footer: 회사 fact 4줄 + 링크 + copyright.

## 7. Tech stack

| 영역 | 선택 | 메모 |
| --- | --- | --- |
| Framework | Next.js 15 (App Router) | 최신 안정 |
| Language | TypeScript (strict) | |
| Styling | Tailwind CSS v4 | 별도 PostCSS 설정 최소화 |
| i18n | `next-intl` | App Router 호환, locale 라우팅 |
| Fonts | `pretendard` (npm) + `next/font/google` Inter | self-host 또는 next/font |
| Icons | `lucide-react` | 가장 가벼운 아이콘 라이브러리 |
| Forms | 없음 — `mailto:` 링크만 | 1인 회사 + 단순화 |
| UI library | 없음 — 직접 작성 | shadcn/ui 추가는 향후 옵션 |
| Analytics | Vercel Analytics | 한 줄 추가, 무료 tier |
| 호스팅 | **Vercel** (Hobby 무료 tier) | Next.js 최적 |
| DNS | Squarespace Domains (그대로 둠) | A/CNAME → Vercel |
| 이메일 | Cloudflare Email Routing(권장) 또는 Google Workspace | infra 액션 아이템 |

### 7.1 디렉토리 구조

```
dicorp-web/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── about/page.tsx
│   │   ├── work/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── privacy/page.tsx
│   │   └── terms/page.tsx
│   ├── globals.css
│   └── not-found.tsx
├── components/
│   ├── header.tsx
│   ├── footer.tsx
│   ├── language-toggle.tsx
│   └── logo.tsx
├── lib/
│   └── company.ts            # 회사 fact (사업자번호, 주소 등) 단일 source of truth
├── messages/
│   ├── en.json
│   └── ko.json
├── i18n/
│   ├── routing.ts
│   └── request.ts
├── public/
│   ├── logo.png
│   ├── og.png
│   └── favicon.ico
├── middleware.ts
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── docs/superpowers/specs/2026-05-07-dicorp-web-design.md  ← (this)
```

회사 fact는 `lib/company.ts`에 const 객체로 단일화. Footer / Contact / Privacy / og:metadata 모두 이 객체를 참조 (값 변경 시 한 곳만 고치면 됨).

### 7.2 i18n routing (next-intl)

- `defaultLocale: "en"`
- `locales: ["en", "ko"]`
- 미들웨어가 `/` 접속을 `Accept-Language` 기반으로 redirect.
- 모든 페이지는 `/[locale]/...` 아래에 위치.
- 언어 토글: 현재 path를 다른 locale로 mirror (`/en/about` ↔ `/ko/about`).
- Privacy / Terms는 자동 번역 금지 (법적 텍스트, 손으로 EN/KO 각각 작성).

### 7.3 SEO / metadata

- `<html lang="..">` locale별로 정확히.
- 각 페이지 `metadata` export로 `<title>`, `<description>`, `og:image` 설정.
- `app/sitemap.ts`로 sitemap 생성. `robots.txt`는 index 허용 (회사 사이트는 공개).
- og:image는 로고 + tagline 결합 1080×566 정적 이미지.
- 한국·영어 메타 카피 각각 다르게.

## 8. Out of scope (이번 사이트에 안 만드는 것)

- 블로그 / 뉴스 / CMS 통합
- 채용 공고 페이지
- 고객 로그인, 계정, 대시보드
- 결제, 가격 페이지
- 다국어 자동 번역 (KO/EN 둘만, 손으로)
- 폼 백엔드 (mailto만)
- 어드민 패널
- A/B 테스팅, 마케팅 픽셀 (Vercel Analytics 외에는 없음)

## 9. Testing & verification

회사 정보 사이트라 자동화 테스트 부담은 최소화.

- **TypeScript strict + ESLint** — 빌드 시점에 타입/린트 게이트.
- **Build smoke test** — `next build` 통과가 1차 게이트.
- **Lighthouse manual run** — Performance 90+, Accessibility 95+, SEO 100 목표.
- **i18n 수동 확인** — `/`, `/en`, `/ko`, 모든 6 페이지에서 언어 토글 양방향 동작.
- **Apple 심사관 시뮬레이션** — 친구/제3자에게 사이트 보여주고 "이게 정상 회사 사이트로 보이는가" 피드백 1회.

E2E (Playwright) 같은 무거운 테스트는 도입 안 함. 페이지 6개에 폼도 없는 정적 사이트라 ROI 안 나옴.

## 10. Phased build plan (high level)

세부 일정은 implementation plan에서 결정. 큰 흐름만:

1. **Phase 1 — Scaffolding** : Next.js 15 + Tailwind v4 + next-intl 셋업. 빈 페이지 6개 라우팅 동작.
2. **Phase 2 — Layout & visual primitives** : Header, Footer, Logo, type scale, color tokens. Minimal Light 톤 확립.
3. **Phase 3 — Content (KO/EN)** : 각 페이지 카피 작성, `messages/*.json` 채움. Privacy/Terms 템플릿 적용.
4. **Phase 4 — Polish & metadata** : OG image, favicon, sitemap, Lighthouse 통과.
5. **Phase 5 — Deploy** : Vercel 연결, Squarespace DNS A/CNAME 추가, dicorporations.com 라이브.
6. **Phase 6 — Email infra** : Cloudflare Email Routing 또는 Google Workspace로 contact@dicorporations.com 활성화.

## 11. Open / deferred decisions

- **로고 SVG/투명배경 버전** : 받으면 헤더 박스 빼고 글자만 쓰는 쪽으로 교체. 받기 전까지는 PNG 그대로 작은 사이즈로 박음.
- **Email 셋업 방식** : Cloudflare Email Routing(무료 forwarding) vs Google Workspace($6/월). Workspace는 보내기까지 가능 → 추천. 빌드와 별도 트랙이라 사이트 빌드를 막지 않음.
- **Founder voice 카피 (About 페이지)** : implementation 단계에서 generic 톤으로 1차 초안 작성, 사용자 검토.
- **Privacy / Terms 한국 표준 템플릿** : 개인정보보호위원회 표준 양식 + GDPR EN 템플릿. 작성 단계에서 확정.

## 12. Definition of done

- [ ] 6개 페이지 (`/`, `/about`, `/work`, `/contact`, `/privacy`, `/terms`) 모두 KO/EN 양쪽으로 콘텐츠 채워짐. "TBD" / "Lorem ipsum" 0건.
- [ ] dicorporations.com 라이브, HTTPS, Vercel 배포.
- [ ] 푸터에 회사명·사업자번호·주소·이메일 노출.
- [ ] `contact@dicorporations.com` 실제로 받을 수 있는 상태.
- [ ] Lighthouse Performance 90+, Accessibility 95+, SEO 100.
- [ ] Apple 심사관 관점에서 "정상 회사 사이트"로 보이는지 self-check 통과.
- [ ] Apple Developer 법인 계정 심사 제출 → 통과 (최종 outcome 게이트).
