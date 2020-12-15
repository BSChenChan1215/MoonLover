 //廟宇資料庫

var params = new URLSearchParams();
params.append('tid', 1);

axios.post('./php/moonMap.php', params).then( response => {
  var data = response.data;
  // console.log(data);
  dataToTemple (data);
 
  array = []; 
  for(let i= 0; i<data.length;i++){
     
    obj = {src: data[i].IMAGE,h3:data[i].LOC_NAME,p1:data[i].GUIDE,p2:data[i].OPEN_TIME,p3:data[i].LOC_ADDRESS,href:'https://tw.yahoo.com/'}
    array.push(obj);
  }
  moonmap.$data.mesg = array;
  // console.log(array);

});

function dataToTemple(data){
  // console.log(data);
  let imgAll = data[0].IMG.split(',');
 
  // 寺廟照片*3
  document.getElementsByClassName('roundImg_temp1')[0].firstChild.src = imgAll[0];
  document.getElementsByClassName('roundImg_temp2')[0].firstChild.src = imgAll[1];
  document.getElementsByClassName('roundImg_temp3')[0].firstChild.src = imgAll[2];
  
  //寺廟名稱  
  document.getElementsByClassName('signInbox_map')[0].innerHTML = data[0].NAME;

  // 關於寺廟
  document.getElementsByClassName('empleContent_block')[0].innerHTML = data[0].INFO;
  
  // 寺廟map
  document.getElementsByClassName('goMap')[0].firstChild.src= data[0].GOOGLE_MAP;

  // 寺廟地址
  document.getElementsByClassName('empleContentAll')[0].innerHTML = data[0].ADDRESS;

  // 景點+美食地圖
  document.getElementsByClassName('sceneMap')[0].firstChild.src=data[0].LOCATION_MAP;

};
 
 
 //貼文組件
 const bus = new Vue();

  Vue.component('visitors-item',{ //子留言
    props:['vistext','index'], //設定要傳出去的值 訊息,訊息index
 
    methods:{    //刪除
      removeTask(index){ //設定要傳出去的值
        console.log(index);
        this.$emit('deletvistext',index); //自訂事件與要傳給父層的值                              
    },
  },
    template:
    `<!-- 訪客留言區 -->   
       <li class="visitors-messagelist">
           <div class="visitors-img"><img src="./images/moonMap/user02.jpg" alt="留言訪客照"></div>
           <div class="visitors-message">{{vistext}}</div>
           <i class="fas fa-exclamation-circle fa-1x edit" @click="removeTask(vistext,index)" :id=index >delete</i> <!--設定屬性id值，要判定刪除的inedex-->
       </li>   
    `,
   
  });


  
 Vue.component('visitor-input',{ //訪客輸入訊息
  data(){
    return{
      inputtask:'',
    };
  },
  methods:{
    submiData(){
      if( this.inputtask !==''){ //不輸入字就alert
        this.$emit('inputsub',this.inputtask);
        this.inputtask='';     
      }else{
        alert('輸入訊息');
      }
    },

  },
  template:`
  <form class="input-block" @submit.prevent="submiData">
    <input type="text" class="visitors-input" placeholder="留各訊息吧?" v-model="inputtask">
    <i class="fas fa-location-arrow fa-1x arrow-but" @click.prevent="submiData"></i>
  </form>
  `,
});



 Vue.component('send',{
    props:['myimg','name','msg','time','id','srcimg'],

    data(){
      return{      
       visitorstext:[],//訪客留言
      };
    }, 

   // 函式
   methods:{
    addText(item){
      // alert()
     this.visitorstext.push(item);
    },
    
      //刪除訪客留言
      removeTask(index){ //接收子層傳來的index值給父層
  
        this.visitorstext.splice(index,1); //刪除父層的index值
       
      },
      closeul(e){  //訪客留言收合
        let me = e.target;   
        $(me).find('li').slideToggle();  //vue中不能寫this,會指到data
       
      },
  },

    template:`   
    <form  class="userForm" action="#" :id=id>
       <i class="fas fa-exclamation-circle fa-1x end" id="edit" ></i>
       <div class="user_block">
           <div class="userImg_block">
               <div class="userImg"><img :src=myimg alt="user01"></div>
               <h3 class="userName">{{name}}</h3>
           </div>
           
           <!-- 使用者已貼文 -->
           <div class="user-messBlock">
               <div id="user-message02">
                 <p>{{msg}}</p>
                 <h5>{{time}}</h5>
               </div>                                       
               <div class="imgBlock">
                   <!-- 貼文區圖片 -->
                   <ul class="imgList2">
                       <li v-for='value in srcimg'><div class="aboutImg"><img :src=value></div></li>                                                                         
                   </ul>                  
               </div>                                
           </div>
       </div>

       <!-- 訪客留言輸入框 -->
       <div>
          <visitor-input v-on:inputsub="addText"></visitor-input>
       </div>
       <!--子留言-->
       <ul class="visitors-block" @click="closeul">...
          
            <visitors-item v-for="(values,index) in visitorstext" v-bind:vistext="values" v-bind:index="index" @deletvistext="removeTask(index)"></visitors-item>
           
        </ul>        
   </form>
   `, 
 
});

  
  //moonMap 公版留言區 
  var moonmap = new Vue({
    el:'#moonMap',
    data:{ 
      mesg:[],   
      // mesg:
      // [{src:'./images/moonMap/咖啡icon.svg',h3:'Share House Cafe',p1:'僻靜巷弄裡的老屋咖啡店，是個適合歇腳放鬆的好去處。',p2:'營業時間：週二至周日 09:00-18:30',p3:'地址：台南市中西區新美街111號'}
      // ,{src:'./images/moonMap/餐廳icon.svg',h3:'福泰飯桌',p1:'有著許多人公認台南最好吃的蝦捲，還有晚來就點不到的紅燒肉，尖峰時刻總是座無虛席。',p2:'營業時間：周一至周五 07:30-14:30',p3:'地址：台南市中西區民族路二段240號'}
      // ,{src:'./images/moonMap/餐廳icon.svg',h3:'松村煙燻滷味',p1:'獨特煙燻味，鹹香帶甜味的在地口味，價格實惠，是來台南必買的伴手禮之一 。',p2:'營業時間：周一至周日11：30-21：30',p3:'地址：台南市中西區民族路二段319號'}
      // ,{src:'./images/moonMap/景點icon.svg',h3:'赤崁文化園區',p1:'早期台南舊城發展的中心，區內古蹟眾多，是台灣少數擁有荷蘭、鄭氏建築的文化園區。',p2:'營業時間：周一至週日08:30-21:30',p3:'地址：台南市中西區民族路二段212號'}
      // ,{src:'./images/moonMap/景點icon.svg',h3:'開基武廟原正殿',p1:'為1669年全台灣首座興建的關帝廟，故名為「開基武廟」。又因該廟與祀典武廟同樣祭祀關公但且面積較小，因此一般人都稱此廟為小關帝廟。',p2:'營業時間：周一至周日 07:00-21:00',p3:'地址：台南市中西區新美街114號'}
      // ,{src:'./images/moonMap/景點icon.svg',h3:'祀典武廟',p1:'台最早關帝廟，也是當時官建的祀典廟宇之一，裡面祀奉正氣凜然的關聖帝君，被稱為大關帝廟。',p2:'營業時間：周一至周日06:00-21:00',p3:'地址：台南市中西區永福路二段229號'}]
      // , 
      myMsg:[],
      newText : '', 
      visitorstext:'',
      srcimg:[],
      images:[],//暫存圖
    },
    methods : {
      submit(newText){
        if(newText !=''){
          let ss=this.srcimg;
          this.myMsg.push(
            {myImg:'./images/moonMap/user01.jpg',name:'Diana', msg:newText,time:this.getTime(),srcimg:ss}
          );
          setTimeout(this.scrollTo,1000);
          this.newText='';
          this.images=[];//清除圖片
          this.srcimg=[];
        }
      },
      getTime () {
        today = new Date();
        date = today.getFullYear()+' '+ (today.getMonth()<10 ? '0' : '')  + (today.getMonth()+1)+' '+ (today.getDate()<10 ? '0' : '') + today.getDate() + ' ' + (today.getHours()<10 ? '0' : '') + today.getHours() + ':' + (today.getMinutes()<10 ? '0' : '') + today.getMinutes();
        return date;    
      },
      scrollTo () {
        document.querySelectorAll(".message_block")[0].scrollTo(0,document.querySelectorAll(".message_block")[0].scrollHeight);
      },

      // 傳照片
      fileChange(e){
        this.images;
        let files = e.target.files;  //取得File物件
        // console.log(files);//秀出物件陣列
        this.images.forEach.call(files,this.fileReader); //快速呼叫了 forEeah的方法
      },

      fileReader(file){
        let reader = new FileReader(); //建立FileReader 監聽 Load 事件
        reader.addEventListener("load", this.createImage);
        reader.readAsDataURL(file);
        
      },

      createImage(e){
        
        let files =  this.images;  //陣列長度

        if(files.length >= 3){  //如果判斷大於等於三張就進alert

          alert('最多只能上傳三張'); 

        }else{
          let file = e.target;
          let image = {src:file.result};
          // console.log(image);
          this.images.push(image); //暫存圖
          if(this.srcimg.length<3){
            console.log(this.srcimg.length);
            this.srcimg.push(image.src);
          }
          
          
                   
        }
       
        
        
      },


      deletebut(item){ //刪除陣列照片,因img為物件陣列,src為陣列,直接抓index
        
        console.log(item);
        let array=this.images; 
        array.splice(item,1); 
        let array2=this.srcimg;      
        array2.splice(item,1); 


      }
      
    },
    

    // 組件
  //  components:{
  //   newinboxmap:{
  //     props:['src','h3'],
  //     template:`<div class="newInBox_map">
  //     <div class="roundImg_map"><img :src=src alt="景點"></div>
  //     <div class="sceneText">
  //         <h3>{{h3}}</h3> 
  //         <p>有著許多人公認台南最好吃的蝦捲，還有晚來就點不到的紅燒肉，尖峰時刻總是座無虛席。</p> 
  //         <p>營業時間：周一至周五 07:30-14:30</p>
  //         <p>地址：台南市中西區民族路二段240號</p>
  //     </div>
  //  </div>`, 
  //   },


  // },
 
  })
  