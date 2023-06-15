const activity_dodream_apiUrl = 'http://34.168.80.42:3001/activity/comparative';
fetch(activity_dodream_apiUrl)
    .then(response => response.json())
    .then(data => {

        let datalist=data.results.slice(0,5);
        console.log(datalist);
        let container=document.getElementById(`dodream-container`);
        
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




// const container = document.getElementById('index-activity-container');
// // const list = datas.reduce((acc, data) => {
// //     const {title, date} = data;

// //     const html = `
// //         <div class=''>
// //             ${title}
// //         </div>
// //     `

// //     return acc + html;
// // }, '');

// const activity_comparative_apiUrl = 'http://34.168.80.42:3001/activity/comparative';
// fetch(activity_comparative_apiUrl)
//     .then(response => response.json())
//     .then(data => {
//         console.log(data);
//         const list = data.results.reduce((acc, el,i) => {
//             console.log(`${i}번째 콜백함수`)
//             console.log(`acc: ${acc}`);
//             console.log(`el: ${el}`);
//             const {title, date} = data;
        
//             const html = `
//                 <div class=''>
//                     ${title}
//                 </div>
//             `
//             console.log(title,date);
//             return acc + html;
//         }, '');
        
//         // data.results.forEach((item,index) => {
//         //     console.log(index,item);
//         //     // let contentMain = document.getElementById(`department${index}`)

//         //     // let logoElement=contentMain.querySelector(`.image-box img`);
//         //     // logoElement.src=item.logo;

//         //     // let nameElement=contentMain.querySelector(`.content-box > p:nth-child(1)`)
//         //     // nameElement.textContent = item.d_name;

//         // });
        
//     })
//     .catch(error => console.error('Error:', error));
