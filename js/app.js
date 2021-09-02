// Load Search Data
const searchBook =()=>{
    const searchInput = document.getElementById('search-field');
    const searchValue = searchInput.value;
    
    if(searchValue ===''){
        
        const noResultField = document.getElementById('empty-result');
        noResultField.style.display = 'block';
        
    }else{
        const url = `https://openlibrary.org/search.json?q=${searchValue}`
        fetch(url)
        .then(res => res.json())
        .then(data => getBook(data))
    }
   
}



// Handel Empty Search Result Element
const showSearchCount = searchCount => {
    document.getElementById('search-number').innerText = searchCount;
    document.getElementById('search-count').style.visibility = 'visible';
    const searchInput = document.getElementById('search-field');
    const noResultField = document.getElementById('no-result');
    if(searchCount === 0){
        const searchValue = searchInput.value;
        noResultField.style.display = 'block';
        noResultField.innerText = `Your search - "${searchValue}" - did not match any documents.`
    }else{
        noResultField.style.display = 'none';
        document.getElementById('empty-result').style.display = 'none';
    }
}




// Get Book Details
const getBook = books =>{
    const numFound = books.numFound;
    showSearchCount(numFound);
    const container =  document.getElementById('search-result');
    container.textContent = '';
    
    books.docs.forEach(book=>{
        console.log(book)
        const bookTitle = book.title;
        // const bookAuthor = book.author_name[0];
        const firstPublishYear = book.first_publish_year;
       
        const coverILink = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;

        const img = `<img id="card-img" src="${coverILink}" class="card-img-top" alt="Cover-image">`;
        
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
         <div class="card h-100">
         ${book.cover_i ? img : ''}
         <div class="card-body">
                <h4 class="card-title" id="book-title">${bookTitle}</h4>
                <h6 class="card-text"> <span id="book-author"></span>${book.author_name ? 'Author:'+ book.author_name[0] : ''}</h6>


                <h6 id="book-published-year" class="card-text"> <span id="book-published">${book.first_publish_year? 'First Published:'+ book.first_publish_year : ''}</span></h6>
         </div>
         </div>
        `;
         container.appendChild(div);
    })

}




// // Handel Empty Publish Year Element
// const isEmptyPublishedYear = () =>{
//     document.getElementById('book-published-year').style.display = 'none';
// }

// // Handel Empty Cover Image Source Element
// const isEmptyCoverImg = () =>{
//     document.getElementById('card-img').style.display = 'none';
// }