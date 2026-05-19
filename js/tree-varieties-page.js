const treesData = {
  apple: {
    title: "Яблуня",
    heroTitle: "Яблуня",
    heroSubtitle: "Знайдіть найкращий сорт саме для вашого саду",

    varieties: [
      {
        name: "Антонівка",
        tags: ["winter", "fresh"],
        labels: ["Зимове зберігання", "Свіже вживання"],
        description:
          "Класичний сорт із кисло-солодким смаком. Добре зберігається та підходить для переробки."
      },

      {
        name: "Симиренко",
        tags: ["winter", "fresh"],
        labels: ["Зимове зберігання", "Свіже вживання"],
        description:
          "Популярний зимовий сорт із соковитими плодами та гарною лежкістю."
      },

      {
        name: "Білий налив",
        tags: ["early", "fresh"],
        labels: ["Раннє достигання", "Свіже вживання"],
        description:
          "Ранній літній сорт із ніжною м’якоттю та характерною кислинкою."
      },

      {
        name: "Папіровка",
        tags: ["early", "conservation"],
        labels: ["Раннє достигання", "Концервація"],
        description:
          "Добре підходить для соків, джемів та домашньої переробки."
      },

      {
        name: "Голден",
        tags: ["fresh"],
        labels: ["Свіже вживання"],
        description:
          "Солодкий сорт із м’яким ароматом та приємною текстурою."
      },

      {
        name: "Фуджі",
        tags: ["fresh", "winter"],
        labels: ["Свіже вживання", "Зимове зберігання"],
        description:
          "Дуже солодкі яблука з хрусткою м’якоттю."
      },

      {
        name: "Чемпіон",
        tags: ["fresh"],
        labels: ["Свіже вживання"],
        description:
          "Популярний десертний сорт із гарним ароматом."
      },

      {
        name: "Пінова",
        tags: ["winter"],
        labels: ["Зимове зберігання"],
        description:
          "Відмінно лежить взимку та довго не втрачає смакові властивості."
      }
    ]
  },

  pear: {
    title: "Груша",
    heroTitle: "Груша",
    heroSubtitle: "Найкращі сорти груш для вашого саду",

    varieties: [
      {
        name: "Конференція",
        tags: ["fresh"],
        labels: ["Свіже вживання"],
        description:
          "Солодкий і дуже популярний сорт."
      },

      {
        name: "Талгарська красуня",
        tags: ["winter"],
        labels: ["Зимове зберігання"],
        description:
          "Добре переносить зберігання."
      },

      {
        name: "Лісова красуня",
        tags: ["early"],
        labels: ["Раннє достигання"],
        description:
          "Соковитий літній сорт."
      }
    ]
  },

  cherry: {
    title: "Вишня",
    heroTitle: "Вишня",
    heroSubtitle: "Підберіть найкращу вишню",

    varieties: [
      {
        name: "Шпанка",
        tags: ["conservation"],
        labels: ["Концервація"],
        description:
          "Чудово підходить для варення."
      },

      {
        name: "Любська",
        tags: ["fresh"],
        labels: ["Свіже вживання"],
        description:
          "Популярна кисло-солодка вишня."
      }
    ]
  },

  "sweet-cherry": {
    title: "Черешня",
    heroTitle: "Черешня",
    heroSubtitle: "Найкращі сорти черешні",

    varieties: [
      {
        name: "Валерій Чкалов",
        tags: ["early"],
        labels: ["Раннє достигання"],
        description:
          "Один із найпопулярніших ранніх сортів."
      },

      {
        name: "Дрогана жовта",
        tags: ["fresh"],
        labels: ["Свіже вживання"],
        description:
          "Жовта солодка черешня."
      }
    ]
  },

  plum: {
    title: "Слива",
    heroTitle: "Слива",
    heroSubtitle: "Найкращі сорти слив",

    varieties: [
      {
        name: "Стенлей",
        tags: ["conservation"],
        labels: ["Концервація"],
        description:
          "Один із найкращих сортів для сушіння."
      }
    ]
  },

  apricot: {
    title: "Абрикос",
    heroTitle: "Абрикос",
    heroSubtitle: "Підберіть ідеальний сорт",

    varieties: [
      {
        name: "Краснощокий",
        tags: ["fresh"],
        labels: ["Свіже вживання"],
        description:
          "Великий і солодкий сорт."
      }
    ]
  },

  peach: {
    title: "Персик",
    heroTitle: "Персик",
    heroSubtitle: "Найкращі персики",

    varieties: [
      {
        name: "Редхейвен",
        tags: ["fresh"],
        labels: ["Свіже вживання"],
        description:
          "Дуже популярний сорт."
      }
    ]
  },

  quince: {
    title: "Айва",
    heroTitle: "Айва",
    heroSubtitle: "Підбір сортів айви",

    varieties: [
      {
        name: "Мармурова",
        tags: ["decorative"],
        labels: ["Декоративні"],
        description:
          "Красивий декоративний сорт."
      }
    ]
  }
};

const params = new URLSearchParams(window.location.search);
const currentTree = params.get("tree") || "apple";

const tree = treesData[currentTree];

document.getElementById("hero-title").textContent =
  tree.heroTitle;

document.getElementById("hero-subtitle").textContent =
  tree.heroSubtitle;

document.getElementById("breadcrumb-tree").textContent =
  tree.title;

document.getElementById("tree-title").textContent =
  `Популярні сорти `
  
document.getElementById("hero-tree-name").textContent =
  tree.title;

const grid = document.getElementById("tree-grid");

function renderCards(filter = "all") {

  grid.innerHTML = "";

  const filtered = tree.varieties.filter(item => {
    if(filter === "all") return true;

    return item.tags.includes(filter);
  });

  filtered.forEach(item => {

    const card = document.createElement("div");

    card.className = "tree-card";

    card.innerHTML = `
      <div class="card-image">

  <img
    src="./assets/tree-varieties-page/tree-silhouette.png"
    alt="tree"
    class="tree-silhouette"
  >

</div>

      <div class="card-content">

        <h3>${item.name}</h3>

        <div class="badges">
          ${item.labels
            .map(label => `<span class="badge">${label}</span>`)
            .join("")}
        </div>

        <p>${item.description}</p>

      </div>
    `;

    grid.appendChild(card);
  });
}

renderCards();

document.querySelectorAll(".filter-buttons button")
.forEach(button => {

  button.addEventListener("click", () => {

    document
      .querySelectorAll(".filter-buttons button")
      .forEach(btn => btn.classList.remove("active"));

    button.classList.add("active");

    renderCards(button.dataset.filter);
  });

});