const apiUrl='http://34.168.80.42:3001/roadmap/job';
// const data = {
//     "job": "풀스택 개발자",
//     "category": "웹 개발"
// };
let params_job = new URLSearchParams(window.location.search);

let data = {
    "job": params_job.get('job')||"*",
    "category": JSON.parse(params_job.get('category')||"*")
};

fetch(apiUrl, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
})
    .then(response => response.json())
    .then(result => {
        let datalist=result.roadmap;
        datalist=datalist.slice(0,4);


        datalist.forEach((item,index) => {
            const jobRoadmap = document.getElementById(`job-roadmap${index}`);
            jobRoadmap.style.display = 'flex';
            jobRoadmap.style.flexDirection='column';
            jobRoadmap.style.justifyContent = 'space-between';
            
            let contentMain=document.createElement('div');
            contentMain.className='content-main';

            let linkElement = document.createElement('a');
            linkElement.href = item.link;
            linkElement.style.textDecoration = 'none';
            linkElement.style.display = 'block'; // a 요소를 블록 레벨로 설정
            linkElement.target = '_blank'; // 링크를 새 탭 또는 새 창에서 열도록 설정
            let nameElement = document.createElement('div');
            nameElement.textContent = item.name;
            nameElement.style.marginBottom = '3px'; // margin-bottom을 10px로 설정
            nameElement.style.color = 'black';
            nameElement.style.fontSize = 'small';
            linkElement.appendChild(nameElement);

            let logoElement = document.createElement('img');
            logoElement.src = item.image;
            logoElement.style.marginTop = '5px'; // margin-bottom을 10px로 설정
            logoElement.style.marginLeft = 'auto'; // 좌우 기준으로 가운데 정렬
            logoElement.style.marginRight = 'auto'; 
            logoElement.style.alignItems='center';
            logoElement.width = 70; // 가로 너비를 200px로 설정

            jobRoadmap.appendChild(logoElement);
            jobRoadmap.appendChild(linkElement);

        });


    })
    .catch(error => {
    console.error('Error:', error);
    });
