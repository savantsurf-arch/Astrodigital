/**
 * ASTRO DIGITAL - Interactive Scripts & WhatsApp Conversion Engine
 */

// ==========================================================================
// 1. CONFIGURAÇÃO DO WHATSAPP (Personalize seu número aqui)
// ==========================================================================
const WHATSAPP_CONFIG = {
  // Número oficial de WhatsApp da Astro Digital com DDD 73
  phone: "5573982335157", 
  defaultMessage: "Olá! Vi seu site e gostaria de solicitar um orçamento para criação de um site/landing page.",
  planMessages: {
    landing: "Olá! Tenho interesse no plano LANDING PAGE para o meu negócio. Como podemos começar?",
    site: "Olá! Tenho interesse no plano SITE PROFISSIONAL (Mais Escolhido). Gostaria de ver como podemos aplicar no meu negócio!",
    custom: "Olá! Preciso de um PROJETO PERSONALIZADO com funcionalidades específicas para minha empresa. Podemos conversar?",
    hero: "Olá! Vi seu site da Astro Digital e quero criar um site profissional para aumentar as vendas do meu negócio.",
    portfolio: "Olá! Gostei muito dos projetos no portfólio da Astro Digital e gostaria de um orçamento para um site parecido."
  }
};

/**
 * Retorna o link formatado da API oficial do WhatsApp
 */
function getWhatsAppUrl(customMessage) {
  const message = encodeURIComponent(customMessage || WHATSAPP_CONFIG.defaultMessage);
  return `https://wa.me/${WHATSAPP_CONFIG.phone}?text=${message}`;
}

// ==========================================================================
// 2. INICIALIZAÇÃO APÓS CARREGAMENTO DO DOM
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  initWhatsAppLinks();
  initFaqAccordion();
  initPortfolioFilter();
  initMobileMenu();
  initScrollAnimations();
  initNavbarScroll();
  initCurrentYear();
});

/**
 * Conecta todos os botões que possuem data-wa-type ou classe whatsapp-link
 */
function initWhatsAppLinks() {
  const waButtons = document.querySelectorAll("[data-wa-type]");
  waButtons.forEach((btn) => {
    const type = btn.getAttribute("data-wa-type");
    let msg = WHATSAPP_CONFIG.defaultMessage;

    if (btn.getAttribute("data-wa-msg")) {
      msg = btn.getAttribute("data-wa-msg");
    } else if (type && WHATSAPP_CONFIG.planMessages[type]) {
      msg = WHATSAPP_CONFIG.planMessages[type];
    }

    btn.setAttribute("href", getWhatsAppUrl(msg));
    btn.setAttribute("target", "_blank");
    btn.setAttribute("rel", "noopener noreferrer");
  });

  // Botão flutuante WhatsApp
  const floatBtn = document.getElementById("whatsapp-float-btn");
  if (floatBtn) {
    floatBtn.setAttribute("href", getWhatsAppUrl(WHATSAPP_CONFIG.defaultMessage));
    floatBtn.setAttribute("target", "_blank");
    floatBtn.setAttribute("rel", "noopener noreferrer");
  }
}

/**
 * FAQ Accordion Interativo
 */
function initFaqAccordion() {
  const faqHeaders = document.querySelectorAll(".faq-header");

  faqHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const currentItem = header.parentElement;
      const isActive = currentItem.classList.contains("active");

      // Fecha todos os outros itens para manter o visual limpo
      document.querySelectorAll(".faq-item").forEach((item) => {
        item.classList.remove("active");
      });

      // Se não estava ativo, abre
      if (!isActive) {
        currentItem.classList.add("active");
      }
    });
  });
}

/**
 * Filtro Interativo de Portfólio
 */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll(".portfolio-filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Atualiza estilo dos botões
      filterBtns.forEach((b) => {
        b.classList.remove("bg-astro-green", "text-black", "font-bold", "shadow-glow");
        b.classList.add("bg-slate-900", "text-slate-300", "hover:bg-slate-800");
      });

      btn.classList.remove("bg-slate-900", "text-slate-300", "hover:bg-slate-800");
      btn.classList.add("bg-astro-green", "text-black", "font-bold", "shadow-glow");

      const filterValue = btn.getAttribute("data-filter");

      portfolioItems.forEach((item) => {
        const itemCategory = item.getAttribute("data-category");

        if (filterValue === "all" || itemCategory === filterValue) {
          item.style.display = "flex";
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "scale(1)";
          }, 50);
        } else {
          item.style.opacity = "0";
          item.style.transform = "scale(0.95)";
          setTimeout(() => {
            item.style.display = "none";
          }, 300);
        }
      });
    });
  });
}

/**
 * Menu Mobile
 */
function initMobileMenu() {
  const menuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");

  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    const isOpen = !mobileMenu.classList.contains("hidden");
    menuBtn.innerHTML = isOpen 
      ? '<i class="fa-solid fa-xmark text-2xl text-astro-green"></i>' 
      : '<i class="fa-solid fa-bars text-2xl text-white"></i>';
  });

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      menuBtn.innerHTML = '<i class="fa-solid fa-bars text-2xl text-white"></i>';
    });
  });
}

/**
 * Animação de Entrada ao Rolar (Scroll Reveal)
 */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll(".reveal-init");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealElements.forEach((el) => observer.observe(el));
  } else {
    // Fallback caso não suporte
    revealElements.forEach((el) => el.classList.add("reveal-visible"));
  }
}

/**
 * Estilização Dinâmica da Navbar no Scroll
 */
function initNavbarScroll() {
  const navbar = document.getElementById("main-navbar");
  if (!navbar) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar.classList.add("shadow-lg", "shadow-black/50", "bg-opacity-95");
      navbar.classList.remove("bg-opacity-80");
    } else {
      navbar.classList.remove("shadow-lg", "shadow-black/50", "bg-opacity-95");
      navbar.classList.add("bg-opacity-80");
    }
  });
}

/**
 * Atualiza o ano no rodapé automaticamente
 */
function initCurrentYear() {
  const yearSpan = document.getElementById("current-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}

/**
 * Funções do Modal de Visualização de Projetos
 */
function openMockupModal(imgSrc, title, category, description, waMessage) {
  const modal = document.getElementById("mockup-modal");
  const modalImg = document.getElementById("modal-img");
  const modalTitle = document.getElementById("modal-title");
  const modalCategory = document.getElementById("modal-category");
  const modalDesc = document.getElementById("modal-desc");
  const modalWaBtn = document.getElementById("modal-wa-btn");

  if (!modal) return;

  modalImg.src = imgSrc;
  modalTitle.textContent = title;
  modalCategory.textContent = category;
  modalDesc.textContent = description;
  modalWaBtn.href = getWhatsAppUrl(waMessage || WHATSAPP_CONFIG.planMessages.portfolio);

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.style.overflow = "hidden";
}

function closeMockupModal() {
  const modal = document.getElementById("mockup-modal");
  if (!modal) return;

  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.style.overflow = "auto";
}

// Fechar modal ao clicar fora ou apertar ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMockupModal();
});

document.addEventListener("click", (e) => {
  const modal = document.getElementById("mockup-modal");
  if (modal && e.target === modal) {
    closeMockupModal();
  }
});

