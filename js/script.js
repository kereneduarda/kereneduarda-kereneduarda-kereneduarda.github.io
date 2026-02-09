// toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}
 

// scroll sections
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');


        if(top >= offset && top < offset + height) {
            //active navbar links
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
            // active sections para animacao on scrolls
            sec.classList.add('show-animate');
        }
        // se quiser usar animacao para repetir no scroll usa isso
        else {
            sec.classList.remove('show-animate');
        }
    })

    // sticky header
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    // remove toggle icon and navbar when click navbar links (scroll)
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

    // animacao rodape on scroll
    let rodape = document.querySelector('footer');

    rodape.classList.toggle('show-animate', this.innerHeight + this.scrollY >= document.scrollingElement.scrollHeight);
}

    // leia mais sobre mim
    const btn = document.querySelector('.leia-mais');
    const textoExtra = document.querySelector('.sobre-extra');

    btn.addEventListener('click', () => {
        if (textoExtra.style.display === 'none') {
        textoExtra.style.display = 'block';
        btn.textContent = 'Leia menos';
        } else {
        textoExtra.style.display = 'none';
        btn.textContent = 'Leia mais';
        }
    });

    // envio + popup
    const form = document.getElementById("form-contato");
const popup = document.getElementById("popup-sucesso");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  emailjs.sendForm(
    "service_im52q3o",
    "template_0qt0i8q",
    this,
    "a5EAC_9Kv0oYgUaJ3" // 🔥 PUBLIC KEY AQUI
  )
  .then(() => {
    form.reset();
    popup.classList.add("ativo");
  })
  .catch((error) => {
    console.error("EmailJS error:", error);
    alert("Erro ao enviar. Tente novamente.");
  });
});

  // fechar popup
  document.getElementById("fechar-popup").addEventListener("click", () => {
    document
      .getElementById("popup-sucesso")
      .classList.remove("ativo");
  });