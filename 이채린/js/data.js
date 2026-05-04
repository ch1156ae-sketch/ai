window.UTBT_DATA = (() => {
    const sampleImages = {
        apple: "./images/photo1/못난이 사과.png",
        tomato: "./images/photo1/못난이 토마토.png",
        potato: "./images/photo2/구출감자.png",
        mandarin: "./images/photo2/베스트 귤.png",
        mushroom: "./images/photo1/못난이 표고.png",
        cucumber: "./images/photo1/못난이 오이.png",
        meal: "https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?auto=format&fit=crop&w=310&h=310&q=80",
        carrot: "./images/photo1/못난이 당근.png",
        broccoli:
            "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=310&h=310&q=80",
        mango: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=310&h=310&q=80",
        cheese: "./images/photo2/베스트치즈.png",
        salmon: "./images/photo2/베스트 연어.png",
        strawberry: "./images/photo2/구출 딸기.png",
    };

    const products = [
        {
            name: "못난이 토마토 1kg",
            price: 4900,
            img: sampleImages.tomato,
            tags: ["못난이토마토", "토마토", "인기"],
        },
        {
            name: "못난이 감자 2kg",
            price: 4900,
            img: "./images/photo2/구출감자.png",
            tags: ["감자", "오늘구출"],
        },
        {
            name: "못난이 귤 3kg",
            price: 7900,
            img: "./images/photo2/베스트 귤.png",
            tags: ["귤", "제철"],
        },
        {
            name: "흠집 사과 2kg",
            price: 8900,
            img: "./images/photo1/못난이 사과.png",
            tags: ["주스용사과", "사과"],
        },
        {
            name: "못난이 당근 1kg",
            price: 3900,
            img: "./images/photo1/못난이 당근.png",
            tags: ["못난이 당근", "당근라페용", "당근"],
        },
        {
            name: "구출 잼 세트",
            price: 6900,
            img: "./images/photo2/잼세트.png",
            tags: ["잼", "가공식품"],
        },
        {
            name: "못난이 브로콜리 1kg",
            price: 6500,
            img: "./images/photo2/브로콜리.png",
            tags: ["무농약 브로콜리", "브로콜리"],
        },
        {
            name: "못난이 망고 2입",
            price: 9900,
            img: "./images/photo2/망고.png",
            tags: ["망고", "과일"],
        },
        {
            name: "자국 복숭아 4kg",
            price: 13000,
            img: "./images/photo2/베스트 복숭아.png",
            tags: ["복숭아", "베스트"],
        },
        {
            name: "얼룩 귤5kg",
            price: 11000,
            img: "./images/photo2/베스트 귤.png",
            tags: ["귤", "얼룩 귤"],
        },
        {
            name: "대추 방울토마토 2kg",
            price: 9900,
            img: "./images/photo2/방울토마토.png",
            tags: ["스테비아 방울토마토", "토마토"],
        },
        {
            name: "알감자 3kg",
            price: 7900,
            img: "./images/photo2/구출감자.png",
            tags: ["감자", "알감자"],
        },
        {
            name: "가정용 사과 3kg",
            price: 12900,
            img: "./images/photo1/못난이 사과.png",
            tags: ["사과", "주스용사과"],
        },
        {
            name: "알뜰 채소 카레",
            price: 7900,
            img: "./images/photo2/밀키트 카레.png",
            tags: ["밀키트", "카레"],
        },
        {
            name: "듬뿍 감자 짜글이",
            price: 8500,
            img: "./images/photo2/밀키트 짜글이.png",
            tags: ["밀키트", "감자"],
        },
        {
            name: "매콤 떡볶이 밀키트",
            price: 6900,
            img: "https://images.unsplash.com/photo-1635363638580-c2809d049eee?auto=format&fit=crop&w=310&h=310&q=80",
            tags: ["밀키트", "떡볶이"],
        },
        {
            name: "구출 채소 수프",
            price: 7500,
            img: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=310&h=310&q=80",
            tags: ["밀키트", "수프"],
        },
        {
            name: "파지 치즈 500g",
            price: 5900,
            img: sampleImages.cheese,
            tags: ["파지 치즈", "치즈", "인기"],
        },
        {
            name: "한입 고구마 2kg",
            price: 8900,
            img: "./images/photo2/고구마.png",
            tags: ["한입고구마", "한입 고구마", "고구마"],
        },
        {
            name: "꼬마 파프리카 1kg",
            price: 8500,
            img: "./images/photo2/구출 파프리카.png",
            tags: ["꼬마 파프리카", "파프리카"],
        },
        {
            name: "꼬불이 오이 5입",
            price: 9000,
            img: "./images/photo2/구출 오이.png",
            tags: ["꼬불이 오이", "오이특가", "오이"],
        },
        {
            name: "파지 양파 3kg",
            price: 6900,
            img: "./images/photo2/구출 양파.png",
            tags: ["파지 양파", "양파"],
        },
        {
            name: "못난이 명란 300g",
            price: 9900,
            img: "./images/photo2/베스트 명란.png",
            tags: ["못난이 명란", "명란"],
        },
        {
            name: "조각 연어 400g",
            price: 11900,
            img: "./images/photo2/베스트 연어.png",
            tags: ["조각 연어", "연어"],
        },
        {
            name: "못난이 딸기 1kg",
            price: 9900,
            img: "./images/photo2/구출 딸기.png",
            tags: ["못난이 딸기", "딸기"],
        },
    ];

    const categories = [
        {
            label: "농산물",
            img: "https://ch1156ae-sketch.github.io/ai/%ED%99%88%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC/%EB%86%8D%EC%82%B0%EB%AC%BC.png",
        },
        {
            label: "고기",
            img: "https://ch1156ae-sketch.github.io/ai/%ED%99%88%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC/%EA%B3%A0%EA%B8%B0.png",
        },
        {
            label: "수산물",
            img: "https://ch1156ae-sketch.github.io/ai/%ED%99%88%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC/%EC%88%98%EC%82%B0%EB%AC%BC.png",
        },
        {
            label: "유제품",
            img: "https://ch1156ae-sketch.github.io/ai/%ED%99%88%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC/%EC%9C%A0%EC%A0%9C%ED%92%88.png",
        },
        {
            label: "밀키트",
            img: "https://ch1156ae-sketch.github.io/ai/%ED%99%88%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC/%EB%B0%80%ED%82%A4%ED%8A%B8.png",
        },
        {
            label: "가공식품",
            img: "https://ch1156ae-sketch.github.io/ai/%ED%99%88%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC/%EA%B0%80%EA%B3%B5%EC%8B%9D%ED%92%88.png",
        },
        {
            label: "주류",
            img: "https://ch1156ae-sketch.github.io/ai/%ED%99%88%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC/%EC%A3%BC%EB%A5%98.png",
        },
        {
            label: "펫푸드",
            img: "https://ch1156ae-sketch.github.io/ai/%ED%99%88%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC/%ED%8E%AB%ED%91%B8%EB%93%9C.png",
        },
    ];

    const categoryDetailData = {
        농산물: [
            {
                name: "채소",
                img: "https://ch1156ae-sketch.github.io/ai/category/%EC%B1%84%EC%86%8C.png",
            },
            {
                name: "과일",
                img: "https://ch1156ae-sketch.github.io/ai/category2/%EA%B3%BC%EC%9D%BC.png",
            },
            {
                name: "쌀·잡곡",
                img: "https://ch1156ae-sketch.github.io/ai/category/%EC%8C%80%C2%B7%EC%9E%A1%EA%B3%A1.png",
            },
            {
                name: "견과류",
                img: "https://ch1156ae-sketch.github.io/ai/category2/%EA%B2%AC%EA%B3%BC%EB%A5%98.png",
            },
            {
                name: "버섯",
                img: "https://ch1156ae-sketch.github.io/ai/category2/%EB%B2%84%EC%84%AF.png",
            },
            {
                name: "나물",
                img: "https://ch1156ae-sketch.github.io/ai/category2/%EB%82%98%EB%AC%BC.png",
            },
            {
                name: "샐러드",
                img: "https://ch1156ae-sketch.github.io/ai/category/%EC%83%90%EB%9F%AC%EB%93%9C.png",
            },
            {
                name: "건채소",
                img: "https://ch1156ae-sketch.github.io/ai/category2/%EA%B1%B4%EC%B1%84%EC%86%8C.png",
            },
            {
                name: "두부",
                img: "https://ch1156ae-sketch.github.io/ai/category2/%EB%91%90%EB%B6%80.png",
            },
        ],

        고기: [
            {
                name: "소고기",
                img: "https://ch1156ae-sketch.github.io/ai/category/%EC%86%8C%EA%B3%A0%EA%B8%B0.png",
            },
            {
                name: "돼지고기",
                img: "https://ch1156ae-sketch.github.io/ai/category2/%EB%8F%BC%EC%A7%80%EA%B3%A0%EA%B8%B0.png",
            },
            {
                name: "닭고기",
                img: "https://ch1156ae-sketch.github.io/ai/category2/%EB%8B%AD%EA%B3%A0%EA%B8%B0.png",
            },
            {
                name: "오리고기",
                img: "https://ch1156ae-sketch.github.io/ai/category/%EC%98%A4%EB%A6%AC%EA%B3%A0%EA%B8%B0.png",
            },
            {
                name: "양고기",
                img: "https://ch1156ae-sketch.github.io/ai/category/%EC%96%91%EA%B3%A0%EA%B8%B0.png",
            },
            {
                name: "계란",
                img: "https://ch1156ae-sketch.github.io/ai/category2/%EA%B3%84%EB%9E%80.png",
            },
        ],

        수산물: [
            {
                name: "생선",
                img: "https://ch1156ae-sketch.github.io/ai/category/%EC%83%9D%EC%84%A0.png",
            },
            {
                name: "새우",
                img: "https://ch1156ae-sketch.github.io/ai/category/%EC%83%88%EC%9A%B0.png",
            },
            {
                name: "오징어",
                img: "https://ch1156ae-sketch.github.io/ai/category/%EC%98%A4%EC%A7%95%EC%96%B4.png",
            },
            {
                name: "조개",
                img: "https://ch1156ae-sketch.github.io/ai/category/%EC%A1%B0%EA%B0%9C.png",
            },
            {
                name: "해조류",
                img: "https://ch1156ae-sketch.github.io/ai/category/%ED%95%B4%EC%A1%B0%EB%A5%98.png",
            },
            {
                name: "건어물",
                img: "https://ch1156ae-sketch.github.io/ai/category2/%EA%B1%B4%EC%96%B4%EB%AC%BC.png",
            },
        ],

        유제품: [
            {
                name: "우유",
                img: "https://ch1156ae-sketch.github.io/ai/category/%EC%9A%B0%EC%9C%A0.png",
            },
            {
                name: "치즈",
                img: "https://ch1156ae-sketch.github.io/ai/category/%EC%B9%98%EC%A6%88.png",
            },
            {
                name: "버터",
                img: "https://ch1156ae-sketch.github.io/ai/category2/%EB%B2%84%ED%84%B0.png",
            },
            {
                name: "요거트",
                img: "https://ch1156ae-sketch.github.io/ai/category/%EC%9A%94%EA%B1%B0%ED%8A%B8.png",
            },
            {
                name: "생크림",
                img: "https://ch1156ae-sketch.github.io/ai/category/%EC%83%9D%ED%81%AC%EB%A6%BC.png",
            },
        ],

        밀키트: [
            {
                name: "국·탕",
                img: "https://ch1156ae-sketch.github.io/ai/category2/%EA%B5%AD%C2%B7%ED%83%95.png",
            },
            {
                name: "찌개",
                img: "https://ch1156ae-sketch.github.io/ai/category/%EC%B0%8C%EA%B0%9C.png",
            },
            {
                name: "파스타",
                img: "https://ch1156ae-sketch.github.io/ai/category/%ED%8C%8C%EC%8A%A4%ED%83%80.png",
            },
            {
                name: "볶음",
                img: "https://ch1156ae-sketch.github.io/ai/category2/%EB%B3%B6%EC%9D%8C.png",
            },
            {
                name: "샐러드",
                img: "https://ch1156ae-sketch.github.io/ai/category/%EC%83%90%EB%9F%AC%EB%93%9C.png",
            },
            {
                name: "간편식",
                img: "https://ch1156ae-sketch.github.io/ai/category2/%EA%B0%84%ED%8E%B8%EC%8B%9D.png",
            },
        ],

        가공식품: [
            {
                name: "라면",
                img: "https://ch1156ae-sketch.github.io/ai/category2/%EB%9D%BC%EB%A9%B4.png",
            },
            {
                name: "통조림",
                img: "https://ch1156ae-sketch.github.io/ai/category/%ED%86%B5%EC%A1%B0%EB%A6%BC.png",
            },
            {
                name: "소스",
                img: "https://ch1156ae-sketch.github.io/ai/category/%EC%86%8C%EC%8A%A4.png",
            },
            {
                name: "냉동식품",
                img: "https://ch1156ae-sketch.github.io/ai/category2/%EB%83%89%EB%8F%99%EC%8B%9D%ED%92%88.png",
            },
            {
                name: "간식",
                img: "https://ch1156ae-sketch.github.io/ai/category2/%EA%B0%84%EC%8B%9D.png",
            },
            {
                name: "빵",
                img: "https://ch1156ae-sketch.github.io/ai/category/%EB%B9%B5.png",
            },
        ],

        주류: [
            {
                name: "와인",
                img: "https://ch1156ae-sketch.github.io/ai/category/%EC%99%80%EC%9D%B8.png",
            },
            {
                name: "맥주",
                img: "https://ch1156ae-sketch.github.io/ai/category2/%EB%A7%A5%EC%A3%BC.png",
            },
            {
                name: "전통주",
                img: "https://ch1156ae-sketch.github.io/ai/category/%EC%A0%84%ED%86%B5%EC%A3%BC.png",
            },
            {
                name: "하이볼",
                img: "https://ch1156ae-sketch.github.io/ai/category/%ED%95%98%EC%9D%B4%EB%B3%BC.png",
            },
            {
                name: "무알콜",
                img: "https://ch1156ae-sketch.github.io/ai/category2/%EB%AC%B4%EC%95%8C%EC%BD%9C.png",
            },
        ],

        펫푸드: [
            {
                name: "강아지사료",
                img: "https://ch1156ae-sketch.github.io/ai/category2/%EA%B0%95%EC%95%84%EC%A7%80%EC%82%AC%EB%A3%8C.png",
            },
            {
                name: "고양이사료",
                img: "https://ch1156ae-sketch.github.io/ai/category2/%EA%B3%A0%EC%96%91%EC%9D%B4%EC%82%AC%EB%A3%8C.png",
            },
            {
                name: "간식",
                img: "https://ch1156ae-sketch.github.io/ai/category2/%EA%B0%9C%EA%B0%84%EC%8B%9D.png",
            },
            {
                name: "영양제",
                img: "https://ch1156ae-sketch.github.io/ai/category/%EC%98%81%EC%96%91%EC%A0%9C.png",
            },
            {
                name: "습식사료",
                img: "https://ch1156ae-sketch.github.io/ai/category/%EC%8A%B5%EC%8B%9D%EC%82%AC%EB%A3%8C.png",
            },
        ],
    };

    window.UTBT_DATA = {
        ...window.UTBT_DATA,
        categoryDetailData,
    };

    const recipes = [
        {
            name: "토마토 파스타",
            img: "https://ch1156ae-sketch.github.io/ai/%EB%A0%88%EC%8B%9C%ED%94%BC/%ED%86%A0%EB%A7%88%ED%86%A0%20%ED%8C%8C%EC%8A%A4%ED%83%80.png",
            desc: "토마토, 마늘, 올리브오일",
            steps: [
                "토마토를 잘게 썰고 마늘을 볶아 향을 내요.",
                "삶은 면과 토마토를 함께 볶아요.",
                "올리브오일을 둘러 마무리해요.",
            ],
        },
        {
            name: "감자 수프",
            img: "https://ch1156ae-sketch.github.io/ai/%EB%A0%88%EC%8B%9C%ED%94%BC/%EA%B0%90%EC%9E%90%EC%88%98%ED%94%84.png",
            desc: "감자, 양파, 우유",
            steps: [
                "감자와 양파를 작게 썰어 부드럽게 볶아요.",
                "우유를 넣고 약불에서 끓여요.",
                "곱게 갈아 소금으로 간을 맞춰요.",
            ],
        },
        {
            name: "오이 샐러드",
            img: "https://ch1156ae-sketch.github.io/ai/%EB%A0%88%EC%8B%9C%ED%94%BC/%EC%98%A4%EC%9D%B4%EC%83%90%EB%9F%AC%EB%93%9C.png",
            desc: "오이, 양파, 허브",
            steps: [
                "오이와 양파를 얇게 썰어요.",
                "허브와 드레싱을 넣고 가볍게 버무려요.",
                "차갑게 두었다가 먹으면 더 좋아요.",
            ],
        },
        {
            name: "토마토 스튜",
            img: "https://ch1156ae-sketch.github.io/ai/%EB%A0%88%EC%8B%9C%ED%94%BC/%ED%86%A0%EB%A7%88%ED%86%A0%20%EC%8A%A4%ED%8A%9C.png",
            desc: "토마토, 양파, 감자",
            steps: [
                "양파와 감자를 먼저 볶아요.",
                "토마토와 물을 넣고 뭉근하게 끓여요.",
                "재료가 부드러워지면 후추로 마무리해요.",
            ],
        },
        {
            name: "딸기 요거트 볼",
            img: "https://ch1156ae-sketch.github.io/ai/%EB%A0%88%EC%8B%9C%ED%94%BC/%EB%94%B8%EA%B8%B0%EC%9A%94%EA%B1%B0%ED%8A%B8%EB%B3%BC.png",
            desc: "딸기, 요거트, 그래놀라",
            steps: [
                "딸기를 한입 크기로 썰어요.",
                "그릇에 요거트를 담고 딸기를 올려요.",
                "그래놀라를 뿌려 바삭하게 완성해요.",
            ],
        },
    ];

    const coupons = [
        { name: "구출 장바구니 10% 쿠폰", type: "rate", value: 0.1 },
        { name: "못난이 식재료 2,000원 쿠폰", type: "fixed", value: 2000 },
        { name: "쿠폰 사용 안함", type: "none", value: 0 },
    ];

    return {
        sampleImages,
        products,
        categories,
        categoryDetailData,
        recipes,
        coupons,
    };
})();
