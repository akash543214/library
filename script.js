


//const bk = [];
//localStorage.setItem('bk', JSON.stringify(bk));

const addBook = document.querySelector('#addBookBtn');
const modal = document.getElementById('addBookModal');
const overlay = document.getElementById('overlay');
const bookCard = document.querySelectorAll('.book-card');
const bookGrid = document.querySelector('.books-grid');
const submitBtn = document.getElementById('submitBtn');


const bk = JSON.parse(localStorage.getItem('bk'));

if(!bk)
{
  const tmp = [];
  localStorage.setItem('bk', JSON.stringify(tmp));
  bk = [];
}
else
{
  renderBookCards();
}
class Book {
   
  constructor(title, author, pages)
   {
      this.title = title;
      this.author = author;
      this.pages = pages;
  }
}

function createBook(title,author,pages)
{
  const newBook = new Book(title,author,pages);
  bk.push(newBook);
  renderBookCards();
  localStorage.setItem('bk', JSON.stringify(bk));

}

function createCard(title,author,pages,ind)
{
const bookCard = document.createElement('div');
bookCard.className = 'book-card';
bookCard.innerHTML = `
<p>${title}</p>
<p>${author}</p>
<p>${pages}</p>
<div class="button-group">
  <button class="btn btn-light-red" id = "readBtn">Not read</button>
  <button class="btn removeBtn">Remove</button>
</div>
`;
bookCard.index=ind;
const bookGrid = document.querySelector('.books-grid');
bookGrid.appendChild(bookCard);
}


function renderBookCards()
{

  bookGrid.innerHTML='';
  let index=0;
  bk.forEach((item)=>{
    createCard(item.title,item.author,item.pages,index);
    index++;
    })
}

document.body.addEventListener('click',(e)=>{
  if(e.target.closest('#addBookModal') || e.target.id==="addBookBtn")
  return;
  
  modal.className = "modal";
 overlay.className = "overlay";
})


submitBtn.addEventListener('click',(e)=>{
  e.preventDefault();

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;

  if(title=="" || author=="")
 { 
  alert("fields can't be empty");
  return;

}

  createBook(title,author,pages);
  document.getElementById('title').value="";
document.getElementById('author').value="";
document.getElementById('pages').value="";
  modal.className = "modal";
  overlay.className = "overlay";
})


addBook.addEventListener('click',()=>{
  modal.className = "modal active";
  overlay.className = "overlay active";
 
 })


bookGrid.addEventListener('click',(e)=>{

  if(e.target.className==="btn removeBtn")
  {
  const card = e.target.parentNode.parentNode;
  let indexToDelete = card.index;
  bk.splice(indexToDelete,1);
  renderBookCards();
  localStorage.setItem('bk', JSON.stringify(bk));
  }
  else if(e.target.className==="btn btn-light-red")
  {
    const readBtn = document.getElementById('readBtn');

    if(readBtn.textContent=="Not read")
    {
    readBtn.setAttribute("style", "background-color: #9fff9c;");
    readBtn.textContent = "Read";
    }
    else
    {
      readBtn.setAttribute("style", "background-color: #ff9c9c;");
      readBtn.textContent = "Not read";
    }
  }
})


