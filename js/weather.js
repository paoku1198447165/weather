
//1、获取默认城市的天气信息
// 2、获取所有城市的信息
// 3、点击每个城市可以获取当前城市的天气信息
// 4、在搜索框内输入要搜索的城市，点击搜索按钮可以进行搜索

// $(function () {
    let tianqi;
    $.ajax({
        type:"get",
        url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=太原",
        dataType:"jsonp",
        success:function (obj) {
            tianqi = obj.data;
            console.log(tianqi);
            updata(tianqi);
        }
    });
    function updata(tianqi) {
        $(".pos").html(tianqi.city);
        $(".air h5").html(tianqi.weather.quality_level);
        $(".title1").html(tianqi.weather.current_temperature+"°");
        $(".title2").html(tianqi.weather.current_condition);
        $(".title3 .wind_der").html(tianqi.weather.wind_direction);
        $(".title3 .wind_level").html(tianqi.weather.wind_level+"级");
        $(".tem .dat_higher").html(tianqi.weather.dat_high_temperature);
        $(".tem .dat_lower").html(tianqi.weather.dat_low_temperature+"℃");
        $(".tem .tomorrow_higher").html(tianqi.weather.tomorrow_high_temperature);
        $(".tem .tomorrow_lower").html(tianqi.weather.tomorrow_low_temperature+"℃");
        // $(".dat_con").html(tianqi.weather.day_condition);
        $(".dat_con").html(tianqi.weather.forecast_list[1].condition);
        $(".tomorrow_con").html(tianqi.weather.forecast_list[2].condition);
        // $(".dat_conPic").css({"background-image":"url(img/"+tianqi.weather.dat_weather_icon_id+".png)"});
        $(".dat_conPic").css("backgroundImage",`url(img/${tianqi.weather.dat_weather_icon_id}.png)`);
        $(".tomorrow_conPic").css({"background-image":"url(img/"+tianqi.weather.tomorrow_weather_icon_id+".png)"});

        //未来24小时的天气
        let hweather = tianqi.weather.hourly_forecast;
        // console.log(hweather);
        hweather.forEach(function (v) {
            // console.log(v);
            let str = `<div class="box">
				<div class="time">${v.hour}:00</div>
				<div class="icon" style="background-image:url('img/${v.weather_icon_id}.png')"></div>
				<div class="timeTem">${v.temperature}°</div>
			</div>`;
            $(".wrap").append(str);
        });
        let forecast_list = tianqi.weather.forecast_list;
        forecast_list.forEach((v1)=>{
            // console.log(v1);
            let str2 = `<div class="box2">
				<div class="date">${v1.date}</div>
				<div class="condition">${v1.condition}</div>
				<div class="forecast_icon" style="background-image:url('img/${v1.weather_icon_id}.png')"></div>
				<div class="higher">${v1.high_temperature}°</div>
				<div class="lower">${v1.low_temperature}°</div>
				<div class="wind">${v1.wind_direction}</div>
				<div class="level">${v1.wind_level}</div>
			</div>`;
            $(".wrap1").append(str2);
        })
    }
// });
let city;
// $(function () {
    $.ajax({
        type:"get",
        url:"https://www.toutiao.com/stream/widget/local_weather/city/",
        dataType:"jsonp",
        success:function (obj) {
            city = obj.data;
            // console.log(city);
            updataCity(city);
        }
    });
// });
function updataCity(city) {
    let k = 0;
    for (let i in city) {
        // console.log(city[i]);
        let str = `<div class="citys">
                        <div class="title">${i}</div>
                        <div class="con"></div>
		            </div>`;
        $(".city").append(str);
        for (let j in city[i]){
            let str4 = `<div class="box">${j}</div>`;
            $(".city .citys .con").eq(k+1).append(str4);
        }
        k++;
    }
}

window.onload = function () {

    $(".box").click(function () {
        $(".fifth").css({"display":"block"});
        $(".city").css({"display":"none"});
        let con = $(this).html();
        console.log(con);
        ajaxs(con);

    });

    function ajaxs(str){
        // alert(1);
        let url1=`https://www.toutiao.com/stream/widget/local_weather/data/?city=${str}`;
        $.ajax({
            type:"get",
            url:url1,
            dataType:"jsonp",
            success:function (obj) {
                let tianqi = obj.data;
                console.log(tianqi);
                updata(tianqi);
            }
        })
    }

  $(".pos").click(function () {
      $(".fifth").css({"display":"none"});
      $(".city").css({"display":"block"});
      // let text = $(".city .searcher input").val();

  });
      $("input").focus(function () {
          $(".button1").html("搜索");
      });

      $(".button1").click(function () {
          $(".fifth").css({"display":"block"});
          $(".city").css({"display":"none"});
          let text = $("input").val();
          for (let i in city){
              for(let j in city[i]){
                  if(text === j){
                      ajaxs(text);
                      $("input").val("");
                      return;
                  }
              }
          }
          alert("该城市不存在,请重新输入");
          $("input").val("");
      });

    $(".city .searcher input").blur(function () {
        $(".button1").html("取消");
    });
};


