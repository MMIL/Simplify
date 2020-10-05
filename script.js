const inp = document.querySelector(".inp");
const btn = document.getElementById("btn");
const output = document.getElementById("out");
const clrBtn = document.getElementById("clr");
const result = document.getElementById("result");
const BASE_URL = 'rel.ink/';

// Local Storage
const getLocal = () => {
    let len = localStorage.length;
    if (len) {
        for (let i = len - 1; i >= 0; i--) {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);
            output.innerHTML += `
            <p>${key}</p>
            <a href='https://${value}' target='blank'>${value}</a>
            `;
        }
    }
}
const setLocal = (longUrl, shortUrl) => localStorage.setItem(`${longUrl}`, `${shortUrl}`);
const clearLocal = () => {
    localStorage.clear();
    output.innerHTML = '';
};

// Getting Local Data
getLocal();

// Clear Local Data
clrBtn.addEventListener("click", () => clearLocal());

// Send Request for Shorter Url
const test = (url) => {
    axios.post('https://rel.ink/api/links/', {
        url: `${url}`
    })
        .then(res => {
            showLink(res);
            inp.value = '';
            result.textContent = 'Url Generated Successfully';
        })
        .catch(err => {
            console.log("err", err);
            result.textContent = "Sorry the url you have entered is invaild or doesn\'t exist";
        });
}

// Validity of Input
btn.addEventListener("click", () => {
    const input = (inp.value).match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);

    if (input) {
        test(inp.value);
    }
    else {
        result.textContent = 'Please Enter a valid url';
    }
});

// Add Result
const showLink = (str) => {
    let link = `${BASE_URL}${str.data.hashid}`;
    output.innerHTML += `
    <div class="link-out">
    <p class="short">${str.data.url}</p>
    <a href='https://${link}' target='blank'>${link}</a>
    </div>
    
    `;
    
    // adding result to local storage
    setLocal(str.data.url, link);
}
// dark mode
const input = document.querySelector(".theme-switcher input");

input.addEventListener("change", (e) => {
  if (e.target.checked) {
    document.body.setAttribute("data-theme", "dark");
  } else {
    document.body.setAttribute("data-theme", "light");
  }
});
