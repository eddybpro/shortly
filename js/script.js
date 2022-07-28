const burger = document.getElementById('burger');
const lists = document.querySelector('.ul-lists');
const login = document.querySelector('.login');
const lineF = document.querySelector('.line-1')
const lineS = document.querySelector('.line-2')
const lineT = document.querySelector('.line-3')
const links = document.querySelectorAll('.nav-link')
const shortDiv = document.getElementById('short-link');
const shortenIt = document.getElementById('short-it');
const urlInput = document.getElementById('url');
const urlBurger = document.getElementById('burger-url');
const apiURL = 'https://api.shrtco.de/v2//shorten';

burger.addEventListener('click', ()=>{
    lists.classList.toggle('none');
    login.classList.toggle('none');
    lineF.classList.toggle('line-11')
    lineS.classList.toggle('line-22')
    lineT.classList.toggle('line-33')
})

links.forEach(element => {
    element.addEventListener('click', ()=>{
        lists.classList.toggle('none');
        login.classList.toggle('none');
        lineF.classList.toggle('line-11')
        lineS.classList.toggle('line-22')
        lineT.classList.toggle('line-33')
    })
});

//check if url is valid.
function testIfValidURL(str) {
    const pattern = new RegExp(
      "^https?:\\/\\/" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
  
    return !!pattern.test(str);
}

let count = 0;

shortenIt.addEventListener('click',()=>{
    count++;
    console.log(count)
    shortDiv.style.backgroundColor='#fff';
    urlBurger.classList.toggle('show');

    if (testIfValidURL(urlInput.value)) {
        const li = document.createElement('li');
        li.className= 'short-link-sub';
        li.classList.add(count);
        const secondDiv = document.createElement('div');
        secondDiv.className = 'btn-burger';
        

        const btn = document.createElement('button');
        btn.id = 'short-link-btn';
        btn.className='short-link-btn';
        btn.classList.add(`btn-${count}`);
        
        const text = document.createTextNode('copy');
        btn.append(text)
        
        const burgerDiv = document.createElement('div');
        burgerDiv.className='burger-link';
        

        const spanA = document.createElement('span');
        spanA.className='line-1';
        const spanB = document.createElement('span');
        spanB.className='line-2';


        const input = document.createElement('input');
        input.className = 'short-link-link';
        input.classList.add(`link-${count}`)
        
        
        shortDiv.append(li);
        li.append(input);
        li.append(btn);
        li.append(secondDiv);
        secondDiv.append(burgerDiv);
        burgerDiv.append(spanA);
        burgerDiv.append(spanB);
        
        
        fetchValidLink().then(response=> {console.log(response)
                input.value = response.result.full_short_link 
            })
            
            btn.addEventListener('click', copyToClipBoard);

            function copyToClipBoard(e) {
                if(e.target && e.target.id=='short-link-btn' ){
                    console.log(input.value)
                    btn.textContent='copied'
                    
                    input.select();
                    document.execCommand("copy");
                    
                }
                
            }
            console.log('valid link')

            burgerDiv.addEventListener("click",removeDiv);

            function removeDiv(){
                if (count) {
                    li.remove();
                    shortDiv.querySelector(`.link-${count}`).style.backgroundColor = 'transparent';
                }
            
                }
                
    }else{
        urlInput.value = 'Invalid Link!';
        urlInput.classList.toggle('redColorr');
    }

});

function fetchValidLink(){
    const encodedParams = new URLSearchParams();
    encodedParams.append("url",`${urlInput.value}` );

    const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
	},
	body: encodedParams
    };

    return fetch(`${apiURL}`, options)
	    .then(response => response.json())
	    .then(responseData =>{
            console.log(responseData)
            return responseData})
	    .catch(err => console.error(err)); 
    
}

urlBurger.addEventListener('click',()=>{
    urlInput.value ='';
    urlBurger.classList.toggle('show');
    urlInput.classList.toggle('redColorr');
})
























