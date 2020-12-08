Vue.component('paginate', VuejsPaginate);
// 每一頁要顯示的筆數
const PAGE_SIZE = 10;
// sql接到資料
const sql_DATA = [
            [1, '第一籤', '籤王', '佳偶耶?神仙美眷也', '對對佳偶.神仙美眷.百年偕老.無須再覓良緣。', '人的禍福.延自祖先的福報，因祖先庇佑，得遇佳偶,是個歡樂而美滿的良緣，而且好因緣也會延須至下一代，是個上上大吉籤，求得此籤目前福緣俱足，和合常樂，兒孫滿堂，更宜多種福田，問緣份，大吉。問婚姻，可合和圓滿。'],
            [2, '第二籤', '中', '落霞與孤鶩齊飛，秋水共長天一色。', '落霞與孤鶩齊飛，秋水共長天一色.落霞與孤鶩。均是寂寞。寥落之象也。於落霞之中。單象影隻之鶩飛行者。予人深感秋盡冬之來。旺盛蕃衍之夏季已過。秋已盡。如此際遇之時。君汝宜樂善不倦積德當先。待時之時。自有合成之時。', '再等一段時間 ，自然會有屬於自己的緣分出現，求得此籤目前福緣不足，難免失意，懊悔，宜多種福田，問緣份，難成。問婚姻，難和諧。'],
            [3, '第三籤', '上上大吉', '宗廟享之，子孫保之。', '上一代之福延於子孫。禍亦同也。福之延於吾一代。其惠愛之情。當不可須臾忘之。享自上一代。吾當設法延於下一代。事事如此之時。一代延下一代。皆可享用不竭。汝懷念祖先。子孫亦同之。', '很多事有因而有果，如同上一代祖先積福而讓下一代子孫享福，因此，子孫享福的同時，也應該繼續行善造福，讓自己的下一代亦有福蔭之庇佑。'],
            [4, '第四籤', '中', '斯人也，而有斯疾也；斯人也，而有斯疾也。', '一個人皆有疾。毛病。癖之所成。連聖賢在修養到家之前也是如此。毛病與過失。皆不能免。古訓曰：知過能改，善莫大焉。猶如人若有疾病而不忌醫。將獲痊癒。', '目前福緣不佳，猜疑口舌鬥爭難免，宜多種福田，問緣份，不吉。問婚姻，防口舌。'],
            [5, '第五籤', '上', '逾東家牆而摟其處子，則得妻。不摟，則不得妻。', '如在偶然之機會。或相處已久。視伊人為終身可許之者。應採取行動。不宜逸失機會。姻緣之至也。必須勇往邁進。', '求得此簽目前福緣平平，須小孩來牽成，宜多種福田，問緣份，成則吉，問婚姻，孕更吉。'],
            [6, '第六籤', '籤王', '風弄竹聲，只道金佩響；月移花影，疑是玉人來。', '風弄竹聲，只道金佩響；月移花影，疑是玉人來。春風一動。竹葉之搖晃。沙沙作響。啻可聽道金佩在響。月日一日日地去耶。花影見了。心底下。疑玉人來。繇此可知。君之好事已近。', '目前福緣佳，可享魚水歡，更宜種福接福問緣份，成者大吉。問婚姻，合和,須防外遇'],
            [7, '第七籤', '上', '斯是陋室，唯吾德馨。', '雖居於簡陋之閨房。唯一己之德俱備時。自有它馨香之處。易言之。一己。居於極陋之室中。如德。智皆備之時。天自有賜良緣之時。不必自卑自棄耶。', '目前福緣欠佳，難免落寞失意，宜多種福田增福，問緣份，不急且修心。問婚姻，難諧。'],
            [8, '第八籤', '中上', '期我乎桑中，要我乎上宮，送我乎淇之上也。', '男女之婚姻是終身大事。是決定人生一生幸福之大事。爰之。不得以逾越。不正。強行等。手段行之。必須以正當方式取得對方之芳心。兩相情願之下完成。如違反上述原則行之時。雖結合。惟兩者之間。貌合神離。不得行之。否則良緣亦為此破壞無遺。', '目前福緣不佳，分分合合，宜多種福田增福，問緣份，勿強求。問婚姻，貌合神離。'],
            [9, '第九籤', '上', '則父母國人皆賤之。', '則父母。亦即使君爾之椿萱也。皆輕視君汝之意。繇此可之。為人子弟者。為合受父母疏遠。唾棄。賤之。原因多矣。最大之原因。不出不慎交友。如一己之不慎。一失足成千古恨之時。後果堪虞者。爰之。必須慎行之。婚姻同之。終生之伴侶。必須慎擇之', '目前福緣不足，須得神佛及貴人之助方能圓滿，為人子女者，需謹慎交友，聽從父母及長輩或貴人的意見，不可一意孤行。'],
            [10, '第十籤', '下', '有道是養兒防老，積穀防饑。', '自古以來有兩大古訓。養兒為了一己之防老。老了以後。可繇伊等侍奉。貽娛老年。平素則省吃儉用。積穀可防饑。尤其是養兒耶。必須善教之。婚事同之。結髮成伉儷之後。老境亦能相互照顧也。', '目前福緣俱足，奉子之助更加圓滿，種福田積後福，問緣份，得貴助。問婚姻，伉儷情深。'],
];

