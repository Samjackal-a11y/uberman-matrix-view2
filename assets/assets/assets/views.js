// assets/views.js
export function switchView(view){
  const urls = {
    story: "https://sites.google.com/view/uberman-blueprint--ethics/story-prologue",
    matrix: "https://samjackal-a11y.github.io/uberman-matrix-view2/",
    fusion: "https://sites.google.com/view/uberman-blueprint--ethics/license-ethics"
  };
  window.location.href = urls[view];
}
