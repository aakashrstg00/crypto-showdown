var promptStorage;
if('serviceWorker' in navigator){
    navigator.serviceWorker
        .register('./service-worker.js')
        .then(res=>console.log('Service Worker Registered!'))
        .catch(err=>console.error(err));
    
    window.addEventListener('beforeinstallprompt',e=>{
        promptStorage = e;        
        console.log('Before Install Prompt!',promptStorage);
    });

    // setTimeout(function(){
    //     promptStorage.prompt();
    //     promptStorage.userChoice.then(function (choiceResult) {
    //     console.log(choiceResult.outcome);
    //     if (choiceResult.outcome === 'dismissed') console.log('User cancelled installation');
    //     else console.log('User added to home screen');
    //     });
    // },10000);
}
window.addEventListener('load',()=>{
    fetch('https://api.coinmarketcap.com/v1/ticker/?convert=INR')
    .then(res=>res.ok && res.json())
    .then(data=>{
        console.log(data);
        data.forEach(element => {
            var updown = (element.percent_change_24h.charAt(0) === '-')?'fa-caret-down':'fa-caret-up';
            var color = (element.percent_change_24h.charAt(0) === '-')?'red':'green';
            var collection_item_li = `
            <li class="active">
                <div class="collapsible-header flex-child">
                    <span> 
                        #${element.rank} (${element.symbol})
                        <h5>${element.name}</h5>
                    </span>
                    <div class="valign-wrapper">
                        <span class="${color} lighten-4 chip">&#8377;&nbsp;${element.price_inr}</span>
                    </div>
                </div>

                <div class="collapsible-body ${color} lighten-5 flex-child valign-wrapper">
                    <div class="sm-margin">
                        <i class="fa ${updown}" style="color:${color}"></i>
                        &nbsp;${element.percent_change_24h}%
                    </div>
                    <div class="${color} lighten-4 chip sm-margin">
                        $ ${element.price_usd}
                    </div>
                </div>
            </li>
            `;
            document.querySelector('.collapsible.popout').innerHTML += collection_item_li;
        });
        $('.chip').hover(function(){
            $(this).toggleClass('lighten-2');
        });
        setTimeout(function(){
            $('li.active > .collapsible-header')[0].click();
        },0);
    })
    .catch(err=>console.log(err));
    // var myImage = document.querySelector('img');
    // fetch('https://cdn2.iconfinder.com/data/icons/bitcoin-and-mining/44/trade-512.png')
    // .then(function(response) {
    //     if(response.ok) return response.blob();
    //     throw new Error('Network response was not ok.');
    // })
    // .then(function(myBlob) { 
    //     var objectURL = URL.createObjectURL(myBlob); 
    //     myImage.src = objectURL;
    // });
});
$(document).ready(function(){
    $('.collapsible').collapsible();
});