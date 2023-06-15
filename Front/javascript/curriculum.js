const activity_curriculum_apiUrl = 'http://34.168.80.42:3001/activity/curriculum/web';
fetch(activity_curriculum_apiUrl)
    .then(response => response.json())
    .then(data => {

        let datalist=data.results.slice(0,5);
        let container=document.getElementById(`curriculum-container`);
        
        datalist.forEach((item,index) => {
            let content=document.createElement('div');
            content.className='index-activity-content';

            let link=document.createElement('a');
            link.href=item.url;
            link.style.textDecoration='none';
            link.target='_blank';

            let title=document.createElement('div');
            title.textContent=item.title;
            title.className = 'index-activity-content';
            title.style.color='black';
            link.appendChild(title);

            let date=document.createElement('div');
            date.className='index-activity-content-date';
            date.textContent=item.deadline;

            content.appendChild(link);
            content.appendChild(date);
            container.appendChild(content);
            
        });
        
    })
    .catch(error => console.error('Error:', error));
