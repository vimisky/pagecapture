var jsonObject = [{
	"gid": 1,
	"gname": "新华社报道纠错技能大赛",
	"rid": 1,
	"rname": "六月赛季",
	"starttime": "2016-06-06T16:00:00.000Z",
	"endtime": "2016-07-28T16:00:00.000Z",
	"time_limit": 20,
	"ques_number": 25,
	"participate_limit": 10,
	"description": "THIS IS A TEST ROUND."
}, {
	"gid": 1,
	"gname": "新华社报道纠错技能大赛",
	"rid": 100,
	"rname": "七月赛季",
	"starttime": "2016-06-07T09:44:00.000Z",
	"endtime": "2016-06-16T16:00:00.000Z",
	"time_limit": 15,
	"ques_number": 3,
	"participate_limit": 40,
	"description": "this is round1 for test game 01"
}, {
	"gid": 1,
	"gname": "新华社报道纠错技能大赛",
	"rid": 101,
	"rname": "八月赛季",
	"starttime": "2016-04-26T16:00:00.000Z",
	"endtime": "2016-06-26T16:00:00.000Z",
	"time_limit": 15,
	"ques_number": 2,
	"participate_limit": 5,
	"description": "this is round2 for test game 01"
}, {
	"gid": 2,
	"gname": "全国中小学生成语识别大赛",
	"rid": 102,
	"rname": "第一赛季",
	"starttime": "2016-04-26T16:00:00.000Z",
	"endtime": "2016-06-07T16:00:00.000Z",
	"time_limit": 15,
	"ques_number": 25,
	"participate_limit": 5,
	"description": "这是游戏2的第一赛季"
}, {
	"gid": 2,
	"gname": "全国中小学生成语识别大赛",
	"rid": 103,
	"rname": "第二赛季",
	"starttime": "2016-04-26T16:00:00.000Z",
	"endtime": "2016-06-07T16:00:00.000Z",
	"time_limit": 15,
	"ques_number": 25,
	"participate_limit": 5,
	"description": "这是游戏2的第二赛季"
}, {
	"gid": 2,
	"gname": "全国中小学生成语识别大赛",
	"rid": 104,
	"rname": "第三赛季",
	"starttime": "2016-04-26T16:00:00.000Z",
	"endtime": "2016-06-07T16:00:00.000Z",
	"time_limit": 15,
	"ques_number": 25,
	"participate_limit": 5,
	"description": "这是游戏2的第三赛季"
}, {
	"gid": 3,
	"gname": "test_game03",
	"rid": 105,
	"rname": "1st quarter",
	"starttime": "2016-04-26T16:00:00.000Z",
	"endtime": "2016-06-07T16:00:00.000Z",
	"time_limit": 15,
	"ques_number": 25,
	"participate_limit": 1,
	"description": "Game 3 Quarter 1"
}, {
	"gid": 3,
	"gname": "test_game03",
	"rid": 106,
	"rname": "2nd quarter",
	"starttime": "2016-04-26T16:00:00.000Z",
	"endtime": "2016-06-07T16:00:00.000Z",
	"time_limit": 15,
	"ques_number": 25,
	"participate_limit": 1,
	"description": "Game 3 Quarter 2"
}];

var api_format = 'gamesList: [{"gid": 1,"gname": "新华社报道纠错技能大赛","rounds": [{    "rid": 1,    "rname": "纠错大赛六月赛季"    "starttime": '2015-04-22 09:09:00',    "endtime": '2015-04-22 09:09:00',    "time_limit": 23,    "ques_num": 20,    "participate_limit": 1,    "descriptions": '....'}, {    "rid": 2,    "rname": "纠错大赛七月赛季"    "starttime": '2015-04-22 09:09:00',    "endtime": '2015-04-22 09:09:00',    "time_limit": 23,    "ques_num": 20,    "participate_limit": 1,    "descriptions": '....'}, {    "rid": 3,    "rname": "纠错大赛八月赛季"    "starttime": '2015-04-22 09:09:00',    "endtime": '2015-04-22 09:09:00',    "time_limit": 23,    "ques_num": 20,    "participate_limit": 1,    "descriptions": '....'}, {    "rid": 4,    "rname": "纠错大赛九月赛季"    "starttime": '2015-04-22 09:09:00',    "endtime": '2015-04-22 09:09:00',    "time_limit": 23,    "ques_num": 20,    "participate_limit": 1,    "descriptions": '....'}]}, {"gid": 2,"gname": "全国中小学生成语识别大赛","rounds": [{    "rid": 7,    "rname": "地区赛"    "starttime": '2015-04-22 09:09:00',    "endtime": '2015-04-22 09:09:00',    "time_limit": 23,    "ques_num": 20,    "participate_limit": 1,    "descriptions": '....'}, {    "rid": 8,    "rname": "全国赛"    "starttime": '2015-04-22 09:09:00',    "endtime": '2015-04-22 09:09:00',    "time_limit": 23,    "ques_num": 20,    "participate_limit": 1,    "descriptions": '....'}]}]';