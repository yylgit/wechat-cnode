
export function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

export function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

export function formatShortTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/')
}

export function json2Form(json) {
  var str = [];
  for (var p in json) {
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
  }
  return str.join("&");
}

const colors = ['#E74C3C', '#C0392B', '#1ABC9C',
	'#16A085', '#2ECC71', '#27AE60', '#3498DB',
	'#2980B9', '#9B59B6', '#8E44AD', '#34495E',
	'#2C3E50', '#E67E22',
	'#D35400', '#7F8C8D'];


export function getRandomNum(Min, Max) {
	var Range = Max - Min;
	var Rand = Math.random();
	return (Min + Math.round(Rand * Range));
}

export function genColor() {
	return colors[getRandomNum(0, colors.length - 1)];
}


export function getAccessToken() {
  
}

