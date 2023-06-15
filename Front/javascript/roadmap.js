const apiUrl = 'http://34.168.80.42:3001/roadmap/main';
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        data.roadmap.forEach((item, index) => {
            let roadmapElement = document.getElementById(`roadmap${index}`);
            roadmapElement.style.display = 'flex';
            roadmapElement.style.flexDirection='column';
            roadmapElement.style.justifyContent = 'space-between';

            let linkElement = document.createElement('a');
            linkElement.href = item.link;
            linkElement.style.textDecoration = 'none';
            linkElement.style.display = 'block'; // a 요소를 블록 레벨로 설정
            linkElement.target = '_blank'; // 링크를 새 탭 또는 새 창에서 열도록 설정
        
            let nameElement = document.createElement('div');
            nameElement.textContent = item.name;
            nameElement.style.marginBottom = '10px'; // margin-bottom을 10px로 설정
            nameElement.style.color = 'black';
            nameElement.style.fontSize = 'small';

            linkElement.appendChild(nameElement); // nameElement를 linkElement의 자식으로 추가
            //roadmapElement.appendChild(linkElement); // linkElement를 roadmapElement에 추가
        
            let logoElement = document.createElement('img');
            logoElement.src = item.logo;
            logoElement.style.marginLeft = 'auto'; // 좌우 기준으로 가운데 정렬
            logoElement.style.marginRight = 'auto'; 
            logoElement.width = 70; // 가로 너비를 200px로 설정
            roadmapElement.appendChild(logoElement);
            roadmapElement.appendChild(linkElement); // linkElement를 roadmapElement에 추가

        });
        
    })
    .catch(error => console.error('Error:', error));

    