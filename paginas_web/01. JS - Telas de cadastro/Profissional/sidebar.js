
document.querySelectorAll('.container-submenu > a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const parentLi = this.parentElement;
      parentLi.classList.toggle('open');
    });
});
