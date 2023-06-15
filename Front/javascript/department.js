const apiUrl = 'http://34.168.80.42:3001/introduce?type=department';
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        
        data.data.forEach((item,index) => {

            let contentMain = document.getElementById(`department${index}`)

            let logoElement=contentMain.querySelector(`.image-box img`);
            logoElement.src=item.logo;
            let nameElement=contentMain.querySelector(`.content-box > p:nth-child(1)`)
            nameElement.textContent = item.d_name;
            let nameEngElement=contentMain.querySelector(`.content-box > p:nth-child(2)`)
            nameEngElement.textContent = item.d_name_e;
            let introElement=contentMain.querySelector(`.content-box > p:nth-child(3)`)
            introElement.textContent = item.intro;

            let homepage= contentMain.querySelector(`#departmentMain`);
            homepage.setAttribute('href', item.homepage);
            homepage.target='_blank';
            homepage.style.textDecoration='none';
            let abeek= contentMain.querySelector(`#abeek`);
            abeek.setAttribute('href', item.abeek);
            abeek.target='_blank';
            abeek.style.textDecoration='none';
        });
        
    })
    .catch(error => console.error('Error:', error));
