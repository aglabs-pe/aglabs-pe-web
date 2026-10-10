// (function () {
//   const o = document.createElement("link").relList;
//   if (o && o.supports && o.supports("modulepreload")) return;
//   for (const e of document.querySelectorAll('link[rel="modulepreload"]')) n(e);
//   new MutationObserver((e) => {
//     for (const t of e)
//       if (t.type === "childList")
//         for (const c of t.addedNodes)
//           c.tagName === "LINK" && c.rel === "modulepreload" && n(c);
//   }).observe(document, { childList: !0, subtree: !0 });
//   function r(e) {
//     const t = {};
//     return (
//       e.integrity && (t.integrity = e.integrity),
//       e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy),
//       e.crossOrigin === "use-credentials"
//         ? (t.credentials = "include")
//         : e.crossOrigin === "anonymous"
//           ? (t.credentials = "omit")
//           : (t.credentials = "same-origin"),
//       t
//     );
//   }
//   function n(e) {
//     if (e.ep) return;
//     e.ep = !0;
//     const t = r(e);
//     fetch(e.href, t);
//   }
// })();
// const a = () => {
//     const s = document.querySelectorAll(".stat-item h3"),
//       o = new IntersectionObserver(
//         (r) => {
//           r.forEach((n) => {
//             if (n.isIntersecting) {
//               const e = n.target,
//                 t = e.textContent;
//               if (/^\d+/.test(t)) {
//                 const d = parseInt(t.match(/\d+/)[0]),
//                   l = t.replace(/^\d+/, "");
//                 u(e, d, l);
//               }
//               o.unobserve(e);
//             }
//           });
//         },
//         { threshold: 0.5 },
//       );
//     s.forEach((r) => o.observe(r));
//   },
//   u = (s, o, r) => {
//     let n = 0;
//     const e = () => {
//       ((n += o / 50),
//         n >= o
//           ? (s.textContent = o + r)
//           : ((s.textContent = Math.floor(n) + r), requestAnimationFrame(e)));
//     };
//     requestAnimationFrame(e);
//   };
// document.addEventListener("DOMContentLoaded", a);
// const m = document.getElementById("join-demo-button"),
//   i = document.getElementById("demo-form-modal"),
//   f = document.getElementById("close-demo-form");
// m.addEventListener("click", () => {
//   i.style.display = "flex";
// });
// f.addEventListener("click", () => {
//   i.style.display = "none";
// });
// window.addEventListener("click", (s) => {
//   s.target === i && (i.style.display = "none");
// });

// function playVideo(overlayId, videoId) {
//   document.getElementById(overlayId).classList.add("active");
//   const iframe = document.getElementById(videoId);
//   const src = iframe.getAttribute("src");
//   iframe.setAttribute("src", src);
// }

// document.querySelectorAll(".play-trigger, .play-btn").forEach((el) => {
//   el.addEventListener("click", () => {
//     playVideo(el.dataset.overlay, el.dataset.video);
//   });
// });

// function playVideo(overlayId, videoId) {
//   const videoOverlay = document.getElementById(overlayId);
//   const video = document.getElementById(videoId);

//   videoOverlay.classList.add("active");

//   // Play the video
//   video.contentWindow.postMessage(
//     '{"event":"command","func":"playVideo","args":""}',
//     "*",
//   );

//   // Pause background animations
//   document.body.style.animationPlayState = "paused";
// }

// function closeVideo(overlayId, videoId) {
//   const videoOverlay = document.getElementById(overlayId);
//   const video = document.getElementById(videoId);

//   videoOverlay.classList.remove("active");

//   // Stop the YouTube video
//   video.contentWindow.postMessage(
//     '{"event":"command","func":"stopVideo","args":""}',
//     "*",
//   );

//   // Resume background animations
//   document.body.style.animationPlayState = "running";
// }

// // Close video when clicking outside
// document.querySelectorAll(".video-overlay").forEach((overlay) => {
//   overlay.addEventListener("click", function (e) {
//     if (e.target === this) {
//       const videoId = this.querySelector("iframe").id;
//       closeVideo(this.id, videoId);
//     }
//   });
// });

// // Close video with Escape key
// document.addEventListener("keydown", function (e) {
//   if (e.key === "Escape") {
//     document.querySelectorAll(".video-overlay.active").forEach((overlay) => {
//       const videoId = overlay.querySelector("iframe").id;
//       closeVideo(overlay.id, videoId);
//     });
//   }
// });
function playVideo(overlayId, videoId) {
  const videoOverlay = document.getElementById(overlayId);
  const video = document.getElementById(videoId);

  if (!videoOverlay || !video) return;

  videoOverlay.classList.add("active");

  video.contentWindow.postMessage(
    '{"event":"command","func":"playVideo","args":""}',
    "*",
  );

  document.body.style.animationPlayState = "paused";
}

function closeVideo(overlayId, videoId) {
  const videoOverlay = document.getElementById(overlayId);
  const video = document.getElementById(videoId);

  if (!videoOverlay || !video) return;

  videoOverlay.classList.remove("active");

  video.contentWindow.postMessage(
    '{"event":"command","func":"stopVideo","args":""}',
    "*",
  );

  document.body.style.animationPlayState = "running";
}

document.querySelectorAll(".play-trigger, .play-btn").forEach((el) => {
  el.addEventListener("click", () => {
    playVideo(el.dataset.overlay, el.dataset.video);
  });
});

document.querySelectorAll(".video-overlay").forEach((overlay) => {
  overlay.addEventListener("click", function (e) {
    if (e.target === this) {
      const iframe = this.querySelector("iframe");
      if (iframe) closeVideo(this.id, iframe.id);
    }
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".video-overlay.active").forEach((overlay) => {
      const iframe = overlay.querySelector("iframe");
      if (iframe) closeVideo(overlay.id, iframe.id);
    });
  }
});