var nav = new Vue({
    el: '#nav',
    data: {
        title: 'menu',        
    },
});

var backend = new Vue({
    el: '#backend',
    data: {
        // ---------------留言清單---------------
        username: '碩哥',
        // 後台頁籤
        lists : [
            {list: '公版留言管理', href : "./backstage_publicMsg.html"},
            {list: '訂單管理', href : "./backstage_publicMsg.html"},
            {list : '周邊景點管理', href : "./backstage_mapList.html"},
            {list : '籤詩管理', href : "./backstage_draw.html"},
            {list : '商品管理', href : "./backstage_products.html"},
            {list : '會員資料管理', href : "./backstage_member.html"},
        ],
        // 預設顯示頁
        currentPage: 1,
        // 預設頁數
        pageCount: 1,
        sql: [],
        modify_data: '',
        menu: true,
    },
    computed: {
        // 回傳頁數
        pagedListdata: function () {
            var vm = this;
            if (vm.sql && vm.sql.length > 0) {
                return vm.sql.filter(function (x) {
                    return x.page === vm.currentPage;
                })
            }
            else {
                return [];
            }
        }
    },
    watch: {
        // 呼叫頁數設定函式
        sql: function (val) {
            this._setPage2Model();
        }
    },
    methods: {
        // 修改或新增資料跳轉
        change(id) {
            if (id == 'n') {
                var vm = this;
                vm.modify_data[0] = vm.sql.length + 1;
                vm.sql.push(vm.modify_data);
            } else {
                data = id - 1;
                vm.sql[data] = vm.modify_data;
            }
            vm.menu = true;
            nav.$data.title = 'menu';
        },
        // 送出新增資料
        add(id) {
            var vm = this;
            vm.menu = false;
            nav.$data.title = 'add';
            vm.modify_data = [id, '', '籤王', '', '', '', ''];
        },
        // 計算分頁
        _setPage2Model: function () {
            var vm = this;

            if (!vm.sql || vm.sql.length <= 0) {
                vm.pageCount = 1;
            }
            else {
                vm.pageCount = parseInt(vm.sql.length / PAGE_SIZE) + (vm.sql.length % PAGE_SIZE > 0 ? 1 : 0);
                for (let i = 0; i < vm.sql.length; i++) {
                    vm.$set(vm.sql[i], "page", parseInt(i / PAGE_SIZE) + 1);
                }
            }
        },
        // 點擊分頁連結時換分頁
        pageCallback: function (page) {
            var vm = this;
            this.$set(vm, 'currentPage', page);
        }
    },
    components: {
        row: {
            props: ['id', 'num', 'lucky', 'content', 'detail', 'answer'],
            template:
                `
            <tr :id=id>
                <td class="td_55"><h4>{{id}}</h4></td>
                <td class="td_80"><h4>{{num}}</h4></td>
                <td class="td_75"><h4>{{lucky}}</h4></td>
                <td class="td_125"><h4>{{content}}</h4></td>
                <td class="td_125"><h4>{{detail}}</h4></td>
                <td class="td_125"><h4>{{answer}}</h4></td>
                <td class="td_75">
                    <select class="input_status">
                        <option value="1">顯示</option>
                        <option value="0">隱藏</option>
                    </select>
                </td>
                <td class="td_75"><i class="fas fa-edit" @click="modify(id)"></i></td>
            </tr>
            `,
            methods: {
                // 修改資料
                modify(id) {
                    window.scrollTo(0, 0);
                    data = id - 1;
                    backend.$data.menu = false;
                    nav.$data.title = 'modify';
                    backend.$data.modify_data = backend.$data.sql[data];
                },
            }
        },
    },
    created() {
        var vm =this;
        vm.sql = sql_DATA;
    },
    mounted() {

        var vm =this;

        for (i = 0; i <= vm.lists.length; i++) { //取得頁面title名字來綁定頁籤class
            if (vm.lists[i] == document.title) {
                $('.listName').eq(i).addClass("bold");
            }
        }
    },
});
