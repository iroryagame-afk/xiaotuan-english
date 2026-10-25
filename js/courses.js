// 小团英语原创课程内容 Original content. Sentences: "English|中文". Words: "word|phonetic|meaning|example".
const CATS=[
 {name:"零基础英语",hot:1,subs:["日常口语","口语宝典","幼儿英语"]},
 {name:"实用英语",subs:["口语听力","旅游英语","英语听力","老外常用惯用语"]},
 {name:"场景主题",subs:["外企外贸","医学英语"]},
 {name:"商务职场",subs:["外贸职场","商务英语"]},
 {name:"新概念英语",subs:[]},
 {name:"医学类词库",subs:[]},
 {name:"成人自考",subs:[]},
 {name:"全国英语等级",subs:[]},
 {name:"小初高",subs:["小学","初中","高中"]},
 {name:"大学",subs:["四级","六级"]},
 {name:"专升本",subs:[]},
 {name:"考研",subs:[]},
 {name:"剑桥",subs:[]},
 {name:"雅思",subs:[]}
];
const COURSES=[
{id:"daily",title:"日常口语精选句",en:"Everyday English",cat:"零基础英语",sub:"日常口语",type:"s",rating:4.9,c:["#7c5cff","#ff9a7a"],items:`
Good morning! How are you today?|早上好！你今天怎么样？
I'm fine, thank you. And you?|我很好，谢谢。你呢？
Nice to meet you.|很高兴认识你。
What's your name?|你叫什么名字？
Where are you from?|你是哪里人？
What do you do for a living?|你是做什么工作的？
Could you say that again, please?|请你再说一遍好吗？
Sorry, I don't understand.|抱歉，我没听懂。
Can you speak more slowly?|你能说慢一点吗？
What time is it now?|现在几点了？
It's half past seven.|现在七点半。
What's the weather like today?|今天天气怎么样？
It looks like it's going to rain.|看起来要下雨了。
Don't forget to bring an umbrella.|别忘了带伞。
I'm a little hungry.|我有点饿了。
Let's grab something to eat.|我们去吃点东西吧。
What would you like to drink?|你想喝点什么？
Just water, please.|请给我水就行。
That sounds like a great idea.|听起来是个好主意。
I'm sorry I'm late.|对不起，我迟到了。
No problem. It happens.|没关系，难免的。
Thank you for your help.|谢谢你的帮助。
You're welcome.|不客气。
Excuse me, where is the restroom?|打扰一下，洗手间在哪里？
How much does this cost?|这个多少钱？
I'm just looking, thanks.|我只是看看，谢谢。
Can I pay by card?|我可以刷卡吗？
See you tomorrow.|明天见。
Have a nice weekend!|周末愉快！
Take care of yourself.|照顾好自己。
I'm really tired today.|我今天真的很累。
What are you doing this weekend?|你这个周末打算做什么？
Let me think about it.|让我想一想。
Congratulations on your new job!|祝贺你找到新工作！
Could you do me a favor?|你能帮我个忙吗？`},
{id:"kids",title:"幼儿英语启蒙词",en:"Words for Kids",cat:"零基础英语",sub:"幼儿英语",type:"w",rating:4.8,c:["#f59e0b","#fcd34d"],items:`
cat|/kæt/|n. 猫|The cat is sleeping.
dog|/dɔːɡ/|n. 狗|My dog likes to run.
apple|/ˈæpəl/|n. 苹果|I eat an apple every day.
banana|/bəˈnænə/|n. 香蕉|The banana is yellow.
red|/red/|adj. 红色的|I have a red ball.
blue|/bluː/|adj. 蓝色的|The sky is blue.
green|/ɡriːn/|adj. 绿色的|The grass is green.
one|/wʌn/|num. 一|I have one brother.
two|/tuː/|num. 二|I have two hands.
three|/θriː/|num. 三|There are three birds.
mother|/ˈmʌðər/|n. 妈妈|My mother is kind.
father|/ˈfɑːðər/|n. 爸爸|My father can swim.
eye|/aɪ/|n. 眼睛|Close your eyes.
nose|/noʊz/|n. 鼻子|Touch your nose.
mouth|/maʊθ/|n. 嘴|Open your mouth.
hand|/hænd/|n. 手|Raise your hand.
ball|/bɔːl/|n. 球|Let's play with the ball.
book|/bʊk/|n. 书|This is my book.
milk|/mɪlk/|n. 牛奶|I drink milk.
fish|/fɪʃ/|n. 鱼|The fish can swim.
bird|/bɜːrd/|n. 鸟|The bird can fly.
sun|/sʌn/|n. 太阳|The sun is hot.
moon|/muːn/|n. 月亮|The moon is bright tonight.
star|/stɑːr/|n. 星星|I can see a star.
happy|/ˈhæpi/|adj. 快乐的|I am happy.
big|/bɪɡ/|adj. 大的|The elephant is big.
small|/smɔːl/|adj. 小的|The mouse is small.
run|/rʌn/|v. 跑|I can run fast.
jump|/dʒʌmp/|v. 跳|Let's jump together.
car|/kɑːr/|n. 汽车|Daddy drives a car.`},
{id:"listen",title:"口语听力高频表达",en:"Listening & Speaking",cat:"实用英语",sub:"口语听力",type:"s",rating:4.7,c:["#0ea5e9","#67e8f9"],items:`
I'm on my way.|我在路上了。
It's up to you.|由你决定。
I couldn't agree more.|我完全同意。
That makes sense.|有道理。
I'll keep that in mind.|我会记住的。
Let's call it a day.|今天就到这里吧。
Take your time.|慢慢来。
It's not a big deal.|这没什么大不了的。
I'm looking forward to it.|我很期待。
Long time no see.|好久不见。
What have you been up to?|你最近在忙什么？
I've been really busy lately.|我最近真的很忙。
It slipped my mind.|我忘了这件事。
Could you give me a hand?|你能帮我一下吗？
I didn't catch that.|我没听清。
What do you mean by that?|你那是什么意思？
Let me get back to you.|我稍后回复你。
I'm not sure about that.|我对此不太确定。
You can say that again.|你说得太对了。
It's on me today.|今天我请客。
Keep in touch.|保持联系。
Better late than never.|迟做总比不做好。
I'm all ears.|我洗耳恭听。
Don't take it personally.|别往心里去。
Let's play it by ear.|我们见机行事吧。
That's exactly what I meant.|那正是我的意思。
I can't make it tonight.|我今晚去不了。
How did it go?|进展如何？
It went better than expected.|比预想的顺利。
Fingers crossed.|祝好运。`},
{id:"travel",title:"旅游英语必备句",en:"Travel English",cat:"实用英语",sub:"旅游英语",type:"s",rating:4.9,c:["#06b6d4","#7c5cff"],items:`
I'd like to check in, please.|我想办理入住。
I have a reservation under the name Li.|我用李的名字预订了。
What time is checkout?|几点退房？
Is breakfast included?|含早餐吗？
Could I have a window seat?|我可以要靠窗的座位吗？
Where is the boarding gate?|登机口在哪里？
My flight has been delayed.|我的航班延误了。
How long is the layover?|中转要停留多久？
I'd like to exchange some money.|我想换些钱。
How do I get to the city center?|怎么去市中心？
Is it within walking distance?|走路能到吗？
Could you call a taxi for me?|你能帮我叫辆出租车吗？
Please take me to this address.|请带我去这个地址。
How much is a ticket to the museum?|博物馆门票多少钱？
Can you recommend a good restaurant nearby?|你能推荐附近一家好餐厅吗？
A table for two, please.|请给我们两人桌。
Could I see the menu?|我能看看菜单吗？
I'm allergic to peanuts.|我对花生过敏。
Can we have the bill, please?|请给我们账单。
Do you accept credit cards?|你们接受信用卡吗？
I lost my passport.|我的护照丢了。
Where is the nearest police station?|最近的警察局在哪里？
Could you take a picture of us?|你能给我们拍张照吗？
Is there free Wi-Fi here?|这里有免费Wi-Fi吗？
What's the password for the Wi-Fi?|Wi-Fi密码是多少？
I'd like a round-trip ticket.|我想要一张往返票。
Which platform does the train leave from?|火车从哪个站台出发？
Does this bus go to the airport?|这辆公交车去机场吗？
I'm here on vacation.|我是来度假的。
I'll be staying for one week.|我会待一周。
Do I need to declare anything?|我需要申报什么吗？
The air conditioner in my room doesn't work.|我房间的空调坏了。`},
{id:"trade",title:"外企外贸常用句",en:"Foreign Trade English",cat:"场景主题",sub:"外企外贸",type:"s",rating:4.6,c:["#64748b","#7c5cff"],items:`
Thank you for your inquiry.|感谢您的询价。
Please find the attached quotation.|请查收附件中的报价单。
The price is valid for thirty days.|该价格三十天内有效。
What is your minimum order quantity?|你们的最小起订量是多少？
Could you send us some samples?|你们能寄一些样品给我们吗？
We can offer a five percent discount.|我们可以给五个百分点的折扣。
What are your payment terms?|你们的付款条件是什么？
We accept payment by letter of credit.|我们接受信用证付款。
A thirty percent deposit is required.|需要支付百分之三十的定金。
The goods will be shipped next week.|货物将于下周发出。
What is the delivery time?|交货期是多久？
Please confirm the order at your earliest convenience.|请尽早确认订单。
We have received your payment.|我们已收到您的付款。
Here is the tracking number.|这是物流单号。
The shipment is delayed due to bad weather.|由于天气恶劣，货物延误了。
We apologize for any inconvenience.|对造成的不便我们深表歉意。
Could you lower the price a little?|价格能再低一点吗？
This is our best price.|这是我们的最低价了。
Our products meet international standards.|我们的产品符合国际标准。
Please check the packing list.|请核对装箱单。
We will look into the problem immediately.|我们会立即调查这个问题。
Could you provide a pro forma invoice?|能提供一份形式发票吗？
The contract has been signed by both parties.|合同已由双方签署。
We look forward to a long-term partnership.|我们期待长期合作。
Prices are quoted FOB Shanghai.|价格按上海离岸价报价。
Please let us know if you have any questions.|如有任何问题请告诉我们。
We are interested in your new products.|我们对你们的新产品很感兴趣。
Can we schedule a video call next Monday?|我们下周一能安排一次视频会议吗？
The quality is not up to our expectations.|质量没有达到我们的预期。
We will replace the damaged items free of charge.|我们将免费更换损坏的货物。`},
{id:"medical",title:"医学英语基础词",en:"Medical English",cat:"场景主题",sub:"医学英语",type:"w",rating:4.5,c:["#ef4444","#fca5a5"],items:`
fever|/ˈfiːvər/|n. 发烧|She has a high fever.
cough|/kɔːf/|n./v. 咳嗽|He has had a cough for a week.
headache|/ˈhedeɪk/|n. 头痛|I have a terrible headache.
symptom|/ˈsɪmptəm/|n. 症状|What are your symptoms?
diagnosis|/ˌdaɪəɡˈnoʊsɪs/|n. 诊断|The doctor made a quick diagnosis.
prescription|/prɪˈskrɪpʃən/|n. 处方|You need a prescription for this medicine.
pharmacy|/ˈfɑːrməsi/|n. 药房|The pharmacy is open until ten.
allergy|/ˈælərdʒi/|n. 过敏|I have an allergy to penicillin.
injection|/ɪnˈdʒekʃən/|n. 注射|The nurse gave him an injection.
surgery|/ˈsɜːrdʒəri/|n. 外科手术|She needs surgery on her knee.
patient|/ˈpeɪʃənt/|n. 病人|The patient is recovering well.
nurse|/nɜːrs/|n. 护士|The nurse checked my temperature.
emergency|/ɪˈmɜːrdʒənsi/|n. 急诊；紧急情况|Call the emergency number now.
blood pressure|/blʌd ˈpreʃər/|n. 血压|Your blood pressure is normal.
heart|/hɑːrt/|n. 心脏|Exercise is good for your heart.
lung|/lʌŋ/|n. 肺|Smoking damages the lungs.
stomach|/ˈstʌmək/|n. 胃|My stomach hurts.
infection|/ɪnˈfekʃən/|n. 感染|The wound has an infection.
vaccine|/vækˈsiːn/|n. 疫苗|Have you had the flu vaccine?
dose|/doʊs/|n. 剂量|Take one dose twice a day.
tablet|/ˈtæblət/|n. 药片|Swallow the tablet with water.
x-ray|/ˈeks reɪ/|n. X光|The x-ray shows a broken bone.
fracture|/ˈfræktʃər/|n. 骨折|He suffered a fracture in his arm.
chronic|/ˈkrɑːnɪk/|adj. 慢性的|She has chronic back pain.
acute|/əˈkjuːt/|adj. 急性的|He was treated for acute pain.
recover|/rɪˈkʌvər/|v. 康复|You will recover in a few days.
dizzy|/ˈdɪzi/|adj. 头晕的|I feel dizzy when I stand up.
appointment|/əˈpɔɪntmənt/|n. 预约|I'd like to make an appointment.
ward|/wɔːrd/|n. 病房|He was moved to a private ward.
ambulance|/ˈæmbjələns/|n. 救护车|Please call an ambulance.`},
{id:"biz",title:"商务职场英语",en:"Business English",cat:"商务职场",sub:"商务英语",type:"s",rating:4.8,c:["#1e3a8a","#3b82f6"],items:`
Let's get started.|我们开始吧。
Thank you all for coming.|感谢大家的到来。
The purpose of this meeting is to discuss the budget.|本次会议的目的是讨论预算。
Could you walk us through the plan?|你能给我们讲讲这个计划吗？
I'd like to add something.|我想补充一点。
Let's move on to the next item.|我们进入下一项。
Can we schedule a follow-up meeting?|我们能安排一次后续会议吗？
I'll send you the minutes after the meeting.|会后我会把会议纪要发给你。
What's the deadline for this project?|这个项目的截止日期是什么时候？
We are running behind schedule.|我们进度落后了。
I'll take care of it.|我来处理。
Please keep me posted.|请随时告知我进展。
I'm afraid I have to disagree.|恐怕我不能同意。
Let's find a compromise.|我们找个折中方案吧。
Could you clarify that point?|你能说明一下那一点吗？
I'm calling to follow up on my email.|我打电话是想跟进一下我的邮件。
I'm sorry, he's in a meeting right now.|抱歉，他现在正在开会。
May I leave a message?|我可以留言吗？
I look forward to hearing from you.|期待您的回复。
Please see the attached file.|请查看附件。
Our sales increased by ten percent this quarter.|本季度我们的销售额增长了百分之十。
We need to cut costs.|我们需要削减成本。
Who is in charge of this project?|谁负责这个项目？
I'd like to introduce our new team member.|我想介绍一下我们的新同事。
Let's brainstorm some ideas.|我们来集思广益吧。
That's a good point.|说得好。
I'll get back to you by Friday.|我会在周五前回复你。
Could we push the meeting to next week?|我们能把会议推迟到下周吗？
I'm applying for the marketing position.|我在申请市场营销职位。
I have five years of experience in sales.|我有五年的销售经验。
What are the next steps?|接下来的步骤是什么？`},
{id:"nce",title:"新概念风格·入门短句",en:"Basic Patterns",cat:"新概念英语",sub:"新概念英语",type:"s",rating:4.7,c:["#7c3aed","#c4b5fd"],items:`
Excuse me! Is this your bag?|打扰一下！这是你的包吗？
Yes, it is. Thank you very much.|是的，是我的。非常感谢。
This is not my umbrella.|这不是我的伞。
Whose shirt is that?|那是谁的衬衫？
It's my brother's shirt.|那是我哥哥的衬衫。
What colour is your new dress?|你的新裙子是什么颜色的？
It's green. Come and see it.|是绿色的。来看看吧。
Are you a teacher?|你是老师吗？
No, I'm not. I'm a student.|不，我不是。我是学生。
How are you today?|你今天好吗？
Very well, thank you.|很好，谢谢。
Give me a glass, please.|请给我一个杯子。
Which glass? This one?|哪个杯子？这个吗？
Where are the books?|书在哪里？
They're on the shelf.|它们在书架上。
What are you doing?|你在做什么？
I'm reading a newspaper.|我在看报纸。
What's the time?|几点了？
It's eight o'clock.|八点了。
I like coffee, but I don't like tea.|我喜欢咖啡，但我不喜欢茶。
She usually gets up at seven.|她通常七点起床。
He went to the cinema yesterday.|他昨天去看电影了。
We will go to Paris next month.|我们下个月要去巴黎。
Have you ever been to London?|你去过伦敦吗？
I have just finished my homework.|我刚完成作业。
It is the most beautiful garden in town.|这是镇上最美的花园。
There is a pen on the desk.|桌子上有一支钢笔。
There are some apples in the basket.|篮子里有一些苹果。
Can you help me carry this box?|你能帮我搬这个箱子吗？
I must go to the dentist this afternoon.|我今天下午必须去看牙医。`},
{id:"primary",title:"小学必背单词",en:"Primary School Words",cat:"小初高",sub:"小学",type:"w",rating:4.8,c:["#ec4899","#f9a8d4"],items:`
school|/skuːl/|n. 学校|I go to school by bus.
teacher|/ˈtiːtʃər/|n. 老师|Our teacher is very nice.
student|/ˈstuːdənt/|n. 学生|He is a good student.
classroom|/ˈklæsruːm/|n. 教室|Our classroom is clean.
pencil|/ˈpensəl/|n. 铅笔|May I use your pencil?
ruler|/ˈruːlər/|n. 尺子|This ruler is long.
bag|/bæɡ/|n. 书包|My bag is heavy.
friend|/frend/|n. 朋友|Tom is my best friend.
family|/ˈfæməli/|n. 家庭|I love my family.
morning|/ˈmɔːrnɪŋ/|n. 早晨|I get up early in the morning.
afternoon|/ˌæftərˈnuːn/|n. 下午|We play football in the afternoon.
Monday|/ˈmʌndeɪ/|n. 星期一|We have English on Monday.
spring|/sprɪŋ/|n. 春天|Spring is warm.
summer|/ˈsʌmər/|n. 夏天|It's hot in summer.
winter|/ˈwɪntər/|n. 冬天|It snows in winter.
breakfast|/ˈbrekfəst/|n. 早餐|I have breakfast at seven.
lunch|/lʌntʃ/|n. 午餐|What's for lunch?
dinner|/ˈdɪnər/|n. 晚餐|We have dinner together.
rice|/raɪs/|n. 米饭|I like rice and fish.
water|/ˈwɔːtər/|n. 水|Drink more water.
tall|/tɔːl/|adj. 高的|My brother is tall.
short|/ʃɔːrt/|adj. 矮的；短的|This pencil is short.
beautiful|/ˈbjuːtɪfəl/|adj. 美丽的|The flower is beautiful.
favourite|/ˈfeɪvərɪt/|adj. 最喜欢的|My favourite colour is blue.
swim|/swɪm/|v. 游泳|I can swim.
read|/riːd/|v. 读|I read books every day.
write|/raɪt/|v. 写|Please write your name.
sing|/sɪŋ/|v. 唱歌|She likes to sing.
dance|/dæns/|v. 跳舞|Let's dance!
library|/ˈlaɪbreri/|n. 图书馆|The library is on the second floor.`},
{id:"junior",title:"初中核心词汇",en:"Junior High Core",cat:"小初高",sub:"初中",type:"w",rating:4.7,c:["#14b8a6","#99f6e4"],items:`
ability|/əˈbɪləti/|n. 能力|She has the ability to solve problems.
achieve|/əˈtʃiːv/|v. 实现；达到|You can achieve your dream.
advice|/ədˈvaɪs/|n. 建议|Can you give me some advice?
afraid|/əˈfreɪd/|adj. 害怕的|Don't be afraid of mistakes.
agree|/əˈɡriː/|v. 同意|I agree with you.
already|/ɔːlˈredi/|adv. 已经|I have already finished it.
borrow|/ˈbɑːroʊ/|v. 借（入）|Can I borrow your book?
careful|/ˈkerfəl/|adj. 仔细的|Be careful when you cross the road.
culture|/ˈkʌltʃər/|n. 文化|I'm interested in Chinese culture.
decide|/dɪˈsaɪd/|v. 决定|He decided to study abroad.
different|/ˈdɪfərənt/|adj. 不同的|We have different ideas.
environment|/ɪnˈvaɪrənmənt/|n. 环境|We should protect the environment.
especially|/ɪˈspeʃəli/|adv. 尤其|I love fruit, especially apples.
experience|/ɪkˈspɪriəns/|n. 经历；经验|It was a great experience.
famous|/ˈfeɪməs/|adj. 著名的|He is a famous writer.
foreign|/ˈfɔːrən/|adj. 外国的|Can you speak a foreign language?
habit|/ˈhæbɪt/|n. 习惯|Reading is a good habit.
healthy|/ˈhelθi/|adj. 健康的|Eat healthy food.
important|/ɪmˈpɔːrtənt/|adj. 重要的|Sleep is important for students.
improve|/ɪmˈpruːv/|v. 提高|I want to improve my English.
invent|/ɪnˈvent/|v. 发明|Who invented the telephone?
knowledge|/ˈnɑːlɪdʒ/|n. 知识|Knowledge is power.
mistake|/mɪˈsteɪk/|n. 错误|Everyone makes mistakes.
patient|/ˈpeɪʃənt/|adj. 耐心的|Be patient with your little brother.
practice|/ˈpræktɪs/|n./v. 练习|Practice makes perfect.
prepare|/prɪˈper/|v. 准备|I'm preparing for the exam.
pollution|/pəˈluːʃən/|n. 污染|Air pollution is a big problem.
successful|/səkˈsesfəl/|adj. 成功的|The party was successful.
volunteer|/ˌvɑːlənˈtɪr/|n. 志愿者|She works as a volunteer.
weather|/ˈweðər/|n. 天气|The weather is fine today.`},
{id:"cet",title:"四六级高频词汇",en:"CET-4/6 Vocabulary",cat:"大学",sub:"四级",type:"w",rating:4.9,c:["#7c5cff","#5b3fd6"],items:`
abandon|/əˈbændən/|v. 放弃；抛弃|They had to abandon the plan.
accelerate|/əkˈseləreɪt/|v. 加速|The car accelerated quickly.
accommodate|/əˈkɑːmədeɪt/|v. 容纳；提供住宿|The hotel can accommodate 500 guests.
accumulate|/əˈkjuːmjəleɪt/|v. 积累|He accumulated a lot of experience.
adequate|/ˈædɪkwət/|adj. 充足的|We have adequate food for the trip.
alternative|/ɔːlˈtɜːrnətɪv/|n. 替代选择|Is there an alternative to this plan?
anticipate|/ænˈtɪsɪpeɪt/|v. 预期|We anticipate a rise in prices.
approach|/əˈproʊtʃ/|n. 方法 v. 接近|We need a new approach.
assume|/əˈsuːm/|v. 假设；认为|I assume you know the answer.
available|/əˈveɪləbəl/|adj. 可获得的|The book is available online.
benefit|/ˈbenɪfɪt/|n. 好处 v. 受益|Exercise has many benefits.
capacity|/kəˈpæsəti/|n. 容量；能力|The stadium has a capacity of 50,000.
challenge|/ˈtʃælɪndʒ/|n. 挑战|Learning a language is a challenge.
comprehensive|/ˌkɑːmprɪˈhensɪv/|adj. 全面的|We need a comprehensive plan.
consequence|/ˈkɑːnsəkwens/|n. 后果|He must face the consequences.
contribute|/kənˈtrɪbjuːt/|v. 贡献；促成|Stress can contribute to illness.
crucial|/ˈkruːʃəl/|adj. 至关重要的|Timing is crucial.
decline|/dɪˈklaɪn/|v./n. 下降；拒绝|Sales declined last year.
efficient|/ɪˈfɪʃənt/|adj. 高效的|This machine is very efficient.
emphasize|/ˈemfəsaɪz/|v. 强调|The teacher emphasized the importance of reading.
evaluate|/ɪˈvæljueɪt/|v. 评估|We need to evaluate the results.
evident|/ˈevɪdənt/|adj. 明显的|It was evident that she was tired.
flexible|/ˈfleksəbəl/|adj. 灵活的|I have flexible working hours.
fundamental|/ˌfʌndəˈmentəl/|adj. 基本的|This is a fundamental problem.
inevitable|/ɪnˈevɪtəbəl/|adj. 不可避免的|Change is inevitable.
maintain|/meɪnˈteɪn/|v. 维持|It's hard to maintain a healthy diet.
potential|/pəˈtenʃəl/|adj. 潜在的 n. 潜力|She has great potential.
significant|/sɪɡˈnɪfɪkənt/|adj. 重要的；显著的|There was a significant increase.
sufficient|/səˈfɪʃənt/|adj. 足够的|We have sufficient time.
vital|/ˈvaɪtəl/|adj. 至关重要的|Water is vital to life.`},
{id:"kaoyan",title:"考研英语核心词",en:"Postgraduate Exam",cat:"考研",sub:"考研",type:"w",rating:4.7,c:["#b45309","#fbbf24"],items:`
advocate|/ˈædvəkeɪt/|v. 提倡 n. 拥护者|He advocates free education.
ambiguous|/æmˈbɪɡjuəs/|adj. 模棱两可的|The question is ambiguous.
arbitrary|/ˈɑːrbɪtreri/|adj. 任意的；专断的|The decision seemed arbitrary.
coherent|/koʊˈhɪrənt/|adj. 连贯的|Write a coherent essay.
compatible|/kəmˈpætəbəl/|adj. 兼容的；相容的|The software is compatible with Windows.
compensate|/ˈkɑːmpenseɪt/|v. 补偿|Nothing can compensate for the loss.
controversial|/ˌkɑːntrəˈvɜːrʃəl/|adj. 有争议的|It is a controversial topic.
deteriorate|/dɪˈtɪriəreɪt/|v. 恶化|His health began to deteriorate.
dilemma|/dɪˈlemə/|n. 困境|She faced a difficult dilemma.
discipline|/ˈdɪsəplɪn/|n. 学科；纪律|Economics is a social science discipline.
enhance|/ɪnˈhæns/|v. 提高；增强|Music can enhance your mood.
explicit|/ɪkˈsplɪsɪt/|adj. 明确的|Give explicit instructions.
fluctuate|/ˈflʌktʃueɪt/|v. 波动|Prices fluctuate daily.
hypothesis|/haɪˈpɑːθəsɪs/|n. 假设|The hypothesis was proved wrong.
implication|/ˌɪmplɪˈkeɪʃən/|n. 含义；影响|Consider the implications of the policy.
incentive|/ɪnˈsentɪv/|n. 激励|Bonuses are an incentive to work harder.
inherent|/ɪnˈhɪrənt/|adj. 固有的|Risk is inherent in investment.
legitimate|/lɪˈdʒɪtəmət/|adj. 合法的；正当的|That's a legitimate question.
manipulate|/məˈnɪpjəleɪt/|v. 操纵|They tried to manipulate the data.
paradox|/ˈpærədɑːks/|n. 悖论|It is a paradox that...
perspective|/pərˈspektɪv/|n. 视角|Try to see it from my perspective.
plausible|/ˈplɔːzəbəl/|adj. 似乎合理的|His excuse sounds plausible.
prevail|/prɪˈveɪl/|v. 盛行；获胜|Justice will prevail.
reconcile|/ˈrekənsaɪl/|v. 调和；和解|It's hard to reconcile the two views.
scrutiny|/ˈskruːtəni/|n. 仔细审查|The plan is under close scrutiny.
skeptical|/ˈskeptɪkəl/|adj. 怀疑的|Scientists are skeptical of the claim.
substantial|/səbˈstænʃəl/|adj. 大量的；实质的|There is a substantial difference.
undermine|/ˌʌndərˈmaɪn/|v. 削弱|Criticism can undermine confidence.
vulnerable|/ˈvʌlnərəbəl/|adj. 易受伤害的|Children are vulnerable to disease.
warrant|/ˈwɔːrənt/|v. 使有必要 n. 授权令|The situation warrants attention.`},
{id:"ielts",title:"雅思口语高分句",en:"IELTS Speaking",cat:"雅思",sub:"雅思",type:"s",rating:4.9,c:["#dc2626","#7c5cff"],items:`
That's an interesting question.|这是个有趣的问题。
Let me think about it for a second.|让我想一下。
I've never really thought about it before.|我以前从没真正想过这个问题。
To be honest, I'm not a big fan of it.|说实话，我不太喜欢它。
I'm really into outdoor activities.|我非常喜欢户外活动。
It depends on the situation.|这取决于具体情况。
From my point of view, it has both pros and cons.|在我看来，它有利有弊。
One of the main reasons is that it saves time.|主要原因之一是它节省时间。
I'd say it's mainly because of convenience.|我想主要是因为方便。
For example, I usually read before bed.|比如，我通常在睡前阅读。
I grew up in a small town in the south.|我在南方的一个小镇长大。
I'm currently studying computer science.|我目前在学计算机科学。
In my spare time, I enjoy hiking.|空闲时间我喜欢徒步。
I'd like to talk about a book that inspired me.|我想谈谈一本启发我的书。
It was a memorable experience for me.|那对我来说是一次难忘的经历。
What impressed me most was the scenery.|最让我印象深刻的是风景。
It really broadened my horizons.|它真正开阔了我的视野。
Looking back, I think it was worth it.|回想起来，我觉得是值得的。
Nowadays, more and more people work from home.|如今，越来越多的人在家办公。
Technology has changed the way we communicate.|科技改变了我们的沟通方式。
On the one hand, it's convenient.|一方面，它很方便。
On the other hand, it can be addictive.|另一方面，它可能让人上瘾。
I strongly believe that education is the key.|我坚信教育是关键。
Generally speaking, young people prefer online shopping.|一般来说，年轻人更喜欢网购。
The government should invest more in public transport.|政府应该在公共交通上投入更多。
It's hard to say for sure.|很难说得准。
That's pretty much all I can say about it.|关于这个我能说的就这么多。
I'd love to visit Iceland someday.|我希望有一天能去冰岛。
It gives me a sense of achievement.|它给我一种成就感。
I tend to spend a lot of time with my family.|我往往花很多时间陪家人。`},
{id:"ket",title:"剑桥KET/PET核心词",en:"Cambridge KET/PET",cat:"剑桥",sub:"剑桥",type:"w",rating:4.6,c:["#0f766e","#5eead4"],items:`
arrive|/əˈraɪv/|v. 到达|The train arrives at nine.
believe|/bɪˈliːv/|v. 相信|I believe you.
celebrate|/ˈseləbreɪt/|v. 庆祝|We celebrate New Year together.
competition|/ˌkɑːmpəˈtɪʃən/|n. 比赛|She won the singing competition.
dangerous|/ˈdeɪndʒərəs/|adj. 危险的|Swimming here is dangerous.
explain|/ɪkˈspleɪn/|v. 解释|Can you explain this word?
forget|/fərˈɡet/|v. 忘记|Don't forget your keys.
guide|/ɡaɪd/|n. 导游；指南|Our guide speaks three languages.
holiday|/ˈhɑːlədeɪ/|n. 假期|Where did you go on holiday?
invite|/ɪnˈvaɪt/|v. 邀请|She invited me to her party.
journey|/ˈdʒɜːrni/|n. 旅程|The journey took three hours.
kitchen|/ˈkɪtʃɪn/|n. 厨房|Mum is cooking in the kitchen.
luggage|/ˈlʌɡɪdʒ/|n. 行李|How much luggage do you have?
message|/ˈmesɪdʒ/|n. 消息|I sent you a message.
neighbour|/ˈneɪbər/|n. 邻居|Our neighbour has a big dog.
opinion|/əˈpɪnjən/|n. 观点|What's your opinion?
popular|/ˈpɑːpjələr/|adj. 受欢迎的|Football is very popular here.
quiet|/ˈkwaɪət/|adj. 安静的|Please be quiet in the library.
receive|/rɪˈsiːv/|v. 收到|Did you receive my email?
suggest|/səɡˈdʒest/|v. 建议|I suggest we leave early.
ticket|/ˈtɪkɪt/|n. 票|I bought two tickets for the concert.
uniform|/ˈjuːnɪfɔːrm/|n. 制服|Students wear a uniform.
village|/ˈvɪlɪdʒ/|n. 村庄|My grandparents live in a village.
weekend|/ˌwiːkˈend/|n. 周末|What did you do at the weekend?
exciting|/ɪkˈsaɪtɪŋ/|adj. 令人兴奋的|The film was exciting.
relax|/rɪˈlæks/|v. 放松|I relax by listening to music.
weather forecast|/ˈweðər ˈfɔːrkæst/|n. 天气预报|The weather forecast says it'll be sunny.
improve|/ɪmˈpruːv/|v. 改善|Your writing has improved a lot.
borrow|/ˈbɑːroʊ/|v. 借入|Can I borrow your bike?
enjoy|/ɪnˈdʒɔɪ/|v. 享受；喜欢|I really enjoyed the trip.`}
];
COURSES.forEach(c=>{c.items=c.items.trim().split("\n").map(l=>{const p=l.split("|");return c.type=="s"?{en:p[0],zh:p[1]}:{w:p[0],ph:p[1],zh:p[2],ex:p[3],en:p[0]}})});
