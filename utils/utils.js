import scrollToComponent from 'react-scroll-to-component-ssr';

export function scrollTo(id, name = false, shift) {
  const node = document.getElementById(id)

  if (node) {
    scrollToComponent(node, {
      offset: shift || -20,
      align: 'top',
      duration: 500
    });
  }
}

export function isXs() { return window.innerWidth < 768; } 

export function isSm() { return window.innerWidth < 992; } 