# 한국한복문화예술협회 반응형 홈페이지 분리본

## 파일 구조

```
hanbok_responsive_split/
├─ index.html
├─ login.html
├─ join.html
├─ mypage.html
├─ components/
│  ├─ header.html
│  └─ footer.html
├─ css/
│  └─ style.css
├─ js/
│  └─ common.js
└─ images/
   └─ 필요한 이미지 파일을 넣어주세요
```

## 공통 헤더/푸터 사용 방법

다른 페이지에서도 아래처럼 넣으면 같은 헤더와 푸터를 사용할 수 있습니다.

```html
<link rel="stylesheet" href="./css/style.css" />
<script src="./js/common.js" defer></script>

<div data-include="./components/header.html"></div>
<div data-include="./components/footer.html"></div>
```

## 실행 방법

`components/header.html`, `components/footer.html`은 `fetch()`로 불러옵니다.  
브라우저에서 HTML 파일을 직접 더블클릭하면 보안 정책 때문에 include가 안 될 수 있습니다.

VS Code Live Server 또는 아래 명령으로 실행하세요.

```bash
python -m http.server 8000
```

그 다음 브라우저에서 아래 주소로 확인합니다.

```text
http://localhost:8000/hanbok_responsive_split/
```

## 필요한 이미지 파일명

`images` 폴더에 아래 파일명을 그대로 넣어주세요.

- `pc_logo.png`
- `login.png`
- `pc_banner.png`
- `pc_banner02.png`
- `pc_banner03.png`
- `banner_thumb01.png`
- `banner_thumb02.png`
- `banner_thumb03.png`
- `태극문양.png`
- `poster1.jpg`
- `poster2.jpg`
- `동영상 이미지.jpg`
- `갤러리1.jpg`
- `갤러리2.jpg`
- `갤러리3.jpg`
- `갤러리4.jpg`
- `갤러리5.jpg`
- `푸터로고.png`
- `sns1.png`
- `sns2.png`
- `sns3.png`
- `sns4.png`
