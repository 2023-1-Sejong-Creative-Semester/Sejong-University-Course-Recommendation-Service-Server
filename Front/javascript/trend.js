const apiUrl_trend='http://34.168.80.42:3001/trend/web';

fetch(apiUrl_trend)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let container=document.getElementById(`top3-wrapper`);
        let curIdx=0;

        const { stack: recruitStack, job: recruitJob } = data.recruit;
        const { stack: searchStack, job: searchJob} = data.search;
        const datalist = [recruitStack, recruitJob, searchStack, searchJob];
        // const logolist =[recruitStackLogo,recruitJobLogo,searchStackLogo,searchJobLogo ];

        function showData(){
            container.innerHTML='';
            const currentData=datalist[curIdx];
            // const currentLogo=logolist[curIdx];

            let titleElement=document.createElement('div');
                titleElement.setAttribute('style','font-size:1.2em; text-align: center; margin-top:10px');
                if (curIdx === 0) {
                    titleElement.textContent = 'TOP3 recruitStack';
                } else if (curIdx === 1) {
                    titleElement.textContent = 'TOP3 recruitJob';
                } else if(curIdx===2) {
                    titleElement.textContent = 'TOP3 searchStack';
                } else if(curIdx===3){
                    titleElement.textContent='TOP3 searchJob';
                }
            container.appendChild(titleElement);

            currentData.forEach(item => {
                // console.log(item);
                

                let dataContainer=document.createElement('div');
                dataContainer.className='top3-content';
                
                let dataElement=document.createElement('div');
                dataElement.setAttribute('style','font-size:medium; margin-left: 10%;');
                dataElement.textContent=item.name;

                let logoElement=document.createElement('img');
                logoElement.setAttribute('style','display:block;width:100px;shrink:0');
                logoElement.src=item.logo;

                dataContainer.appendChild(dataElement);
                dataContainer.appendChild(logoElement);
                container.appendChild(dataContainer);

            });
            curIdx=(curIdx+1)%datalist.length;
            setTimeout(showData,2000);
        }
        

        showData();
        
    })
    .catch(error => console.error('Error:', error));



