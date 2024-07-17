document.addEventListener('DOMContentLoaded', () => {
    const recipies = JSON.parse(localStorage.getItem('recipies')) || [];
    const list = document.getElementById('recipies');
    const recipieForm = document.getElementById('recipieForm');
    const search = document.getElementById('searchTerm');
    const modal = document.getElementById('recipieModal');
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
  
    const addRecipie = () => {
      const title = document.getElementById('title').value;
      const ingredients = document.getElementById('ingredients').value;
      const instructions = document.getElementById('instructions').value;
      const time = document.getElementById('time').value;
      if (title && ingredients && instructions && time) {
        const data = { title, ingredients, instructions, time };
        recipies.push(data);
        localStorage.setItem('recipies', JSON.stringify(recipies));
        displayRecipies();
        recipieForm.reset();
        closeModal();
      }
    };
  
    const displayRecipies = (searchTerm = '') => {
      list.innerHTML = '';
      for (let i = recipies.length - 1; i >= 0; i--) {
        if (recipies[i].title.toLowerCase().includes(searchTerm.toLowerCase())) {
          const data = recipies[i];
          const li = document.createElement('li');
          li.innerHTML = `
            <h3>${data.title}</h3>
            <p>Ingredients: ${data.ingredients}</p>
            <p>Instructions: ${data.instructions}</p>
            <p>Time: ${data.time} minutes</p>
            <button class="edit_btn" data-index="${i}">Edit</button>
            <button class="delete_btn" data-index="${i}">Delete</button>
          `;
          list.appendChild(li);
        }
      }
  
      document.querySelectorAll('.delete_btn').forEach(button => {
        button.addEventListener('click', (event) => {
          const index = event.target.getAttribute('data-index');
          deleteRecipie(index);
        });
      });
  
      document.querySelectorAll('.edit_btn').forEach(button => {
        button.addEventListener('click', (event) => {
          const index = event.target.getAttribute('data-index');
          editRecipie(index);
        });
      });
    };
  
    const deleteRecipie = (index) => {
      recipies.splice(index, 1);
      localStorage.setItem('recipies', JSON.stringify(recipies));
      displayRecipies(search.value);
    };
  
    const editRecipie = (index) => {
      const recipie = recipies[index];
      document.getElementById('title').value = recipie.title;
      document.getElementById('ingredients').value = recipie.ingredients;
      document.getElementById('instructions').value = recipie.instructions;
      document.getElementById('time').value = recipie.time;
      deleteRecipie(index);
      openModal();
    };
  
    search.addEventListener('input', () => {
      displayRecipies(search.value);
    });
  
    const openModal = () => {
      modal.style.display = 'block';
    };
  
    const closeModal = () => {
      modal.style.display = 'none';
    };
  
    openModalBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);
  
    window.addEventListener('click', (event) => {
      if (event.target == modal) {
        closeModal();
      }
    });
  
    recipieForm.addEventListener('submit', (event) => {
      event.preventDefault();
      addRecipie();
    });
  
    displayRecipies();
  });
  