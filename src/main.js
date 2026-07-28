// ============================================
// ASCII Particle System
// ============================================
class AsciiParticle {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.particles = [];
    this.asciiChars =
      "░▒qwertyuiopasdfghjkl;'zxcvbnm/1234567890!@#$%^&*()_+|~}{[]:/?.";
    this.resize();
    this.init();
    window.addEventListener("resize", () => this.resize());
    this.animate();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  init() {
    this.particles = [];
    const particleCount = Math.floor(
      (this.canvas.width * this.canvas.height) / 15000,
    );

    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        char: this.asciiChars[
          Math.floor(Math.random() * this.asciiChars.length)
        ],
        opacity: Math.random() * 0.5 + 0.1,
        size: Math.random() * 8 + 10,
        life: Math.random() * 200 + 100,
        maxLife: 300,
      });
    }
  }

  animate = () => {
    this.ctx.fillStyle = "rgba(10, 14, 39, 0.1)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach((particle, index) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life--;
      particle.opacity =
        (particle.life / particle.maxLife) * (Math.random() * 0.5 + 0.1);

      // Wrap around edges
      if (particle.x < 0) particle.x = this.canvas.width;
      if (particle.x > this.canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = this.canvas.height;
      if (particle.y > this.canvas.height) particle.y = 0;

      // Reset if life is over
      if (particle.life <= 0) {
        particle.x = Math.random() * this.canvas.width;
        particle.y = Math.random() * this.canvas.height;
        particle.life = particle.maxLife;
        particle.char =
          this.asciiChars[Math.floor(Math.random() * this.asciiChars.length)];
      }

      // Draw particle
      this.ctx.fillStyle = `rgba(0, 212, 255, ${particle.opacity})`;
      this.ctx.font = `${particle.size}px monospace`;
      this.ctx.fillText(particle.char, particle.x, particle.y);
    });

    requestAnimationFrame(this.animate);
  };
}

