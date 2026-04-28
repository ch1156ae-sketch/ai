document.addEventListener("DOMContentLoaded", () => {
    const { $, getCartItems, setCartItems, formatWon, getAddress, setAddress, getAddressHTML, CHECKOUT_KEY } = window.UTBT;
    const cartItemsEl = $(".cart-items");
    const selectAllCheck = $(".cart-select-all-btn .cart-check");
    const shippingAddress = $(".shipping-address");
    const addressModal = $(".address-modal");
    const addressCurrentText = $(".address-current-text");
    const addressMainInput = $("#addressMainInput");
    const addressDetailInput = $("#addressDetailInput");

    const syncAddressUI = () => {
        const address = getAddress();
        shippingAddress.innerHTML = getAddressHTML();
        addressCurrentText.innerHTML = getAddressHTML();
        addressMainInput.value = address.main;
        addressDetailInput.value = address.detail;
    };

    const renderCartPage = () => {
        const cartItems = getCartItems();
        cartItemsEl.innerHTML = "";
        if (cartItems.length === 0) {
            cartItemsEl.innerHTML = `<li class="cart-empty-text">장바구니에 담긴 상품이 없습니다.</li>`;
            selectAllCheck.classList.remove("is-checked");
            return;
        }
        selectAllCheck.classList.toggle("is-checked", cartItems.every((item) => item.selected));
        cartItems.forEach((item) => {
            const li = document.createElement("li");
            li.className = "cart-item";
            li.dataset.id = item.id;
            li.innerHTML = `
                <button type="button" class="cart-check cart-item-check ${item.selected ? "is-checked" : ""}" aria-label="${item.name} 선택"></button>
                <div class="cart-item-img"><img src="${item.img}" alt="${item.name}" /></div>
                <div class="cart-item-info"><p class="cart-item-name">${item.name}</p><p class="cart-item-price">${formatWon(item.unitPrice * item.count)}</p><div class="cart-qty-control" aria-label="${item.name} 수량 조절"><button type="button" class="cart-qty-minus" aria-label="수량 감소"><svg viewBox="0 0 24 24" fill="none" stroke-linecap="round"><path d="M5 12h14" /></svg></button><span class="cart-qty-count">${item.count}</span><button type="button" class="cart-qty-plus" aria-label="수량 증가"><svg viewBox="0 0 24 24" fill="none" stroke-linecap="round"><path d="M12 5v14" /><path d="M5 12h14" /></svg></button></div></div>
                <button type="button" class="cart-remove-btn" aria-label="${item.name} 삭제"><svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg></button>
            `;
            cartItemsEl.appendChild(li);
        });
    };

    $(".cart-select-all-btn").addEventListener("click", () => {
        const items = getCartItems();
        const nextSelected = !items.every((item) => item.selected);
        setCartItems(items.map((item) => ({ ...item, selected: nextSelected })));
        renderCartPage();
    });

    cartItemsEl.addEventListener("click", (e) => {
        const itemEl = e.target.closest(".cart-item");
        if (!itemEl) return;
        const itemId = Number(itemEl.dataset.id);
        let items = getCartItems();
        const item = items.find((cartItem) => cartItem.id === itemId);
        if (!item) return;
        if (e.target.closest(".cart-item-check")) item.selected = !item.selected;
        if (e.target.closest(".cart-qty-minus")) item.count = Math.max(1, item.count - 1);
        if (e.target.closest(".cart-qty-plus")) item.count += 1;
        if (e.target.closest(".cart-remove-btn")) items = items.filter((cartItem) => cartItem.id !== itemId);
        setCartItems(items);
        renderCartPage();
    });

    $(".cart-buy-fixed").addEventListener("click", () => {
        const selectedItems = getCartItems().filter((item) => item.selected);
        if (selectedItems.length === 0) return alert("구매할 상품을 선택해 주세요.");
        localStorage.setItem(CHECKOUT_KEY, JSON.stringify(selectedItems));
        location.href = "checkout.html";
    });

    const openAddressModal = () => { syncAddressUI(); addressModal.classList.add("show"); setTimeout(() => addressMainInput.focus(), 0); };
    $(".shipping-change-btn").addEventListener("click", openAddressModal);
    $(".address-cancel-btn").addEventListener("click", () => addressModal.classList.remove("show"));
    addressModal.addEventListener("click", (e) => { if (e.target === addressModal) addressModal.classList.remove("show"); });
    $(".address-save-btn").addEventListener("click", () => {
        const main = addressMainInput.value.trim();
        const detail = addressDetailInput.value.trim();
        if (!main || !detail) return alert("주소와 상세주소를 모두 입력해 주세요.");
        setAddress({ main, detail });
        syncAddressUI();
        addressModal.classList.remove("show");
    });
    let addressMap = null;
    let addressMarker = null;
    let addressGeocoder = null;
    let selectedMapAddress = "";

    const hasKakaoMap = () => window.kakao && kakao.maps && kakao.maps.services;

    const getAddressFromCoords = (lat, lng, callback) => {
        if (!addressGeocoder) addressGeocoder = new kakao.maps.services.Geocoder();
        addressGeocoder.coord2Address(lng, lat, (result, status) => {
            if (status !== kakao.maps.services.Status.OK || !result[0]) return callback("");
            callback(result[0].road_address?.address_name || result[0].address?.address_name || "");
        });
    };

    const updateSelectedMapAddress = (lat, lng) => {
        getAddressFromCoords(lat, lng, (address) => {
            selectedMapAddress = address;
            $(".address-selected-text").textContent = address || "선택한 위치의 주소를 찾을 수 없습니다.";
        });
    };

    const openAddressMap = (lat, lng) => {
        const center = new kakao.maps.LatLng(lat, lng);
        $(".address-map-panel").classList.add("show");
        if (!addressMap) {
            addressMap = new kakao.maps.Map(document.getElementById("addressMap"), { center, level: 4 });
            addressMarker = new kakao.maps.Marker({ position: center, map: addressMap });
            kakao.maps.event.addListener(addressMap, "click", (mouseEvent) => {
                const latlng = mouseEvent.latLng;
                addressMarker.setPosition(latlng);
                addressMap.setCenter(latlng);
                updateSelectedMapAddress(latlng.getLat(), latlng.getLng());
            });
        } else {
            addressMap.setCenter(center);
            addressMarker.setPosition(center);
            addressMarker.setMap(addressMap);
        }
        setTimeout(() => { addressMap.relayout(); addressMap.setCenter(center); }, 50);
        updateSelectedMapAddress(lat, lng);
    };

    $(".address-location-btn").addEventListener("click", () => {
        if (!navigator.geolocation) return alert("현재 위치를 사용할 수 없는 브라우저입니다.");
        if (!hasKakaoMap()) return alert("카카오 지도 API 키를 확인해 주세요. YOUR_KAKAO_APP_KEY를 실제 키로 교체해야 합니다.");
        const label = $(".address-location-btn span");
        $(".address-location-btn").disabled = true;
        label.textContent = "위치 확인 중...";
        navigator.geolocation.getCurrentPosition(
            (position) => {
                $(".address-location-btn").disabled = false;
                label.textContent = "현위치로 설정";
                openAddressMap(position.coords.latitude, position.coords.longitude);
            },
            () => {
                $(".address-location-btn").disabled = false;
                label.textContent = "현위치로 설정";
                alert("현재 위치 사용을 허용해 주세요.");
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    });
    $(".address-map-close-btn").addEventListener("click", () => $(".address-map-panel").classList.remove("show"));
    $(".address-map-apply-btn").addEventListener("click", () => {
        if (!selectedMapAddress) return alert("지도에서 위치를 선택해 주세요.");
        addressMainInput.value = selectedMapAddress;
        addressDetailInput.value = "";
        addressCurrentText.innerHTML = `${selectedMapAddress}<br />상세주소를 입력해 주세요.`;
        addressDetailInput.focus();
    });

    syncAddressUI();
    renderCartPage();
});
