let index = 0;
const sections = document.querySelectorAll('.carrossel section');
const totalSections = sections.length;

function showNextSection() {
    index = (index + 1) % totalSections;
    const offset = -index * 100;
    sections.forEach(section => {
        section.style.transform = `translateX(${offset}%)`;
    });
}

setInterval(showNextSection, 5000);
