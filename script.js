			// 更新時間制限
			function chackInterval()
			{
				if(isNaN(Nakano.Interval.value) == true)
				{
					Nakano.Interval.value = 200;
				}
				else if(eval(Nakano.Interval.value) < 50)
				{
					// これ以上早くするとブラウザが落ちる
					Nakano.Interval.value = 50;
				}
			}
			// 小窓の数制限
			function chackWindow()
			{
				if(isNaN(Nakano.miniWindow.value) == true)
				{
					Nakano.miniWindow.value = 16;
				}else if(eval(Nakano.miniWindow.value) < 4) //最小数4
				{
					Nakano.miniWindow.value = 4;
				}
				else if(eval(Nakano.miniWindow.value) > 100) //最大数20
				{
					Nakano.miniWindow.value = 100;
				}
			}
/*
        一応Windowは300まで耐えられるっぽいので300までなら増やしても良い(よくない)
*/
			// 割り込み処理
			var count = 0;			// 更新回数
			var timeID = 0;			// 割り込みハンドラ
			function main(On_Off)
			{
				count = 0;
				// 複数回しないと処理の遅いマシンではクリアされない
				clearInterval(timeID);
				clearInterval(timeID);
				clearInterval(timeID);
				if (On_Off === 0) {         // Start
				    // ウインドの表示と背景の変更
                    MakeWindow();
                    document.bgColor="#ffffee";
                    timeID = setInterval("ReLoad();", eval(Nakano.Interval.value));
				}
				else if (On_Off === 1) {    // Stop
				    document.bgColor="#ffffff";
				}
				else if (On_Off === 2) {    // Clear
				    top.location.reload(true);
				}
				else {                      // Other
				    top.location.reload(true);
				}
			}
			// 小窓量産処理
			var miniWindowsCount;	// 小窓の数
			function MakeWindow(){
				var cnt;
				var htmlString = "";
				miniWindowsCount = Nakano.miniWindow.value;
				for(cnt = 0;cnt < miniWindowsCount; cnt++)
				{
					if(cnt % 4 == 0)
					{
						if(cnt != 0)
						{
							htmlString += "<br>";
						}
					}
					htmlString += "<iframe name='target" + cnt + "' src='" + Interface.url.value + "' height='100' width='130' border='5'></iframe>";
				}
				here.innerHTML = htmlString;
			}
			// 再更新処理
			function ReLoad()
			{
				var target = frames["target" + (count % miniWindowsCount)];
				target.location.href = Interface.url.value;
				Yuko.CountNum.value = count++;
			}
