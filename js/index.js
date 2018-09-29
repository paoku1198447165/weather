// 1.引入远程数据
// 关于城市的信息
var city;//声明全局变量
var tianqi;//声明全局变量
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/city/",
	dataType:"jsonp",
	method:"get",
	success:function(obj){
		city=obj.data;
		// console.log(city);
	}
})
// 关于天气信息
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=太原",
	dataType:"jsonp",
	method:"get",
	success:function(obj){
		tianqi=obj.data;
		// console.log(tianqi);
	}
})

// 页面加载函数
window.onload=function(){
	update();

	// 页面交互
	var pos=document.getElementsByClassName("pos")[0];
	var cityBox=document.getElementsByClassName("city")[0];
	//点击城市出现城市详情页
	pos.onclick=function(){
		cityBox.style.display="block";
	}

	//点击城市详情，跳转首页，出现该城市的天气情况 
	var Box=$(".city .citys .con .box");
	// console.log(Box);     
	for(let i in Box){
		Box[i].onclick=function(){
			var chengshi=this.innerHTML;
			// console.log(chengshi);
			// 调用AJAX函数
			AJAX(chengshi);
		}
	}

	// 搜索部分
	var searchBox=document.getElementsByClassName("searchBox")[0];
	var button=document.getElementsByClassName("button")[0];
	var text;
	// console.log(button);
	searchBox.onfocus=function(){     //获取焦点
		button.innerHTML="确认";
		text=searchBox.value;
	}
		button.onclick=function(){
		var neirong=button.innerHTML;
		if(neirong=="取消"){
			var city4=document.getElementsByClassName("city")[0];
			city4.style.display="none";
		}else{
			for(let i in city){
				for(let j in city[i]){
					if(text==j){
						AJAX(text);
						return;
					}else{
						alert("没有这个城市的天气情况");
						return;
					}
				}
			}
		}
	}
}



//获取点击城市的天气信息函数
function AJAX(str){
	$.ajax({
		url:`https://www.toutiao.com/stream/widget/local_weather/data/?city=${str}`, //模版字符串 `${}`
		dataType:"jsonp",
		method:"get",
		success:function(obj){
			tianqi=obj.data;
			update();
			var city3=$(".city")[0];
			// console.log(city3);
			city3.style.display="none";
		}
	})
}
// 获取数据函数
function update(){
	// 当前城市
	var pos=document.getElementsByClassName("pos")[0];
	// innerHTML表示块的内容
	pos.innerHTML=tianqi.city;

	//当前空气质量
	var quality_level=document.getElementsByTagName("h5")[0];
	quality_level.innerHTML=tianqi.weather.quality_level;

	// 当前温度
	var current_temperature=document.getElementsByClassName("title1")[0];
	current_temperature.innerHTML=tianqi.weather.current_temperature+"°";

	// 当前天气状况
	var current_condition=document.getElementsByClassName("title2")[0];
	current_condition.innerHTML=tianqi.weather.current_condition;

	// 当前风的方向
	var wind_direction=document.getElementsByClassName("wind_der")[0];
	wind_direction.innerHTML=tianqi.weather.wind_direction;

	// 当前风的等级
	var wind_level=document.getElementsByClassName("wind_level")[0];
	wind_level.innerHTML=tianqi.weather.wind_level+"级";

	// 今天的天气情况图标
	var today_icon=document.getElementsByClassName("dat_conPic")[0];
	today_icon.style=`background-image:url("img/${tianqi.weather.dat_weather_icon_id}.png")`;

	// 明天的天气情况图标
	var tomorrow_icon=document.getElementsByClassName("tomorrow_conPic")[0];
	tomorrow_icon.style=`background-image:url("img/${tianqi.weather.tomorrow_weather_icon_id}.png")`;

	// 今日最高温度
	var dat_high_temperature=document.getElementsByClassName("dat_higher")[0];
	dat_high_temperature.innerHTML=tianqi.weather.dat_high_temperature;

	// 今日最低温度
	var dat_low_temperature=document.getElementsByClassName("dat_lower")[0];
	dat_low_temperature.innerHTML=tianqi.weather.dat_low_temperature+"℃";

	// 明日最高温度
	var tomorrow_high_temperature=document.getElementsByClassName("tomorrow_higher")[0];
	tomorrow_high_temperature.innerHTML=tianqi.weather.tomorrow_high_temperature;

	// 明日最低温度
	var tomorrow_low_temperature=document.getElementsByClassName("tomorrow_lower")[0];
	tomorrow_low_temperature.innerHTML=tianqi.weather.tomorrow_low_temperature+"℃";

	//每小时的天气情况
	var hourlyArr=tianqi.weather.hourly_forecast;
	var wrap=document.getElementsByClassName("wrap")[0];
	for(let i in hourlyArr){					//用 let …… in ……循环
		var box1=document.createElement("div");
		//创建box
		box1.className="box";
		// 创建time块
		var time=document.createElement("div");
		//添加类名
		time.className="time";
		//添加到父级元素身上
		box1.appendChild(time);
		//添加内容
		time.innerHTML=hourlyArr[i].hour+":00";
		// 创建图标块
		var icon=document.createElement("div");
		icon.className="icon";
		box1.appendChild(icon);
		// 修改样式
		icon.style=`background-image:url("img/${hourlyArr[i].weather_icon_id}.png")`;

		var timeTem=document.createElement("div");
		timeTem.className="timeTem";
		box1.appendChild(timeTem);
		timeTem.innerHTML=hourlyArr[i].temperature+"°";

		wrap.appendChild(box1);
	}

	//未来15天天气情况
	var dayArr=tianqi.weather.forecast_list;

	var wrap1=document.getElementsByClassName("wrap1")[0];
	for(let i in dayArr){
		var box2=document.createElement("div");
		box2.className="box2";

		var date=document.createElement("div");
		date.className="date";
		box2.appendChild(date);
		date.innerHTML=dayArr[i].date;

		var condition=document.createElement("div");
		condition.className="condition";
		box2.appendChild(condition);
		condition.innerHTML=dayArr[i].condition;

		var forecast_icon=document.createElement("div");
		forecast_icon.className="forecast_icon";
		box2.appendChild(forecast_icon);
		forecast_icon.style=`background-image:url("img/${dayArr[i].weather_icon_id}.png")`;

		var higher=document.createElement("div");
		higher.className="higher";
		box2.appendChild(higher);
		higher.innerHTML=dayArr[i].high_temperature+"°";

		var lower=document.createElement("div");
		lower.className="lower";
		box2.appendChild(lower);
		lower.innerHTML=dayArr[i].low_temperature+"°";

		var wind=document.createElement("div");
		wind.className="wind";
		box2.appendChild(wind);
		wind.innerHTML=dayArr[i].wind_direction;

		var level=document.createElement("div");
		level.className="level";
		box2.appendChild(level);
		level.innerHTML=dayArr[i].wind_level+"级";

		wrap1.appendChild(box2);
	}


	// 关于城市的信息
	var city1=document.getElementsByClassName("city")[0];
	for (let i in city){
		// console.log(city[i]);
		var citys=document.createElement("div");
		citys.className="citys";

		var title=document.createElement("div");
		title.className="title";
		title.innerHTML=i;
		citys.appendChild(title);

		var con=document.createElement("div");
		con.className="con";


		for(let j in city[i]){
			var box=document.createElement("div");
			box.className="box";
			box.innerHTML=j;
			con.appendChild(box);
		}
		citys.appendChild(con);
		city1.appendChild(citys);
	}
}