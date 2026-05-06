// JavaScript 파일입니다.
// 이 파일에서는 1) 푸터 연도 자동 표시, 2) 현재 페이지 메뉴 표시,
// 3) 카드 등장 애니메이션, 4) 연락 폼 입력 확인 기능을 처리합니다.

document.addEventListener("DOMContentLoaded", function () {
  // 1. footer의 연도를 현재 연도로 자동 변경합니다.
  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // 2. 현재 열려 있는 페이지와 같은 메뉴에 active 클래스를 추가합니다.
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".gnb a");

  navLinks.forEach(function (link) {
    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });

  // 3. 카드나 섹션이 화면에 보이면 부드럽게 나타나도록 합니다.
  const revealTargets = document.querySelectorAll(
    ".info-card, .stat-card, .project-card, .profile-card, .contact-info-card, .form-card, .timeline-item"
  );

  revealTargets.forEach(function (target) {
    target.classList.add("reveal");
  });

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach(function (target) {
    observer.observe(target);
  });

  // 4. Contact 페이지의 폼 입력값을 간단히 확인합니다.
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      // 실제 서버로 전송하지 않기 위해 기본 동작을 막습니다.
      event.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      // 하나라도 비어 있으면 안내창을 보여줍니다.
      if (!name || !email || !message) {
        alert("이름, 이메일, 메시지를 모두 입력해주세요.");
        return;
      }

      alert(name + "님, 메시지가 정상적으로 확인되었습니다. 실제 전송 기능은 없는 예시 폼입니다.");
      contactForm.reset();
    });
  }
});