// ============================================
// Service Details Data
// ============================================
const serviceDetails = {
  academy: {
    title: "آکادمی برنامه نویسی",
    description: `اولین دوره آموزشی تعاملی تولید محصول هوش مصنوعی

به جای ارسال رزومه محصولت رو بساز...

در این دوره ما شما رو بدون هیچ تجربه ای وارد پروژه با یه محصول واقعی میکنیم صفر تا صد. هم یاد میگیری هم خودت میسازیش. در انتها شما یه تیم با مهارت های مختلف و یه محصول واقعی خواهید بود.

<strong>برا چه کسی مناسبه؟</strong>

<strong>دوره مقدماتی:</strong> ورود به بازار کار رقابتی/فریلنسری. جمع کردن رزومه کاری.

<strong>دوره متوسط:</strong> افراد دارای تجربه. مبانی پیشرفته تر و ارتقاع شغلی.

<strong>دوره پیشرفته:</strong> مفاهیم بروز دنیای تک برای ارتقا به استاندارد های بین الملی

<strong style="color: #00d4ff;">برای اطلاعات ثبت‌نام و نحوه یادگیری:</strong>
با ما تماس بگیرید از طریق <strong>تلگرام</strong> یا <strong>ایمیل</strong> تا جزئیات کامل و راهنمایی شخصی دریافت کنید.`,
    features: [
      "<strong>دوره‌های جامع:</strong> از مبتدی تا سطح حرفه‌ای در برنامه‌نویسی و هوش مصنوعی",
      "<strong>پروژه‌های عملی:</strong> یادگیری از طریق ساخت پروژه‌های واقعی و کاربردی",
      "<strong>مدرسان متخصص:</strong> مدرس با تجربه در شرکت‌های بزرگ دنیا",
      "<strong>محیط تعاملی:</strong> حل تمرین‌ها و دریافت بازخورد فوری",
      "<strong>نتایج معتبر:</strong> به جای تماشا کردن هوش مصنوعی وارد ساختنش شو",
    ],
  },
  startup: {
    title: "استارتاپ",
    description: `تبدیل ایده‌های خلاقانه به محصول نهایی و واقعی که می‌تواند در بازار موفق باشد.
    ما از مرحله تحقیق و طراحی تا توسعه، آزمایش و راه‌اندازی، تمام مراحل پروژه استارتاپی را مدیریت می‌کنیم.
    تجربه ما در راه‌اندازی محصول‌های متعدد ضمانت می‌دهد که استارتاپ شما با بنیاد محکم شروع شود.`,
    features: [
      "<strong>تحقیق بازار:</strong> تحلیل جامع بازار و شناسایی فرصت‌های سودآور",
      "<strong>طراحی محصول:</strong> ایجاد نمونه اولیه و تست ایده‌ها قبل از توسعه کامل",
      "<strong>توسعه سریع:</strong> ساخت MVP (محصول کمینه قابل عرضه) در کمترین زمان",
    ],
  },
  freelance: {
    title: "فریلنس",
    description: `راه‌حل‌های خلاقانه و پیشرفته برای چالش‌های فنی شما در کمترین زمان ممکن.
    تیم متخصص ما می‌تواند برای پروژه‌های پیچیده و توسعه سریع یا حل مسائل فوری مورد استفاده قرار گیرد.
    با انعطاف‌پذیری بالا و توجه به کیفیت، ما تحویل سریع و نتایج درخشان تضمین می‌کنیم.`,
    features: [
      "<strong>پروژه‌های پیچیده:</strong> حل مسائل فنی و پروژه‌های پیچیده در سریع ترین حالت ممکن",
      "<strong>توسعه سریع:</strong> پیاده‌سازی فیچرها و ایده‌های جدید",
      "<strong>انعطاف‌پذیری:</strong> کار بر اساس نیاز و برنامه زمانی شما",
      "<strong>کیفیت بالا:</strong> نتایج حرفه‌ای با کد تمیز و قابل نگهداری",
      "<strong>پشتیبانی فوری:</strong> پاسخ سریع به مسائل و تغییرات درخواستی",
    ],
  },
  research: {
    title: "تحقیق و توسعه",
    description: `تحقیق عمیق و توسعه برای ایجاد محتوای نوآورانه و همگام سازی با تازه‌ترین تکنولوژی‌های جهان، به‌ویژه در حوزه هوش مصنوعی.
    ما بر روی روند‌های جدید، الگوریتم‌های پیشرفته و ابزار‌های نوین تحقیق می‌کنیم تا بتوانیم شما را با بهترین راه‌حل‌ها تجهیز کنیم.
    فعالیت‌های R&D ما سازمان شما را در خط اول نوآوری قرار می‌دهد.`,
    features: [
      "<strong>تحقیق علمی:</strong> بررسی جدیدترین نظریه‌ها و روند‌های علمی",
      "<strong>هوش مصنوعی:</strong> تحقیق در مورد الگوریتم‌های ML و Deep Learning",
      "<strong>نمونه‌سازی:</strong> ساخت نمونه‌های کاری (PoC) برای فناوری‌های جدید",
      "<strong>گزارش تفصیلی:</strong> ارائه یافته‌های تحقیق با توصیه‌های عملی",
      "<strong>انتقال فناوری:</strong> کمک در پیاده‌سازی یافته‌های تحقیق در محصول",
    ],
  },
  consulting: {
    title: "مشاوره تکنولوژی",
    description: `راه‌کارهای هوشمند برای چالش‌های فنی و تکنولوژی شما با تجربه چندین سال در صنعت.
    متخصصان ما تحلیل دقیقی از وضعیت موجود انجام داده، مشکلات شناسایی می‌کنند و بهترین راه‌حل‌های سازگار با نیازهای شما ارائه می‌دهند.
    از طریق مشاوره راهبردی و عملی، ما سازمان شما را به سمت موفقیت تکنولوژی هدایت می‌کنیم.`,
    features: [
      "<strong>تحلیل وضعیت موجود:</strong> ارزیابی جامع سیستم‌ها و فرایند‌های فنی",
      "<strong>برنامه‌ریزی راهبردی:</strong> ایجاد نقشه راه برای تحول دیجیتالی",
      "<strong>انتخاب فناوری:</strong> پیشنهاد بهترین راه‌حل‌ها برای مسائل شما",
      "<strong>بهبود کارایی:</strong> افزایش بهره‌وری و کاهش هزینه‌های فنی",
      "<strong>آموزش و منتورینگ:</strong> آموزش تیم شما برای استقلال بیشتر",
    ],
  },
};

// ============================================
// DOM Elements
// ============================================
const serviceCards = document.querySelectorAll(".service-card");
const detailsSection = document.getElementById("detailsSection");
const detailContent = document.getElementById("detailContent");
const closeDetailsBtn = document.getElementById("closeDetails");

// ============================================
// Event Listeners
// ============================================
serviceCards.forEach((card) => {
  card.addEventListener("click", () => {
    const serviceType = card.dataset.service;
    showDetails(serviceType);
  });
});

closeDetailsBtn.addEventListener("click", () => {
  closeDetails();
});

// Close details when clicking outside
detailsSection.addEventListener("click", (e) => {
  if (e.target === detailsSection) {
    closeDetails();
  }
});

// Close with ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeDetails();
  }
});

// ============================================
// Functions
// ============================================
function showDetails(serviceType) {
  const service = serviceDetails[serviceType];

  if (!service) return;

  const featuresHtml = service.features
    .map((feature) => `<li>${feature}</li>`)
    .join("");

  detailContent.innerHTML = `
    <h2>${service.title}</h2>
    <p>${service.description}</p>
    <h3 style="color: var(--accent-color); font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem;">
      ویژگی‌های کلیدی
    </h3>
    <ul>
      ${featuresHtml}
    </ul>
  `;

  detailsSection.classList.remove("hidden");
  document.body.style.overflow = "hidden";

  // Smooth scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function closeDetails() {
  detailsSection.classList.add("hidden");
  document.body.style.overflow = "auto";
}

// ============================================
// Initialize
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  // Initialize ASCII Particle System
  const canvas = document.getElementById("particleCanvas");
  new AsciiParticle(canvas);

  // Add smooth scroll behavior
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Log initialization
  console.log("✨ aglabs-pe وب‌سایت بارگذاری شد");
});
